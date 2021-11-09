import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarLineaInvestigacionComponent } from './eliminar-linea-investigacion.component';

describe('EliminarLineaInvestigacionComponent', () => {
  let component: EliminarLineaInvestigacionComponent;
  let fixture: ComponentFixture<EliminarLineaInvestigacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EliminarLineaInvestigacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EliminarLineaInvestigacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
