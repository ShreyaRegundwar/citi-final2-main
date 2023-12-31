import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { UploadService } from '../upload.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as XLSX from 'xlsx';
import { MatDialog } from '@angular/material/dialog';
import { InvalidFileTypeComponent } from '../invalid-file-type/invalid-file-type.component';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent {
  excelData: any[] = [];
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  fileForm: FormGroup;
  invalidFileType: boolean = false;
  selectedFileName: string | null = null;
  errorMessage: string = '';

  constructor(private router: Router, private uploadService: UploadService ,  private dialog: MatDialog ) {
    this.fileForm = new FormGroup({
      file: new FormControl('', Validators.required),
    });
  }


  onFileSelected(event: any) {
    const file = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      const data = new Uint8Array(fileReader.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetNames = workbook.SheetNames;
      this.excelData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetNames[0]]);
      console.log(this.excelData);
    };
    fileReader.readAsArrayBuffer(file);

    const inputElement = event.target as HTMLInputElement;
    const files = inputElement.files;
    if (files && files.length > 0) {
      const file = files[0];
  
      if (file && file.type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
        // Invalid file type, clear the selected file and show the error message
        this.clearFileSelection(inputElement);
  
        // Open the dialog with the error message
        const dialogRef = this.dialog.open(InvalidFileTypeComponent, {
          width: '250px',
          data: 'Invalid file type! Please choose an xlsx file.',
        });
      } else {
        this.invalidFileType = false;
        this.selectedFileName = file.name;
      }
    }
  }

  

  clearFileSelection(fileInput: any) {
    this.fileForm.patchValue({ file: null });
    this.selectedFileName = null;
    this.invalidFileType = false;
    this.excelData = []; // Clear excel data
    console.clear(); // Clear the console
    fileInput.value = ''; // Clear the file input value
  }

  uploadFile() {
    if (this.excelData && this.excelData.length > 0) {
      this.uploadService.setExcelData(this.excelData);

      // Navigate to the screening page
      this.router.navigate(['/Sanction']);
    } else if (!this.excelData || this.excelData.length === 0) {
      const dialogRef = this.dialog.open(InvalidFileTypeComponent, {
        width: '250px',
        data: 'Please choose an xlsx file.',
      })
    } 
  }
}
