import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  constructor(@Inject(DOCUMENT) private document: Document,
    private authenticationService: AuthenticationService,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.document.body.classList.add('bg-gradient-primary');
  }

  onReturn(): void {
    this.router.navigateByUrl('/login');
  }

  onRegister(form: any): void {
    this.authenticationService.register(form.value).subscribe(
      (res) => {
        localStorage.setItem('accessToken', JSON.parse(JSON.stringify(res)).accessToken);
        this.router.navigateByUrl('/login');
        this.toastr.success('A', 'Registro Exitoso')
      }
    );
  }
}
