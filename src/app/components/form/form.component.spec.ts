import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';

import { FormComponent } from './form.component';
import { Result } from 'src/app/models/result.interface';

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormComponent],
      imports: [
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatInputModule,
        MatButtonModule,
        MatFormFieldModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should build form with expected controls', () => {
    const controls = component.form.controls;
    expect(controls['dividendo']).toBeDefined();
    expect(controls['divisor']).toBeDefined();
    expect(controls['decimales']).toBeDefined();
  });

  it('should emit res when form is valid on submit', () => {
    const emitSpy = spyOn(component.res, 'emit');

    component.form.setValue({
      dividendo: 100,
      divisor: 10,
      decimales: 0,
    });

    component.submitForm();

    expect(component.form.valid).toBeTrue();
    expect(emitSpy).toHaveBeenCalledWith({
      dividendo: 100,
      divisor: 10,
      decimales: 0,
    } as Result);
  });

  it('should not emit res when form is invalid', () => {
    const emitSpy = spyOn(component.res, 'emit');

    component.form.setValue({
      dividendo: 10,
      divisor: 10, // no es menor que el dividendo -> invalida isMajorTo
      decimales: 0,
    });

    component.submitForm();

    expect(component.form.valid).toBeFalse();
    expect(emitSpy).not.toHaveBeenCalled();
  });

  it('should reset form and emit resetEvent on reset', () => {
    const resetSpy = spyOn(component.resetEvent, 'emit');

    component.form.setValue({
      dividendo: 50,
      divisor: 5,
      decimales: 2,
    });

    component.reset();

    expect(component.form.value).toEqual({
      dividendo: '',
      divisor: '',
      decimales: 0,
    });
    expect(resetSpy).toHaveBeenCalled();
  });

  it('should initialize form with @Input par and emit res', () => {
    const par: Result = {
      dividendo: 200,
      divisor: 20,
      decimales: 1,
    };

    const emitSpy = spyOn(component.res, 'emit');

    // Creamos un nuevo componente para poder asignar @Input antes de ngOnInit
    const freshFixture = TestBed.createComponent(FormComponent);
    const freshComponent = freshFixture.componentInstance;
    freshComponent.par = par;

    freshFixture.detectChanges(); // dispara ngOnInit

    expect(freshComponent.form.value).toEqual(par);
    expect(emitSpy).not.toHaveBeenCalled();
  });
});

