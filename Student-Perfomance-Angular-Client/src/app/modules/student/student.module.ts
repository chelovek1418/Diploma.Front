import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StudentMainComponent } from './components/student-main/student-main.component';
import { StudentStatComponent } from './components/student-stat/student-stat.component';
import { StudentSettingsComponent } from './components/student-settings/student-settings.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { StatByLessonComponent } from './components/stat-by-lesson/stat-by-lesson.component';
import { StudentCardComponent } from './components/student-card/student-card.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { ReadonlyJournalComponent } from './components/readonly-journal/readonly-journal.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatExpansionModule } from '@angular/material/expansion';



@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        ReactiveFormsModule,
        MatCardModule,
        MatButtonModule,
        MatTabsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatTableModule,
        MatSortModule,
        MatDatepickerModule,
        MatMomentDateModule,
        MatExpansionModule,
    ],
    declarations: [StudentMainComponent, StudentStatComponent, StudentSettingsComponent, StatByLessonComponent, StudentCardComponent, ReadonlyJournalComponent],
    exports: [StudentMainComponent, StatByLessonComponent, StudentCardComponent]
})
export class StudentModule { }