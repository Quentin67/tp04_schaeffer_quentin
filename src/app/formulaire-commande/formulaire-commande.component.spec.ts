import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulaireCommandeComponent } from './formulaire-commande.component';

describe('FormulaireCommandeComponent', () => {
  let component: FormulaireCommandeComponent;
  let fixture: ComponentFixture<FormulaireCommandeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormulaireCommandeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormulaireCommandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
