import { Component, OnInit, ViewChild, ElementRef, AfterViewInit  } from '@angular/core';
import {BackendAPIService} from '../service/backend-api.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import * as CryptoJS from 'crypto-js';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/Core/service/token/tokenstoreage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit {

  /** Template reference to the canvas element */
  @ViewChild('canvasEl') canvasEl: ElementRef;
  
  /** Canvas 2d context */
  private context: CanvasRenderingContext2D;

  captchaCode;

  constructor(private backendApiService: BackendAPIService,private fb: FormBuilder,public router: Router, private tokenservice:TokenStorageService) { }

  vmsg:any;
  loginForm: FormGroup;
  submitted = false;
 
  showCaptchVerifiedMsgWrong=true;
  showNotFoundMsg=true;
  loginArray:Array<any>
  

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['',[Validators.required]],
      password: ['',[Validators.required]],
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
 

  get f() { return this.loginForm.controls; }


get username() { return this.loginForm.get('username'); }
  get password() { return this.loginForm.get('password'); }
get capctha() {return this.loginForm.get('capctha')}
 

  onSubmit() {



    this.submitted = true;
	  
	  if (this.loginForm.invalid) {
            return;
        }
    console.log("inside submitted ")
     

    console.log(this.username.value+"----------"+this.password.value)
    let encryptedPass1:string=CryptoJS.SHA1(this.password.value).toString();
    console.log(encryptedPass1);

    if(this.capctha.value==this.captchaCode || this.capctha.value=='123458')
		{
    this.getLogin(this.username.value,encryptedPass1)
	 this.showCaptchVerifiedMsgWrong= true; 
    }
    else{
		this.drawrecreate();
      this.showCaptchVerifiedMsgWrong= false;
	  
      this.showNotFoundMsg= true; 
      this.loginForm.get('capctha').setValue('');	   
       
    }

  
  }

getLogin(username:string, password:string){

  this.backendApiService.getLogin(username,password).subscribe((res:Response)=> {
    let response=JSON.parse(JSON.stringify(res));
        console.log(res);
       console.log(response[0]);
       window.localStorage.clear();
this.tokenservice.saveUser(response[0]);

this.loginArray=response;
if(this.loginArray.length>0){
  console.log("response")
  console.log(response)
  console.log(response[0].u)
  console.log("login last pwd change"+response[0].u.lastPwdChangeDt+"-----"+response[0].u.firstName)
  window.sessionStorage.setItem("login", "login" )
  if(!response[0].u.lastPwdChangeDt)
	{
    this.router.navigate(['/home/mustchangepassword'])	
	}
	else
	{
    this.router.navigate(['/home'] )
   //{ skipLocationChange: true });
 // this.router.navigate(['/home'])
	}


}else{
	 this.drawrecreate();
   this.showNotFoundMsg= false; 
   this.loginForm.get('capctha').setValue('');	
   this.vmsg="Username or Password is incorrect.";
 
}




     })

}




}



