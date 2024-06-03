import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PerfilService } from 'src/app/services/perfil.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'] 
})
export class PerfilComponent implements OnInit {
  perfil: any = {};
  isEditing: boolean = false;

  constructor(
    private perfilService: PerfilService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getPerfil();
  }

  getPerfil() {
    const token = localStorage.getItem('accessToken');
    if (token) {
      const decoded: any = jwt_decode(token);
      const userId = decoded.userId;
      this.perfilService.getPerfilData(userId).subscribe(
        (data: any) => {
          this.perfil = data;
        }
      );
    }
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }

  saveChanges() {
    const token = localStorage.getItem('accessToken');
    if (token) {
      const decoded: any = jwt_decode(token);
      const userId = decoded.userId;
      this.perfilService.updatePerfilData(userId, this.perfil).subscribe(() => {
        this.toastr.success('Perfil actualizado con éxito', 'Éxito');
        this.toggleEdit(); // After submission, go back to view mode
      });
    }
  }
}

function jwt_decode(token: string): any {
  // Implementación de decodificación de JWT
}
