import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { PROVIDERS_TOKENS, config_system } from '../config/system.config';
import { SystemService } from 'src/core/services/system-services/system.service';

/**
 * The root component for the BarcodeProductFinder application.
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [SystemService], // SystemService provided at the component level
  changeDetection: ChangeDetectionStrategy.OnPush // OnPush change detection for performance optimization
})
export class AppComponent implements OnInit {
  title = 'BarcodeProductFinder';

  /**
   * Constructor injects configuration settings and ChangeDetectorRef.
   * @param config_system - Configuration settings for the application.
   * @param cdr - ChangeDetectorRef for managing change detection.
   */
  constructor(
    @Inject(PROVIDERS_TOKENS.CONFIG_SYSTEM) public config_system: config_system,
    private cdr: ChangeDetectorRef
  ) { }

  /**
   * OnInit lifecycle hook for initial setup.
   * Clears the localStorage filter state if required by configuration.
   */
  ngOnInit(): void {
    // Clear localStorage filterState if configuration dictates
    if (this.config_system.filterState.isMustClear) {
      localStorage.removeItem(this.config_system.filterState.filterState);
    }
    this.cdr.detectChanges(); // Trigger change detection
  }
}
