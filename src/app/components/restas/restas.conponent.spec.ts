// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { RestasComponent } from './restas.component';
// import { Component, Input } from '@angular/core';
// import { Result } from 'src/app/models/result.interface';

// @Component({
//   selector: 'app-resta',
//   template: '<div></div>',
// })
// class MockRestaComponent {
//   @Input() resta: any;
// }

// describe('RestasComponent', () => {
//   let component: RestasComponent;
//   let fixture: ComponentFixture<RestasComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [RestasComponent, MockRestaComponent], // Mock del componente hijo
//     }).compileComponents();
//   });

//   beforeEach(() => {
//     fixture = TestBed.createComponent(RestasComponent);
//     component = fixture.componentInstance;
//   });

//   it('should create the RestasComponent', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should display the correct values for result', () => {
//     // Mocking the input result
//     component.result = {
//       minimo: 10,
//       restante: '5',
//       restas: [],
//       resto: 0,
//       divisor: 2,
//       cocienteInt: 5,
//     };

//     fixture.detectChanges();

//     const minimoEl = fixture.nativeElement.querySelector('.minimo');
//     const restanteEl = fixture.nativeElement.querySelector('.restante');
//     const divisorEl = fixture.nativeElement.querySelector('.divisor');
//     const cocienteEl = fixture.nativeElement.querySelector('.cociente');

//     expect(minimoEl.textContent).toContain('10');
//     expect(restanteEl.textContent).toContain('5');
//     expect(divisorEl.textContent).toContain('2');
//     expect(cocienteEl.textContent).toContain('5');
//   });

//   it('should render the correct number of resta components', () => {
//     // Mocking the input result with multiple restas
//     component.result = {
//       minimo: 10,
//       restante: '5',
//       restas: [{ valor: 1 }, { valor: 2 }], // Ajusta la estructura de 'resta' según el tipo
//       resto: 0,
//       divisor: 2,
//       cocienteInt: 5,
//     };

//     fixture.detectChanges();

//     const restasEl = fixture.nativeElement.querySelectorAll('app-resta');
//     expect(restasEl.length).toBe(2); // Se esperan 2 'app-resta'
//   });

//   it('should not display app-resta components when there are no restas', () => {
//     // Mocking the input result with no restas
//     component.result = {
//       minimo: 10,
//       restante: '5',
//       restas: [], // Sin restas
//       resto: 0,
//       divisor: 2,
//       cocienteInt: 5,
//     };

//     fixture.detectChanges();

//     const restasEl = fixture.nativeElement.querySelectorAll('app-resta');
//     expect(restasEl.length).toBe(0); // No se espera ningún 'app-resta'
//   });

//   it('should display the correct value of resto', () => {
//     // Mocking the input result with a resto value
//     component.result = {
//       minimo: 10,
//       restante: '5',
//       restas: [],
//       resto: 3, // Set resto value
//       divisor: 2,
//       cocienteInt: 5,
//     };

//     fixture.detectChanges();

//     const restoEl = fixture.nativeElement.querySelector('.restas-list p');
//     expect(restoEl.textContent).toContain('3'); // Debería mostrar el valor 3
//   });
// });
