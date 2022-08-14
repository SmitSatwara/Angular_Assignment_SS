import { AfterViewInit,Component, Inject, OnInit,ViewChild } from '@angular/core';
import { TRANSACTION } from 'src/app/mock-transaction';
import { TransactionService } from 'src/app/sevices/transaction.service';
import { Transaction } from 'src/app/Transaction';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';

import {MatTableDataSource} from '@angular/material/table';
import { TransactionDetailComponent } from '../transaction-detail/transaction-detail.component';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss']
})
export class TransactionListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'date', 'comment', 'action'];
  // dataSource = TRANSACTION;
  
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  constructor(
    
    private dialog: MatDialog,
    private transactionService:TransactionService) { }

  ngOnInit(): void {
    this.getAllTransactions();
  }

  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editTransaction(row:any){
    this.dialog.open(TransactionDetailComponent, {
      data:row
    }).afterClosed()
    .subscribe(
      val=>{
        if(val==='update'){
          this.getAllTransactions();
        }
      }
    );
  }

  getAllTransactions(){
    this.transactionService.getTransaction()
    .subscribe({
      next:(res)=>{
        this.dataSource = new MatTableDataSource(res)
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error:()=>{
        console.log('Error While Fetching Transactions');
      }
    })
  }
  
}
