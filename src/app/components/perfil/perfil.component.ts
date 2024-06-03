import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { PerfilService } from 'src/app/services/perfil.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'] 
})
export class PerfilComponent {

  perfilForm: any = this.formBuilder.group({
    nombre: '',
    apellido: '',
    correo: '',
    nacionalidad:'',
    edad:'',
    telefono:'',
    intereses:'',
    seguidores: '',
    rol: '',
    clave: ''
  });


  constructor(
    private perfilService: PerfilService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {
    
  }

  ngOnInit(): void {
    this.getPerfilUsuario();
  }

  getPerfilUsuario() {

    const idConsultado = localStorage.getItem('id');
    if (idConsultado) {
      this.perfilService.getPerfil(idConsultado).subscribe(
        (data: any) => {
          this.perfilForm.patchValue(data);
        }
      );
    } else {
      // Manejo de caso en que idConsultado es nulo
      console.log('El ID es nulo.');
    } 
  }

  onSubmit() {
    if (this.perfilForm.valid) {
      const token = localStorage.getItem('accessToken');
      if (token) {
        const decoded: any = jwt_decode(token);
        const userId = decoded.userId;
        
        this.perfilService.updatePerfilData(userId, this.perfilForm.value).subscribe(() => {
          this.toastr.success('Perfil actualizado con éxito', 'Éxito');
        });
      }
    }

  }
 
}
  function jwt_decode(token: string): any {
    throw new Error('Function not implemented.');
  }

  
