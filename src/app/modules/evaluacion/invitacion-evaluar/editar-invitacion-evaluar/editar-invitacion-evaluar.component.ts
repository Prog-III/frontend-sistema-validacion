import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-editar-invitacion-evaluar',
  templateUrl: './editar-invitacion-evaluar.component.html',
  styleUrls: ['./editar-invitacion-evaluar.component.css']
})
export class EditarInvitacionEvaluarComponent implements OnInit {
  idProponente?: number;
  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.idProponente = parseInt(this.route.snapshot.params["id"]);
  }

}
