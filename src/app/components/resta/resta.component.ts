import { Component, Input } from '@angular/core';
import { Resta } from 'src/app/models/result.interface';

@Component({
  selector: 'app-resta',
  templateUrl: './resta.component.html',
  styleUrls: ['../restas/restas.component.scss', './resta.component.scss'],
})
export class RestaComponent {
  @Input() resta!: Resta;
}
