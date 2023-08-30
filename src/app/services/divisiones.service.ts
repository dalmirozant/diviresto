import { Injectable } from '@angular/core';
import { Result } from '../models/result.interface';

@Injectable({
  providedIn: 'root',
})
export class DivisionesService {
  get divisiones(): Result[] {
    return JSON.parse(localStorage.getItem('DIVISIONES') ?? '[]');
  }

  set divisiones(result: Result[]) {
    localStorage.setItem('DIVISIONES', JSON.stringify(result));
  }
}
