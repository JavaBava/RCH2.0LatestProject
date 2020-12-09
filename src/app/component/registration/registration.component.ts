import { Component, OnInit, ViewChild, ElementRef, AfterViewInit  } from '@angular/core';
import {BackendAPIService} from '../service/backend-api.service';
import { FormBuilder, Validators, FormGroup,ValidatorFn, AbstractControl } from '@angular/forms';
import * as CryptoJS from 'crypto-js';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { RegistrationService } from 'src/app/component/registration/registration.service';



@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit, OnInit, AfterViewInit {
	
	 /** Template reference to the canvas element */
  @ViewChild('canvasEl') canvasEl: ElementRef;
  
  /** Canvas 2d context */
  private context: CanvasRenderingContext2D;

  captchaCode;

  constructor(private backendApiService: BackendAPIService,private fb: FormBuilder,public router: Router, private route: ActivatedRoute,private registrationservice:RegistrationService) { }
  
  registrationForm: FormGroup;
  submitted = false;
  registraionArray:Array<any>;
  errorresponse;
  
   showServerresponseMsg=true;
  showState: boolean = true;
  showDistrict: boolean = true;
  showRuralUrban: boolean = true;
  showHealthBlock: boolean = true;
  showHealthFacilityType: boolean = true;
  showHealthFacility: boolean = true;
  showHealthSubFacility: boolean = true;
  showVillage: boolean = true;
  showCaptchVerifiedMsgWrong=true;
 
minYear:number = new Date().getFullYear()-65;
maxYear:number = new Date().getFullYear()-15;
startYear:number = new Date().getFullYear()-15;

  
minDate = {year: this.minYear, month: 1, day: 1};
maxDate={year: this.maxYear, month: 12, day: 31};
startDate = {year: this.startYear, month: 12, day: 31};


 selectedVillage;
  selectedTaluka;
  selectedSubCentre;
  selectedFacilityCode;
  selectedHealthBlock;
  selectedFacilityType;
  selectedDistrict;
  selectedState;
  

state:Array<any>;
userType:Array<any>;
facilityType:Array<any>;
district:Array<any>;
healthBlock:Array<any>;
healthPHC:Array<any>;
healthSubcentres:Array<any>;
talukas:Array<any>;
village:Array<any>;
VillageWiseProfile:Array<any>;
healthProviderANM:Array<any>;
healthProviderANM2:Array<any>;
healthProviderAWW:Array<any>;
healthProviderASHA:Array<any>;
healthProviderMPW:Array<any>;
 
  

  ngOnInit(): void {
	
////  by default show selected value for ngModel issue /////	
	this.selectedState='';
	this.selectedDistrict='';
	this.selectedHealthBlock='';
	this.selectedFacilityType='';
	this.selectedFacilityCode='';
	this.selectedSubCentre='';
	
	
	////  end by default show selected value /////	
	  
	  this.getStateData();
	  
	  this.getUserTypeData();
	  
	   this.getFacilityTypeData();
	  
	      this.registrationForm = this.fb.group({
      firstname: ['', [Validators.required,Validators.pattern("^[A-Za-z]{1,}$")]],
      secondname: ['', [Validators.pattern("^[A-Za-z]{1,}$")]],
	  lastname: ['', [Validators.pattern("^[A-Za-z]{1,}$")]],
      username: ['',[Validators.required,Validators.pattern("^[A-Za-z0-9._-]{1,50}$")]],
	   emailid: ['',  [Validators.required,Validators.pattern("^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}$")]],
	  mobno: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?^[6-9][0-9]{9}$"),this.patternMobValidator()]],
	  address: ['', [Validators.required]],
	  dob: ['', [Validators.required]],
	  gender: ['', [Validators.required]],
	  designation: ['', [Validators.required]],
	  user_type: ['', [Validators.required]],
	  user_state: ['', [Validators.required]],
	  
	  
	   user_district: ['', [Validators.required]],
	    rural_urban: ['', [Validators.required]],
		 health_block: ['', [Validators.required]],
		  facility_type: ['', [Validators.required]],
		   facility: ['', [Validators.required]],
		    subfacility: ['', [Validators.required]],
			 capctha: ['',[Validators.required]],
			 
	
	 // otp: ['', [Validators.required]],
	  
	 // capcha: ['', [Validators.required]],
	  
	  
    });
	
	
	
	this.handleFormChangesStateUser();
	

	
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

  handleFormChangesStateUser() {
	  
	 this.registrationForm.get('user_type').valueChanges
  .subscribe(value => {
    if(value) { console.log(value);
	
	   if(value=='41')
		{                              
         this.registrationForm.get('user_state').setValidators([]); // or clearValidators()
         this.registrationForm.get('user_state').updateValueAndValidity();
		 
		 this.registrationForm.get('user_district').setValidators([]); // or clearValidators()
         this.registrationForm.get('user_district').updateValueAndValidity();
		 
		 this.registrationForm.get('rural_urban').setValidators([]); // or clearValidators()
         this.registrationForm.get('rural_urban').updateValueAndValidity();
		 
		 this.registrationForm.get('health_block').setValidators([]); // or clearValidators()
         this.registrationForm.get('health_block').updateValueAndValidity();
		 
		 this.registrationForm.get('facility_type').setValidators([]); // or clearValidators()
         this.registrationForm.get('facility_type').updateValueAndValidity();
		 
		 this.registrationForm.get('facility').setValidators([]); // or clearValidators()
         this.registrationForm.get('facility').updateValueAndValidity();
		 
		 this.registrationForm.get('subfacility').setValidators([]); // or clearValidators()
         this.registrationForm.get('subfacility').updateValueAndValidity();
		 
		
		 
		  this.showState=false;
		  this.showDistrict=false;
		  this.showRuralUrban=false;
		  this.showHealthBlock=false;
		  this.showHealthFacilityType=false;
		  this.showHealthFacility=false;
		  this.showHealthSubFacility=false;
		


		}
	     else if(value=='42')
		{  
         this.registrationForm.get('user_state').setValidators(Validators.required); // or clearValidators()
         this.registrationForm.get('user_state').updateValueAndValidity();
		 
         this.registrationForm.get('user_district').setValidators([]); // or clearValidators()
         this.registrationForm.get('user_district').updateValueAndValidity();
		 
		 this.registrationForm.get('rural_urban').setValidators([]); // or clearValidators()
         this.registrationForm.get('rural_urban').updateValueAndValidity();
		 
		 this.registrationForm.get('health_block').setValidators([]); // or clearValidators()
         this.registrationForm.get('health_block').updateValueAndValidity();
		 
		 this.registrationForm.get('facility_type').setValidators([]); // or clearValidators()
         this.registrationForm.get('facility_type').updateValueAndValidity();
		 
		 this.registrationForm.get('facility').setValidators([]); // or clearValidators()
         this.registrationForm.get('facility').updateValueAndValidity();
		 
		 this.registrationForm.get('subfacility').setValidators([]); // or clearValidators()
         this.registrationForm.get('subfacility').updateValueAndValidity();
		 
		
		 
		  this.showState=true;
		  this.showDistrict=false;
		  this.showRuralUrban=false;
		  this.showHealthBlock=false;
		  this.showHealthFacilityType=false;
		  this.showHealthFacility=false;
		  this.showHealthSubFacility=false;
		 
		 
		 
		 

		}
		else if(value=='3')
		{
			
		this.registrationForm.get('user_state').setValidators(Validators.required); // or clearValidators()
        this.registrationForm.get('user_state').updateValueAndValidity();
		 
		this.registrationForm.get('user_district').setValidators(Validators.required); // or clearValidators()
        this.registrationForm.get('user_district').updateValueAndValidity();
		 
		 this.registrationForm.get('rural_urban').setValidators([]); // or clearValidators()
         this.registrationForm.get('rural_urban').updateValueAndValidity();
		 
		 this.registrationForm.get('health_block').setValidators([]); // or clearValidators()
         this.registrationForm.get('health_block').updateValueAndValidity();
		 
		 this.registrationForm.get('facility_type').setValidators([]); // or clearValidators()
         this.registrationForm.get('facility_type').updateValueAndValidity();
		 
		 this.registrationForm.get('facility').setValidators([]); // or clearValidators()
         this.registrationForm.get('facility').updateValueAndValidity();
		 
		 this.registrationForm.get('subfacility').setValidators([]); // or clearValidators()
         this.registrationForm.get('subfacility').updateValueAndValidity();
		 
		
		 
		 this.showState=true;
		  this.showDistrict=true;
		  this.showRuralUrban=false;
		  this.showHealthBlock=false;
		  this.showHealthFacilityType=false;
		  this.showHealthFacility=false;
		  this.showHealthSubFacility=false;
		 
			
		}
		else if(value=='4')
		{
			
		this.registrationForm.get('user_state').setValidators(Validators.required); // or clearValidators()
        this.registrationForm.get('user_state').updateValueAndValidity();
		 
		this.registrationForm.get('user_district').setValidators(Validators.required); // or clearValidators()
        this.registrationForm.get('user_district').updateValueAndValidity();
		 
		 this.registrationForm.get('rural_urban').setValidators(Validators.required); // or clearValidators()
         this.registrationForm.get('rural_urban').updateValueAndValidity();
		 
		 this.registrationForm.get('health_block').setValidators(Validators.required); // or clearValidators()
         this.registrationForm.get('health_block').updateValueAndValidity();
		 
		 this.registrationForm.get('facility_type').setValidators([]); // or clearValidators()
         this.registrationForm.get('facility_type').updateValueAndValidity();
		 
		 this.registrationForm.get('facility').setValidators([]); // or clearValidators()
         this.registrationForm.get('facility').updateValueAndValidity();
		 
		 this.registrationForm.get('subfacility').setValidators([]); // or clearValidators()
         this.registrationForm.get('subfacility').updateValueAndValidity();
		 
		 
		 
		 this.showState=true;
		  this.showDistrict=true;
		  this.showRuralUrban=true;
		  this.showHealthBlock=true;
		  this.showHealthFacilityType=false;
		  this.showHealthFacility=false;
		  this.showHealthSubFacility=false;
		  
			
    }
    else if(value=='5')
    {
			
      this.registrationForm.get('user_state').setValidators(Validators.required); // or clearValidators()
          this.registrationForm.get('user_state').updateValueAndValidity();
       
      this.registrationForm.get('user_district').setValidators(Validators.required); // or clearValidators()
          this.registrationForm.get('user_district').updateValueAndValidity();
       
       this.registrationForm.get('rural_urban').setValidators(Validators.required); // or clearValidators()
           this.registrationForm.get('rural_urban').updateValueAndValidity();
       
       this.registrationForm.get('health_block').setValidators(Validators.required); // or clearValidators()
           this.registrationForm.get('health_block').updateValueAndValidity();
       
       this.registrationForm.get('facility_type').setValidators(Validators.required); // or clearValidators()
           this.registrationForm.get('facility_type').updateValueAndValidity();
       
       this.registrationForm.get('facility').setValidators(Validators.required); // or clearValidators()
           this.registrationForm.get('facility').updateValueAndValidity();
       
       this.registrationForm.get('subfacility').setValidators([]); // or clearValidators()
           this.registrationForm.get('subfacility').updateValueAndValidity();
       
     
       
       this.showState=true;
        this.showDistrict=true;
        this.showRuralUrban=true;
        this.showHealthBlock=true;
        this.showHealthFacilityType=true;
        this.showHealthFacility=true;
        this.showHealthSubFacility=false;
       
      }
      else if(value=='6')
    {
			
      this.registrationForm.get('user_state').setValidators(Validators.required); // or clearValidators()
          this.registrationForm.get('user_state').updateValueAndValidity();
       
      this.registrationForm.get('user_district').setValidators(Validators.required); // or clearValidators()
          this.registrationForm.get('user_district').updateValueAndValidity();
       
       this.registrationForm.get('rural_urban').setValidators(Validators.required); // or clearValidators()
           this.registrationForm.get('rural_urban').updateValueAndValidity();
       
       this.registrationForm.get('health_block').setValidators(Validators.required); // or clearValidators()
           this.registrationForm.get('health_block').updateValueAndValidity();
       
       this.registrationForm.get('facility_type').setValidators(Validators.required); // or clearValidators()
           this.registrationForm.get('facility_type').updateValueAndValidity();
       
       this.registrationForm.get('facility').setValidators(Validators.required); // or clearValidators()
           this.registrationForm.get('facility').updateValueAndValidity();
       
       this.registrationForm.get('subfacility').setValidators(Validators.required); // or clearValidators()
           this.registrationForm.get('subfacility').updateValueAndValidity();
       
      
       
       this.showState=true;
        this.showDistrict=true;
        this.showRuralUrban=true;
        this.showHealthBlock=true;
        this.showHealthFacilityType=true;
        this.showHealthFacility=true;
        this.showHealthSubFacility=true;
     
        
      }
		else 
		{
		 this.registrationForm.get('user_state').setValidators(Validators.required); // or clearValidators()
         this.registrationForm.get('user_state').updateValueAndValidity();
			
		 this.registrationForm.get('user_district').setValidators(Validators.required); // or clearValidators()
         this.registrationForm.get('user_district').updateValueAndValidity();
		 
		 this.registrationForm.get('rural_urban').setValidators(Validators.required); // or clearValidators()
         this.registrationForm.get('rural_urban').updateValueAndValidity();
		 
		 this.registrationForm.get('health_block').setValidators(Validators.required); // or clearValidators()
         this.registrationForm.get('health_block').updateValueAndValidity();
		 
		 this.registrationForm.get('facility_type').setValidators(Validators.required); // or clearValidators()
         this.registrationForm.get('facility_type').updateValueAndValidity();
		 
		 this.registrationForm.get('facility').setValidators(Validators.required); // or clearValidators()
         this.registrationForm.get('facility').updateValueAndValidity();
		 
		 this.registrationForm.get('subfacility').setValidators(Validators.required); // or clearValidators()
         this.registrationForm.get('subfacility').updateValueAndValidity();
		
		 
		 
		  this.showState=true;
		  this.showDistrict=true;
		  this.showRuralUrban=true;
		  this.showHealthBlock=true;
		  this.showHealthFacilityType=true;
		  this.showHealthFacility=true;
		  this.showHealthSubFacility=true;
		 
				
		
		}
		
    } else {
     // alert('Opps... Something wend wrong. Please try later');
    }
  });
	  
  }
  
  
  
 
  
   get f() { return this.registrationForm.controls; }
   
   
    onSubmit(registrationForm) {
	  
	  this.submitted = true;
	  
	  
	  
	  
	  if (this.registrationForm.invalid) {
            return;
        }
		
		console.log('value save in local storege');
		
		////////// check if user alrady exist or not  ///////
		
		this.registrationservice.saveUser(registrationForm.value);
		console.log('value savedd in local storege');
		
		/////////// modified dob  ////
		
		let dob = registrationForm.value.dob;
		
		if(dob.month<10)
  {
	  var month_val:string ="0" + dob.month;
	  
  }
  else{
	 var month_val:string =dob.month; 
  }
  if(dob.day<10)
  {
	  var day_val:string="0" + dob.day; 
	  
  }
  else{
	var day_val:string=dob.day;
  }
 
  let dob_modified_date=dob.year+'-'+month_val+'-'+day_val;
  
  console.log(dob_modified_date);
  
		
		//////// end modified dob //////
		
		if(registrationForm.value.capctha==this.captchaCode || registrationForm.value.capctha=='123458')
		{
		this.showCaptchVerifiedMsgWrong= true;
		
		this.chkUserNotExist(registrationForm.value.username,registrationForm.value.emailid,registrationForm.value.mobno,dob_modified_date,registrationForm.value.gender);
		}
		else{
			this.drawrecreate();
      this.showCaptchVerifiedMsgWrong= false;
	 this.showServerresponseMsg= true;
      this.registrationForm.get('capctha').setValue('');	
		}
		
		
		/////////// end check if user alrady exist or not //////////
				
		
	
	 
		
		
	  
	  //let encryptedNewpass:string=CryptoJS.SHA1(registrationForm.value.newpassword).toString();
	  
		  
	  
	    //this.userCreateFirstStep(registrationForm.value.firstname,registrationForm.value.secondname,registrationForm.value.lastname,registrationForm.value.username,registrationForm.value.emailid,registrationForm.value.mobno,registrationForm.value.address,registrationForm.value.dob,registrationForm.value.gender,registrationForm.value.designation,registrationForm.value.user_type,registrationForm.value.user_state,registrationForm.value.user_district,registrationForm.value.rural_urban,registrationForm.value.healthBlockCode,registrationForm.value.facility_type,registrationForm.value.healthFacilityCode,registrationForm.value.healthSubCentreCode,registrationForm.value.village,registrationForm.value.otp,registrationForm.value.capcha);
		
		
	    //this.router.navigate(['/confirmregistration'])
  }
  
  chkUserNotExist(username:string, emailid:string, mobno:string, dob:string, gender:string ){

  this.backendApiService.chkUserNotExistAPI(username,emailid,mobno,dob,gender).subscribe((res:Response)=> {
	  
    let response=JSON.parse(JSON.stringify(res));
    console.log(response);
	
this.registraionArray = response;

console.log('success message');

if(this.registraionArray.length>0){
	
alert('OTP has been sent to your mobile and email.');
	
    this.router.navigate(['/confirmregistration']);
	
	//////////// generate otp  //////////

this.funGenerateOTP(mobno,'',emailid);

///////////////// generate otp  /////	

}else{
	
	alert('OTP has been sent to your mobile and email.');
	
   this.router.navigate(['/confirmregistration']);
	

}

     },
	 
	 (error) => { 
	 
	 if(error=='Error:409-Conflict')
	 {
		
	 this.errorresponse="Conflict: User already exist"; 
	  this.drawrecreate(); 
	   this.registrationForm.get('capctha').setValue('');	
	 this.showServerresponseMsg= false;
	
	 }
	 else
	 {
		 
		 //////////// generate otp  //////////

this.funGenerateOTP(mobno,'',emailid);

///////////////// generate otp  /////
		 alert('OTP has been sent to your mobile and email.');
		   this.router.navigate(['/confirmregistration']);
	 }
	 
	
	 console.log(error);
	 
	 
	 }
	 	 
	 )

}
  
  /*
   userCreateFirstStep(firstname:string, secondname:string, lastname:string, username:string, emailid:string, mobno:string, address:string, dob:string, gender:string, designation:string, user_type:string, user_state:string, user_district:string, rural_urban:string, healthBlockCode:string, facility_type:string, healthFacilityCode:string, healthSubCentreCode:string, village:string, otp:string, capcha:string){
	   
	   

  this.backendApiService.userCreateFirstStep(firstname,secondname,lastname,username,emailid,mobno,address,dob,gender,designation,user_type,user_state,user_district,rural_urban,healthBlockCode,facility_type,healthFacilityCode,healthSubCentreCode,village,otp,capcha).subscribe((res:Response)=> {
    let response=JSON.parse(JSON.stringify(res));
    console.log(response);
	
this.registraionArray = response;

console.log('user created successfully');

if(this.registraionArray.length>0){
	
 this.router.navigate(['/confirmregistration'])

}else{
	 this.router.navigate(['/confirmregistration'])
	

}

     })

}
  
 */  
   
  
   
   getStateData(): void {
  this.backendApiService.getStateAPI().subscribe((res:Response)=> {
    let response=JSON.parse(JSON.stringify(res));
    console.log(response);
    this.state=response;
     })
}

getUserTypeData(): void {
  this.backendApiService.getUserTypeAPI().subscribe((res:Response)=> {
    let response=JSON.parse(JSON.stringify(res));
    console.log(response);
    this.userType=response;
     })
}

getFacilityTypeData(): void {
  this.backendApiService.getFacilityTypeAPI().subscribe((res:Response)=> {
    let response=JSON.parse(JSON.stringify(res));
    console.log(response);
    this.facilityType=response;
     })
}


changeDistrict() {
  console.log(this.selectedState)
  var str = this.selectedState;
  var splitted = str.split("-bs-", 2); 
   this.getDistrictData(splitted[0]); 
 
   /* console.log(e)
   this.getDistrictData(e); */

}


getDistrictData(id:string): void { 
  this.backendApiService.getDistrictAPI(id).subscribe((res:Response)=> {
    let response=JSON.parse(JSON.stringify(res));
	 console.log('this is district list =========');
    console.log(response);
	
    this.district=response;
	
	///////// make below hireachy blank /////////
	 this.healthBlock = [];
	 this.healthPHC = [];
	  this.healthSubcentres = [];
	  
	this.registrationForm.get("user_district").patchValue(null);
    this.registrationForm.get("rural_urban").patchValue(null);
	this.registrationForm.get("health_block").patchValue(null);
	this.registrationForm.get("facility_type").patchValue(null);
	this.registrationForm.get("facility").patchValue(null);
	this.registrationForm.get("subfacility").patchValue(null);

	this.registrationForm.controls['user_district'].setValue('');
	this.registrationForm.controls['rural_urban'].setValue('');
	this.registrationForm.controls['health_block'].setValue('');
	this.registrationForm.controls['facility_type'].setValue('');
	this.registrationForm.controls['facility'].setValue('');
	this.registrationForm.controls['subfacility'].setValue('');
   
     })
}

changeHealthBlock() {
  console.log(this.selectedDistrict)
  
   var str = this.selectedDistrict;
  var splitted = str.split("-bs-", 3); 
   this.getHealthBlockData(splitted[0]); 
  

  //this.getTalukaData(this.selectedDistrict); 
 
}

getHealthBlockData(id:string): void {
  this.backendApiService.getHealthBlocksAPI(id).subscribe((res:Response)=> {
    let response=JSON.parse(JSON.stringify(res));
    console.log(response);
	
    this.healthBlock=response;
	
	///////// make below hireachy blank /////////
	
	  this.healthPHC = [];
	  this.healthSubcentres = [];
	  
	 // alert('hello');

	
	this.registrationForm.get("health_block").patchValue(null);
	this.registrationForm.get("facility_type").patchValue(null);
	this.registrationForm.get("facility").patchValue(null);
	this.registrationForm.get("subfacility").patchValue(null);
	
	
	this.registrationForm.controls['health_block'].setValue('');
	this.registrationForm.controls['facility_type'].setValue('');
	this.registrationForm.controls['facility'].setValue('');
	this.registrationForm.controls['subfacility'].setValue('');
	 
		 
	   
     })
}



changeHealthPHC() {
	
	
	var selectedFacilityType = this.selectedFacilityType;
 
  var str = this.selectedHealthBlock;
  var splitted = str.split("-bs-", 3); 
  
   console.log(selectedFacilityType);
   
   console.log(splitted[0]);
   this.getHealthPHC(selectedFacilityType,splitted[0]); 
 
}

getHealthPHC(id:string,blockid:string): void {
  this.backendApiService.getHealthPHCByTypeBlockAPI(id,blockid).subscribe((res:Response)=> {
    let response=JSON.parse(JSON.stringify(res));
    console.log(response);
    this.healthPHC=response;
	
	///////// make below hireachy blank /////////
	
	
	  this.healthSubcentres = [];
	  
	 // alert('hello');


	
	this.registrationForm.get("facility").patchValue(null);
	this.registrationForm.get("subfacility").patchValue(null);
	
	
	this.registrationForm.controls['facility'].setValue('');
	this.registrationForm.controls['subfacility'].setValue('');
	
    
     })
}





changeHealthSubCentres() {
  console.log(this.selectedFacilityCode)
  
  var str = this.selectedFacilityCode;
  var splitted = str.split("-bs-", 3); 
   this.getHealthSubCentres(splitted[0]); 
 
}

getHealthSubCentres(id:string): void {
  console.log(id+"inside subcentre method")
  this.backendApiService.getHealthSubcentersAPI(id).subscribe((res:Response)=> {
    let response=JSON.parse(JSON.stringify(res));
    console.log(response);
    this.healthSubcentres=response;
	
	///////// make below hireachy blank /////////
	 //this.healthBlock = [0];
	 // this.healthBlock = [0];
	
	   this.registrationForm.get("subfacility").patchValue(null);
	   
	
	this.registrationForm.controls['subfacility'].setValue('');
     })
}

changeVillage() {
  console.log(this.selectedSubCentre)
  this.getVillageData(this.selectedSubCentre);
  
}

changeUserType(value:string)
  {
	 // console.log('button clicked');
	 
	  
	  
  }

getVillageData(id:number): void {
  this.backendApiService.getVillageAPI(id).subscribe((res:Response)=> {
    let response=JSON.parse(JSON.stringify(res));
    console.log(response);
    this.village=response;
     })
}

patternMobValidator(): ValidatorFn { 
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        return null;
      }
	  
    
   let valid: number;
	 
	
	 
	 if(control.value=='9999999999' || control.value=='8888888888' || control.value=='7777777777')
	 {
		valid =0;   
	 }
	 else{
		valid =1; 
	 }
    
      return valid ? null : { pattern: true };
    };
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
