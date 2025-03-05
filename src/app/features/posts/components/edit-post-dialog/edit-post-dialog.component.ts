import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogContent,
  MatDialogActions,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-edit-post-dialog',
  imports: [
    CommonModule,
    MatButtonModule,
    MatInputModule,
    MatDialogContent,
    MatDialogActions,
    ReactiveFormsModule,
  ],
  templateUrl: './edit-post-dialog.component.html',
  styleUrl: './edit-post-dialog.component.css',
})
export class EditPostDialogComponent {
  postForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<EditPostDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: FormBuilder
  ) {
    this.postForm = this.fb.group({
      text: [data.post.text, [Validators.required, Validators.maxLength(150)]],
    });
  }

  cancel() {
    this.dialogRef.close();
  }

  save() {
    if (this.postForm.valid) {
      this.dialogRef.close(this.postForm.value); // Return only updated text
    }
  }
}

interface DialogData {
  post: {
    text: string;
  };
}
