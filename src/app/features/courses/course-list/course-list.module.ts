import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseListComponent } from './course-list.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [CourseListComponent],
  imports: [CommonModule, SharedModule],
  exports: [CourseListComponent]
})
export class CourseListModule {}
