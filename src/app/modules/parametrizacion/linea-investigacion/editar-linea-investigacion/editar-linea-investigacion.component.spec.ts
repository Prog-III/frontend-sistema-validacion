import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarLineaInvestigacionComponent } from './editar-linea-investigacion.component';

describe('EditarLineaInvestigacionComponent', () => {
  let component: EditarLineaInvestigacionComponent;
  let fixture: ComponentFixture<EditarLineaInvestigacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarLineaInvestigacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarLineaInvestigacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
