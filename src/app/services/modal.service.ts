import {Injectable} from '@angular/core';

import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ModalService {
  // create post modal
  private displayCreatePostModal: BehaviorSubject<'open' | 'close'> = new BehaviorSubject<'open' | 'close'>('close');


  watchCreatePostModal(): Observable<'open' | 'close'> {
    return this.displayCreatePostModal.asObservable();
  }

  openCreatePostModal() {
    this.displayCreatePostModal.next('open');
  }

  closeCreatePostModal() {
    this.displayCreatePostModal.next('close');
  }
  // settings modal
  private displaySettingsModal: BehaviorSubject<'open' | 'close'> = 
                   new BehaviorSubject<'open' | 'close'>('close');


  watchSettingsModal(): Observable<'open' | 'close'> {
    return this.displaySettingsModal.asObservable();
  }

  openSettingsModal() {
    this.displaySettingsModal.next('open');
  }

  closeSettingsModal() {
    this.displaySettingsModal.next('close');
  }

  // edit post modal
  private displayEditPostModal: BehaviorSubject<'open' | 'close'> = new BehaviorSubject<'open' | 'close'>('close');


  watchEditPostModal(): Observable<'open' | 'close'> {
    return this.displayEditPostModal.asObservable();
  }

  openEditPostModal() {
    this.displayEditPostModal.next('open');
  }

  closeEditPostModal() {
    this.displayEditPostModal.next('close');
  }
}