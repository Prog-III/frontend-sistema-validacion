import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarRecordatorioComponent } from './eliminar-recordatorio.component';

describe('EliminarRecordatorioComponent', () => {
  let component: EliminarRecordatorioComponent;
  let fixture: ComponentFixture<EliminarRecordatorioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EliminarRecordatorioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EliminarRecordatorioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
