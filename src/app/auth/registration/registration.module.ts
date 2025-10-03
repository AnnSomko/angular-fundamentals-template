import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationPageComponent } from './registration-page.component';

const routes: Routes = [
  { path: '', component: RegistrationPageComponent }
];

@NgModule({
  declarations: [RegistrationPageComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class RegistrationModule { }
