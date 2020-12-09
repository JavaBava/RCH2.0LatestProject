import { Component, OnInit } from '@angular/core';
import {BackendAPIService} from '../service/backend-api.service';
import { FormBuilder, Validators, FormGroup, FormControl,ValidatorFn, AbstractControl  } from '@angular/forms';
import * as CryptoJS from 'crypto-js';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { TokenStorageService } from 'src/app/Core/service/token/tokenstoreage.service';




@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {

 constructor(private backendApiService: BackendAPIService,private fb: FormBuilder,public router: Router, private route: ActivatedRoute,private tokenservice:TokenStorageService) { 
	 	 
	 }
	 
	  showPasswordresetMsg: boolean = false;
	showpassnotmatchMsg: boolean=false;
	
	 showServerresponseMsg: boolean = false;
	
	changpassForm: FormGroup;
  submitted = false;
  changpassArray:Array<any>;
  
  errorresponse;

  ngOnInit(): void {
	  
	  const user_id : number =  this.tokenservice.getUserId();
	  
	  this.changpassForm = this.fb.group({
    user_id: [user_id, [Validators.required]],
    oldpassword: ['',  [Validators.required]],
	newpassword: ['', Validators.compose([Validators.required, this.patternValidator()])],
	  repassword: ['',  [Validators.required]]
	 
    }, { 
   
	 validator: this.ConfirmedValidator('newpassword', 'repassword', 'oldpassword')
    }
	
	
	);
	  
	  
  }
  
  get f() { return this.changpassForm.controls; }
  
  onSubmit(changpassForm) {
	  
	  this.submitted = true;
	  
	  if (this.changpassForm.invalid) {
            return;
        }
    
        let encryptedoldpassword:string=CryptoJS.SHA1(changpassForm.value.oldpassword).toString();
        
        let encryptednewpassword:string=CryptoJS.SHA1(changpassForm.value.newpassword).toString();

        let encryptedrepassword:string=CryptoJS.SHA1(changpassForm.value.repassword).toString();

        this.changePass(encryptedoldpassword,encryptednewpassword,encryptedrepassword,changpassForm.value.user_id,changpassForm.value.user_id);

	  //this.showPasswordresetMsg= true;
	   
  }


 patternValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        return null;
      }
      const regex = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*[@#$%^&+=])(?=.*?[0-9]).{10,}$');
      const valid = regex.test(control.value);
      return valid ? null : { invalidPassword: true };
    };
  }
  
SameValidator(controlName2: string, matchingControlName2: string){ console.log('old password validation');
    return (changpassForm: FormGroup) => {
        const control2 = changpassForm.controls[controlName2];
        const matchingControl2 = changpassForm.controls[matchingControlName2];
		
        if( (control2.value!='' && control2.value != null) && (matchingControl2.value!='' && matchingControl2.value != null) ){ 
		  
		  console.log('yes this is validator123');
		  
      /*  if (matchingControl.errors && matchingControl.errors.emailotpconfirmedValidator) {
            return;
        }
		*/
		
        if (control2.value == matchingControl2.value) {  // check if equal 
            matchingControl2.setErrors({ sameValidator: true });
			 
			
        } else {
            matchingControl2.setErrors(null);
			
			
        }
		
		  }
    }
} 

ConfirmedValidator(controlName: string, matchingControlName: string, bsControlName: string){ console.log('new password validation');
    return (changpassForm: FormGroup) => {
        const control = changpassForm.controls[controlName];
        const matchingControl = changpassForm.controls[matchingControlName];
		const bsControl = changpassForm.controls[bsControlName];
		
		 if( (control.value!='' && control.value != null) && (bsControl.value!='' && bsControl.value != null) ){ 
	
	    if (control.value == bsControl.value) {  // check if equal 
            control.setErrors({ sameValidator: true });
		
        } else {
            control.setErrors(null);
			
        }
		  }
		  
		  
        if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {
            return;
        }
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ confirmedValidator: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
} 

/*
ConfirmedValidator(controlName: string, matchingControlName: string){ console.log('new password validation');
    return (changpassForm: FormGroup) => {
        const control = changpassForm.controls[controlName];
        const matchingControl = changpassForm.controls[matchingControlName];
        if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {
            return;
        }
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ confirmedValidator: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
}

*/

  changePass(oldpassword:string, newpassword:string, repassword:string, userid:string, updatedBy:string){
	  

    this.backendApiService.changePass(oldpassword,newpassword,repassword,userid,updatedBy).subscribe((res:Response)=> {
     
     // let response=JSON.parse(JSON.stringify(res));
         
        let response =JSON.parse(JSON.stringify(res));
		
		let response2=JSON.parse(response);
        
 // this.changpassArray=response;

 //let response=res;
  
 // console.log(res.title);
  console.log(res);
  console.log(response);
  console.log(response2);
  
  if(response2.status==200){
    //this.changpassForm.reset();

    //this.showPasswordresetMsg= true;
	
	 alert('Password Changed Successfully');
     this.router.navigate(['/login']);
	
	
   
  }else{
   
    this.errorresponse="Something went wrong. Please try again later"; 
    this.showServerresponseMsg= true;
  
  }
  
       }
	   ,(error) => { 
	 console.log(error);
	 if(error=='Error:404-Not_Found')
	 {
	 this.errorresponse="Old Password does not match with password in database"; 
	 }
	 else
	 {
		 this.errorresponse="Something went wrong. Please try again later"; 
	 }
	
	 
	 this.showServerresponseMsg= true;
	 }
	   
	   
	   )
  
  }
  

}
