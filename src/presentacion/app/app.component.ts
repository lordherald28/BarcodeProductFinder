import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DoCheck, Inject, OnInit, inject } from '@angular/core';
import { PROVIDERS_TOKENS, config_system } from '../config/system.config';
import { UseCaseGetMessages } from 'src/core/use-case/use-case-get-messages';
import { Observable, Subscription } from 'rxjs';
import { IMessages, eSeverity } from 'src/core/models/message-notify.models';
import { SystemService } from 'src/core/services/system-services/system.service';
import { UseCaseSetMessages } from 'src/core/use-case/use-case-set-messages';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [SystemService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  title = 'BarcodeProductFinder';

  constructor(
    @Inject(PROVIDERS_TOKENS.CONFIG_SYSTEM) public config_system: config_system,
    private cdr: ChangeDetectorRef

  ) {


  }


  ngOnInit(): void {
    // Clear localStorage  filterState
    if (this.config_system.filterState.isMustClear) {
      localStorage.removeItem(this.config_system.filterState.filterState);
    }
    this.cdr.detectChanges();
  }

}
