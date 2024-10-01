import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormComponent } from './form.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormComponent],
      imports: [
        ReactiveFormsModule,
        MatInputModule,
        MatFormFieldModule,
        BrowserAnimationsModule,
        NoopAnimationsModule,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // 1. Prueba de inicialización del formulario
  it('should create the form with the correct controls', () => {
    component.ngOnInit();
    expect(component.form.contains('dividendo')).toBeTruthy();
    expect(component.form.contains('divisor')).toBeTruthy();
  });

  // 2. Prueba de validadores requeridos
  it('should have required validators on both controls', () => {
    const dividendoControl = component.form.get('dividendo');
    const divisorControl = component.form.get('divisor');

    expect(dividendoControl?.hasError('required')).toBeTruthy();
    expect(divisorControl?.hasError('required')).toBeTruthy();
  });

  // 3. Prueba de valor inicial y submit
  it('should set the form value if par is provided and call submitForm', () => {
    spyOn(component, 'submitForm');
    const mockPar = { dividendo: 100, divisor: 50 };

    component.par = mockPar;
    component.ngOnInit();

    expect(component.form.value).toEqual(mockPar);
    expect(component.submitForm).toHaveBeenCalled();
  });

  // 4. Prueba de emisión del evento res
  it('should emit res event when the form is valid on submitForm', () => {
    spyOn(component.res, 'emit');

    component.form.setValue({ dividendo: 100, divisor: 50 });
    component.submitForm();

    expect(component.res.emit).toHaveBeenCalledWith({
      dividendo: 100,
      divisor: 50,
    });
  });

  // 5. Prueba de reinicio del formulario y emisión de resetEvent
  it('should reset the form and emit resetEvent on reset', () => {
    spyOn(component.resetEvent, 'emit');

    component.reset();

    expect(component.form.value).toEqual({ dividendo: '', divisor: '' });
    expect(component.resetEvent.emit).toHaveBeenCalled();
  });

  // 6. Prueba de validación personalizada majorTo
  it('should have a majorTo error if divisor is greater than dividendo', () => {
    component.form.setValue({ dividendo: 50, divisor: 100 });

    expect(component.form.hasError('majorTo')).toBeTruthy();
  });

  // 7. Prueba del botón de envío deshabilitado
  it('should disable the submit button if the form is invalid', () => {
    const buttonElement: HTMLButtonElement =
      fixture.nativeElement.querySelector('.submit');

    component.form.setValue({ dividendo: '', divisor: '' });
    fixture.detectChanges();

    expect(buttonElement?.disabled)?.toBeTrue();

    component.form.setValue({ dividendo: 100, divisor: 50 });
    fixture.detectChanges();

    expect(buttonElement.disabled).toBeFalse();
  });
});
