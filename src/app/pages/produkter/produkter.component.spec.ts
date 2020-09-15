import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdukterComponent } from './produkter.component';

describe('ProdukterComponent', () => {
  let component: ProdukterComponent;
  let fixture: ComponentFixture<ProdukterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProdukterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdukterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
