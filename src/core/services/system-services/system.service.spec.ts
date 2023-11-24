import { TestBed, waitForAsync } from '@angular/core/testing';
import { SystemService } from './system.service';
import { IMessages, eSeverity } from './../../models/message-notify.models';
import { Observable, Subject } from 'rxjs';

describe('Service: System', () => {
  let service: SystemService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [SystemService]
    });
    service = TestBed.inject(SystemService);
  }));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have a getMessages function that returns an Observable<IMessages>', () => {
  
    expect(service.getMessages).toBeDefined();
    expect(service.getMessages()).toBeInstanceOf(Observable);
  });

  it('should allow message subscription and emit messages', (done: DoneFn) => {

    const testMessage: IMessages = { detail: 'Test Message', isShow: true, severity: eSeverity.INFO };
    service.setMessages(testMessage);
    
    service.getMessages().subscribe(message => {
      // console.log(message)
      expect(message).toEqual(testMessage);
      done();
    });
  });
});
