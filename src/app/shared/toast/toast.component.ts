import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-toast',
  imports: [CommonModule],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss'
})
export class ToastComponent {
  @Input() toasts: any;
  @Output() remove = new EventEmitter<number>();

  getToastClass(type: string): string {
    const baseClasses = 'text-white';
    
    switch (type) {
      case 'success':
        return `${baseClasses} bg-green-500 border-green-600`;
      case 'error':
        return `${baseClasses} bg-red-500 border-red-600`;
      case 'warning':
        return `${baseClasses} bg-yellow-500 border-yellow-600`;
      case 'info':
        return `${baseClasses} bg-blue-500 border-blue-600`;
      default:
        return `${baseClasses} bg-gray-500 border-gray-600`;
    }
  }

  removeToast(id: number) {
    this.remove.emit(id);
  }
}
