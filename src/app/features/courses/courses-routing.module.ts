import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorizedGuard } from '@app/auth/guards/authorized.guard';
import { CourseFormComponent } from '@app/shared/components';
import { AdminGuard } from '@app/user/guards/admin.guard';
import { CourseInfoComponent } from '../course-info/course-info.component';
import { CoursesComponent } from './courses.component';

const routes: Routes = [
  { path: '', component: CoursesComponent },
  { path: 'add', canActivate: [AdminGuard], component: CourseFormComponent },
  { path: 'edit/:id', canActivate: [AdminGuard], component: CourseFormComponent },
  { path: 'show/:id', component: CourseInfoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule { }
