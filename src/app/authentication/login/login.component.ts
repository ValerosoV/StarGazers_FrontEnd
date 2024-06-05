import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(@Inject(DOCUMENT) private document: Document,
    private authenticationService: AuthenticationService,
    private router: Router) { }

  ngOnInit(): void {
    this.document.body.classList.add('bg-gradient-primary');
  }

  onLogin(form: any): void {
    //console.log(form);
    this.authenticationService.login(form.value).subscribe(
      (res) => {
        localStorage.setItem('accessToken',JSON.parse(JSON.stringify(res)).accessToken);
        localStorage.setItem('nombre',JSON.parse(JSON.stringify(res)).nombre);
        localStorage.setItem('apellido',JSON.parse(JSON.stringify(res)).apellido);
        localStorage.setItem('rol',JSON.parse(JSON.stringify(res)).rol);
        localStorage.setItem('id',JSON.parse(JSON.stringify(res)).id);
        this.router.navigateByUrl('/publicaciones');
      }
    );
  }
}
