import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { EventosService } from 'src/app/services/eventos.service';
import { PerfilService } from 'src/app/services/perfil.service';
import { PublicacionService } from 'src/app/services/publicacion.service';

@Component({
  selector: 'app-publicacion',
  templateUrl: './publicacion.component.html',
  styleUrls: ['./publicacion.component.css']
})
export class PublicacionComponent {
  publicacionesList: any = [];
  publicacionForm: any = this.formBuilder.group({
    usuarioQueLaSubio: '',
    contenido: ''
  })
  eventosList: any = [];

  constructor(private publicacionService: PublicacionService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private eventoService: EventosService,
    private perfilService:PerfilService) {
  }

  ngOnInit() {
    if (localStorage.getItem('rol') == null) {
      this.router.navigate(['/login']);
      
    }else {
      this.getAllPublicaciones();
      this.consultarEventosInteres();
    }
    
  }

  getAllPublicaciones() {
    this.publicacionService.getAllPublicacionesData(localStorage.getItem('accessToken')).subscribe(
      (data: {}) => {
        this.publicacionesList = data
      }
    );
  }

  newPublicacionEntry() {
    this.publicacionForm.controls['usuarioQueLaSubio'].setValue(localStorage.getItem('id'));
    console.log(this.publicacionForm.value);
    this.publicacionService.newPublicacion(localStorage.getItem('accessToken'), this.publicacionForm.value).subscribe(
      () => {
        //Redirigiendo a la ruta actual /publicaciones, lo que carga nuevamente la ventana
        this.router.navigate(['/publicaciones']).then(() => {
          this.newMessage('Publicado correctamente');
        })
      }
    );
  }

  newMessage(messageText: string) {
    this.toastr.success('Clic aquí para actualizar la lista', messageText)
      .onTap
      .pipe(take(1))
      .subscribe(() => window.location.reload());
  }
  
  /**/

  consultarEventosInteres() {
    this.eventoService.getEventosPorIntereses(
      localStorage.getItem('accessToken'),
      localStorage.getItem('id')+''

    ).subscribe(
      (data: {}) => {
        this.eventosList = data;
        console.log(this.eventosList);
      }
    );
  }
}
