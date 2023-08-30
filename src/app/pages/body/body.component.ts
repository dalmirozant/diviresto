import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, filter, map, takeUntil } from 'rxjs';
import { Result } from 'src/app/models/result.interface';
import { DivisionesService } from 'src/app/services/divisiones.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss'],
})
export class BodyComponent implements OnInit, OnDestroy {
  result: Result | undefined;
  par!: Result;

  destroyed$ = new Subject<boolean>();

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private divisionesService: DivisionesService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap
      .pipe(
        filter((params) => params.keys.length > 0),
        map((params) => params.keys.map((key) => parseInt(params.get(key)!))),
        takeUntil(this.destroyed$)
      )
      .subscribe(([dividendo, divisor]) => {
        if (Number.isNaN(dividendo) || Number.isNaN(divisor))
          this.router.navigateByUrl('/');
        else this.par = { dividendo, divisor };
      });
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
  }

  onResult(formValue: Result) {
    const dividendo = formValue.dividendo;
    const divisor = formValue.divisor;
    this.result = {
      dividendo,
      divisor,
      cociente: dividendo / divisor,
      cocienteInt: Math.trunc(dividendo / divisor),
      resto: dividendo % divisor,
      restas: [],
    };
    this.calculo();
    this.procesar(this.result.minimo!);
    this.procesarLoop();
    this.divisionesService.divisiones = [
      ...this.divisionesService.divisiones,
      { dividendo, divisor },
    ];
  }

  onReset() {
    this.result = undefined;
    this.router.navigateByUrl('/');
  }

  private calculo(): void {
    const dividendoString = this.result!.dividendo.toString();
    const largoDividendo = dividendoString.length;
    for (let i = 1; i <= largoDividendo; i++) {
      let min = parseInt(dividendoString.substring(0, i));
      if (min / this.result!.divisor >= 1) {
        this.result!.minimo = min;
        this.result!.restante =
          i < largoDividendo ? dividendoString.substring(i) : null;
        break;
      }
    }
  }

  private procesar(minimo: number, numeroAdd?: string): void {
    const nuevoMinimo = numeroAdd ? parseInt(`${minimo}${numeroAdd}`) : minimo;
    const cocienteParcial = Math.trunc(nuevoMinimo / this.result!.divisor);
    const producto = cocienteParcial * this.result!.divisor;
    const resta = nuevoMinimo - producto;
    this.result!.restas!.push({
      minimo,
      numeroAdd,
      cocienteParcial,
      producto,
      resta,
    });
  }

  private procesarLoop(): void {
    const restanteLength = this.result!.restante?.length;
    for (let i = 0; i < restanteLength!; i++) {
      this.procesar(
        this.result!.restas![this.result!.restas!.length - 1].resta!,
        this.result!.restante?.substring(i, i + 1)
      );
    }
  }
}
