import { AfterViewInit, Component, ViewChild, ViewContainerRef } from '@angular/core';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { ModalService } from './servicios/compartidos/modal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  faCog = faCog;
  title = 'frontend-sistema-validacion';

  @ViewChild('modalContainer', { read: ViewContainerRef }) modalContainer!: ViewContainerRef;

  constructor(
    private modalService: ModalService
  ) {
    
  }
  
  ngAfterViewInit(): void {
    this.modalService.modalContainerRef = this.modalContainer; 
  }
}
