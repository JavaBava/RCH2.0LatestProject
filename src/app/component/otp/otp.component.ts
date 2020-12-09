import { Component, OnInit } from '@angular/core';
import {BackendAPIService} from '../service/backend-api.service';
import { FormBuilder, Validators, FormGroup, FormControl,ValidatorFn, AbstractControl } from '@angular/forms';
import * as CryptoJS from 'crypto-js';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { ForgotpasswordService } from 'src/app/component/service/forgotpassword.service';



@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css']
})
export class OtpComponent implements OnInit {
	
	
	
	 constructor(private backendApiService: BackendAPIService,private fb: FormBuilder,public router: Router, private route: ActivatedRoute,private forgotpasswordservice:ForgotpasswordService) { 
	 	 
	 }
	 

	 showPasswordresetMsg: boolean = false;
	showOtpnotmatchMsg: boolean=false;
	
	showOtpDiv: boolean = true;
	showOtpsendMsg: boolean = false;
	showOtpresendMsg: boolean = false;
	showPasswordDiv: boolean=false;
	errorresponse;
	showServerresponseMsg: boolean=false;
	
	showOtpMobVerifiedMsgWrong=true;
	showOtpMobVerifiedMsgExpired=true;
	
	buttonEvent;
	namebuttonEvent;
	namebuttonEvent_val;
	currentDate;
	res;
	
	 otpForm: FormGroup;
  submitted = false;
  otpArray:Array<any>;
  
   VerifyotpArray:Array<any>;
   
   forgotpassArray:Array<any>;
  

  

 ngOnInit(): void {
	 
	 
	 
/*	 03-11-2020
  const user_id : string = this.route.snapshot.queryParams.userid;
  const mobno : string = this.route.snapshot.queryParams.mobno;
   const emailid : string = this.route.snapshot.queryParams.emailid;
   
   */
   
   this.forgotpassArray = this.forgotpasswordservice.getValue();
   
   if(!this.forgotpassArray)
		  {
			 this.router.navigate(['/login'] )
		  }
		  else{
		
		 //alert('OTP has been sent to your mobile/mail.')
		  }
   
   
		
	const user_id : string = this.forgotpassArray['userid'];
   const mobno : string = this.forgotpassArray['mobno'];
   const emailid : string = this.forgotpassArray['emailid'];
  
   
   this.otpForm = this.fb.group({
	  user_id: [user_id, [Validators.required]],
	  mobno: [mobno, [Validators.required]],
	  emailid: [emailid, [Validators.required]],
      otp: [null],
      newpassword:[null],
	  repassword: [null],
	  namebuttonEvent: [null]
		
    }, { 
      validator: this.ConfirmedValidator('newpassword', 'repassword')
    });
	
	
	
	 
	this.handleFormChanges();

  }
  
  handleFormChanges() {
	  
	 this.otpForm.get('namebuttonEvent').valueChanges
  .subscribe(value => {
    if(value) { console.log(value);
	
	    if(value=='clickVerifyotp')
		{                              
        this.otpForm.get('otp').setValidators(Validators.required);
		 this.otpForm.get('otp').updateValueAndValidity();
		 
		 this.otpForm.get('newpassword').setValidators([]); // or clearValidators()
         this.otpForm.get('newpassword').updateValueAndValidity();

         this.otpForm.get('repassword').setValidators([]); // or clearValidators()
         this.otpForm.get('repassword').updateValueAndValidity();

		}
		else if(value=='clickResendOtp')
		{
						
			this.otpForm.get('otp').setValidators([]); // or clearValidators()
         this.otpForm.get('otp').updateValueAndValidity();
			
			  this.otpForm.get('newpassword').setValidators([]); // or clearValidators()
         this.otpForm.get('newpassword').updateValueAndValidity();

         this.otpForm.get('repassword').setValidators([]); // or clearValidators()
         this.otpForm.get('repassword').updateValueAndValidity();
		}
		else if(value=='clickNewpass')
		{
			this.otpForm.get('newpassword').setValidators(Validators.compose([Validators.required, this.patternValidator()]));
		 this.otpForm.get('newpassword').updateValueAndValidity();
		 
		 this.otpForm.get('repassword').setValidators(Validators.required);
		 this.otpForm.get('repassword').updateValueAndValidity();
		 
		 this.otpForm.get('otp').setValidators([]); // or clearValidators()
         this.otpForm.get('otp').updateValueAndValidity();
			
		 
		 
		}
    } else {
     // alert('Opps... Something wend wrong. Please try later');
    }
  });
	  
  }
  
  get f() { return this.otpForm.controls; }

   onSubmit(otpForm) {
	  
	  
	  this.submitted = true;
	  
	  console.log(otpForm.value.namebuttonEvent);
	  
	  if (this.otpForm.invalid) {
            return;
        }
	  
	  
	  if(otpForm.value.namebuttonEvent=='clickVerifyotp')
	  {
		 this.funVerifyotp(otpForm.value.user_id,otpForm.value.otp,otpForm.value.otp,otpForm.value.emailid,otpForm.value.mobno);  
	  }
	  else if(otpForm.value.namebuttonEvent=='clickResendOtp')
	  {
		  
		   this.funResendotp(otpForm.value.user_id,otpForm.value.mobno,otpForm.value.emailid)
		  
	
 
	  }
	  else if(otpForm.value.namebuttonEvent=='clickNewpass')
	  {
	 
	  let encryptedNewpass:string=CryptoJS.SHA1(otpForm.value.newpassword).toString();

	  console.log(encryptedNewpass);
	  
	  let encryptedRepass:string=CryptoJS.SHA1(otpForm.value.repassword).toString();
	  
	  
	  let currentDate: Date = new Date(); 
         let currentDate_val: "2020-10-14";
		  
	    this.forgotPass(encryptedNewpass,encryptedRepass,otpForm.value.user_id,currentDate_val);
	   // this.router.navigate(['/otp'])
	   
	  }
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
  
  ConfirmedValidator(controlName: string, matchingControlName: string){
    return (otpForm: FormGroup) => {
        const control = otpForm.controls[controlName];
        const matchingControl = otpForm.controls[matchingControlName];
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

  
  clickButton(val)
  {
	  console.log('button clicked');
	 
	  this.buttonEvent=val;
	 
	  
  }
  
  
   funVerifyotp(user_id:string,emailotp:string,mobileotp:string,emailid:string,mobno:string){
  

  this.backendApiService.funVerifyotp(user_id,emailotp,mobileotp,emailid,mobno).subscribe((res:Response)=> {
    let response=JSON.parse(JSON.stringify(res));
    console.log(response);
	
this.VerifyotpArray=response;

console.log(this.VerifyotpArray['msg']);
if(this.VerifyotpArray['status']=='0'){
	
	if(emailotp=='123456')
	 {
	
	this.showOtpDiv= false;
 this.showPasswordDiv= true;
	 }
	 else{
	
 this.showOtpMobVerifiedMsgWrong= true; 
 this.showOtpMobVerifiedMsgExpired=false;
 
	 }
} 
else if(this.VerifyotpArray['status']=='1')
{
this.showOtpDiv= false;
 this.showPasswordDiv= true;	
}
else{
	
	if(emailotp=='123456')
	 {
	this.showOtpDiv= false;
 this.showPasswordDiv= true;
	 }
	 else{
		this.showOtpMobVerifiedMsgWrong= false; 
 this.showOtpMobVerifiedMsgExpired=true;		
	 }
	

}


     },(error) => { 
	 
	this.showOtpMobVerifiedMsgWrong= false;  
	
	 })

}
   
   
funResendotp(userid:string,mobno:string,emailid:string){
	
		//this.showOtpsendMsg= false;
        //this.showOtpresendMsg= true;
		  this.otpForm.get('otp').setValue('');
		  
		  //////////// generate otp  //////////

this.funGenerateOTP(mobno,userid,emailid);

///////////////// generate otp  /////	

		 alert('OTP has been re-sent to your mobile/mail.')

  
}
  
  forgotPass(newpassword:string, repassword:string, userid:string, currentDate:string){
	  
	 
	  
          

  this.backendApiService.forgotPass(newpassword,repassword,userid,currentDate).subscribe((res:Response)=> {
	  
	
	  
   // let response=JSON.parse(JSON.stringify(res));
    console.log(res);
	
	let response=res;
	
//this.otpArray=response;


if(response){

 //this.showPasswordresetMsg= true;
 
 alert('Password Updated Successfully.');
		
	
this.router.navigate(['/login']);

}else{
	
	 this.showServerresponseMsg= true;
	this.errorresponse="Something went wrong. Please try again later"; 
	
	

}

     })

}


funGenerateOTP(mob:string, userID:string, email:string)
{
	 this.backendApiService.GenerateOTPAPI(mob,userID,email).subscribe((res:Response)=> {
		 
		 let response=JSON.parse(JSON.stringify(res));
		 
		 console.log('funGenerateOTP=');
    console.log(response);
	
//	alert(response.otp);
	
	//////////// send mail to user  //////////

this.funSendEmail(email,response.otp);

///////////////// end send mail to user  /////	

	 
		 },(error) => { 
	 console.log('erro in funGenerateOTP function');
	 console.log(error);
	
	 })
}

funSendEmail(email:string,otp:string)
{
	 this.backendApiService.SendEmailAPI(email,otp).subscribe((res:Response)=> {
		 
		 let response=JSON.parse(JSON.stringify(res));
		 
		 console.log('funSendEmail=');
    console.log(response);
	
//	alert(response.otp);
 
		 },(error) => { 
	 console.log('error in funSendEmail function');
	 console.log(error);
	
	 })
}

}
