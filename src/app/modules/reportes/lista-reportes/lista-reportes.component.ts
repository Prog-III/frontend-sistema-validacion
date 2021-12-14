import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import * as dayjs from 'dayjs';
import 'dayjs/locale/es'
import { SolicitudService } from 'src/app/servicios/parametros/solicitud.service';
import { EstadoSolicitudService } from 'src/app/servicios/parametros/estado-solicitud.service';
import { EstadoSolicitudModel } from 'src/app/models/parametros/estadosolicitud.model';
import { faUsers, faUsersSlash, faUserTie } from '@fortawesome/free-solid-svg-icons';
import { UsuarioService } from 'src/app/servicios/usuarios/usuario.service';
import { UsuarioRolService } from 'src/app/servicios/usuarios/usuario-rol.service';

@Component({
  selector: 'app-lista-reportes',
  templateUrl: './lista-reportes.component.html',
  styleUrls: ['./lista-reportes.component.css']
})
export class ListaReportesComponent implements OnInit {

  faUsers = faUsers
  faUsersSlash = faUsersSlash
  faUserTie = faUserTie
  registromes: number[] = []
  estadomes: number[] = []

  usuariosactivos = 0
  usuariosinactivos = 0
  usuariosjurados = 0

  estadosolicitudes: EstadoSolicitudModel[] = [];

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  //Line Chart
  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [],
        label: 'Solicitudes Registradas',
        backgroundColor: 'rgba(57,120,222,0.2)',
        borderColor: 'rgba(57,120,222,1)',
        pointBackgroundColor: 'rgba(8,54,128,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(8,54,128,0.8)',
        fill: 'origin',
      }
    ],
    labels: [  ]
  };

  

  public lineChartType: ChartType = 'line';

  
  // Pie

  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: [ ],
    datasets: [ {
      data: [ ]
    } ]
  };
  public pieChartType: ChartType = 'pie';
  
  constructor(
    private service: SolicitudService,
    private EstadolicitudService: EstadoSolicitudService,
    private usuarioService: UsuarioService,
    private usuariorolService: UsuarioRolService,
    ) {
    
    dayjs.locale("es")
    this.obtenerEstadoSolicitudes()
    this.CrearGrafica();
    this.obtenerActivos()
    this.obtenerInactivos()
    this.obtenerJurados()
  }
    

  ngOnInit(): void {
    
    
    
    
  }


  async CrearGrafica(){
    
    
    await this.Getcantidad(dayjs().subtract(4, 'month').format('MM').toString())
    
    await this.Getcantidad(dayjs().subtract(3, 'month').format('MM').toString())
    
    await this.Getcantidad(dayjs().subtract(2, 'month').format('MM').toString())
   
    await this.Getcantidad(dayjs().subtract(1, 'month').format('MM').toString())
    
    await this.Getcantidad(dayjs().format('MM').toString())
    
    
    this.lineChartData.labels?.push(dayjs().subtract(4, 'month').format('MMMM').toUpperCase(),dayjs().subtract(3, 'month').format('MMMM').toUpperCase(), dayjs().subtract(2, 'month').format('MMMM').toUpperCase(), dayjs().subtract(1, 'month').format('MMMM').toUpperCase(), dayjs().format('MMMM').toUpperCase() )

    console.log(this.registromes);

    this.lineChartData.datasets[0].data = this.registromes
  }

  async Getcantidad(mes:string) {
    
    this.service.ObtenerCantidadPorMes(mes).subscribe(async res => {
      if(res.count || res.count == 0){  
          this.registromes.push(res.count)
      }

  })
  }

  async CrearPie(estadosolicitud: EstadoSolicitudModel[]){
    
    for(let tipo of estadosolicitud){
      if(tipo.nombre && tipo.id)
      this.pieChartData.labels?.push(tipo.nombre)
      this.obtenerSolicitudporestado(tipo.id)
      
    }
  

  }

  obtenerEstadoSolicitudes() {
    this.EstadolicitudService.GetRecordList().subscribe(estadoSolicitud => {
      this.estadosolicitudes = estadoSolicitud
      this.CrearPie(estadoSolicitud)
    })
  }

  obtenerSolicitudporestado(estado:any) {
    this.service.ObtenerCantidadPorIdEstado(estado).subscribe(count => {
      if(count.count || count.count === 0){
        this.pieChartData.datasets[0].data.push(count.count) 
      }
    })
  }

  obtenerActivos() {
    this.usuarioService.ObtenerCantidadActivos().subscribe(activos => {
      if(activos.count || activos.count === 0){
        this.usuariosactivos = activos.count
        console.log(activos.count);
        
      }
    })
  }

  obtenerInactivos() {
    this.usuarioService.ObtenerCantidadInactivos().subscribe(inactivos => {
      if(inactivos.count || inactivos.count === 0){
        this.usuariosinactivos = inactivos.count
        console.log(inactivos.count);
        
      }
    })
  }

  obtenerJurados() {
    this.usuariorolService.ObtenerCantidadJurados().subscribe(jurados => {
      if(jurados.count || jurados.count === 0){
        this.usuariosjurados = jurados.count
        console.log(jurados.count);
        
      }
    })
  }
}
