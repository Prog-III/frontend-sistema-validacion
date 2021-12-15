import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumenRecordatorioComponent } from './resumen-recordatorio.component';

describe('ResumenRecordatorioComponent', () => {
  let component: ResumenRecordatorioComponent;
  let fixture: ComponentFixture<ResumenRecordatorioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResumenRecordatorioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumenRecordatorioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
