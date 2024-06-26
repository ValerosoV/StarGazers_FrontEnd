// perfil.component.ts
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PerfilService } from 'src/app/services/perfil.service';
import { Router } from '@angular/router';
import { take } from 'rxjs';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  perfilForm: FormGroup;
  perfilData: any;
  isEditing = false;
  @ViewChild('fileInput') fileInput: ElementRef | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private perfilService: PerfilService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.perfilForm = this.formBuilder.group({
      nombre: '',
      apellido: '',
      nacionalidad: '',
      telefono: '',
      intereses: ''
    });

  }

  ngOnInit(): void {
    this.getPerfilUsuario();
  }

  getPerfilUsuario() {
    const idConsultado = localStorage.getItem('id');
    if (idConsultado) {
      this.perfilService.getPerfil(idConsultado).subscribe(
        (data: any) => {
          this.perfilData = data;
          this.perfilForm.patchValue({
            nombre: data.nombre,
            apellido: data.apellido,
            nacionalidad: data.nacionalidad,
            telefono: data.telefono,
            intereses: data.intereses
          });
        }
      );
    } else {
      console.log('El ID es nulo.');// aviso en caso en que el idConsultado es nulo
    }
  }

  editPerfil() {
    if (this.perfilForm.valid) {
      const token = localStorage.getItem('accessToken');
      if (token) {
        const idConsultado = localStorage.getItem('id');
        if (idConsultado) {
          this.perfilService.updatePerfil(idConsultado, token, this.perfilForm.value).subscribe(() => {
            this.toastr.success('Perfil actualizado con éxito', 'Éxito');
            this.isEditing = false;
            this.getPerfilUsuario();
            //
            console.log(this.perfilForm.controls['nombre'].value);
            localStorage.setItem('nombre', this.perfilForm.controls['nombre'].value);
            localStorage.setItem('apellido', this.perfilForm.controls['apellido'].value);
            this.router.navigate(['/menu']).then(() => {
              this.router.navigate(['/perfil']).then(() => {//recarga el componente, pero no los otros componentes
                this.newMessage('Perfil Actualizado correctamente');
              })

            });
          });
        } else { console.log('El formulario del perfil no es valido'); }
      }
    }
  }
  newMessage(messageText: string) {
    this.toastr.success('Clic aquí para actualizar la lista', messageText)
      .onTap
      .pipe(take(1))
      .subscribe(() => window.location.reload());
  }

  enableEditing() {
    this.isEditing = true;
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      // Crear un objeto FormData para enviar la imagen al servidor
      const formData = new FormData();
      formData.append('foto', file, file.name);

      // Obtener el token JWT del localStorage
      const token = localStorage.getItem('accessToken');
      if (token) {
        const decodedToken: any = jwt_decode(token);
        const userId = decodedToken.userId;

        // Llamar al método del servicio para subir la imagen al servidor
        this.perfilService.subirFotoPerfil(userId, formData).subscribe(
          (response: any) => {
            // Actualizar la URL de la foto de perfil en el objeto perfilData
            this.perfilData.fotoUrl = response.fotoUrl;
            this.toastr.success('Foto de perfil actualizada con éxito', 'Éxito');
          },
          (error) => {
            console.error('Error al subir la foto de perfil:', error);
            this.toastr.error('Error al subir la foto de perfil', 'Error');
          }
        );
      } else {
        console.log('No se encontró el token en el localStorage');
      }
    }
  }

}
function jwt_decode(token: string): any {
  throw new Error('Function not implemented.');
}

