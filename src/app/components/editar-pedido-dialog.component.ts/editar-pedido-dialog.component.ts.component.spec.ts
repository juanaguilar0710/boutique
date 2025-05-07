import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarPedidoDialogComponentTsComponent } from './editar-pedido-dialog.component.ts.component';

describe('EditarPedidoDialogComponentTsComponent', () => {
  let component: EditarPedidoDialogComponentTsComponent;
  let fixture: ComponentFixture<EditarPedidoDialogComponentTsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarPedidoDialogComponentTsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarPedidoDialogComponentTsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
