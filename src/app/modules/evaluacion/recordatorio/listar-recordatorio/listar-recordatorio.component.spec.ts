import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarRecordatorioComponent } from './listar-recordatorio.component';

describe('ListarRecordatorioComponent', () => {
  let component: ListarRecordatorioComponent;
  let fixture: ComponentFixture<ListarRecordatorioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarRecordatorioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarRecordatorioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
