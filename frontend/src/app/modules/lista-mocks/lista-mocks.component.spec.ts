import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaMocksComponent } from './lista-mocks.component';

describe('ListaMocksComponent', () => {
  let component: ListaMocksComponent;
  let fixture: ComponentFixture<ListaMocksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaMocksComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListaMocksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
