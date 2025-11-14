import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  @Input() isOpen = false;
  @Input() title = 'Confirmar';
  @Input() message = 'Voce tem certeza que deseja proseguir?';
  @Input() confirmText = 'Confirmar';
  @Input() cancelText = 'Cancelar';
  
  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();
}
