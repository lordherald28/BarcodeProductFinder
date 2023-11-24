import { Injectable } from '@angular/core';
import { IMessages, eSeverity } from './../../models/message-notify.models';
import { BehaviorSubject, Observable, ReplaySubject, Subject } from 'rxjs';
import { SystemRepository } from 'src/core/repository/system-repository';

@Injectable()
export class SystemService extends SystemRepository {
  private messageSource$ = new BehaviorSubject<IMessages>({});

  constructor() { super()}

  setMessages(params: IMessages): void {
    // console.log(params)
    this.messageSource$.next(params);
  }
  getMessages(): Observable<IMessages> {
    // console.log('params getMessages:  ', params)
    return this.messageSource$.asObservable();
  }

}
