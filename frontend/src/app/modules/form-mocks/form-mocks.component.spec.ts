import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormMocksComponent } from './form-mocks.component';

describe('FormMocksComponent', () => {
  let component: FormMocksComponent;
  let fixture: ComponentFixture<FormMocksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormMocksComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormMocksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
