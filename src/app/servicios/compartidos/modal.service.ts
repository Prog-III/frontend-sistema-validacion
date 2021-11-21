import { Injectable, ViewContainerRef } from '@angular/core';
import { ModalComponent } from '../../modules/compartido/modal/modal.component';
import { ModalData } from '../../models/compartido/modal-data';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor() { }

  openModal(modalContainer: ViewContainerRef, data: ModalData) {
    const { header, body, esModalConfirmacion } = data;

    modalContainer.clear();
    const referenciaComponente = modalContainer.createComponent<ModalComponent>(ModalComponent);
    
    referenciaComponente.instance.modalHeader = header;
    referenciaComponente.instance.modalBody = body;
    referenciaComponente.instance.esModalConfirmacion = esModalConfirmacion;

    referenciaComponente.instance.openModal();
  }
}
