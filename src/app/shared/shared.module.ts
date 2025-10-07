import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ModalComponent } from './components/modal/modal.component';
import {
  HeaderComponent,
  ButtonComponent,
  InfoComponent,
  SearchComponent,
  CourseCardComponent,
  LoginFormComponent,
  RegistrationFormComponent,
  CourseFormComponent
} from "./components";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { DurationPipe } from './pipes/duration.pipe';
import { CustomDatePipe } from './pipes/custom-date.pipe';
import { EmailValidatorDirective } from '@shared/directives/email.directive';
import { RouterModule } from '@angular/router';

const components = [
  HeaderComponent,
  ButtonComponent,
  InfoComponent,
  SearchComponent,
  ModalComponent,
  CourseCardComponent,
  LoginFormComponent,
  RegistrationFormComponent,
  CourseFormComponent,
];

const pipes = [DurationPipe, CustomDatePipe]
const directives = [EmailValidatorDirective]

@NgModule({
  declarations: [...components, ...pipes, ...directives],
  imports: [
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [...components, ...pipes, ...directives]
})
export class SharedModule { }
