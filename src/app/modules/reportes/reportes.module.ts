import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { ReportesRoutingModule } from './reportes-routing.module';
import { ListaReportesComponent } from './lista-reportes/lista-reportes.component';
import { CompartidoModule } from '../compartido/compartido.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    ListaReportesComponent
  ],
  imports: [
    CommonModule,
    ReportesRoutingModule,
    NgChartsModule,
    CompartidoModule,
    FontAwesomeModule
  ]
})
export class ReportesModule { }
