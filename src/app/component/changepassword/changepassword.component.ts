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
	newpassword: ['', Validators.compose([Validators.required,this.patternValidator()])],
	
	  repassword: ['',  [Validators.required]]
	 
    }, { 
   
	 validator: this.CustomConfirmedValidator('newpassword', 'repassword', 'oldpassword')
	 
	 //validator: this.ConfirmedValidator('newpassword', 'repassword')
	 
    }
	
	
	);
	  
	 //this.changpassForm.get('newpassword').setValidators(Validators.compose([Validators.required, this.patternValidator()]));
		// this.changpassForm.get('newpassword').updateValueAndValidity(); 
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
      const regex = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*[@#$%^&+=])(?=.*?[0-9]).{10,50}$');
      const valid = regex.test(control.value);
      return valid ? null : { invalidPassword: true };
    };
  }
 
//// check also old password should not match with new

CustomConfirmedValidator(controlName: string, matchingControlName: string, oldPasswordName: string){ console.log('new password validation');
    return (changpassForm: FormGroup) => {
        const newPasswordControl = changpassForm.controls[controlName];
        const reenterPasswordControl = changpassForm.controls[matchingControlName];
		const oldPasswordControl = changpassForm.controls[oldPasswordName];
		
		if (oldPasswordControl.errors)
		{
			 return;
		}
		if (newPasswordControl.errors)
		{
			 return;
		}
		
		 if (newPasswordControl.value == oldPasswordControl.value) {
            newPasswordControl.setErrors({ sameValidator: true });
			 return;
        } else {
            newPasswordControl.setErrors(null);
			
        }
		
		
        if (reenterPasswordControl.errors && !reenterPasswordControl.errors.confirmedValidator) {
            return;
        }
		
		
        if (newPasswordControl.value !== reenterPasswordControl.value) {
            reenterPasswordControl.setErrors({ confirmedValidator: true });
        } else {
            reenterPasswordControl.setErrors(null);
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
     //this.router.navigate(['/login']);
	 
	  window.localStorage.removeItem("login");
      this.tokenservice.signOut();

	
	window.location.href = '/login';
   
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
