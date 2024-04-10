import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCasoEspecialComponent } from './form-caso-especial.component';

describe('FormCasoEspecialComponent', () => {
  let component: FormCasoEspecialComponent;
  let fixture: ComponentFixture<FormCasoEspecialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormCasoEspecialComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormCasoEspecialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
