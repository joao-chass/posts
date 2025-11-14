import { Component, computed, inject, signal } from '@angular/core';
import { Post } from '../../../models/post.model';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PostService } from '../../../core/services/post/post.service';
import { CommentService } from '../../../core/services/comment/comment.service';
import { Comments, CreateCommentDTO } from '../../../models/comment.model';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from '../../../shared/loading/loading.component';
import { PostEditModalComponent } from '../post-edit-modal/post-edit-modal.component';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from '../../../shared/modal/modal.component';
import { ToastService } from '../../../shared/toast/services/toast.service';

@Component({
  selector: 'app-post-detail',
  imports: [CommonModule, 
    FormsModule, 
    RouterLink,
    LoadingComponent,
    PostEditModalComponent,
    ModalComponent],
  templateUrl: './post-detail.component.html',
  styleUrl: './post-detail.component.scss'
})
export class PostDetailComponent {
  post = signal<Post | null>(null);
  comments = signal<Comments[]>([]);
  loading = signal(true);
  commentsLoading = signal(true);
  error = signal<string | null>(null);

  private toastService = inject(ToastService);


  newComment = signal({
    name: '',
    email: '',
    body: ''
  });

  showEditModal = signal(false);

  commentsCount = computed(() => this.comments().length);
  characterCount = computed(() => this.newComment().body.length);
  deleteComment = computed(() => {
    return this.commentId() ? `Você tem certeza que deseja deletar o comentario com ID ${this.commentId()}?` : 'Você tem certeza que deseja deletar estecomentario?';
  });

  showDeleteModal = signal(false);
  commentId = signal(0);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postService: PostService,
    private commentService: CommentService
  ) {}

  ngOnInit(): void {
    const postId = Number(this.route.snapshot.paramMap.get('id'));
    if (postId) {
      this.loadPost(postId);
      this.loadComments(postId);
    } else {
      this.error.set('Post ID nao encontrado');

      this.loading.set(false);
    }
  }

  loadPost(id: number): void {
    this.loading.set(true);
    this.error.set(null);

    this.postService.getPost(id).subscribe({
      next: (post) => {
        this.post.set(post);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Falha ao carregar o post');
        this.toastService.error("Falha ao carregar o post")
        this.loading.set(false);
      }
    });
  }

  loadComments(postId: number): void {
    this.commentsLoading.set(true);

    this.commentService.getCommentsByPostId(postId).subscribe({
      next: (comments) => {
        this.comments.set(comments);
        this.commentsLoading.set(false);
      },
      error: (err) => {
        this.comments.set(this.commentService.getCachedCommentsByPostId(postId));
        this.commentsLoading.set(false);
        this.toastService.error("Erro ao carregar")
      }
    });
  }

  onSubmitComment(): void {
    const post = this.post();
    if (!post) return;

    const commentData: CreateCommentDTO = {
      postId: post.id,
      name: this.newComment().name.trim(),
      email: this.newComment().email.trim(),
      body: this.newComment().body.trim()
    };

    if (!commentData.name || !commentData.email || !commentData.body) {
      this.error.set('Por favor preencha todos os dados');
      return;
    }

    this.commentService.createComment(commentData).subscribe({
      next: () => {
        this.newComment.set({ name: '', email: '', body: '' });
        this.error.set(null);
        this.toastService.success("Comentario criado com sucesso!")
      },
      error: (err) => {
        this.error.set('Falha ao adicionar comentario');
        this.toastService.error("Falha ao carregar o post'")

      }
    });
  }

  onEditPost(): void {
    this.showEditModal.set(true);
  }

  onSaveEdit(updateData: { title?: string; body?: string }): void {
    const post = this.post();
    if (!post) return;

    this.postService.updatePost(post.id, updateData).subscribe({
      next: (updatedPost) => {
        this.post.set(updatedPost);
        this.showEditModal.set(false);
        this.error.set(null);
        this.toastService.success("Atulizacao feita com sucesso!");
      },
      error: (err) => {
        this.error.set('Falha ao atulizar');
        this.toastService.error("Falha ao atulizar")
      }
    });
  }

  onCancelEdit(): void {
    this.showEditModal.set(false);
  }

  confirmDeleteComment(): void {
    
      this.commentService.deleteComment(this.commentId()).subscribe({
        next: (res) => {
          this.showDeleteModal.set(false);
          this.toastService.success("Comentario deletado com sucesso")
        },
        error: (err) => {
          this.error.set('Failed to delete comment');
          this.toastService.error("Falha ao deletar comentario")
        }
      });
    
  }

  openModalDeleteComment(commentId: number): void {
    this.showDeleteModal.set(true);
    this.commentId.set(commentId);
  }
  cancelDelete(): void {
    this.showDeleteModal.set(false);
    this.commentId.set(0);
  }

  trackByCommentId(index: number, comment: Comments): number {
    return comment.id;
  }
}
