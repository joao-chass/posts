import { Injectable, signal } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { CreatePostDTO, Post, UpdatePostDTO } from '../../../models/post.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/posts';
  private postsCache = signal<Post[]>([]);

  constructor(private http: HttpClient) {
    this.loadPostsToCache();
  }

  private loadPostsToCache(): void {
    this.http.get<Post[]>(this.apiUrl).subscribe(posts => {
      this.postsCache.set(posts);
    });
  }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.apiUrl).pipe(
      tap(posts => this.postsCache.set(posts))
    );
  }

  getPost(id: number): Observable<Post> {
    return this.http.get<Post>(`${this.apiUrl}/${id}`);
  }

  createPost(post: CreatePostDTO): Observable<Post> {
    const newPost = { ...post, id: this.generateTempId() };
    
    // Optimistic update
    this.postsCache.update(posts => [...posts, newPost as Post]);
    
    return this.http.post<Post>(this.apiUrl, post).pipe(
      tap(createdPost => {
        // Replace temp post with actual post from API
        this.postsCache.update(posts => 
          posts.map(p => p.id === newPost.id ? createdPost : p)
        );
      }),
      catchError(error => {
        // Rollback on error
        this.postsCache.update(posts => posts.filter(p => p.id !== newPost.id));
        return throwError(() => error);
      })
    );
  }

  updatePost(id: number, post: UpdatePostDTO): Observable<Post> {
    const originalPosts = this.postsCache();
    
    this.postsCache.update(posts => 
      posts.map(p => p.id === id ? { ...p, ...post } : p)
    );

    return this.http.put<Post>(`${this.apiUrl}/${id}`, post).pipe(
      catchError(error => {
        this.postsCache.set(originalPosts);
        return throwError(() => error);
      })
    );
  }

  deletePost(id: number): Observable<void> {
    const originalPosts = this.postsCache();
    
    // Optimistic update
    this.postsCache.update(posts => posts.filter(p => p.id !== id));

    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(error => {
        // Rollback on error
        this.postsCache.set(originalPosts);
        return throwError(() => error);
      })
    );
  }

  getCachedPosts() {
    return this.postsCache.asReadonly();
  }

  private generateTempId(): number {
    return -Math.random().toString(36).substr(2, 9);
  }
}
