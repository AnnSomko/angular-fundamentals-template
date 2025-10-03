import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorizedGuard } from '@app/auth/guards/authorized.guard';
import { CourseFormComponent } from '@app/shared/components';
import { AdminGuard } from '@app/user/guards/admin.guard';
import { CourseInfoComponent } from '../course-info/course-info.component';
import { CoursesComponent } from './courses.component';

const routes: Routes = [
  { path: '', component: CoursesComponent, canActivate: [AuthorizedGuard] }, 
  { path: 'show/:id', component: CourseInfoComponent, canActivate: [AuthorizedGuard] },
  { path: 'add', component: CourseFormComponent, canActivate: [AuthorizedGuard, AdminGuard] },
  { path: 'edit/:id', component: CourseFormComponent, canActivate: [AuthorizedGuard, AdminGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule { }
