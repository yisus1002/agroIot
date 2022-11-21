import { LoginComponent } from './pages/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { AuthGuard } from './guards/auth.guard';
import { CultivoDetalleComponent } from './pages/cultivo-detalle/cultivo-detalle.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent, canActivate:[AuthGuard] },
  {path: 'login', component: LoginComponent},
  {path: 'perfil', component: PerfilComponent, canActivate:[AuthGuard] },
  {path: 'cultivo-detalle/:id', component: CultivoDetalleComponent, canActivate:[AuthGuard] },
  {path: "", redirectTo: "home", pathMatch: "full",},
  {path: '**', redirectTo: "home", pathMatch: "full",},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
