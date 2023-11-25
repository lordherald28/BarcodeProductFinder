import { ChangeDetectionStrategy,  Component, OnInit } from '@angular/core';
import { HeaderComponent } from 'src/shared/components/header/header.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [HeaderComponent]
})
export  default class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    
  }

}
