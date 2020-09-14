import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KurvComponent } from './kurv.component';

describe('KurvComponent', () => {
  let component: KurvComponent;
  let fixture: ComponentFixture<KurvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KurvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KurvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
