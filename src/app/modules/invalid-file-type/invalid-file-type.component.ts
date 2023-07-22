/*
import { Component } from '@angular/core';

@Component({
  selector: 'app-invalid-file-type',
  templateUrl: './invalid-file-type.component.html',
  styleUrls: ['./invalid-file-type.component.scss']
})
export class InvalidFileTypeComponent {

}
*/
/*
import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-invalid-file-type-dialog',
  template: `
    <h2 mat-dialog-title>Error</h2>
    <mat-dialog-content>
      {{ errorMessage }}
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button (click)="close()">Close</button>
    </mat-dialog-actions>
  `,
  styleUrls: ['./invalid-file-type.component.scss'],
  encapsulation: ViewEncapsulation.None
  
})
export class InvalidFileTypeComponent {
  constructor(
    public dialogRef: MatDialogRef<InvalidFileTypeComponent>,
    @Inject(MAT_DIALOG_DATA) public errorMessage: string
  ) {}

  close(): void {
    this.dialogRef.close();
  }
}
*/

import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-invalid-file-type-dialog',
  templateUrl: './invalid-file-type.component.html',
 styleUrls: ['./invalid-file-type.component.scss'],
  encapsulation: ViewEncapsulation.None
  
})
export class InvalidFileTypeComponent {
  constructor(
    public dialogRef: MatDialogRef<InvalidFileTypeComponent>,
    @Inject(MAT_DIALOG_DATA) public errorMessage: string
  ) {}

  close(): void {
    this.dialogRef.close();
  }
}