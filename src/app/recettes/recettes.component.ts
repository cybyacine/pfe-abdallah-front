import { Component, OnInit } from '@angular/core';
import { RecDepBancaireService } from '../shared/bancaire/rec-dep-bancaire.service';
import { RecDepCaisseService } from '../shared/caisse/rec-dep-caisse.service';
import { Reglement } from '../shared/reglement.model';
import { CompteService } from '../shared/comptes.service';
import { PaymentDetailService } from '../shared/payment-detail.service';
declare var $: any;

@Component({
  selector: 'app-recettes',
  templateUrl: './recettes.component.html',
  styleUrls: ['./recettes.component.css']
})
export class RecettesComponent implements OnInit {
 
  recettes: Reglement[];
  filteredRecettes: Reglement[];
  total: number = 0;

  constructor(private compteService: CompteService, private paymentDetailService: PaymentDetailService, private recDepBancaire: RecDepBancaireService, private recDepCaisse: RecDepCaisseService) { }

  ngOnInit() {
    this.compteService.refreshList();
    this.paymentDetailService.refreshList();
    this.recDepBancaire.refreshListRecBan();
    this.recDepCaisse.refreshListRecCaisse();
    setTimeout(() => {
      this.recettes = [...this.recDepBancaire.listRecBanc, ...this.recDepCaisse.listRecCaisse];      
      this.filteredRecettes = [...this.recDepBancaire.listRecBanc, ...this.recDepCaisse.listRecCaisse];      
      this.cumulate();  
    }, 500);
  }

  filter() {
    let dateStart = $("#dateStart").val();
    let dateEnd = $("#dateEnd").val();
    let CO = $("#CO").val();
    let Tiers = $("#Tiers").val();
    this.filteredRecettes = this.recettes.filter(reg => reg.date >= dateStart && reg.date <= dateEnd && CO == reg.co && reg.tiers == Tiers);
    this.cumulate();
  }

  cumulate() {
    this.total = this.filteredRecettes.reduce((sum, rec) => {
      return sum + (+rec.montant);
   }, 0);

  }

  clearFilter() {
    $("#dateStart").val('');
    $("#dateEnd").val('');
    $("#CO").val('Choisissez');
    $("#Tiers").val('Choisissez');
    this.filteredRecettes = this.recettes;
  }

  decimal3Places(number) {
    if(number == 0)
      return number;
    return Number.parseFloat(number).toFixed(3);
  }
}
