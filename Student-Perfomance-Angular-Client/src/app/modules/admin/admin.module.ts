import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AddGroupComponent } from './components/add-group/add-group.component';
import { AddLessonComponent } from './components/add-lesson/add-lesson.component';
import { LessonSettingsComponent } from './components/lesson-settings/lesson-settings.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { GroupSettingsComponent } from './components/group-settings/group-settings.component';
import { TeachersUnconfirmedComponent } from './components/teachers-unconfirmed/teachers-unconfirmed.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';
import { LessonTeachersComponent } from './components/lesson-teachers/lesson-teachers.component';

@NgModule({
    imports: [ 
        BrowserModule, 
        FormsModule,
        AppRoutingModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatDialogModule,
        MatListModule,
        MatDividerModule,
        MatPaginatorModule,
        MatExpansionModule,
        MatSelectModule,
    ],
    declarations: [ AddGroupComponent,
        AddLessonComponent,
        LessonSettingsComponent,
        GroupSettingsComponent,
        TeachersUnconfirmedComponent,
        LessonTeachersComponent,
    ],
    exports: [ LessonSettingsComponent, GroupSettingsComponent, LessonTeachersComponent ]
})
export class AdminModule { }