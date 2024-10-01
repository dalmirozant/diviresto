import { TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { MatToolbarModule } from '@angular/material/toolbar';

describe('Headerrrrrrrrrrr', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatToolbarModule],
      declarations: [HeaderComponent],
    }).compileComponents();
  });

  it('Crear el componente', () => {
    const fixture = TestBed.createComponent(HeaderComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('Mostrar el título', () => {
    const fixture = TestBed.createComponent(HeaderComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('span')?.textContent).toContain('DiviResto®');
  });
});
