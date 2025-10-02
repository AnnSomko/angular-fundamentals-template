import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistrationRoutingModule } from './registration-routing.module';
import { RegistrationPageComponent } from './registration-page';
import { SharedModule } from '@app/shared/shared.module';


@NgModule({
  declarations: [RegistrationPageComponent],
  imports: [
    CommonModule,
    SharedModule,
    RegistrationRoutingModule
  ]
})
export class RegistrationModule { }
