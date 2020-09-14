import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KassenComponent } from './kassen.component';

describe('KassenComponent', () => {
  let component: KassenComponent;
  let fixture: ComponentFixture<KassenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KassenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KassenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
