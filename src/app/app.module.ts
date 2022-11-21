import { TarjetaCultivoComponent } from './shared/tarjeta-cultivo/tarjeta-cultivo.component';
import { AvatarComponent } from './shared/avatar/avatar.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { HomeComponent } from './pages/home/home.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { FormulariocultivoComponent } from './shared/formulariocultivo/formulariocultivo.component';
import { CultivoDetalleComponent } from './pages/cultivo-detalle/cultivo-detalle.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    LoginComponent,
    PerfilComponent,
    AvatarComponent,
    FormulariocultivoComponent,
    TarjetaCultivoComponent,
    CultivoDetalleComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 2500,
      progressBar: true,

    })
  ], 
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
