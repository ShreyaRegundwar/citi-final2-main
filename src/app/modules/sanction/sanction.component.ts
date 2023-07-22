/*

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
  tableHeaders: string[] = [];

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
*/


// sanction.component.ts

import { Component, OnInit } from '@angular/core';
import { UploadService } from '../upload.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-sanction',
  templateUrl: './sanction.component.html',
  styleUrls: ['./sanction.component.scss']
})
export class SanctionComponent implements OnInit {
  excelData: any[] = [];
  filteredData: any[] = [];
  searchdata: any[] = [];
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
  tableHeaders: string[] = [];

  datePipe: DatePipe = new DatePipe('en-IN');

  constructor(private uploadService: UploadService) {}

  /*ngOnInit() {
    this.excelData = this.uploadService.getExcelData();

    // Extract the headers from the first data item
    if (this.excelData.length > 0) {
      this.tableHeaders = Object.keys(this.excelData[0]);
    }

    // Convert Excel serial numbers to Date objects
    this.excelData.forEach(data => {
      data.Date = this.excelSerialToDate(data.Date);
    });

    // Initialize filteredData to show all data initially
    this.filteredData = this.excelData;

  }*/

  ngOnInit() {
    this.excelData = this.uploadService.getExcelData();
  
    // Extract the headers from the first data item
    if (this.excelData.length > 0) {
      this.tableHeaders = Object.keys(this.excelData[0]);
    }
  
    // Check if the 'Date' column exists in the fetched data
    const dateColumnExists = this.tableHeaders.includes('Date');
  
    if (dateColumnExists) {
      // Convert Excel serial numbers to Date objects for the 'Date' column
      this.excelData.forEach(data => {
        if (data.Date) {
          data.Date = this.excelSerialToDate(data.Date);
        }
      });
    }
  // Check if the 'Status' column exists in the fetched data
  const statusColumnExists = this.tableHeaders.includes('Status');

  if (statusColumnExists) {
    // Apply specific colors for "PASS" and "FAIL" statuses
    this.excelData.forEach(data => {
      if (data.Status === 'PASS') {
        data.statusClass = 'PASS'; // Add CSS class for "PASS" status
      } else if (data.Status === 'FAIL') {
        data.statusClass = 'FAIL'; // Add CSS class for "FAIL" status
      }
    });
  }
    // Initialize filteredData to show all data initially
    this.filteredData = this.excelData;
  }
  

  applyFilters() {
    // Your existing applyFilters logic remains unchanged
    
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
    // Your existing SearchDate logic remains unchanged
    
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

  excelSerialToDate(serial: number | null): string {
    if (serial === null) {
      return ''; // or you can return another suitable default value
    }
  
    const millisecondsPerDay = 24 * 60 * 60 * 1000;
    const excelEpoch = Date.UTC(1900, 0, 0); // January 1, 1900
    const excelDateMilliseconds = (serial - 1) * millisecondsPerDay;
    const date = new Date(excelEpoch + excelDateMilliseconds);
    return this.datePipe.transform(date, 'dd/MM/yyyy') || ''; // Return formatted date or an empty string if formatting fails
  }
  // Function to apply background color based on 'Status'
  getCellClass(key: string, value: any): string {
    if (key === 'Status') {
      return value === 'PASS' ? 'PASS' : value === 'FAIL' ? 'FAIL' : '';
    }
    return '';
  }
}
