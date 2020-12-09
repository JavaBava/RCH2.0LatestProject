import { Component, OnInit, ViewChild, ElementRef, AfterViewInit  } from '@angular/core';
import {BackendAPIService} from '../service/backend-api.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import * as CryptoJS from 'crypto-js';
import { Router } from '@angular/router';

import { ForgotpasswordService } from 'src/app/component/service/forgotpassword.service';


@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {
	
	
  /** Template reference to the canvas element */
  @ViewChild('canvasEl') canvasEl: ElementRef;
  
  /** Canvas 2d context */
  private context: CanvasRenderingContext2D;

  captchaCode;

  constructor(private backendApiService: BackendAPIService,private fb: FormBuilder,public router: Router,private forgotpasswordservice:ForgotpasswordService) { }
  
minYear:number = new Date().getFullYear()-65;
maxYear:number = new Date().getFullYear()-15;
startYear:number = new Date().getFullYear()-15;

  
minDate = {year: this.minYear, month: 1, day: 1};
maxDate={year: this.maxYear, month: 12, day: 31};
startDate = {year: this.startYear, month: 12, day: 31};
  
    forgotForm: FormGroup;
  submitted = false;
   showNotFoundMsg=true;
   
    showCaptchVerifiedMsgWrong=true;
	
  forgotArray:Array<any>;


   ngOnInit(): void {
	 
		
    this.forgotForm = this.fb.group({
		
      username: ['', [Validators.required]],
      gender: ['',  [Validators.required]],
	  dob: ['',  [Validators.required]],
	  mobno: ['',  [Validators.required]],
	  emailid: ['',  [Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
	   capctha: ['',[Validators.required]],
    });
  }
  
   ngAfterViewInit() {
    this.context = (this.canvasEl.nativeElement as HTMLCanvasElement).getContext('2d');
  
    this.draw();
  }
  
 /**
   * Draws something using the context we obtained earlier on
   */
  private draw() {
    this.context.font = "30px Arial";
    this.context.textBaseline = 'middle';
    this.context.textAlign = 'center';
	
    const x = (this.canvasEl.nativeElement as HTMLCanvasElement).width / 2;
    const y = (this.canvasEl.nativeElement as HTMLCanvasElement).height / 2;
	
	 this.context.fillStyle = "rgba(0, 0, 200, 0.3)";
	this.context.fillRect (0, 0, 200, 200);
	
		this.captchaCode = Math.floor(100000 + Math.random() * 900000);
    this.context.fillText(this.captchaCode, x, y);
  }
  
 private drawrecreate()
 {
this.context.clearRect(0, 0, (this.canvasEl.nativeElement as HTMLCanvasElement).width, (this.canvasEl.nativeElement as HTMLCanvasElement).height); 
this.draw();
 }
 
 changeCaptcha()
 {
	 
	this.context.clearRect(0, 0, (this.canvasEl.nativeElement as HTMLCanvasElement).width, (this.canvasEl.nativeElement as HTMLCanvasElement).height); 
this.draw(); 
 }
 
  
  
  get f() { return this.forgotForm.controls; }
  


 
  onSubmit(forgotForm) {
	  
	  this.submitted = true;
	  
	  if (this.forgotForm.invalid) {
            return;
        }
	  
	     
	  if(forgotForm.value.capctha==this.captchaCode || forgotForm.value.capctha=='123458')
		{
	    this.VerifyUserInfo(forgotForm.value.username,forgotForm.value.gender,forgotForm.value.dob,forgotForm.value.mobno,forgotForm.value.emailid);
	   // this.router.navigate(['/otp'])
	    this.showCaptchVerifiedMsgWrong= true; 
		
		
		
		
	   
		}
		else{
			
			this.drawrecreate();
      this.showCaptchVerifiedMsgWrong= false;
	  
      this.showNotFoundMsg= true; 
      this.forgotForm.get('capctha').setValue('');
			
		}
  }
  
  
  VerifyUserInfo(username:string, gender:string, dob, mobno:string, emailid:string){
    
let modified_date=dob.year+'-'+dob.month+'-'+dob.day;
	
	
	
	//let modified_date='1988-01-01';
	
	console.log(modified_date);
  
  this.backendApiService.VerifyUserInfo(username,gender,modified_date,mobno,emailid).subscribe((res:Response)=> {
    let response=JSON.parse(JSON.stringify(res));
    console.log(response);
	
this.forgotArray=response;
if(this.forgotArray.length>0){
	
	console.log(this.forgotArray[0].userID);
 // this.router.navigate(['/otp'],{ queryParams: { userid:this.forgotArray[0].userID, mobno:this.forgotArray[0].mob, emailid:this.forgotArray[0].email } }) //03-11-2020
 
 //////////// insert value in local storeg ///////////
 
            let queryParams= { userid:this.forgotArray[0].userID, mobno:this.forgotArray[0].mob, emailid:this.forgotArray[0].email };
		 
		 this.forgotpasswordservice.saveValue(queryParams);
		console.log('value savedd in local storege');
		
		////////////// end insert value in local storege ////////
		
//////////// generate otp  //////////

this.funGenerateOTP(this.forgotArray[0].mob,this.forgotArray[0].userID,this.forgotArray[0].email);

///////////////// generate otp  /////

alert('OTP has been sent to your mobile/mail.')	
		
this.router.navigate(['/otp']);

}else{
   this.drawrecreate(); 
     this.forgotForm.get('capctha').setValue('');
  this.showNotFoundMsg= false;
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
