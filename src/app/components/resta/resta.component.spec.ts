import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RestaComponent } from './resta.component';
import { Resta } from 'src/app/models/result.interface';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('RestaComponent', () => {
  let component: RestaComponent;
  let fixture: ComponentFixture<RestaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RestaComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA], // Para manejar otros elementos no declarados
    }).compileComponents();

    fixture = TestBed.createComponent(RestaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // 1. Prueba de creación del componente
  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  // 2. Prueba de valor de @Input resta
  it('should display correct values for resta input', () => {
    const mockResta: Resta = { minimo: 10, numeroAdd: '5', producto: 50 };

    component.resta = mockResta;
    fixture.detectChanges(); // Necesario para actualizar el DOM

    const minimoElement: HTMLElement =
      fixture.nativeElement.querySelector('.minimo');
    const numeroAddElement: HTMLElement =
      fixture.nativeElement.querySelector('.restante');
    const productoElement: HTMLElement =
      fixture.nativeElement.querySelector('p:nth-of-type(2)');

    expect(minimoElement.textContent).toContain('10');
    expect(numeroAddElement.textContent).toContain('5');
    expect(productoElement.textContent).toContain('50');
  });

  // 3. Prueba cuando no hay datos en @Input resta
  it('should handle undefined resta input gracefully', () => {
    fixture.detectChanges();
    const restaContainer =
      fixture.nativeElement.querySelector('.resta-container');
    expect(restaContainer).toBe(null);
  });

  // 4. Prueba cuando el @Input resta tiene valor
  it('should display the content when resta input is defined', () => {
    const mockResta: Resta = { minimo: 15, numeroAdd: '10', producto: 5 };

    component.resta = mockResta;
    fixture.detectChanges(); // Actualiza el DOM

    const pElement = fixture.nativeElement.querySelector('p:nth-of-type(1)');
    expect(pElement).not.toBeNull(); // El primer <p> debe existir si resta tiene valor

    const minimoElement: HTMLElement =
      fixture.nativeElement.querySelector('.minimo');
    const numeroAddElement: HTMLElement =
      fixture.nativeElement.querySelector('.restante');

    expect(minimoElement.textContent).toContain('15');
    expect(numeroAddElement.textContent).toContain('10');
  });
});
