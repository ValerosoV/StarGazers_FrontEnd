import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnimalComponent } from './components/animal/animal.component';
import { SignupComponent } from './authentication/signup/signup.component';
import { LoginComponent } from './authentication/login/login.component';
import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu/menu.component';
import { PublicacionComponent } from './components/publicacion/publicacion.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { EventosComponent } from './components/eventos/eventos.component';
import { ContenidosComponent } from './components/contenidos/contenidos.component';


const routes: Routes = [
  {path: '',component: PublicacionComponent},
  {path: 'animal',component: AnimalComponent},
  {path: 'signup',component: SignupComponent},
  {path: 'login',component: LoginComponent},
  {path: 'logout',component: AppComponent},
  {path: 'menu',component: MenuComponent},
  {path: 'publicaciones',component: PublicacionComponent},
  {path: 'perfil',component: PerfilComponent},
  {path: 'eventos',component: EventosComponent},
  {path: 'contenidos',component: ContenidosComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
