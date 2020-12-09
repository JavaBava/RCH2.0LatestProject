

import { Component, ElementRef, OnInit,  ViewChild} from '@angular/core';  
 

@Component({
  selector: 'app-ngx-bootstrap-modal',
  templateUrl: './ngx-bootstrap-modal.component.html',
  styleUrls: ['./ngx-bootstrap-modal.component.css']
})
export class NgxBootstrapModalComponent implements OnInit {
  @ViewChild('content') content: any;
  btn: any;
 
    ngOnInit() { 
      this.OpenModalFun()
    }  
  
    OpenModalFun() {
      document.getElementById("openModalButton").click();
  }

  closeModalFun() {
      //Code to close modal pop-up
  }

    useSeachHandler(e){
      alert("inside search")
      console.log(e)
      console.log(e.PWfirstname+e.HusbandFirstname+e.PWDOB+e.mobno)
      alert("1")
      //this.modalRef = this.modalService1.show(template)  
      
        }
  
}
