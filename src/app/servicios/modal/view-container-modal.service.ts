import { Injectable, ViewContainerRef } from '@angular/core';
import { Observable } from 'rxjs';

/**
 * 
 */
@Injectable({
  providedIn: 'root'
})
export class ViewContainerModalService {
  viewContainerObservable?: Observable<ViewContainerRef>;

  constructor() { }

  referenciarViewContainer(vc: ViewContainerRef) {
    const observable = new Observable(observer => observer.next(vc));

    this.viewContainerObservable = observable as Observable<ViewContainerRef>;
  }
}
