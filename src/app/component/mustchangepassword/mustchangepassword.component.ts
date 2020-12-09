import { Component, OnInit } from '@angular/core';
import {BackendAPIService} from '../service/backend-api.service';
import { FormBuilder, Validators, FormGroup, FormArray, FormControl} from '@angular/forms';
import * as CryptoJS from 'crypto-js';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { TokenStorageService } from 'src/app/Core/service/token/tokenstoreage.service';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-mustchangepassword',
  templateUrl: './mustchangepassword.component.html',
  styleUrls: ['./mustchangepassword.component.css']
})
export class MustchangepasswordComponent implements OnInit {

  constructor(private backendApiService: BackendAPIService,private fb: FormBuilder,public router: Router,private route: ActivatedRoute,private tokenservice:TokenStorageService,private modalService: NgbModal) { }
  
  
   lastPwdChangeDt : string = this.tokenservice.getlastPwdChangeDt();
   
  
  //  bootstrep model popup code start here for view more	
          
		 closeResult: string;
		   
	   open(content, user, popupname ) {  
  
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title',size: 'xl',  backdrop: 'static',
        keyboard: false}).result.then((result) => {
      this.closeResult = 'Closed with: ${result}';
    }, (reason) => {
      this.closeResult = 'Dismissed ${this.getDismissReason(reason)}';
    });
	
  }
  
   private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  'with: ${reason}';
    }
  }
  
	  
   //  bootstrep model popup code end here for view more ////////	
   
   

  ngOnInit(): void {
	  
let element:HTMLElement = document.getElementById('auto_trigger') as HTMLElement;

element.click();
  }

}
