import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DokumentenlisteComponent } from './dokumentenliste.component';

describe('DokumentenlisteComponent', () => {
  let component: DokumentenlisteComponent;
  let fixture: ComponentFixture<DokumentenlisteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DokumentenlisteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DokumentenlisteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
