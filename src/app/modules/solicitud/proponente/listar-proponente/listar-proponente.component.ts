import { Component, OnInit } from '@angular/core';
import { ProponenteModel } from 'src/app/models/parametros/proponente.model';
import { ProponenteService } from '../../../../servicios/seguridad/proponente.service';

import { faIdCard } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faMobileAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-listar-proponente',
  templateUrl: './listar-proponente.component.html',
  styleUrls: ['./listar-proponente.component.css']
})
export class ListarProponenteComponent implements OnInit {
  proponentes?: ProponenteModel[];

  faIdCard = faIdCard;
  faEnvelope = faEnvelope;
  faMobileAlt = faMobileAlt;

  constructor(
    private proponenteService: ProponenteService
  ) { }

  ngOnInit(): void {
    this.GetRecordList();
  }

  GetRecordList() {
    this.proponenteService.GetRecordList().subscribe(proponentes => {
      this.proponentes = proponentes;
    });
  }

}
