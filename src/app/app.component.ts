import { AfterViewInit, Component, ViewChild, ViewContainerRef, OnInit, OnDestroy } from '@angular/core';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { ModalService } from './servicios/modal/modal.service';
import { ViewContainerModalService } from './servicios/modal/view-container-modal.service';
import { Subscription } from 'rxjs';
import { ToastService } from './servicios/toast/toast.service';
import { ViewContainerToastService } from './servicios/toast/view-container-toast.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  faCog = faCog;
  title = 'frontend-sistema-validacion';

  subscription: Subscription = new Subscription();

  constructor(
    private modalService: ModalService,
    private toastService: ToastService,
    private viewContainerModalService: ViewContainerModalService,
    private viewContainerToastService: ViewContainerToastService
  ) {
    
  }

  /**
   * 
   */
  ngOnInit(): void {
    const viewContainerModalSubscription = this.viewContainerModalService.viewContainerObservable?.subscribe(vc => {
      this.modalService.modalContainerRef = vc;
    });

    const viewContainerToastSubscription = this.viewContainerToastService.viewContainerObservable?.subscribe(vc => {
      this.toastService.toastContainerRef = vc;
    })
    
    this.subscription.add(viewContainerModalSubscription);
    this.subscription.add(viewContainerToastSubscription);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
