import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseFormComponent } from '@app/shared/components';
import { AdminGuard } from '@app/user/guards/admin.guard';
import { CourseInfoComponent } from '../course-info/course-info.component';
import { CoursesComponent } from './courses.component';
import { AuthorizedGuard } from '@app/auth/guards/authorized.guard';

const routes: Routes = [
  { path: '', component: CoursesComponent, canActivate: [AuthorizedGuard] },
  { path: 'courses/add', component: CourseFormComponent, canActivate: [AuthorizedGuard, AdminGuard] },
  { path: 'courses/edit/:id', component: CourseFormComponent, canActivate: [AdminGuard, AuthorizedGuard] },
  { path: 'courses/:id', component: CourseInfoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule { }
