import { AsyncValidator, AbstractControl, ValidationErrors } from '@angular/forms';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { GroupService } from 'src/app/services/group/group.service';
import { map, catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class GroupTitleValidator implements AsyncValidator {
  constructor(private groupService: GroupService) {}

  validate(ctrl: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this.groupService.isUniqueTitle(ctrl.value as string).pipe(
      map(isUnique => (isUnique ? null : { uniqueTitle: true })),
      catchError(() => of(null))
    );
  }
}