import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotAuthorizedGuard } from './auth/guards/not-authorized.guard';
import { LoginFormComponent, RegistrationFormComponent } from './shared/components';
import { AuthorizedGuard } from './auth/guards/authorized.guard';

export const routes: Routes = [
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
  {
    path: 'courses',
    loadChildren: () =>
    import('./features/courses/courses.module').then(m => m.CourseModule),
    canLoad: [AuthorizedGuard]
  },
  { path: '', redirectTo: '/courses', pathMatch: 'full' },
  { path: '**', redirectTo: '/courses' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
