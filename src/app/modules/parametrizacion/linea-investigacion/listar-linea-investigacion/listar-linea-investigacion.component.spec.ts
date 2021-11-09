import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarLineaInvestigacionComponent } from './listar-linea-investigacion.component';

describe('ListarLineaInvestigacionComponent', () => {
  let component: ListarLineaInvestigacionComponent;
  let fixture: ComponentFixture<ListarLineaInvestigacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarLineaInvestigacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarLineaInvestigacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
