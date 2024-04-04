import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogsMockComponent } from './logs-mock.component';

describe('LogsMockComponent', () => {
  let component: LogsMockComponent;
  let fixture: ComponentFixture<LogsMockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogsMockComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LogsMockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
