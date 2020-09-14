import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TakComponent } from './tak.component';

describe('TakComponent', () => {
  let component: TakComponent;
  let fixture: ComponentFixture<TakComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TakComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TakComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
