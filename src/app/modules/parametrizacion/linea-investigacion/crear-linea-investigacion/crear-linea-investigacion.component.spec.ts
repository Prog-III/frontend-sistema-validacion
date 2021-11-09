import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearLineaInvestigacionComponent } from './crear-linea-investigacion.component';

describe('CrearLineaInvestigacionComponent', () => {
  let component: CrearLineaInvestigacionComponent;
  let fixture: ComponentFixture<CrearLineaInvestigacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearLineaInvestigacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearLineaInvestigacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
