import { EventEmitter, Injectable, ViewContainerRef } from '@angular/core';
import { ModalComponent } from '../../modules/compartido/modal/modal.component';
import { ModalData } from '../../models/compartido/modal-data';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private modalContainer?: ViewContainerRef

  constructor() { }

  openModal(data: ModalData): EventEmitter<boolean> | undefined {
    const { header, body, esModalConfirmacion } = data;

    if (this.modalContainer) {
      this.modalContainer.clear();
      const referenciaComponente = this.modalContainer.createComponent<ModalComponent>(ModalComponent);
    
      referenciaComponente.instance.modalHeader = header;
      referenciaComponente.instance.modalBody = body;
      referenciaComponente.instance.esModalConfirmacion = esModalConfirmacion;

      const subscription = referenciaComponente.instance.confirmacionEvent;
      referenciaComponente.instance.openModal();

      return subscription;
    }

    return undefined;
  }

  set modalContainerRef(modalContainer: ViewContainerRef) {
    if (!this.modalContainer) {      
      this.modalContainer = modalContainer;
    }
  }
}
