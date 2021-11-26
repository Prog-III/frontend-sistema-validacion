import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Toast from 'bootstrap/js/dist/toast';

import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnInit {
  mensaje?: string;
  tipo?: string;

  faExclamationTriangle = faExclamationTriangle;
  faCheckCircle = faCheckCircle;
  faInfoCircle = faInfoCircle;
  
  toast?: Toast;
  @ViewChild('toastTemplate', { static: true }) toastTemplate?: ElementRef;

  constructor() { }

  ngOnInit(): void { }

  openToast() {
    this.toast = new Toast(this.toastTemplate?.nativeElement, { animation: true, autohide: true, delay: 3000 });
    this.toast.show();
  }

  closeToast() {
    this.toast?.hide();
    this.toast?.dispose();
  }
}
