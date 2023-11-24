import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { IMessages, eSeverity } from 'src/core/models/message-notify.models';

@Component({
  selector: 'app-alert-message',
  templateUrl: './alert-message.component.html',
  styleUrls: ['./alert-message.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule]

})
export class AlertMessageComponent implements OnInit, OnChanges {

  constructor(
    private readonly changeDetectionRef: ChangeDetectorRef
  ){}
  @Input() setMessageAlert: string = 'This is an alert message!';
  @Input() linkToCorsDemo: string = 'https://cors-anywhere.herokuapp.com/';
  @Input() message: IMessages = {}
  severity: eSeverity = this.message.severity as eSeverity
  @Input() showAlert: boolean = true;
  @Input() showLinkDemo: boolean = false;

  ngOnChanges(changes: SimpleChanges): void {
    this.severity = this.message.severity as eSeverity
    this.changeDetectionRef.markForCheck()
  }

  ngOnInit(): void {
    setTimeout(() => this.showAlert = true, 100);
    this.changeDetectionRef.markForCheck()

  }

  closeAlert() {
    this.showAlert = this.message.isShow = false;
  }
}
