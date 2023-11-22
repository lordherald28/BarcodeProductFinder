import { Component, Inject, OnInit } from '@angular/core';
import { PROVIDERS_TOKENS, config_system } from '../config/system.config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'BarcodeProductFinder';

  constructor(
    @Inject(PROVIDERS_TOKENS.CONFIG_SYSTEM) public config_system: config_system

  ) { }

  ngOnInit(): void {
    // Clear localStorage  filterState
    if (this.config_system.filterState.isMustClear)
      localStorage.removeItem(this.config_system.filterState.filterState)
  }
}
