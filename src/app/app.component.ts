import { Component } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AddTransactionFormComponent } from './components/add-transaction-form/add-transaction-form.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'transaction-app';

  constructor(private dialog: MatDialog){}
  openDialog() {
    this.dialog.open(AddTransactionFormComponent, {
      data: {
        
      },
    });
  }
}
