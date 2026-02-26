import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RestasComponent } from './restas.component';
import { Result } from 'src/app/models/result.interface';

describe('RestasComponent', () => {
  let component: RestasComponent;
  let fixture: ComponentFixture<RestasComponent>;

  const createMockResult = (): Result => ({
    dividendo: 125,
    divisor: 5,
    minimo: 12,
    restante: '5',
    restas: [],
    decimales: 0,
    resto: 0,
    cocienteInt: '25',
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RestasComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(RestasComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    component.result = createMockResult();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should render minimo and restante from result input', () => {
    component.result = createMockResult();
    fixture.detectChanges();

    const compiled: HTMLElement = fixture.nativeElement;
    const minimoElement = compiled.querySelector('.minimo');
    const restanteElement = compiled.querySelector('.restante');

    expect(minimoElement?.textContent).toContain('12');
    expect(restanteElement?.textContent).toContain('5');
  });
});

