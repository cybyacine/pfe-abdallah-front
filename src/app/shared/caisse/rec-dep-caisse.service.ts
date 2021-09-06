import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DepRecCaisse } from '../caisse/dep-rec-caisse.model';

@Injectable({
  providedIn: 'root'
})
export class RecDepCaisseService {

  constructor(
    private http: HttpClient
  ) { }

  // Dep Caisse var
  readonly baseDepCaisseURL = 'http://localhost:5000/api/DepCaisses';
  depCaisse: DepRecCaisse = new DepRecCaisse();
  listDepCaisse: DepRecCaisse[];

  // Rec Caisse var
  readonly baseRecCaisseURL = 'http://localhost:5000/api/RecCaisses';
  recCaisse: DepRecCaisse = new DepRecCaisse();
  listRecCaisse: DepRecCaisse[];

  // crud dep Caisse
  postDepCaisse() {
    console.log(this.depCaisse);
    return this.http.post(this.baseDepCaisseURL, this.depCaisse);
  }

  putDepCaisse() {
    return this.http.put(`${this.baseDepCaisseURL}/${this.depCaisse.depCaiId}`, this.depCaisse);
  }

  deleteDepCaisse(id: number) {
    return this.http.delete(`${this.baseDepCaisseURL}/${id}`);
  }

  refreshListDepCaisse() {
    this.http.get(this.baseDepCaisseURL)
      .toPromise()
      .then(res =>this.listDepCaisse = res as DepRecCaisse[]);
  }

  // crud Rec Caisse

  postRecCaisse() {
    console.log(this.recCaisse);
    return this.http.post(this.baseRecCaisseURL, this.recCaisse);
  }

  putRecCaisse() {
    return this.http.put(`${this.baseRecCaisseURL}/${this.recCaisse.depCaiId}`, this.recCaisse);
  }

  deleteRecCaisse(id: number) {
    return this.http.delete(`${this.baseRecCaisseURL}/${id}`);
  }

  refreshListRecCaisse() {
    this.http.get(this.baseRecCaisseURL)
      .toPromise()
      .then(res =>this.listRecCaisse = res as DepRecCaisse[]);
  }

}
