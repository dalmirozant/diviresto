import { Component } from '@angular/core';
import { DivisionesService } from './services/divisiones.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private divisionesService: DivisionesService) {
    console.log(divisionesService.divisiones);
  }
}
