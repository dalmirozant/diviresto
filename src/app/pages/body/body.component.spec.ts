import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ActivatedRoute, ParamMap, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject } from 'rxjs';

import { BodyComponent } from './body.component';
import { Result } from 'src/app/models/result.interface';

class ActivatedRouteStub {
  private paramMapSubject = new BehaviorSubject<ParamMap>(convertToParamMap({}));

  readonly paramMap = this.paramMapSubject.asObservable();

  setParamMap(params: { [key: string]: string }) {
    this.paramMapSubject.next(convertToParamMap(params));
  }
}

describe('BodyComponent', () => {
  let component: BodyComponent;
  let fixture: ComponentFixture<BodyComponent>;
  let router: Router;
  let activatedRouteStub: ActivatedRouteStub;

  beforeEach(async () => {
    activatedRouteStub = new ActivatedRouteStub();

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [BodyComponent],
      providers: [{ provide: ActivatedRoute, useValue: activatedRouteStub }],
    }).compileComponents();

    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(BodyComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should initialize par from route params when valid', () => {
    fixture.detectChanges(); // dispara ngOnInit y suscripción

    activatedRouteStub.setParamMap({ dividendo: '10', divisor: '2' });

    expect(component.par).toEqual({
      dividendo: 10,
      divisor: 2,
      decimales: 0,
    } as Result);
  });

  it('should navigate to root when route params are invalid', () => {
    const navigateSpy = spyOn(router, 'navigateByUrl');

    fixture.detectChanges();
    activatedRouteStub.setParamMap({ dividendo: 'abc', divisor: '2' });

    expect(navigateSpy).toHaveBeenCalledWith('/');
  });

  it('truncarDecimales should truncate without rounding', () => {
    const value = 10 / 3;

    const result0 = component.truncarDecimales(value, 0);
    const result2 = component.truncarDecimales(value, 2);

    expect(result0).toBe('3');
    expect(result2).toBe('3.33');
  });

  it('onResult should build a correct Result object', () => {
    const formValue: Result = {
      dividendo: 10,
      divisor: 4,
      decimales: 2,
    };

    component.onResult(formValue);

    expect(component.result).toBeDefined();
    expect(component.result?.dividendo).toBe(10);
    expect(component.result?.divisor).toBe(4);
    expect(component.result?.cociente).toBe(10 / 4);
    expect(component.result?.cocienteInt).toBe('2.50');
    expect(component.result?.resto).toBe(10 % 4);
    expect(component.result?.restas?.length).toBeGreaterThan(0);
  });
});

