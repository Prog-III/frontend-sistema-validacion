import { Injectable, ViewContainerRef } from '@angular/core';
import { Observable } from 'rxjs';

/**
 * 
 */
@Injectable({
  providedIn: 'root'
})
export class ViewContainerToastService {
  viewContainerObservable?: Observable<ViewContainerRef>;

  constructor() { }

  referenciarViewContainer(vc: ViewContainerRef) {
    const observable = new Observable(observer => observer.next(vc));

    this.viewContainerObservable = observable as Observable<ViewContainerRef>;
  }
}
