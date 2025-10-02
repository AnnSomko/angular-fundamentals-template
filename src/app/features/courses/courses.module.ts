import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { CoursesComponent } from './courses.component';
import { CourseListModule } from './course-list/course-list.module';
import { CourseInfoModule } from '../course-info/course-info.module';
import { SharedModule } from '@shared/shared.module';

const routes: Routes = [
  { path: '', component: CoursesComponent }, 
  { path: 'show/:id', component: CourseInfoComponent },
  { path: 'add', component: CourseFormComponent },
  { path: 'edit/:id', component: CourseFormComponent }
];



@NgModule({
  declarations: [CoursesComponent],
  imports: [
    CommonModule,
    SharedModule,
    CourseListModule,
    CourseInfoModule,
    RouterModule.forChild(routes)
  ]
})
export class CourseModule {}
