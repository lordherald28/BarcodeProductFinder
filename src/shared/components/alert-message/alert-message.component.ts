import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { IMessages, eSeverity } from 'src/core/models/message-notify.models';

/**
 * Component for displaying alert messages with various severities.
 */
@Component({
  selector: 'app-alert-message',
  templateUrl: './alert-message.component.html',
  styleUrls: ['./alert-message.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush, // OnPush change detection for performance optimization
  standalone: true, // Standalone component configuration
  imports: [CommonModule]
})
export class AlertMessageComponent implements OnInit, OnChanges {
  // Constructor with ChangeDetectorRef for managing change detection
  constructor(
    private readonly changeDetectionRef: ChangeDetectorRef
  ) { }

  // Inputs for the component to set alert message, link, message details, and visibility flags
  @Input() setMessageAlert: string = 'This is an alert message!';
  @Input() linkToCorsDemo: string = 'https://cors-anywhere.herokuapp.com/';
  @Input() message: IMessages = {};
  severity: eSeverity = this.message.severity as eSeverity; // Severity of the alert message
  @Input() showAlert: boolean = true; // Flag to show/hide alert
  @Input() showLinkDemo: boolean = false; // Flag to show/hide link

  ngOnChanges(changes: SimpleChanges): void {
    // Update severity when message input changes
    this.severity = this.message.severity as eSeverity;
    this.changeDetectionRef.markForCheck(); // Manually trigger change detection
  }

  ngOnInit(): void {
    // Show alert after a short delay
    setTimeout(() => this.showAlert = true, 100);
    this.changeDetectionRef.markForCheck(); // Manually trigger change detection
  }

  /**
   * Closes the alert message.
   * Sets showAlert and isShow properties of the message to false.
   */
  closeAlert() {
    this.showAlert = this.message.isShow = false;
  }
}
