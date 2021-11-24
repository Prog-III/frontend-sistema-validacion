import { Injectable, ViewContainerRef } from '@angular/core';
import { ToastData } from '../../models/compartido/toast-data';
import { ToastComponent } from '../../modules/compartido/toast/toast.component';

/**
 * 
 */
@Injectable({
  providedIn: 'root'
})
export class ToastService {

  private toastContainer?: ViewContainerRef;

  constructor() { }

  openToast(data: ToastData): void {
    const { mensaje, tipo } = data;    
   
      this.toastContainer?.clear();
      const referenciaComponente = this.toastContainer!.createComponent<ToastComponent>(ToastComponent);

      referenciaComponente.instance.mensaje = mensaje;
      referenciaComponente.instance.tipo = tipo;

      referenciaComponente.instance.openToast();
    
  }

  set toastContainerRef(toastContainer: ViewContainerRef) {
    if (!this.toastContainer) {      
      this.toastContainer = toastContainer;
    }
  }
}
