import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Compte } from '../shared/comptes.model';
import { CompteService } from '../shared/comptes.service';
declare var $: any;

@Component({
  selector: 'app-comptes',
  templateUrl: './comptes.component.html',
  styleUrls: ['./comptes.component.css']
})
export class ComptesComponent implements OnInit {

  constructor(public service: CompteService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.service.refreshList();  
  }

  populateForm(selectedRecord: Compte) {
    this.service.formData = Object.assign({}, selectedRecord);
  }

  onDelete(id: number) {
    if (confirm('Are you sure to delete this record?')) {
      this.service.deleteCompte(id)
        .subscribe(
          res => {
            this.service.refreshList();
            this.toastr.error("Deleted successfully", 'Compte Register');
          },
          err => { console.log(err) }
        )
    }
  }

  onSubmit(form: NgForm) {
    if (this.service.formData.compteId==0)
      this.insertRecord(form);
    else
      this.updateRecord(form);      
  }

  insertRecord(form: NgForm) {
    this.service.postCompte().subscribe(
      res => {
        this.resetForm(form);
        this.service.refreshList();
        this.toastr.success('Submitted successfully', 'Compte Register')
        $('#Add_Account_details').modal('hide');
      },
      err => { console.log(err); }
    );
  }

  updateRecord(form: NgForm) {
    this.service.putCompte().subscribe(
      res => {
        this.resetForm(form);
        this.service.refreshList();
        this.toastr.info('Updated successfully', 'Compte Register')
        $('#Add_Account_details').modal('hide');
      },
      err => { console.log(err); }
    );
  }


  resetForm(form: NgForm) {
    form.form.reset();
    this.service.formData = new Compte();
  }

}
