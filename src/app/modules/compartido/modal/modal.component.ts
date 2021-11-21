import { Component, ElementRef, OnInit, ViewChild, Input } from '@angular/core';
import Modal from "bootstrap/js/dist/modal";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  @Input() modalHeader?: string;
  @Input() modalBody?: string;
  @Input() esModalConfirmacion: boolean = false;

  @ViewChild('modalTemplate', { static: true }) modalTemplate?: ElementRef;
  modal?: Modal;

  constructor() { 
  }

  ngOnInit(): void {
    this.openModal();
  }

  openModal(): void {
    this.modal = new Modal(this.modalTemplate?.nativeElement, {});
    this.modal.show();
  }

  closeModal(): void {
    this.modal?.hide();
    this.modal?.dispose();
  }
}
