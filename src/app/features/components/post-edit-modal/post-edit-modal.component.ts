import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { Post, UpdatePostDTO } from '../../../models/post.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-post-edit-modal',
  imports: [CommonModule, FormsModule],
  templateUrl: './post-edit-modal.component.html',
  styleUrl: './post-edit-modal.component.scss'
})
export class PostEditModalComponent {
  @Input() post: Post | null = null;
  @Input() isOpen = false;
  @Output() save = new EventEmitter<UpdatePostDTO>();
  @Output() cancel = new EventEmitter<void>();

  loading = signal(false);
  error = signal<string | null>(null);

  formData = {
    title: '',
    body: ''
  };

  ngOnInit(): void {
    document.addEventListener('keydown', this.handleEscapeKey.bind(this));
    this.loading.set(false);
  }

  ngOnDestroy(): void {
    document.removeEventListener('keydown', this.handleEscapeKey.bind(this));
  }

  private handleEscapeKey(event: KeyboardEvent): void {
    if (event.key === 'Escape' && this.isOpen) {
      this.onCancel();
    }
  }

  onSave(): void {
    if (!this.formData.title.trim() || !this.formData.body.trim()) {
      this.error.set('Titulo e comentario e obrigatorio');
      return;
    }

    this.loading.set(true);
    this.error.set(null);

    const updateData: UpdatePostDTO = {
      title: this.formData.title.trim(),
      body: this.formData.body.trim()
    };

    this.save.emit(updateData);
  }

  onCancel(): void {
    this.resetForm();
    this.cancel.emit();
  }

  onBackdropClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.onCancel();
    }
  }

  private resetForm(): void {
    this.formData = {
      title: '',
      body: ''
    };
    this.loading.set(false);
    this.error.set(null);
  }

  ngOnChanges(): void {
    if (this.post && this.isOpen) {
      this.formData = {
        title: this.post.title,
        body: this.post.body
      };
      this.error.set(null);
    }
  }
}
