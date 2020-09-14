import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorikComponent } from './historik.component';

describe('HistorikComponent', () => {
  let component: HistorikComponent;
  let fixture: ComponentFixture<HistorikComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistorikComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistorikComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
