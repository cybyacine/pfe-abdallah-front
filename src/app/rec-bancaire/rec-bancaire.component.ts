import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DepRecBan } from '../shared/bancaire/dep-rec-banc.model';
import { RecDepBancaireService } from '../shared/bancaire/rec-dep-bancaire.service';
import { CompteService } from '../shared/comptes.service';
import { PaymentDetailService } from '../shared/payment-detail.service';
declare var $: any;

@Component({
  selector: 'app-rec-bancaire',
  templateUrl: './rec-bancaire.component.html',
  styleUrls: ['./rec-bancaire.component.css']
})
export class RecBancaireComponent implements OnInit {

  constructor(
    private depBancServ: RecDepBancaireService,
    private toastr: ToastrService,
    private compteService: CompteService,
    private paymentDetailService: PaymentDetailService,
  ) { }

  ngOnInit(): void {
    this.depBancServ.refreshListRecBan();
    this.compteService.refreshList();
    this.paymentDetailService.refreshList();
  }
  populateForm(selectedRecord: DepRecBan) {
    this.depBancServ.recBanc = Object.assign({}, selectedRecord);
  }

  onDelete(id: number) {
    if (confirm('Are you sure to delete this record?')) {
      this.depBancServ.deleteRecBan(id)
        .subscribe(
          res => {
            this.depBancServ.refreshListRecBan();
            this.toastr.error("Deleted successfully", 'Rec Bancaire Register');
          },
          err => { console.log(err) }
        )
    }
  }


  // form methods


  onSubmit(form: NgForm) {
    if (this.depBancServ.recBanc.depBanId == 0)
      this.insertRecord(form);
    else
      this.updateRecord(form);
  }

  insertRecord(form: NgForm) {
    this.depBancServ.postRecBan().subscribe(
      res => {
        this.resetForm(form);
        this.depBancServ.refreshListRecBan();
        this.toastr.success('Submitted successfully', 'Rec Bancaire Register');
        $('#Add_Account_details').modal('hide');
      },
      err => { console.log(err); }
    );
  }

  updateRecord(form: NgForm) {
    this.depBancServ.putRecBan().subscribe(
      res => {
        this.resetForm(form);
        this.depBancServ.refreshListRecBan();
        this.toastr.info('Updated successfully', 'Rec Bancaire Register');
        $('#Add_Account_details').modal('hide');
      },
      err => { console.log(err); }
    );
  }


  resetForm(form: NgForm) {
    form.form.reset();
    this.depBancServ.recBanc = new DepRecBan();
  }

}
