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
export class PerfilComponent implements OnInit {

  'isDisabled': boolean;
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
    clave: '',

  }, 
);


  constructor(
    private perfilService: PerfilService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {
    this.perfilForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      correo: [{ value: '', disabled: true }, Validators.required],
      nacionalidad: ['', Validators.required],
      edad: ['', Validators.required],
      telefono: ['', Validators.required],
      intereses: ['', Validators.required],
      seguidores: [{ value: 0, disabled: true }],
      rol: [{ value: 1, disabled: true }],
      clave: ['']
    });
  }

  ngOnInit(): void {
  
    this.getAllPerfil();
  }

  getAllPerfil() {
    this.perfilService.getAllPerfilesData(localStorage.getItem('accessToken')).subscribe(
      (data: any) => {
        this.perfilForm.patchValue(data);
      }
    );
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

  
