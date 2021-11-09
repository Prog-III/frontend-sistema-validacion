import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarComiteComponent } from './listar-comite.component';

describe('ListarComiteComponent', () => {
  let component: ListarComiteComponent;
  let fixture: ComponentFixture<ListarComiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarComiteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarComiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
