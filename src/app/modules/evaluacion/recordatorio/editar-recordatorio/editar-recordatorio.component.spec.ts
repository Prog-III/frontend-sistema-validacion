import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarRecordatorioComponent } from './editar-recordatorio.component';

describe('EditarRecordatorioComponent', () => {
  let component: EditarRecordatorioComponent;
  let fixture: ComponentFixture<EditarRecordatorioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarRecordatorioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarRecordatorioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
