import { Component, Input, OnInit } from '@angular/core';
import { Result } from 'src/app/models/result.interface';

@Component({
  selector: 'app-restas',
  templateUrl: './restas.component.html',
  styleUrls: ['./restas.component.scss'],
})
export class RestasComponent implements OnInit {
  @Input() result!: Result;

  constructor() {}

  ngOnInit(): void {}
}
