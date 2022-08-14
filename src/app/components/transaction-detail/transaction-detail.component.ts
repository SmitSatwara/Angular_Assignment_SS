import { Component,Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validator, Validators } from '@angular/forms';
import { TransactionService } from 'src/app/sevices/transaction.service';
import { MatDialogRef ,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-transaction-detail',
  templateUrl: './transaction-detail.component.html',
  styleUrls: ['./transaction-detail.component.scss']
})
export class TransactionDetailComponent implements OnInit {

  transactionForm !:FormGroup;
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public editData:any,
    private formBuilder:FormBuilder,
    private transactionService:TransactionService, 
    private dialogRef:MatDialogRef<TransactionDetailComponent>) { }

  ngOnInit(): void {
    this.transactionForm = this.formBuilder.group({
      id:['',Validators.required],
      date : ['',Validators.required],
      comment:['',Validators.required]

    });
    if(this.editData){
      this.transactionForm.controls['id'].setValue(this.editData.id);
      this.transactionForm.controls['date'].setValue( this.editData.date);
      this.transactionForm.controls['comment'].setValue(this.editData.comment);
    }
    

  }
  
  keyPressAlphanumeric(event:any) {

    var inp = String.fromCharCode(event.keyCode);

    if (/[a-zA-Z0-9 ]/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }

  updateTransaction(){
    this.transactionService.putTransaction(this.transactionForm.value,this.editData.id)
    .subscribe({
      next:(res)=>{
        this.transactionForm.reset();
        this.dialogRef.close('update')
      },
      error:()=>{
        console.log('error While Updating');
        this.dialogRef.close('error')

      }
    })
}
}
