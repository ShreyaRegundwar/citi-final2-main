/*
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  uploadedFile: any;

  setUploadedFile(file: any): void {
    this.uploadedFile = file;
  }

  getUploadedFile(): any {
    return this.uploadedFile;
  }
}
*/

/*
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  uploadedFile: any;

  setUploadedFile(file: any): void {
    this.uploadedFile = file;
  }

  getUploadedFile(): any {
    return this.uploadedFile;
  }

  getFileContents(file: File): Observable<any[]> {
    return new Observable((observer) => {
      const reader = new FileReader();
      reader.onload = (event: ProgressEvent<FileReader>) => {
        const target = event.target;
        if (target && target.result && target instanceof FileReader) {
          const data = new Uint8Array(target.result as ArrayBuffer);
          const workbook = XLSX.read(data, { type: 'array' });
          const worksheet = workbook.Sheets[workbook.SheetNames[0]];
          const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
          observer.next(jsonData);
          observer.complete();
        } else {
          observer.error('Error reading file: FileReader target is null or invalid');
        }
      };
      reader.onerror = (event) => {
        const target = event.target;
        if (target && target.error) {
          observer.error(target.error);
        } else {
          observer.error('Unknown error occurred while reading file');
        }
      };
      reader.readAsArrayBuffer(file);
    });
  }
}
*/

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  private excelData: any[] =[];

  setExcelData(data: any[]): void {
    this.excelData = data;
  }

  getExcelData(): any[] {
    return this.excelData;
  }
}
