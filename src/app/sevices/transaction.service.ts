import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private apiUrl = "http://localhost:3000/transactions/";
  constructor(private http:HttpClient) { }
  

  postTransaction(data:any){
    return this.http.post<any>(this.apiUrl,data);
  }

  getTransaction(){
    return this.http.get<any>(this.apiUrl);
  }

  putTransaction(data:any,id:number){
    return this.http.put<any>(this.apiUrl+id,data)
  }

  deleteTransaction(id:number){
    return this.http.delete<any>(this.apiUrl+id)
  }
}
