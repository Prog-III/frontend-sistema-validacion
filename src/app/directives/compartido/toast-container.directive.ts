import { Directive, ViewContainerRef } from '@angular/core';
import { ViewContainerToastService } from 'src/app/servicios/toast/view-container-toast.service';

/**
 * 
 */
@Directive({
  selector: '[toastContainer]'
})
export class ToastContainerDirective {

  constructor(viewContainer: ViewContainerRef, viewContainerToastService: ViewContainerToastService) { 
    viewContainerToastService.referenciarViewContainer(viewContainer);
  }

}
