<<<<<<< HEAD
import { Component, OnInit, OnDestroy } from '@angular/core';
=======
import { Component, OnInit, ViewChild, OnDestroy, ElementRef } from '@angular/core';
>>>>>>> jurados-archivo-plano
import { Router } from '@angular/router';
import { faPlus, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { NgxCsvParser } from 'ngx-csv-parser';
import { map, Subscription } from 'rxjs';
import { GeneralData } from 'src/app/config/general-data';
import { ModalData } from 'src/app/models/compartido/modal-data';
import { ToastData } from 'src/app/models/compartido/toast-data';
import { JuradoModel } from 'src/app/models/parametros/jurado.model';
import { ModalService } from 'src/app/servicios/modal/modal.service';
import { JuradoService } from 'src/app/servicios/parametros/jurado.service';
import { ToastService } from 'src/app/servicios/toast/toast.service';

@Component({
  selector: 'app-listar-jurado',
  templateUrl: './listar-jurado.component.html',
  styleUrls: ['./listar-jurado.component.scss']
})
export class ListarJuradoComponent implements OnInit, OnDestroy {

  private subscription: Subscription = new Subscription();
  pageSize: number = GeneralData.RECORDS_BY_PAGE;
  p: number = 1;
  total: number = 0;
  recordList: JuradoModel[] = [];
  faPlus = faPlus;
  faEdit = faEdit;
  faTrash = faTrash;

  id: number = 0;

  @ViewChild('inputArchivosPlanos', { static: false }) inputArchivosPlanos?: ElementRef;

  constructor(
    private service: JuradoService,
    private modalService: ModalService,
    private toastService: ToastService,
    private router: Router,
    private ngxCsvParser: NgxCsvParser
  ) { }

  ngOnInit(): void {
    this.GetRecordList();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  GetRecordList() {
    this.service.GetRecordList().subscribe({
      next: (data: JuradoModel[]) => {
        this.recordList = data;
        this.total = this.recordList.length
      }
    })
  }

  EliminarRegistro(id: number | undefined) {
    const mensajeModal: ModalData = {
      header: GeneralData.ARG_ELIMINACION,
      body: GeneralData.CONFIRMACION_ELIMINACION,
      esModalConfirmacion: true
    };
    const modalSubscription = this.modalService.openModal(mensajeModal)?.subscribe(confirmacion => {
      if (id && confirmacion) {
        this.service.EliminarRegistro(id).subscribe({
          next: (data: JuradoModel) => {

            const mensajeToast: ToastData = {
              tipo: 'success',
              mensaje: GeneralData.TOAST_MENSAJE_ELIMINACION('El jurado')
            }
            this.toastService.openToast(mensajeToast);
            this.router.navigateByUrl('/', { skipLocationChange: true })
              .then(() => this.router.navigate(['/parametrizacion/listar-jurado']))
          },
          error: (err: any) => {
            const mensajeToast: ToastData = {
              tipo: 'error',
              mensaje: GeneralData.TOAST_ERROR_ELIMINACION('El jurado')
            }
            this.toastService.openToast(mensajeToast);
          }
        });
      }
    })

    this.subscription.add(modalSubscription);
  }

  listenerArchivos($event: any): void {
    const archivosInput = $event.target['files'] as FileList;
    if (!archivosInput) {
      this.resetearInputArchivos();
      return this.toastService.openToast({ tipo: "error", mensaje: "No existe archivos en la selección" })
    }

    const archivoCSV = archivosInput[0];
    if (archivoCSV.type !== 'application/vnd.ms-excel') {
      this.resetearInputArchivos();
      return this.toastService.openToast({ tipo: "error", mensaje: "Extensión de archivo incompatible" })
    }

    const csvSubscription = this.ngxCsvParser.parse(archivoCSV, { header: true, delimiter: ',' })
      .pipe(
        map((jurados: any) => {
          const arregloJurados: JuradoModel[] = jurados.map((jurado: any)=> {
            return {
              nombre: jurado.Nombre,
              telefono: jurado.Teléfono,
              email: jurado.Email,
              entidad: jurado.Entidad
            }
          })
          return arregloJurados;
        })
      )
      .subscribe({
        next: async (jurados: JuradoModel[]) => {
          const guardarObservable = await this.service.GuardarVariosRegistros(jurados);
          guardarObservable.subscribe({
            next: (juradosCreados) => {
              const mensajeToast: ToastData = {
                tipo: 'success',
                mensaje: `Se ha asociado con éxito un total de ${juradosCreados.length} jurados`
              }

              this.toastService.openToast(mensajeToast);
              this.router.navigateByUrl('/', { skipLocationChange: true })
                .then(() => this.router.navigate(['/parametrizacion/listar-jurado']))
            },
            error: (error: any) => {
              console.error(error);
              this.toastService.openToast({ tipo: "error", mensaje: "Error al leer los jurados" });
              this.resetearInputArchivos();
            }
          })
        },
        error: (error: any) => {
          console.error(error);
          this.toastService.openToast({ tipo: "error", mensaje: "Error al leer los jurados" });
          this.resetearInputArchivos();
        }
      })
    
    this.subscription.add(csvSubscription);
  }

  resetearInputArchivos() {
    this.inputArchivosPlanos!.nativeElement.value = "";
  }
}
