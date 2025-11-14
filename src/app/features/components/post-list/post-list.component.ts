import { Component, computed, effect, inject, signal } from '@angular/core';
import { Post, UpdatePostDTO } from '../../../models/post.model';
import { PostService } from '../../../core/services/post/post.service';
import { LoadingComponent } from '../../../shared/loading/loading.component';
import { ModalComponent } from '../../../shared/modal/modal.component';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PostEditModalComponent } from '../post-edit-modal/post-edit-modal.component';
import { ToastService } from '../../../shared/toast/services/toast.service';

@Component({
  selector: 'app-post-list',
  imports: [LoadingComponent, ModalComponent, RouterLink,  CommonModule, PostEditModalComponent],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.scss'
})
export class PostListComponent {
  posts = signal<Post[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);
 
  searchTerm = signal('');
  sortField = signal<'title' | 'id'>('id');
  sortDirection = signal<'asc' | 'desc'>('desc');
  
  currentPage = signal(1);
  itemsPerPage = signal(10);

  showDeleteModal = signal(false);
  postToDelete = signal<Post | null>(null);

  postToEdit = signal<Post | null>(null);
  showEditModal = signal(false);

  private toastService = inject(ToastService);

  filteredPosts = computed(() => {
    const term = this.searchTerm().toLowerCase();
    let filtered = this.posts();
    
    if (term) {
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(term) || 
        post.body.toLowerCase().includes(term)
      );
    }
    
    return this.sortPosts(filtered);
  });

  paginatedPosts = computed(() => {
    const startIndex = (this.currentPage() - 1) * this.itemsPerPage();
    return this.filteredPosts().slice(startIndex, startIndex + this.itemsPerPage());
  });

  totalPages = computed(() => 
    Math.ceil(this.filteredPosts().length / this.itemsPerPage())
  );

  lastPage = computed(() => {
    return Math.min(this.currentPage() * this.itemsPerPage(), this.filteredPosts().length)
  });

  deleteMessage = computed(() => {
    const post = this.postToDelete();
    return post ? `Você tem certeza que deseja deletar o post com ID ${post.id}?` : 'Você tem certeza que deseja deletar este post?';
  });

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(): void {
    this.loading.set(true);
    this.error.set(null);

    this.postService.getPosts().subscribe(res => {
    
      this.posts.set(res);
      this.loading.set(false);
    }, error => {
      this.error.set('Failed to load posts');
      this.toastService.error('Algo deu errado!');
      this.loading.set(false);
    })

   
  }

  private sortPosts(posts: Post[]): Post[] {
    return posts.sort((a, b) => {
      const fieldA = a[this.sortField()];
      const fieldB = b[this.sortField()];
    
      
      if (this.sortDirection() == 'asc') {
        return fieldA < fieldB ? -1 : 1;
      } else {
        return fieldA > fieldB ? -1 : 1;
      }
    });
  }

  onSearchChange(term: string): void {
    this.searchTerm.set(term);
    this.currentPage.set(1);
  }

  onSort(field: 'title' | 'id'): void {
  console.log(field);
  
    if (this.sortField() == field) {
      this.sortDirection.set(this.sortDirection() == 'asc' ? 'desc' : 'asc');
    } else {
      this.sortField.set(field);
      this.sortDirection.set('desc');
      Math.min();
    }
  }

 

  changePage(page: number): void {
    this.currentPage.set(page);
  }

  openDeleteModal(post: Post): void {
    this.postToDelete.set(post);
    this.showDeleteModal.set(true);
  }

  confirmDelete(): void {
    const post = this.postToDelete();
    if (post) {
      this.postService.deletePost(post.id).subscribe({
        next: () => {
          this.toastService.success('Post deletado com sucesso!');
        },
        error: (err) => {
          this.error.set('Failed to delete post');
          this.toastService.error('Falha ao deletar!');
        }
      });
    }
    this.showDeleteModal.set(false);
    this.postToDelete.set(null);
  }

  cancelDelete(): void {
    this.showDeleteModal.set(false);
    this.postToDelete.set(null);
  }

  trackByPostId(index: number, post: Post): number {
    return post.id;
  }

  openEditModal(post: Post): void {
    this.postToEdit.set(post);
    this.showEditModal.set(true);
  }

  onCancelEdit(): void {
    this.showEditModal.set(false);
    this.postToEdit.set(null);
    this.error.set(null);
  }

  onSaveEdit(updateData: UpdatePostDTO): void {
    const postId = this.postToEdit()?.id;
    if (postId) {
      this.postService.updatePost(postId, updateData).subscribe({
        next: () => {
          this.showEditModal.set(false);
          this.postToEdit.set(null);
          this.error.set(null);
          this.toastService.success('Post editado com sucesso!');
        },
        error: (err) => {
          this.toastService.error('Algo deu errado!');
          this.error.set('Failed to update post');
        }
      });
    }
  }
}
