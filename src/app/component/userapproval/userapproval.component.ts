import { Component, OnInit } from '@angular/core';
import {BackendAPIService} from '../service/backend-api.service';
import { FormBuilder, Validators, FormGroup, FormArray, FormControl} from '@angular/forms';
import * as CryptoJS from 'crypto-js';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { TokenStorageService } from 'src/app/Core/service/token/tokenstoreage.service';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {NgxPaginationModule} from 'ngx-pagination';
import { IpServiceService } from '../service/ip-service.service';

@Component({
  selector: 'app-userapproval',
  templateUrl: './userapproval.component.html',
  styleUrls: ['./userapproval.component.css']
})
export class UserapprovalComponent implements OnInit {
	
	
	
  
  closeResult: string;
	 	 
	 UserData;
	  showapprovedMsg: boolean = false;
	showrejectMsg: boolean=false;
	showRoleError: boolean=false;
	showApplicationError: boolean=false;
	
	
	
	usertypehtml;
	usernamehtml;
	approveMSG;
	rejectMSG;
	showServerresponseMsg: boolean = false;
	showServerresponseapproveMsg: boolean = false;
	 errorresponse;
	  errorresponseapprove;
	 AssigneRole;
	 Application;
	 ApprovedUser;
	
	 currentPage: number = 1;
collection = [];

 ipAddress:string;
 
  constructor(private backendApiService: BackendAPIService,private fb: FormBuilder,public router: Router,private route: ActivatedRoute,private tokenservice:TokenStorageService,private modalService: NgbModal,private ip:IpServiceService) {
	 
	  
	  }
	
//  bootstrep model popup code start here for view more	
          
		  userfrommodel:any;
		  userIdhtml2;
		  userIdhtml3;
		   
	   open(content, user, popupname ) {  
	   
	   this.userfrommodel=user; 
	   
	   if(popupname=='Approve')
	   {
		   this.getAssigneRole(user.typeId);
		   this.getApplication(user.typeId);
		   
		   this.userIdhtml2  = this.tokenservice.getUserId();
		   
		  this.userApproved(user.id,1,this.userIdhtml2,this.ipAddress,user.userName,'');
		  
	  
		   /*
		    let bsres ='[{ "id": 153,"userNames": "dev4","emailID": "dev4@gmail.com","mobNo": "9811834850","pwdChangeDt": null}]';
			
			let bsresponse=JSON.parse(JSON.parse(JSON.stringify(bsres)));
               console.log(bsresponse);
             this.UserData=bsresponse;
			*/ 
			 
	   }
	  
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title',size: 'lg'}).result.then((result) => {
		
		if(popupname=='Approve')
		{
			window.location.reload();
		}
		
		
      this.closeResult = 'Closed with: ${result}';
    }, (reason) => {
		if(popupname=='Approve')
		{
			window.location.reload();
		}
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


    userIdhtml : number = this.tokenservice.getUserId();
	
	rejectForm: FormGroup;
	assigneForm: FormGroup;
	 submitted = false;
	   
  ngOnInit(): void {
	  
	  this.getNewIP();
	 
	let username= this.tokenservice.getUserName;
			 
			   
	  let userId = this.tokenservice.getUserId();
	  
	    
	  let usertype=this.tokenservice.utypeId;
	   
	   console.log('user type==');
	   console.log(userId);
	   console.log('user type==');
	  
	   this.getUserData(usertype,username);
	   
	   
	   
	  this.rejectForm = this.fb.group({
    user_id: ['', [Validators.required]],
    user_status: ['',  [Validators.required]],
	 approved_by: ['',  [Validators.required]],
	  username: ['',  [Validators.required]],
	  reason: ['',  [Validators.required]]
	 
    });
	
	
	 this.assigneForm = this.fb.group({
      roleIdcheckArray: this.fb.array([], [Validators.required]),
	  appIdcheckArray: this.fb.array([], [Validators.required]),
	  user_id: ['', [Validators.required]],
	  stateId: ['', [Validators.required]]
	  
    })
	   
	  
  }
  
  get f() { return this.rejectForm.controls; }
  
  onSubmit(rejectForm) {
	  
	  this.submitted = true;
	  
	
	  
	  if (this.rejectForm.invalid) {
            return;
        }
		
		//console.log(rejectForm.value.user_id);
		//console.log(rejectForm.value.user_status);
		//console.log(rejectForm.value.approved_by);
		//console.log(rejectForm.value.username);
		//console.log(rejectForm.value.reason);
	  
	 this.userReject(rejectForm.value.user_id,rejectForm.value.user_status,rejectForm.value.approved_by,this.ipAddress,rejectForm.value.username,rejectForm.value.reason);
	   
  }
  
  
  get ff() { return this.assigneForm.controls; }
  
  onSubmit2(assigneForm) {
	  
	  this.submitted = true;
	  
	console.log('this is itt1111.');
	  
	  if (this.assigneForm.invalid) {
		  
		   this.showRoleError=true;
		   this.showApplicationError=true;
		  
            return;
			
        }
		
		console.log('this is itt.');
		 console.log(assigneForm.value)
		 
		 console.log('second===');
		 
	   //let formrequest=JSON.parse(JSON.stringify(assigneForm.value));
       console.log(assigneForm.value.roleIdcheckArray);
	   
	 
	   
	   let assignDt='2020-10-28T07:52:56.700Z';
	   let inActiveDt='2020-10-28T07:52:56.700Z';
	  
		let val_userId=assigneForm.value.user_id;
		
		let val_stateId = assigneForm.value.stateId;
		
		let val_assignBy = this.userIdhtml;
		
		
		let roleIds = assigneForm.value.roleIdcheckArray;
		
               console.log(roleIds);
			   
		let appIds = assigneForm.value.appIdcheckArray;
		
               console.log(appIds);
		
		this.userRoleAppicationAssigned(val_userId,roleIds,appIds,assignDt,val_assignBy,inActiveDt,val_stateId);
	   
	   
  }
  
   getUserData(usertype,username): void {
  this.backendApiService.getRegistrationRequestAPI(usertype,username).subscribe((res:Response)=> {
    let response=JSON.parse(JSON.stringify(res));
    console.log(response);
    this.UserData=response;
     })
	 
   }
   
   getAssigneRole(usertype): void {
  this.backendApiService.getAssigneRoleAPI(usertype).subscribe((res:Response)=> {
    let response=JSON.parse(JSON.stringify(res));
    console.log(response);
    this.AssigneRole=response;
     })
	 
   } 
   
   getApplication(usertype): void {
  this.backendApiService.getApplicationAPI(usertype).subscribe((res:Response)=> {
    let response=JSON.parse(JSON.stringify(res));
    console.log(response);
    this.Application=response;
     })
	 
   } 
	
	
	
	clickApprove(userId,statusid,approvedBy,ipAddress,username)
   {
	  
	   
	   /* bs close 28-10-2020
	    this.userApproved(userId,statusid,approvedBy,ipAddress,username);
		
		this.approveMSG='User Name "'+username+ '" has been approved';
		
		alert(this.approveMSG);
		
		window.location.reload();
		
		 
	   this.showapprovedMsg = true;
	 this.showrejectMsg=false;
	 
	 */
	 
	 // this.buttonEvent=val;
	  //this.router.navigate(['/home/userapproval']);
	  
  }
  
  
  
  userApproved(userId,statusid,approvedBy,ipAddress,username,reason): void {
	  
	  
	  
    this.backendApiService.userApprovedAPI(userId,statusid,approvedBy,ipAddress,username,reason).subscribe((res:Response)=> {
    let response=JSON.parse(JSON.stringify(res));
    console.log(response);
    this.UserData=response;
	
	 this.ApprovedUser=response;

	  this.approveMSG='User ID "'+username+ '" has been approved';
		
		alert(this.approveMSG);
		//this.router.navigate(['/home/userapproval']);
		
		/*
		
		window.location.reload();
		
		*/
		 //this.router.navigate(['/home/userapproval']);
		 
	   //this.showapprovedMsg = true;
	 //this.showrejectMsg=false;
	 
     })
	 
   }
    
    userReject(userId,statusid,approvedBy,ipAddress,username,reason): void {
  this.backendApiService.userApprovedAPI(userId,statusid,approvedBy,ipAddress,username,reason).subscribe((res:Response)=> {
    let response=JSON.parse(JSON.stringify(res));
    console.log(response);
    this.UserData=response;
	
	   this.rejectMSG='User ID "'+username+ '" has been rejected';
	   
	   alert(this.rejectMSG);
	   
	   window.location.reload();
	   
	    this.showrejectMsg=true;
		 this.showapprovedMsg = false;
     }
	 
	 ,(error) => { 
	 console.log(error);
	 if(error=='Error:404-Not_Found')
	 {
		 // please note: on error user can rejected  need to check later
		 this.rejectMSG='User ID "'+username+ '" has been rejected';
	   
	   alert(this.rejectMSG);
	   
	   window.location.reload();
	   
	    this.showrejectMsg=true;
		 this.showapprovedMsg = false;
		 
	 this.errorresponse="User Not Found"; 
	
	 }
	 else
	 {
		 // please note: on error user can rejected later
		  this.rejectMSG='User ID "'+username+ '" has been rejected';
	   
	   alert(this.rejectMSG);
	   
	   window.location.reload();
	   
	    this.showrejectMsg=true;
		 this.showapprovedMsg = false;
		 
		 this.errorresponse="Something went wrong. Please try again later"; 
		
	 }
	
	 
	 this.showServerresponseMsg= true;
	 })
	 
   }
   
 /////////////// request api for assign role and application /////////////
 
 
   userRoleAppicationAssigned(val_userId,roleIds,appIds,assignDt,val_assignBy,inActiveDt,val_stateId): void {
	  
  this.backendApiService.userRoleAppicationAssignedAPI(val_userId,roleIds,appIds,assignDt,val_assignBy,inActiveDt,val_stateId).subscribe((res:Response)=> {
	  
    let response=JSON.parse(JSON.stringify(res));
    console.log(response);
    this.UserData=response;

	  this.approveMSG='Role and Application has been assigned' ;
		
		alert(this.approveMSG);
		window.location.reload();
		
		
	 
     },(error) => { 
	 
	    
	 this.errorresponseapprove="Something went wrong. Please try again later"; 
		
		 this.showServerresponseapproveMsg= true;
	    alert('Something went wrong. Please try again later');
		window.location.reload();
		
		
		
	
	 }
	 )
	 
   }
 
 
 
 //////////////// end request api for assign role and application      /////////
 
 
   
  ///  assign role and application checkbox code /////
  
 

onCheckboxChangeRole(e) {
    const roleIdcheckArray: FormArray = this.assigneForm.get('roleIdcheckArray') as FormArray;

    if (e.target.checked) {
      roleIdcheckArray.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      roleIdcheckArray.controls.forEach((item: FormControl) => {
        if (item.value == e.target.value) {
          roleIdcheckArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  } 
  
  
  onCheckboxChangeApplication(e) {
    const appIdcheckArray: FormArray = this.assigneForm.get('appIdcheckArray') as FormArray;

    if (e.target.checked) {
      appIdcheckArray.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      appIdcheckArray.controls.forEach((item: FormControl) => {
        if (item.value == e.target.value) {
          appIdcheckArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  } 
  
  
  ////////// end assign role and application checkbox code ////////
  
  getNewIP()
  {
    this.ip.getIPAddress().subscribe((res:any)=>{
		//alert(res.ip);
		
	 this.ipAddress=res.ip;
	
    });
  }
  

}
