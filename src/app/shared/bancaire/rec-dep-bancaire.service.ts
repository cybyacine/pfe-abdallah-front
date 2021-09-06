import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DepRecBan } from './dep-rec-banc.model';

@Injectable({
  providedIn: 'root'
})
export class RecDepBancaireService {

  constructor(
    private http: HttpClient
  ) { }

  // Dep bancaire var
  readonly baseDepBancURL = 'http://localhost:5000/api/DepBancaires';
  depBanc: DepRecBan = new DepRecBan();
  listDepBanc: DepRecBan[];

  // Rep bancaire var
  readonly baseRecBancURL = 'http://localhost:5000/api/RecBancaires';
  recBanc: DepRecBan = new DepRecBan();
  listRecBanc: DepRecBan[];

  // crud dep bancaire
  postDepBan() {
    return this.http.post(this.baseDepBancURL, this.depBanc);
  }

  putDepBan() {
    return this.http.put(`${this.baseDepBancURL}/${this.depBanc.depBanId}`, this.depBanc);
  }

  deleteDepBan(id: number) {
    return this.http.delete(`${this.baseDepBancURL}/${id}`);
  }

  refreshListDepBan() {
    this.http.get(this.baseDepBancURL)
      .toPromise()
      .then(res =>this.listDepBanc = res as DepRecBan[]);
  }

  // crud Rec bancaire

  postRecBan() {
    console.log(this.recBanc);
    return this.http.post(this.baseRecBancURL, this.recBanc);
  }

  putRecBan() {
    return this.http.put(`${this.baseRecBancURL}/${this.recBanc.depBanId}`, this.recBanc);
  }

  deleteRecBan(id: number) {
    return this.http.delete(`${this.baseRecBancURL}/${id}`);
  }

  refreshListRecBan() {
    this.http.get(this.baseRecBancURL)
      .toPromise()
      .then(res =>this.listRecBanc = res as DepRecBan[]);
  }

  
}
