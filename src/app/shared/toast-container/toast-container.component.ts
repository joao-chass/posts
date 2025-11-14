import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ToastComponent } from '../toast/toast.component';
import { ToastService } from '../toast/services/toast.service';

@Component({
  selector: 'app-toast-container',
  imports: [CommonModule, ToastComponent],
  templateUrl: './toast-container.component.html',
  styleUrl: './toast-container.component.scss'
})
export class ToastContainerComponent {
  toastService = inject(ToastService);

}
