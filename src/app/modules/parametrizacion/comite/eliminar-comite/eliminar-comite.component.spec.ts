import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarComiteComponent } from './eliminar-comite.component';

describe('EliminarComiteComponent', () => {
  let component: EliminarComiteComponent;
  let fixture: ComponentFixture<EliminarComiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EliminarComiteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EliminarComiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
