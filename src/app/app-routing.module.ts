import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorizedGuard } from './auth/guards/authorized.guard';
import { NotAuthorizedGuard } from './auth/guards/not-authorized.guard';
import { AdminGuard } from './user/guards/admin.guard';

const routes: Routes = [
  {
  path: 'courses',
  canLoad: [AuthorizedGuard],
  canActivate: [AuthorizedGuard],
  loadChildren: () =>
    import('./features/courses/courses.module').then(m => m.CourseModule),
},
  {
    path: 'courses/add',
    canActivate: [AuthorizedGuard, AdminGuard],
    loadChildren: () =>
      import('./features/courses/add-course/add-course.module').then(m => m.AddCourseModule),
  },
  {
    path: 'courses/:id',
    canActivate: [AuthorizedGuard],
    loadChildren: () =>
      import('./features/courses/show-course/show-course.module').then(m => m.ShowCourseModule),
  },
  {
    path: 'courses/edit/:id',
    canActivate: [AuthorizedGuard, AdminGuard],
    loadChildren: () =>
      import('./features/courses/edit-course/edit-course.module').then(m => m.EditCourseModule),
  },
  {
    path: 'login',
    canActivate: [NotAuthorizedGuard],
    loadChildren: () =>
      import('../app/auth/login/login.module').then(m => m.LoginModule),
  },
  {
    path: 'registration',
    canActivate: [NotAuthorizedGuard],
    loadChildren: () =>
      import('../app/auth/registration/registration.module').then(m => m.RegistrationModule),
  },
  { path: '', redirectTo: '/courses', pathMatch: 'full' },
  { path: '**', redirectTo: '/courses' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
