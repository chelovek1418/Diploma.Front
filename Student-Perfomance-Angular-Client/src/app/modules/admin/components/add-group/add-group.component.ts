import { Component, OnDestroy } from '@angular/core';
import { GroupService } from 'src/app/services/group/group.service';
import { GroupTitleValidator } from 'src/app/modules/teacher/group-title-validator/group-title-validator.component';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Group } from 'src/app/modules/common/models/interfaces/group';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.css']
})
export class AddGroupComponent implements OnDestroy {

  public createGroupForm: FormGroup;

  private createGroupSub: Subscription;

  get title() { return this.createGroupForm.get('title'); }

  constructor(private groupService: GroupService,
    private titleValidator : GroupTitleValidator,
    private router : Router,
    private location : Location,
    fb: FormBuilder) {

      this.createGroupForm = fb.group({          
        title : ["" , {
          validators :  [Validators.required, Validators.minLength(2), Validators.maxLength(20)],
          asyncValidators: [this.titleValidator.validate.bind(this.titleValidator)],
          updateOn: 'blur'
         }],
      });
   }

  ngOnDestroy(): void {
    this.createGroupSub?.unsubscribe();
  }

  createGroup(){
    const group = this.createGroupForm.value as Group;
    if (group){
      this.createGroupSub = this.groupService.createGroup(group).subscribe((group : Group) => this.router.navigate(['/groups/', group.id]));
    }
  }
}
