import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhilosopheComponent } from './philosophe.component';

describe('PhilosopheComponent', () => {
  let component: PhilosopheComponent;
  let fixture: ComponentFixture<PhilosopheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhilosopheComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhilosopheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
