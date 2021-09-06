import { Component, OnInit } from '@angular/core';
import { RecDepBancaireService } from '../shared/bancaire/rec-dep-bancaire.service';
import { RecDepCaisseService } from '../shared/caisse/rec-dep-caisse.service';
import { Reglement } from '../shared/reglement.model';
import { PaymentDetailService } from '../shared/payment-detail.service';
import { CompteService } from '../shared/comptes.service';
declare var $: any;

@Component({
  selector: 'app-depences',
  templateUrl: './depences.component.html',
  styleUrls: ['./depences.component.css']
})
export class DepencesComponent implements OnInit {

  depences: Reglement[];
  filteredDepenses: Reglement[];
  total: number = 0;

  constructor(private compteService: CompteService, private paymentDetailService: PaymentDetailService, private recDepBancaire: RecDepBancaireService, private recDepCaisse: RecDepCaisseService) { }

  ngOnInit() {
    this.compteService.refreshList();
    this.paymentDetailService.refreshList();
    this.recDepBancaire.refreshListDepBan();
    this.recDepCaisse.refreshListDepCaisse();
    setTimeout(() => {
      this.depences = [...this.recDepBancaire.listDepBanc, ...this.recDepCaisse.listDepCaisse];      
      this.filteredDepenses = [...this.recDepBancaire.listDepBanc, ...this.recDepCaisse.listDepCaisse];      
      this.cumulate();  
    }, 500);
  }

  filter() {
    let dateStart = $("#dateStart").val();
    let dateEnd = $("#dateEnd").val();
    let CO = $("#CO").val();
    let Tiers = $("#Tiers").val();
    this.filteredDepenses = this.depences.filter(reg => reg.date >= dateStart && reg.date <= dateEnd && CO == reg.co && reg.tiers == Tiers);
    this.cumulate();
  }

  cumulate() {
    this.total = this.filteredDepenses.reduce((sum, dep) => {
      return sum + (+dep.montant);
   }, 0);
  }

  clearFilter() {
    $("#dateStart").val('');
    $("#dateEnd").val('');
    $("#CO").val('Choisissez');
    $("#Tiers").val('Choisissez');
    this.filteredDepenses = this.depences;
  }

  decimal3Places(number) {
    if(number == 0)
      return number;
    return Number.parseFloat(number).toFixed(3);
  }

}
