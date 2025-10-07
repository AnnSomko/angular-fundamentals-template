import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorizedGuard } from './auth/guards/authorized.guard';
import { NotAuthorizedGuard } from './auth/guards/not-authorized.guard';
import { LoginFormComponent, RegistrationFormComponent } from './shared/components';

const routes: Routes = [
  {
    path: 'courses',
    canLoad: [AuthorizedGuard],
    loadChildren: () =>
      import('./features/courses/courses.module').then(m => m.CourseModule),
  },
  {
    path: 'login',
    canActivate: [NotAuthorizedGuard],
    component: LoginFormComponent
  },
  {
    path: 'registration',
    canActivate: [NotAuthorizedGuard],
    component: RegistrationFormComponent
  },
  { path: '', redirectTo: '/courses', pathMatch: 'full' },
  { path: '**', redirectTo: '/courses' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
