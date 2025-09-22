import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from '@shared/shared.module';
import { AppComponent } from '@app/app.component';
import { CourseInfoComponent } from '@app/features/course-info/course-info.component';
import { NotAuthorizedGuard } from '@app/auth/guards/not-authorized.guard';
import { AuthorizedGuard } from '@app/auth/guards/authorized.guard';
import { CoursesStoreService } from '@app/services/courses-store.service';
import { CoursesService } from '@app/services/courses.service';
import { CourseListModule } from './features/courses/course-list/course-list.module';
import { FormsModule } from '@angular/forms';
import { CoursesComponent } from './features/courses/courses.component';

@NgModule({
  declarations: [AppComponent, CourseInfoComponent, CoursesComponent],
  imports: [
    BrowserModule,
    FormsModule,
    SharedModule,
    FontAwesomeModule,
    CourseListModule,
  ],
  providers: [AuthorizedGuard, NotAuthorizedGuard, CoursesService, CoursesStoreService],
  bootstrap: [AppComponent],
})
export class AppModule {}
