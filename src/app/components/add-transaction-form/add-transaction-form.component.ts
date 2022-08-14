import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validator, Validators } from '@angular/forms';
import { TransactionService } from 'src/app/sevices/transaction.service';
import { MatDialogRef ,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-add-transaction-form',
  templateUrl: './add-transaction-form.component.html',
  styleUrls: ['./add-transaction-form.component.scss']
})
export class AddTransactionFormComponent implements OnInit {

  transactionForm !:FormGroup;
  
  constructor(
    
    private formBuilder:FormBuilder,
    private transactionService:TransactionService, 
    private dialogRef:MatDialogRef<AddTransactionFormComponent>) { }

  ngOnInit(): void {
    this.transactionForm = this.formBuilder.group({
      date : ['',Validators.required],
      comment:['',Validators.required]

    });
  }
 
  addTransaction(){
    
      if(this.transactionForm.valid){
        this.transactionForm.controls['date'].setValue( new DatePipe('en-GB').transform( this.transactionForm.controls['date'].value,'dd/MM/yyyy'));
        console.log(this.transactionForm.value);
        this.transactionService.postTransaction(this.transactionForm.value)
        .subscribe({
          next: (res)=>{
           
            this.transactionForm.reset();
            this.dialogRef.close('save');
            window.location.reload();
            
          },
          error:(res)=>{
            console.log("Error While Adding" )
          }
  
        })
      }
      console.log(this.transactionForm.value);
    
  }
  
  

}
