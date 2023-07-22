import { Component } from '@angular/core';
import { UploadService } from '../upload.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-sanction',
  templateUrl: './sanction.component.html',
  styleUrls: ['./sanction.component.scss']
})
export class SanctionComponent {
  excelData: any[];
  filteredData: any[];
  searchdata: any[]=[];
  selectedFilter: string = '';
  displayedColumns: string[] = [
    'TransactionID',
    'Date',
    'PayerName',
    'PayerAccount',
    'PayeeName',
    'PayeeAccount',
    'Amount',
    'Status'
  ];
 

  datePipe: DatePipe = new DatePipe('en-IN');

  constructor(private uploadService: UploadService) {
    this.excelData = this.uploadService.getExcelData();
    this.excelData.forEach(data => {
      data.Date = this.excelSerialToDate(data.Date); // Convert Excel serial number to Date
    });
    this.filteredData = this.excelData;
  }

  applyFilters() {
    console.log('Selected Filter:', this.selectedFilter);
    if (this.selectedFilter === '') {
      this.filteredData = this.excelData; // No filter selected, show all the table data
    } else {
      this.filteredData = this.excelData.filter((data) => {
        if (typeof data.Status === 'string') {
          return data.Status === this.selectedFilter;
        } else {
          // Handle cases where data.Status is not a string or is undefined
          return false;
        }
      });
    }
  }

  SearchDate(event: KeyboardEvent) {
    let searchTerm = (event.target as HTMLInputElement).value;

    if (!searchTerm) {
      this.searchdata = this.excelData; // No filter selected, show all the table data
    } else {
      this.searchdata = this.excelData.filter((data) => {
        if (data.Date instanceof Date) {
          // Format the input date string in the format "DD-MM-YYYY"
          const inputDateParts = searchTerm.split('-');
          if (inputDateParts.length === 3) {
            const inputDay = parseInt(inputDateParts[0], 10);
            const inputMonth = parseInt(inputDateParts[1], 10) - 1; // Months in JavaScript Date are zero-indexed (0 - 11)
            const inputYear = parseInt(inputDateParts[2], 10);

            // Compare the date components (day, month, and year)
            return (
              data.Date.getDate() === inputDay &&
              data.Date.getMonth() === inputMonth &&
              data.Date.getFullYear() === inputYear
            );
          } else {
            // Invalid date format, return false
            return false;
          }
        } else {
          // Handle cases where data.Date is not a Date object or is undefined
          return false;
        }
      });
    }
  }
  
  
  
 
  excelSerialToDate(serial: number): Date {
    const millisecondsPerDay = 24 * 60 * 60 * 1000;
    const excelEpoch = Date.UTC(1900, 0, 0); // January 1, 1900
    const excelDateMilliseconds = (serial - 1) * millisecondsPerDay;
    return new Date(excelEpoch + excelDateMilliseconds);
  }

  
}
