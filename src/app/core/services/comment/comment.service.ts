import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { Comments, CreateCommentDTO } from '../../../models/comment.model';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/comments';
  private commentsCache = signal<Comments[]>([]);

  constructor(private http: HttpClient) {}

  getCommentsByPostId(postId: number): Observable<Comments[]> {
    return this.http.get<Comments[]>(`${this.apiUrl}?postId=${postId}`).pipe(
      tap(comments => {
        this.commentsCache.update(current => {
          const filtered = current.filter(c => c.postId !== postId);
          return [...filtered, ...comments];
        });
      })
    );
  }

  createComment(comment: CreateCommentDTO): Observable<Comments> {
    const newComment = { ...comment, id: this.generateTempId() };
    
    // Optimistic update
    this.commentsCache.update(comments => [...comments, newComment as Comments]);

    return this.http.post<Comments>(this.apiUrl, comment).pipe(
      tap(createdComment => {
        this.commentsCache.update(comments =>
          comments.map(c => c.id === newComment.id ? createdComment : c)
        );
      }),
      catchError(error => {
        this.commentsCache.update(comments => 
          comments.filter(c => c.id !== newComment.id)
        );
        return throwError(() => error);
      })
    );
  }

  updateComment(id: number, body: string): Observable<Comments> {
    const originalComments = this.commentsCache();
    
    this.commentsCache.update(comments =>
      comments.map(c => c.id === id ? { ...c, body } : c)
    );

    return this.http.put<Comments>(`${this.apiUrl}/${id}`, { body }).pipe(
      catchError(error => {
        this.commentsCache.set(originalComments);
        return throwError(() => error);
      })
    );
  }

  deleteComment(id: number): Observable<void> {
    const originalComments = this.commentsCache();
    
    this.commentsCache.update(comments => comments.filter(c => c.id !== id));

    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(error => {
        this.commentsCache.set(originalComments);
        return throwError(() => error);
      })
    );
  }

  getCachedCommentsByPostId(postId: number) {
    return this.commentsCache().filter(comment => comment.postId === postId);
  }

  private generateTempId(): number {
    return -Math.random().toString(3)
  }
}
