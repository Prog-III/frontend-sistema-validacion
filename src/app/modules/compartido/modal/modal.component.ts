import { Component, ElementRef, OnInit, ViewChild, Input } from '@angular/core';
import Modal from "bootstrap/js/dist/modal";
import { ModalData } from '../../../models/compartido/modal-data';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  modalHeader?: string;
  modalBody?: string;
  esModalConfirmacion?: boolean = false;

  @ViewChild('modalTemplate', { static: true }) modalTemplate?: ElementRef;
  modal?: Modal;

  constructor() { }

  ngOnInit(): void { }

  openModal(): void {
    this.modal = new Modal(this.modalTemplate?.nativeElement, {});
    this.modal.show();
  }

  closeModal(): void {
    this.modal?.hide();
    this.modal?.dispose();
  }
}
