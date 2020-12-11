import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, Form } from '@angular/forms';

@Component({
  selector: 'app-child-pnc',
  templateUrl: './child-pnc.component.html',
  styleUrls: ['./child-pnc.component.css']
})
export class ChildPncComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) { }
  healthProviderANM:Array<any>=[{id:1,name:"test"},{id:2,name:"test-1"}]

  ngOnInit(): void {
    this.createForm();
  }

  childPNCForm: FormGroup;
  submitted = false;

  private createForm() {
    this.childPNCForm = this.formBuilder.group({
      anmid: new FormControl(''),
   }) }

   submitForm(childPNCForm){
    alert("inside submit")
    console.log(childPNCForm)

    
  }

}                             
