import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/servicios/compartidos/local-storage.service';
import { TokenService } from 'src/app/servicios/seguridad/token.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private localStorageService: LocalStorageService,
    private router: Router,
    private http: HttpClient,
    private serviceToken: TokenService,
  ) { }

  ngOnInit(): void {
    for (let y = 0; y < 24; y++) {
      setTimeout(() =>{
        this.verificacionTemporal();
      }, 216000*y)//verifica cada hora que siga con un token valido y sin expirar  
      
    }
    
  }
verificacionTemporal(){
  let token = this.localStorageService.GetTokenReal();

  if (token == "") {
    this.router.navigate(["/seguridad/login"]);
    
  } else {
    
   // console.log(token);

    this.serviceToken.validarToken(token).subscribe(
      (data) => {
 //       console.log(data);

        console.log("aun activo");
        

      },
      (err) => {
        this.localStorageService.RemoverDatosSesion();
        this.router.navigate(["/seguridad/login"]);
        
      }
    )
    
  }
}
}
