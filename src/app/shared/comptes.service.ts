import { Injectable } from '@angular/core';
import { Compte } from './comptes.model';
import { HttpClient, HttpHeaders } from "@angular/common/http";



@Injectable({
  providedIn: 'root'
})
export class CompteService {

  constructor(private http: HttpClient) { }

  readonly baseURL = 'http://localhost:5000/api/Comptes'
  formData: Compte = new Compte();
  list: Compte[];

  postCompte() {
    return this.http.post(this.baseURL, this.formData);
  }

  putCompte() {
    return this.http.put(`${this.baseURL}/${this.formData.compteId}`, this.formData);
  }

  deleteCompte(id: number) {
    return this.http.delete(`${this.baseURL}/${id}`);
  }

  refreshList() {
    this.http.get(this.baseURL)
      .toPromise()
      .then(res =>this.list = res as Compte[]);
  }


}
