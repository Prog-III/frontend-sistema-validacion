import { AfterViewInit, Component, ViewChild, ViewContainerRef } from '@angular/core';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { ModalService } from './servicios/modal/modal.service';
import { ViewContainerModalService } from './servicios/modal/view-container-modal.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  faCog = faCog;
  title = 'frontend-sistema-validacion';

  subscription: Subscription = new Subscription();

  constructor(
    private modalService: ModalService,
    private ViewContainerModalService: ViewContainerModalService
  ) {
    
  }

  ngOnInit(): void {
    const viewContainerModalSubscription = this.ViewContainerModalService.viewContainerObservable?.subscribe(vc => {
      this.modalService.modalContainerRef = vc;
    });

    this.subscription.add(viewContainerModalSubscription);
  }
}
