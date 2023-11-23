import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-alert-message',
  templateUrl: './alert-message.component.html',
  styleUrls: ['./alert-message.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule]

})
export class AlertMessageComponent implements OnInit {

  @Input() setMessageAlert: string = 'This is an alert message!';

  ngOnInit(): void {
    setTimeout(() => this.showAlert = true, 100); // Retraso para permitir animación de entrada

  }

  @Input() showAlert: boolean = true;
  // message: string = 'This is an alert message!';

  closeAlert() {
    this.showAlert = false;
  }
}
