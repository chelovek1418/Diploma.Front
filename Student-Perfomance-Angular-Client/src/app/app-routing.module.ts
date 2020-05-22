import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './modules/common/components/dashboard/dashboard.component';
import { StudentMainComponent } from './modules/student/components/student-main/student-main.component';
import { GroupComponent } from './modules/common/components/group/group.component';
import { GroupsComponent } from './modules/common/components/groups/groups.component';
import { StudentStatComponent } from './modules/student/components/student-stat/student-stat.component';
import { LessonComponent } from './modules/common/components/lesson/lesson.component';
import { AddGroupComponent } from './modules/admin/components/add-group/add-group.component';
import { StudentsComponent } from './modules/common/components/students/students.component';
import { LessonsComponent } from './modules/common/components/lessons/lessons.component';
import { LessonInfoComponent } from './modules/common/components/lesson-info/lesson-info.component';
import { AddLessonComponent } from './modules/admin/components/add-lesson/add-lesson.component';
import { JournalComponent } from './modules/teacher/components/journal/journal.component';
import { LoginComponent } from './modules/common/components/login/login.component';
import { GroupGeneralComponent } from './modules/common/components/group-general/group-general.component';
import { RegisterComponent } from './modules/common/components/register/register.component';
import { TeacherGeneralComponent } from './modules/common/components/teacher-general/teacher-general.component';
import { TeachersComponent } from './modules/common/components/teachers/teachers.component';
import { TeachersUnconfirmedComponent } from './modules/admin/components/teachers-unconfirmed/teachers-unconfirmed.component';
import { StudentsListComponent } from './modules/common/components/students-list/students-list.component';
import { TeacherInfoComponent } from './modules/teacher/components/teacher-info/teacher-info.component';

const studentChild: Routes = [
  { path: '', component: StudentsListComponent },
  { path: 'stat', component: StudentStatComponent },
  { path: ':id', component: StudentMainComponent},
];

const groupChild: Routes = [
  { path: '', component: GroupsComponent },
  { path: 'add', component: AddGroupComponent},
  { path: ':id', component: GroupComponent},
];

const lessonChild: Routes = [
  { path: '', component: LessonsComponent },
  { path: 'add-lesson', component: AddLessonComponent},
  { path: ':id', component: LessonInfoComponent},
];

const teacherChild: Routes = [
  { path: '', component: TeachersComponent },
  { path: 'unconfirmed', component: TeachersUnconfirmedComponent },
  { path: ':id', component: TeacherInfoComponent },
];

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'marks', component: JournalComponent },
  { path: 'lessons', component: LessonComponent, children : lessonChild },
  { path: 'groups', component: GroupGeneralComponent, children : groupChild },
  { path: 'students', component: StudentsComponent, children: studentChild },
  { path: 'teachers', component: TeacherGeneralComponent, children: teacherChild },
  { path: 'dashboard', component: DashboardComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }