import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DepRecCaisse } from '../shared/caisse/dep-rec-caisse.model';
import { RecDepCaisseService } from '../shared/caisse/rec-dep-caisse.service';
import { PaymentDetailService } from '../shared/payment-detail.service';
import { CompteService } from '../shared/comptes.service';
declare var $: any;

@Component({
  selector: 'app-rec-caisse',
  templateUrl: './rec-caisse.component.html',
  styleUrls: ['./rec-caisse.component.css']
})
export class RecCaisseComponent implements OnInit {

  constructor(
    private depCaisseServ: RecDepCaisseService,
    private compteService: CompteService,
    private paymentDetailService: PaymentDetailService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.compteService.refreshList();
    this.paymentDetailService.refreshList();
    this.depCaisseServ.refreshListRecCaisse();
  }
  populateForm(selectedRecord: DepRecCaisse) {
    this.depCaisseServ.recCaisse = Object.assign({}, selectedRecord);
  }

  onDelete(id: number) {
    if (confirm('Are you sure to delete this record?')) {
      this.depCaisseServ.deleteRecCaisse(id)
        .subscribe(
          res => {
            this.depCaisseServ.refreshListRecCaisse();
            this.toastr.error("Deleted successfully", 'Rec Caisse Register');
          },
          err => { console.log(err) }
        )
    }
  }


  // form methods


  onSubmit(form: NgForm) {
    if (this.depCaisseServ.recCaisse.depCaiId == 0)
      this.insertRecord(form);
    else
      this.updateRecord(form);
  }

  insertRecord(form: NgForm) {
    this.depCaisseServ.postRecCaisse().subscribe(
      res => {
        this.resetForm(form);
        this.depCaisseServ.refreshListRecCaisse();
        this.toastr.success('Submitted successfully', 'Rec Caisse Register');
        $('#Add_Account_details').modal('hide');
      },
      err => { console.log(err); }
    );
  }

  updateRecord(form: NgForm) {
    this.depCaisseServ.putRecCaisse().subscribe(
      res => {
        this.resetForm(form);
        this.depCaisseServ.refreshListRecCaisse();
        this.toastr.info('Updated successfully', 'Rec Caisse Register');
        $('#Add_Account_details').modal('hide');
      },
      err => { console.log(err); }
    );
  }


  resetForm(form: NgForm) {
    form.form.reset();
    this.depCaisseServ.recCaisse = new DepRecCaisse();
  }

}
