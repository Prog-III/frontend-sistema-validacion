import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaReportesComponent } from './lista-reportes/lista-reportes.component';

const routes: Routes = [
  {
  path: "listar-reportes",
  component: ListaReportesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportesRoutingModule { }
