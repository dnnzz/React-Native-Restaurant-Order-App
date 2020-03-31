import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { Observable , throwError} from 'rxjs';
import { retry, catchError,map} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ItemService {
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:3000/items'
    })
    
  }

  // Menudeki urunun idsini alma
  get(_id) {
    return this.http.get(`${"http://localhost:3000/items"}/${_id}`);
  }
  // Menu icerigini cagirma
  getItems(){
    return this.http.get('http://localhost:3000/items')
  }

  // Menu icerigi olusturma
  create(data) {
    return this.http.post('http://localhost:3000/items', data);
  }
  // Menu icerigi silme
  delete(_id) {
    return this.http.delete(`${'http://localhost:3000/items'}/${_id}`);
  }
  // Icerik guncelleme

  update(id, data): Observable<any> {
    let url = `http://localhost:3000/items/${id}`;
    return this.http.put(url, data, { headers: this.headers }).pipe(
      catchError(this.errorMgmt)
    )
  }

  // Error 
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      
      errorMessage = error.error.message;
    } else {
      
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
  
}
