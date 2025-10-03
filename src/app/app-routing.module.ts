import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorizedGuard } from './auth/guards/authorized.guard';
import { NotAuthorizedGuard } from './auth/guards/not-authorized.guard';
import { LoginFormComponent, RegistrationFormComponent } from './shared/components';

const routes: Routes = [
  {
    path: 'courses',
    canLoad: [AuthorizedGuard],
    canActivate: [AuthorizedGuard],
    loadChildren: () =>
      import('./features/courses/courses.module').then(m => m.CourseModule),
  },
  {
    path: 'login',
    component: LoginFormComponent,
    canActivate: [NotAuthorizedGuard],
  },
  {
    path: 'registration',
    component: RegistrationFormComponent,
    canActivate: [NotAuthorizedGuard],

  },
  { path: '', redirectTo: '/courses', pathMatch: 'full' },
  { path: '**', redirectTo: '/courses' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
