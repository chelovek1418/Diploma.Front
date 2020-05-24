import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { GroupMarksComponent } from './components/group-marks/group-marks.component';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { JournalComponent } from './components/journal/journal.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { SetMarkComponent } from './components/set-mark/set-mark.component';
import { CommonModule } from '../common/common.module';
import { StatByLessonGroupComponent } from './components/stat-by-lesson-group/stat-by-lesson-group.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { EditableComponent } from './components/editable/editable.component';
import { EditModeDirective } from './directives/edit-mode.directive';
import { ViewModeDirective } from './directives/view-mode.directive';
import { FocusableDirective } from './directives/focusable.directive';
import { StudentModule } from '../student/student.module';
import { TeacherInfoComponent } from './components/teacher-info/teacher-info.component';
import { MatTabsModule } from '@angular/material/tabs';
import { TeacherScheduleComponent } from './components/teacher-schedule/teacher-schedule.component';
import { TeacherSettingsComponent } from './components/teacher-settings/teacher-settings.component';
import { TeacherLessonsComponent } from './components/teacher-lessons/teacher-lessons.component';


@NgModule({
    imports: [ 
        BrowserModule, 
        FormsModule,
        CommonModule,
        AppRoutingModule,
        ReactiveFormsModule,
        MatTableModule,
        MatPaginatorModule,
        MatFormFieldModule,
        MatSelectModule,
        MatExpansionModule,
        MatInputModule,
        StudentModule,
        MatTabsModule,
    ],
    declarations: [
        GroupMarksComponent, 
        JournalComponent, 
        SetMarkComponent, 
        StatByLessonGroupComponent, 
        EditableComponent,
        ViewModeDirective,
        EditModeDirective,
        FocusableDirective,
        TeacherInfoComponent,
        TeacherScheduleComponent,
        TeacherSettingsComponent,
        TeacherLessonsComponent
    ],
    exports: []
})
export class TeacherModule { }