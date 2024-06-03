import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './routes/auth-routing.module';
import { AuthLoginComponent } from './auth-login/auth-login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AuthLoginComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class AuthModule {
  static forRoot(): ModuleWithProviders<AuthModule>{
    return{
      ngModule: AuthModule,
      providers:[
        AuthModule
      ]
    }
  }
 }
