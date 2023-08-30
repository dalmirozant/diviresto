import { Component, OnInit } from '@angular/core';
import { Result } from 'src/app/models/result.interface';
import { DivisionesService } from 'src/app/services/divisiones.service';

@Component({
  selector: 'app-divisiones-list',
  templateUrl: './divisiones-list.component.html',
  styleUrls: ['./divisiones-list.component.scss'],
})
export class DivisionesListComponent implements OnInit {
  divisiones!: Result[];

  constructor(private divisionesService: DivisionesService) {}

  ngOnInit(): void {
    this.divisiones = this.divisionesService.divisiones;
  }
}
