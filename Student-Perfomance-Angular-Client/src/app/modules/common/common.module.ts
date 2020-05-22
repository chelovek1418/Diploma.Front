import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { GroupComponent } from './components/group/group.component';
import { GroupsComponent } from './components/groups/groups.component';
import { LessonComponent } from './components/lesson/lesson.component';
import { StudentsComponent } from './components/students/students.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LessonsComponent } from './components/lessons/lessons.component';
import { LessonInfoComponent } from './components/lesson-info/lesson-info.component';
import { AdminModule } from '../admin/admin.module';
import { LessonTeachersComponent } from './components/lesson-teachers/lesson-teachers.component';
import { LessonGroupsComponent } from './components/lesson-groups/lesson-groups.component';
import { LoginComponent } from './components/login/login.component';
import { LoginHeaderComponent } from './components/login-header/login-header.component';
import { GeneralNavigationComponent } from './components/general-navigation/general-navigation.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { StudentModule } from '../student/student.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SearchComponent } from './components/search/search.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { CommonDialogComponent } from './components/common-dialog/common-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatPaginatorModule } from '@angular/material/paginator';
import { GroupGeneralComponent } from './components/group-general/group-general.component';
import { GroupStudentsComponent } from './components/group-students/group-students.component';
import { GroupLessonsComponent } from './components/group-lessons/group-lessons.component';
import { LessonStatComponent } from './components/lesson-stat/lesson-stat.component';
import { TeacherGeneralComponent } from './components/teacher-general/teacher-general.component';
import { RegisterComponent } from './components/register/register.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { TeachersComponent } from './components/teachers/teachers.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { StudentsListComponent } from './components/students-list/students-list.component';
import { TeacherCardComponent } from './components/teacher-card/teacher-card.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { MatTableModule } from '@angular/material/table';
import { DetailInfoComponent } from './components/detail-info/detail-info.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { GroupCardComponent } from './components/group-card/group-card.component';



@NgModule({
    imports: [ 
        BrowserModule, 
        FormsModule,
        AppRoutingModule,
        ReactiveFormsModule,
        AdminModule,
        MatToolbarModule,
        StudentModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatTabsModule,
        MatDialogModule,
        MatButtonModule,
        MatListModule,
        MatDividerModule,
        MatAutocompleteModule,
        MatPaginatorModule,
        MatStepperModule,
        MatCardModule,
        MatSelectModule,
        MatSidenavModule,
        MatTableModule,
        MatExpansionModule,
    ],
    declarations: [
        GroupComponent,
        GroupsComponent,
        LessonComponent,
        StudentsComponent,
        DashboardComponent,
        LessonsComponent,
        LessonInfoComponent,
        LessonTeachersComponent,
        LessonGroupsComponent,
        LoginComponent,
        LoginHeaderComponent,
        GeneralNavigationComponent,
        SearchComponent,
        CommonDialogComponent,
        GroupGeneralComponent,
        GroupStudentsComponent,
        GroupLessonsComponent,
        LessonStatComponent,
        TeacherGeneralComponent,
        RegisterComponent,
        TeachersComponent,
        StudentsListComponent,
        TeacherCardComponent,
        ScheduleComponent,
        DetailInfoComponent,
        GroupCardComponent
     ],
    exports: [ 
        CommonDialogComponent, 
        SearchComponent, 
        LoginHeaderComponent, 
        GeneralNavigationComponent,
        ScheduleComponent,
    ]
})
export class CommonModule { }