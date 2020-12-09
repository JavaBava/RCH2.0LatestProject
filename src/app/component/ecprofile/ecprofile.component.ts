import { Component, OnInit, ViewChild,Renderer2 } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, Form } from '@angular/forms';
import { BackendAPIService } from '../service/backend-api.service';
import { environment } from 'src/environments/environment';
import { HierarchyModel } from '../../Core/Model/hierarchyModel'
import { HierarchyComponent } from '../hierarchy/hierarchy.component'
import { HierarchyService } from 'src/app/Core/service/hierarchy/hierarchy.service';
import { ECModel } from '../../Core/Model/ec-model';
import { TokenStorageService } from 'src/app/Core/service/token/tokenstoreage.service';
import { JsonPipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';
import { ModalDismissReasons, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { isBetween } from 'ngx-bootstrap/chronos/utils/date-compare';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';


@Component({
  selector: 'app-ecprofile',
  templateUrl: './ecprofile.component.html',
  styleUrls: ['./ecprofile.component.css']
})
export class EcprofileComponent implements OnInit {

  editableSearch:boolean=false;
  //************************************************************************************************************ */
/*
searchArray:Array<any>=[
  {RCHID: 12345678952, womenName: "test",husbandName: "test", womenmobile: "9874563210",caseNo: "test",dob: "20/12/2000", dor: "20/12/2019",cs: "test"},
  {RCHID: 12345672552, womenName: "test",husbandName: "test", womenmobile: "9874563210",caseNo: "test",dob: "20/12/2000", dor: "20/12/2019",cs: "test"},

];

*/

searchArray:Array<any>=[];
pagestatus:string

useSeachHandler(e){ 

//document.searchForm.controls['HusbandFirstname'].setValue('');

//alert('search response on ecprofile===');

  console.log('search response on ecprofile===')

  /* // alert(e.status);
   //alert(e.data);
   console.log('datavalue===');
   console.log(e.data[0])
   //console.log(e.data[0].state_code)
   
  console.log(e)
  this.searchArray=[];
  if(e.status==true)
  {
	  
	  for (var val of e.data) {
       console.log(val); 
	   //alert(val.state_code);
	   
	   this.searchArray = [{RCHID: val.registration_no, womenName: val.name_wife,husbandName: val.name_husband, womenmobile: val.mobile_no,caseNo: "test",dob: "", dor: val.date_regis,cs: "test",address: val.address}]; 
	   
       }
	  
  }
   */
  console.log(e.PWfirstname+e.HusbandFirstname+e.PWDOB+e.mobno)
  console.log((this.selectedState).toString())
  let husbandName
if(e.HusbandFirstname==undefined){
husbandName="";
}
else{
  husbandName=e.HusbandFirstname;
}
  let  data  = {
    "state_code": (this.selectedState).toString(),
    "district_code": (this.selectedDistrict).toString(),
    "block_code": (this.selectedHealthBlock).toString(),
    "facility_code": (this.selectedFacilityCode).toString(),
    "subfacility_code": (this.selectedSubCentre).toString(),
    "village_code": (this.selectedVillage).toString(),
    "name_wife":e.PWfirstname,
    "name_husband": husbandName,
    "mobile_no": e.mobno
  }


  this.searchECData(data)


/*
if(this.searchArray.length>0)  {
	
  document.getElementById("openModalButton").click();
 

}
else{
  if(this.selectedVillage!==undefined){
    this.validationMsg= false;
    this.vmsg=[];
   // this.fill_hierarchy=false
   this. toastr.error('No Record Found');

   //open ec page
   this.fill_hierarchy=false
  }
}

*/ 
}

    
  searchECData(data: any): void {
  //  //debugger
    window.localStorage.removeItem("ECT-EC")
    console.log(data)
    console.log(JSON.stringify(data))
    this.backendApiService.GetSearchUsersAPI(data).subscribe((res:Response)=> {
		 
      let response=JSON.parse(JSON.stringify(res));
      
      console.log('GetSearchUsersAPI=');
     console.log(response);
     //this.searchArray=response;
	 
	 
	 this.searchArray=[];
  if(response.status==true)
  { 
    this.editableSearch=false
   
	  /*for (var val of response.data) {
       console.log(val); 
	   //alert(val.state_code);
	   
	   this.searchArray = [{RCHID: val.registration_no, womenName: val.name_wife,husbandName: val.name_husband, womenmobile: val.mobile_no,caseNo: "test",dob: "", dor: val.date_regis,cs: "test",address: val.address}]; 
	   
       }*/
	   
     this.searchArray=response.data;
     if(this.searchArray[0].page_code =="EC")
     {this.pagestatus='Eligible Couple'     }
     else if(this.searchArray[0].page_code =="ECT")
     {this.pagestatus='EC tracking'     }
     else if(this.searchArray[0].page_code =="MR")
     {this.pagestatus='Mother registration'     }
     else if(this.searchArray[0].page_code =="MA")
     {this.pagestatus='Mother ANC'     }
     else if(this.searchArray[0].page_code =="MM")
     {this.pagestatus='Mother Medical'     }
     else if(this.searchArray[0].page_code =="MD")
     {this.pagestatus='Mother Delivery'     }
     else if(this.searchArray[0].page_code =="MI")
     {this.pagestatus='Mother Infant'     }
     else if(this.searchArray[0].page_code =="MP")
     {this.pagestatus='Mother PNC'     }
     else if(this.searchArray[0].page_code =="IP")
     {this.pagestatus='Infant PNC'     }
     else{
      this.pagestatus='null'
     }

	    document.getElementById("openModalButton").click();
	  
  }

  else if(response.status==false){
	 this.toastr.error('No Record Found'); 
	 this.createForm();
	  if(this.selectedVillage!==undefined){
    this.validationMsg= false;
    this.vmsg=[];
   // this.fill_hierarchy=false
 
   this.editableSearch=true
   //open ec page
   this.fill_hierarchy=false
   this.ECForm.controls['PWfirstname'].setValue(data.name_wife);
   this.ECForm.controls['HusbandFirstname'].setValue(data.name_husband);
   this.ECForm.controls['mobno'].setValue(data.mobile_no);

   this.ECForm.controls['PWfirstname'].disable();
   this.ECForm.controls['HusbandFirstname'].disable();
   this.ECForm.controls['mobno'].disable();
  }
  }
  this.ECForm.controls['PWfirstname'].enable();
  this.ECForm.controls['HusbandFirstname'].enable();
  this.ECForm.controls['mobno'].enable(); 
      },(error) => {
		  
        
         //alert('Something went wrong. Please try letter');	   
    console.log('error in GetSearchUsersAPI function');
    console.log(error);
   
    })
 }
 

 edit(e){
  //debugger
  console.log(e.registration_no)
  document.getElementById("closeButton").click();
  if(e.page_code=="EC"){
    this.fill_hierarchy = false;
    
    this.getecdetails(Number(e.registration_no));  
  
    
  }
  else if(e.page_code=="ECT"){
    window.localStorage.setItem("rchid", "SearchEct")
  window.localStorage.setItem("ID",String(e.registration_no))
  this.router.navigate(['home/ectrack'])

  }
  else{
    alert("Coming soon")
  }
  
 /*  //this.fill_hierarchy=false;
  if (this.selectedVillage !== undefined) {
    this.hierarchyMsg = false;
    this.hmsg = '';
    this.fill_hierarchy = false
    let RCHID: string = this.route.snapshot.queryParamMap.get('ID')
    this.rchId = Number(this.route.snapshot.queryParamMap.get('ID'));
   
    if (RCHID != "" && RCHID != null)
        {      this.getecdetails(this.rchId);    }

  } 
  */
  
  

}
    closeResult: string;

    @ViewChild('mymodal1', {static: false}) myHiddenBtn;
  
  
    open(content) {
      console.log(content)
      this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title',size: 'xl'}).result.then((result) => { 
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        this.fill_hierarchy=false
      });
    } 
    
    private getDismissReason(reason: any): string { 
      if (reason === ModalDismissReasons.ESC) { 
        return 'by pressing ESC';
      } else if (reason === ModalDismissReasons.BACKDROP_CLICK) { 
        return 'by clicking on a backdrop';
      } else {
        return  `with: ${reason}`;
      }
    }
  
  //************************************************************************************ */

 
  ecmodel = new ECModel();
  @ViewChild(HierarchyComponent) hc;
  hierarchyMobj = new HierarchyModel();
  da: Date;
  validationMsg: boolean = false;
  hierarchyMsg: boolean = false;
  vmsg: string[] = [];
  hmsg: string = '';
  fill_hierarchy = true
  RuralUrban: string; talukacode: string; wardcode: number
  rchId: number;
  ipAddress: string
  dateformate: string;
  gen_rchid: number;
  selectedVillage;
  selectedSubCentre;
  selectedFacilityCode;
  selectedFacilityType;
  selectedHealthBlock;
  selectedDistrict;
  selectedState;
  selectedBank;
  selectEducations;
  selectReligions;
  selectOccupations;
  selectedRegDate;
  parentState;parentDistrict;parentTaluka; parentBlock;parentFacility ;parentSubcenter ;parentVillage;parentFacilityType;


  divHusband = true;
  AadhaarDisabled = true; AccountNoDisabled = false; PWAccountDisabled = false; YoungestChildGender = false
  //div1: boolean = true;
  marked = false; showYoungestchild = false; btncontinue = false;
  theCheckbox = false;
  theCheckboxH = false
  selectedFinencialYear;
  ChildBornSum = 0; ChildBornM = 0; ChildBornF = 0; ChildBornO = 0;
  vChildLivingM = 0; vChildLivingF = 0; vChildLivingO = 0; ChildLivingSum = 0;

  minDate = { year: 2011, month: 4, day: 1 };
  //maxDate={year: this.maxYear, month: 1, day: 1};
  maxDate = { year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate() };
  minDate_PWDOB = { year: new Date().getFullYear() - 60, month: new Date().getMonth() + 1, day: new Date().getDate() }
  maxDate_PWDOB = { year: new Date().getFullYear() - 10, month: new Date().getMonth() + 1, day: new Date().getDate() }
  minDate_HDOB = { year: new Date().getFullYear() - 99, month: new Date().getMonth() + 1, day: new Date().getDate() }
  maxDate_HDOB = { year: new Date().getFullYear() - 10, month: new Date().getMonth() + 1, day: new Date().getDate() }

  ECForm: FormGroup;
  submitted = false;
  Editmode=false; usertypeid: number;
  bankname: Array<any>;
  educations: Array<any>;
  occupations: Array<any>;
  religions: Array<any>;
  healthProviderANM: Array<any>;
  healthProviderASHA: Array<any>;
  healthProviderMPW: Array<any>;
  whosemobile: Array<any> = [{ id: 'W', whosemobile: 'Self' }, { id: 'H', whosemobile: 'Husband' }, { id: 'N', whosemobile: 'Neighbour' }, { id: 'R', whosemobile: 'Relative' }, { id: 'O', whosemobile: 'Other' }];

  childgender: Array<any> = [{ id: 'M', childgender: 'Male' }, { id: 'F', childgender: 'Female' }, { id: 'O', childgender: 'Other' }]

  constructor(private toastr: ToastrService, private formBuilder: FormBuilder, private backendApiService: BackendAPIService, private hierarchyService: HierarchyService,public datepipe: DatePipe,
    private tokenservice: TokenStorageService, public router: Router, config: NgbModalConfig, private modalService: NgbModal, private http: HttpClient, private route: ActivatedRoute, private renderer: Renderer2) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  usehierarchyHandler(hierarchyMobj: HierarchyModel) {

    this.hierarchyMobj = hierarchyMobj;
    this.selectedVillage = this.hierarchyMobj.villageid
    this.selectedSubCentre = this.hierarchyMobj.subfacilityid
    this.selectedFacilityCode = this.hierarchyMobj.facilityid
    this.selectedFacilityType = this.hierarchyMobj.facilitytypeid
    this.selectedHealthBlock = this.hierarchyMobj.blockid
    this.selectedDistrict = this.hierarchyMobj.districtid
    this.selectedState = this.hierarchyMobj.stateid
    this.RuralUrban = this.hierarchyMobj.RuralUrban
    this.talukacode = this.hierarchyMobj.talukacode
    this.wardcode = this.hierarchyMobj.ward
    console.log("state : " + this.selectedState + " District : " + this.selectedDistrict + " Block : " +
      this.selectedHealthBlock + " Facility Type : " + this.selectedFacilityType + " Facility : " + this.selectedFacilityCode +
      " sub facility : " + this.selectedSubCentre + " village : " + this.selectedVillage + "ward:  " + this.wardcode + "taluka:  " + this.talukacode + "rualurabn:  " + this.RuralUrban)
     

    this.hierarchyMsg = false;
    this.hmsg = '';


    if (this.selectedState == undefined || this.selectedDistrict == undefined || this.selectedHealthBlock == undefined || this.selectedFacilityType == undefined || this.selectedFacilityCode == undefined || this.selectedSubCentre == undefined || this.selectedVillage==undefined) {
      this.hierarchyMsg = true;
      this.hmsg = ('Select Hierarchy');
      this.fill_hierarchy = true
      return;
    }
    

    if (this.ECForm.controls['healthProvider'].value >0) {
      console.log('already anm available')
          }else{
          this.fetchHealthProviderOnSubcentreAndVillage()}

          let RCHID: string =window.localStorage.getItem("ECT-EC")
          this.rchId = Number(window.localStorage.getItem("ECT-EC"))
         
          if (RCHID != "" && RCHID != null)
              { this.fill_hierarchy = false    
                 this.getecdetails(this.rchId); 
                
              }
/* 
    if( (this.selectedVillage !== undefined) ){
      this.hierarchyMsg = false;
      this.hmsg = '';
      this.fill_hierarchy = false


      let RCHID: string =window.localStorage.getItem("ECT-EC")
      this.rchId = Number(window.localStorage.getItem("ECT-EC"))
     
      if (RCHID != "" && RCHID != null)
          {      this.getecdetails(this.rchId); 
            
          }
  
    } */ 
  }


  ngOnInit(): void {
    this.createForm();
    // this.getStateData();
    this.getBankName();
    this.getReligions();
    this.getEducations();
    this.getOccupations();
    this.fetchHealthProviderOnSubcentreAndVillage();
    this.usertypeid = this.tokenservice.utypeId;
    this.AadhaarDisabled = true;
    //this.AccountNoDisabled=false;this.PWAccountNoDisabled=false;
    this.getNewIP();

    /* let RCHID: string = this.route.snapshot.queryParamMap.get('ID')
    this.rchId = Number(this.route.snapshot.queryParamMap.get('ID'));
   
    if (RCHID != "" && RCHID != null)
        {      this.getecdetails(this.rchId);    }  */

       
  }
  getNewIP() {
    this.http.get<{ ip: string }>('https://jsonip.com')
      .subscribe(data => {
        this.ipAddress = data.ip;

      })

  }






  private createForm() {
    this.ECForm = this.formBuilder.group({
      RegDate: new FormControl('', [Validators.required]),
      mobno: new FormControl('', [Validators.required, Validators.pattern('[6-9]{1}[0-9]{9}$'), Validators.maxLength(10)]),
      RCHID: new FormControl(''),
      healthProvider: new FormControl('', [Validators.required]),
      MPW: new FormControl(''),
      ASHA: new FormControl('', [Validators.required]),
      finanacialYr: new FormControl(''),

      PWfirstname: new FormControl('', [Validators.required, Validators.pattern('[A-Za-z. ]+')]),
      PWSecondname: new FormControl('', [Validators.pattern('[A-Za-z. ]+')]),
      PWLastname: new FormControl('', [Validators.pattern('[A-Za-z. ]+')]),
      PWAadhaarNo: new FormControl(''),
      PWAccountNoNotAvailable: new FormControl(''),
      PWAccountNo: new FormControl({ value: '', disabled: false, }, [Validators.pattern('[0-9]{9,20}')]),
      PWBankname: new FormControl({ value: '', disabled: false }),
      PWBranchname: new FormControl({ value: '', disabled: false }, [Validators.pattern('^([.0-9a-zA-Z\s ,])+$'), Validators.maxLength(50)]),
      PWIFSCcode: new FormControl({ value: '', disabled: false }, [Validators.pattern('^[A-Z|a-z]{4}[0][0-9]{6}$'), Validators.maxLength(11)]),
      PWAadharLink: new FormControl({ value: '0', disabled: false }),
      PWOccupation: new FormControl('', [Validators.required]),
      PWEducation: new FormControl('', [Validators.required]),
      PWage: new FormControl('', [Validators.required, Validators.maxLength(2), Validators.min(10),
      Validators.pattern('[1-5]{1}[0-9]*$')]),
      PWDOB: new FormControl({ value: '', disabled: true }),

      // rdpwdob: new FormControl({ value: '', checked: true }),
      // rdpwage: new FormControl({ value: '', disabled: false }),
      PWMarriageAge: new FormControl('', [Validators.maxLength(2), Validators.min(10),
      Validators.pattern('[1-5]{1}[0-9]*$')]),

      HusbandFirstname: new FormControl('', [Validators.pattern('[A-Za-z. ]+')]),
      HusbandSecondname: new FormControl('', [Validators.pattern('[A-Za-z. ]+')]),
      HusbandLastname: new FormControl('', [Validators.pattern('[A-Za-z. ]+')]),
      HusbandAadharNo: new FormControl(''),
      HusbandAccountNotAvailable: new FormControl(''),
      HusbandAccountNo: new FormControl({ value: '', disabled: false }, [Validators.pattern('[0-9]{9,20}')]),
      HusbandBankname: new FormControl({ value: '', disabled: false }),
      HusbandBranch: new FormControl({ value: '', disabled: false }, [Validators.pattern('^([.0-9a-zA-Z\s ,])+$'), Validators.maxLength(50)]),
      HusbandIFSC: new FormControl({ value: '', disabled: false }, [Validators.pattern('^[A-Z|a-z]{4}[0][0-9]{6}$'), Validators.maxLength(11)]),
      HusbandAadharLinked: new FormControl({ value: '0', disabled: false }),
      HusbandOccupation: new FormControl(''),
      HusbandEducation: new FormControl(''),
      // rdHusbanddob: new FormControl({ value: '', disabled: false }),
      // rdHusbandage: new FormControl({ value: '', disabled: false }),
      HusbandAgeid: new FormControl('husbandage'),
      //HusbandDOBid: new FormControl({ value: '', checked:false }),
      HusbandAge: new FormControl('', [Validators.maxLength(2), Validators.pattern('[1-9]{1}[0-9]*$')]),
      HusbandDOB: new FormControl({ value: '', disabled: true }),
      HusbandMarriageAge: new FormControl({ value: '', disabled: true }, [Validators.maxLength(2),
      Validators.pattern('[1-9]{1}[0-9]*$')]),

      Religion: new FormControl(''),
      Caste: new FormControl(''),
      Address: new FormControl('', [
        Validators.required,
        Validators.pattern('^([#.0-9a-zA-Z\s ,-_ &/\@]+(\r)?(\n)?)+$'),
        Validators.maxLength(100)
      ]),
      //^([A-Za-z0-9]+\.[A-Za-z0-9 ,/-@&.-\]+(\r)?(\n)?)+$
      Totalborn: new FormControl(0),
      MaleBorn: new FormControl(0),
      FemaleBorn: new FormControl(0),
      OtherBorn: new FormControl(0),
      TotalLive: new FormControl(0),
      MaleLive: new FormControl(0),
      FemaleLive: new FormControl(0),
      OtherLive: new FormControl(0),
      WhoseMobile: new FormControl('', [Validators.required]),
      Category: new FormControl(''),
      YoungestChildYear: new FormControl({ value: '', disabled: true }),
      YoungestChildMonth: new FormControl({ value: '', disabled: true }),
      YoungestChildSex: new FormControl({ value: '', disabled: true }),


    },
      { validator: [this.validMAge('PWage', 'PWMarriageAge')] }
    );
  }

  get f() { return this.ECForm.controls; }

  validMAge(PWage: any, PWMarriageAge: any) {
   ////debugger
    return (formGroup: FormGroup) => {
      const Womanage = formGroup.controls[PWage];
      const WomanMarriageAge = formGroup.controls[PWMarriageAge];
      if (Womanage.errors && WomanMarriageAge.errors) { return null }
      else {
        if (Womanage.value < WomanMarriageAge.value) {
          WomanMarriageAge.setErrors({ validMarriageAge: true });

        } else {
          WomanMarriageAge.setErrors(null);
        }
      }
    }
  }
  keydownfunction(e) {
    var charCode = e.keyCode;
    //alert(charCode)
    var invalidChars = [
      "-",
      "+",
      "e",
      "@",
      "_",
      "!", "#", "$", "%", "^", "&", "*", "(", ")"
    ];

    if (invalidChars.includes(e.key)) {
      e.preventDefault();
    }
   ////debugger
    if ((charCode >= 96 && charCode <= 105) || (charCode >= 48 && charCode <= 57) || charCode == 46 || charCode == 8 || charCode == 9) {

      //alert(charCode)
    }
    else {
      e.preventDefault();
      // alert('hi')
    }
  }

  validation(ECForm) {
    //debugger
    if (this.ECForm.controls['HusbandFirstname'].value == "" && this.marked == false) {
      this.validationMsg = true;
      this.vmsg.push('Husband First Name is required');
      return;
    }
    if (this.ECForm.invalid == true) {
      return;
    }
    /*  if(this.selectedState ==undefined || this.selectedDistrict ==undefined || this.selectedHealthBlock==undefined || this.selectedFacilityType ==undefined || this.selectedFacilityCode==undefined||this.selectedVillage==undefined){
       this.validationMsg= true;
       this.vmsg.push('Select Hierarchy First');
       return;
     } */
    if (this.ECForm.controls['healthProvider'].value == 0 && this.ECForm.controls['MPW'].value == 0) {
      this.validationMsg = true;
      this.vmsg.push('Either ANM or MPW name must be selected');
      return;
    }
    if (this.ECForm.controls['PWfirstname'].value == "") {
      this.validationMsg = true;
      this.vmsg.push('Woman First Name is required');
      return;
    }
    //-------PW Bank Validation--------------
    if (this.PWAccountDisabled == false && this.ECForm.controls['PWAccountNo'].value == "" && this.ECForm.controls['PWBankname'].value != "") {
      this.validationMsg = true;
      this.vmsg.push('Enter Woman Account Number');
      return;
    }

    if (this.PWAccountDisabled == false && this.ECForm.controls['PWAccountNo'].value != "" && this.ECForm.controls['PWBankname'].value == "") {
      this.validationMsg = true;
      this.vmsg.push('Enter Woman Bank Name');
      return;

    }
    if (this.PWAccountDisabled == false && this.ECForm.controls['PWBranchname'].value != "" && this.ECForm.controls['PWBankname'].value == "") {
      this.validationMsg = true;
      this.vmsg.push('Enter Woman Bank Name');
      return;
    }
    if (this.PWAccountDisabled == false && this.ECForm.controls['PWIFSCcode'].value != "" && this.ECForm.controls['PWBankname'].value == "") {
      this.validationMsg = true;
      this.vmsg.push('Enter Woman Bank Name');
      return;
    }
    //-------Husband Bank Validation--------------
    if (this.AccountNoDisabled == false && this.ECForm.controls['HusbandAccountNo'].value == "" && this.ECForm.controls['HusbandBankname'].value != "") {
      this.validationMsg = true;
      this.vmsg.push('Enter Husband Account Number');
      return;
    }

    if (this.AccountNoDisabled == false && this.ECForm.controls['HusbandAccountNo'].value != "" && this.ECForm.controls['HusbandBankname'].value == "") {
      this.validationMsg = true;
      this.vmsg.push('Enter Husband Bank Name');
      return;

    }
    if (this.AccountNoDisabled == false && this.ECForm.controls['HusbandBranch'].value != "" && this.ECForm.controls['HusbandBankname'].value == "") {
      this.validationMsg = true;
      this.vmsg.push('Enter Husband Bank Name');
      return;
    }
    if (this.AccountNoDisabled == false && this.ECForm.controls['HusbandIFSC'].value != "" && this.ECForm.controls['HusbandBankname'].value == "") {
      this.validationMsg = true;
      this.vmsg.push('Enter Husband Bank Name');
      return;
    }
    console.log(this.ECForm.controls['PWage'].value)



    return true;
  }
//////Save EC records //////////
  onSubmit(ECForm) {
   //debugger
    this.submitted = true;
    this.validationMsg = false; this.vmsg = [];
    // console.log(Boolean(this.validation(ECForm)));
    if (Boolean(this.validation(ECForm)) == false) {
      return
    }
    let da = this.ECForm.controls['RegDate'].value;
    if (da.month < 10) {
      var month_val: string = "0" + da.month;

    }
    else {
      var month_val: string = da.month;
    }
    if (da.day < 10) {
      var day_val: string = "0" + da.day;

    }
    else {
      var day_val: string = da.day;
    }

    let dob_modified_date = da.year + '-' + month_val + '-' + day_val;
    let data: ECModel = new ECModel();

    if (this.ECForm.controls['RCHID'].value == "") {
      this.submitted = true;
      // console.log("inside sumbit")
     
      ////debugger;
      data.stateCode = this.selectedState;
      data.districtCode = this.selectedDistrict;
      data.healthBlockCode = this.selectedHealthBlock;
      data.healthFacilityCode = this.selectedFacilityCode
      data.healthFacilityType = this.selectedFacilityType
      data.healthSubFacilityCode = this.selectedSubCentre
      data.villageCode = this.selectedVillage
      // console.log(this.ECForm.value)
      //alert(this.ECForm.controls['healthProvider'].value)

      data.anmId = Number(this.ECForm.controls['healthProvider'].value);
      if(this.ECForm.controls['MPW'].value ==''){
        data.mpwId =null
      }else{
      data.mpwId = Number(this.ECForm.controls['MPW'].value);}
      data.ashaId = Number(this.ECForm.controls['ASHA'].value);

      data.dateRegis = dob_modified_date;
      //data.dateRegis=this.ECForm.controls['RegDate'].value;

      //data.financialYr="2020-21";
      data.financialYr = String(this.ECForm.controls['finanacialYr'].value);


      data.nameWife = this.ECForm.controls['PWfirstname'].value;

      data.middleNameWife = this.ECForm.controls['PWSecondname'].value;
      data.lastNameWife = this.ECForm.controls['PWLastname'].value;
      data.aadharNo = 0
      if (this.PWAccountDisabled == false) {
        data.pwAccNo = String(this.ECForm.controls['PWAccountNo'].value);
        data.pwBankId = Number(this.ECForm.controls['PWBankname'].value);
        data.pwBranchName = this.ECForm.controls['PWBranchname'].value;
        data.pwIfsccode = this.ECForm.controls['PWIFSCcode'].value;
        data.pwAadhaarLinked = Number(this.ECForm.controls['PWAadharLink'].value);
      }
      else {
        data.pwAccNo = "";
        data.pwBankId = 0;
        data.pwBranchName = "";
        data.pwIfsccode = "";
        data.pwAadhaarLinked = 0;
      }
      data.pwOccupation = Number(this.ECForm.controls['PWOccupation'].value);
      data.pwLevelEducation = Number(this.ECForm.controls['PWEducation'].value);
      //data.wifeCurrentAge = 25;
      data.wifeCurrentAge = this.ECForm.controls['PWage'].value;
      data.pwDob = this.parseDate(this.ECForm.controls['PWDOB'].value);
      // data.pwDob = new Date();
      // data.pwDob=this.ECForm.controls['PWDOB'].value;
      if (this.ECForm.controls['PWMarriageAge'].value != "") {
        data.wifeMarryAge = Number(this.ECForm.controls['PWMarriageAge'].value);
      }
      else {
        data.wifeMarryAge = 0;
      }

      if (this.marked = true) {
        data.nameHusband = this.ECForm.controls['HusbandFirstname'].value;
        data.middleNameHusband = this.ECForm.controls['HusbandSecondname'].value;
        data.lastNameHusband = this.ECForm.controls['HusbandLastname'].value;
        data.husbandAadhaarNo = 0
        if (this.AccountNoDisabled == false) {
          data.husbandAccNo = String(this.ECForm.controls['HusbandAccountNo'].value);
          data.husbandBankId = Number(this.ECForm.controls['HusbandBankname'].value);
          data.husbandBranchName = this.ECForm.controls['HusbandBranch'].value;
          data.husbandIfsccode = this.ECForm.controls['HusbandIFSC'].value;
          data.husbandAadhaarLinked = Number(this.ECForm.controls['HusbandAadharLinked'].value);
        }
        else {
          data.husbandAccNo = "";
          data.husbandBankId = 0;
          data.husbandBranchName = "";
          data.husbandIfsccode = "";
          data.husbandAadhaarLinked = 0;
        }
        data.husbandOccupation = Number(this.ECForm.controls['HusbandOccupation'].value);
        data.husbandLevelEducation = Number(this.ECForm.controls['HusbandEducation'].value);

        if (this.ECForm.controls['HusbandAge'].value != "") {
          data.husCurrentAge = Number(this.ECForm.controls['HusbandAge'].value)
          data.husbandDob = this.parseDate(this.ECForm.controls['HusbandDOB'].value);
          data.husMarryAge = Number(this.ECForm.controls['HusbandMarriageAge'].value);
        }
        else {
          data.husCurrentAge = 0
          data.husbandDob = null
          data.husMarryAge = 0
        }
        // data.husCurrentAge=this.ECForm.controls['HusbandAge'].value;
        // data.husbandDob = new Date()


      }
      else {
        data.nameHusband = "";
        data.middleNameHusband = "";
        data.lastNameHusband = "";
        data.husbandAadhaarNo = 0
        data.husbandAccNo = "";
        data.husbandBankId = 0;
        data.husbandBranchName = "";
        data.husbandIfsccode = "";
        data.husbandAadhaarLinked = 0;
        data.husbandOccupation = 0;
        data.husbandLevelEducation = 0;
        data.husCurrentAge = 0;
        // data.husCurrentAge=this.ECForm.controls['HusbandAge'].value;
        data.husbandDob = null;
        //data.husbandDob=this.ECForm.controls['HusbandDOB'].value;
        data.husMarryAge = 0;
      }
      data.religionCode = Number(this.ECForm.controls['Religion'].value);
      data.caste = Number(this.ECForm.controls['Caste'].value);
      if (this.ECForm.controls['Address'].value == "") { alert("Enter Address") } else {
        data.address = this.ECForm.controls['Address'].value;
      }
      //data.bor=this.ECForm.controls['Totalborn'].value;
      data.maleChildBorn = Number(this.ECForm.controls['MaleBorn'].value);
      data.femaleChildBorn = Number(this.ECForm.controls['FemaleBorn'].value);
      data.otherChildBorn = Number(this.ECForm.controls['OtherBorn'].value);
      //data.toal=this.ECForm.controls['TotalLive'].value;
      data.maleChildLive = Number(this.ECForm.controls['MaleLive'].value);
      data.femaleChildLive = Number(this.ECForm.controls['FemaleLive'].value);
      data.otherChildLive = Number(this.ECForm.controls['OtherLive'].value);
      data.mobileNo = this.ECForm.controls['mobno'].value;
      data.whoseMobile = this.ECForm.controls['WhoseMobile'].value;
      data.bplApl = Number(this.ECForm.controls['Category'].value);
      data.youngChildAgeYear = Number(this.ECForm.controls['YoungestChildYear'].value);
      data.youngChildAgeMonth = Number(this.ECForm.controls['YoungestChildMonth'].value);
      data.youngChildGender = (this.ECForm.controls['YoungestChildSex'].value);
      data.createdBy = this.tokenservice.getUserId();
      data.createdOn = new Date();
      data.financialYear = da.year;
      data.rurUrbHierarchy = this.RuralUrban
      data.registerSrno = 99
      data.caseNo = 1
      data.flag = 0
      data.ruralUrban = this.RuralUrban
      data.talukaCode = this.talukacode
      //alert(data.talukaCode)
      data.ipAddress = this.ipAddress
      data.wardNo = this.wardcode
      data.updatedBy = null;
      data.sourceId = 0
      data.infertilityStatus = ""
      // alert("checking for post data")
      // alert(data)
     /*  let v=JSON.stringify(data) 
       console.log(v)
       alert(v);  */ 
       
      this.postECData(data);

    }
    else {
      if(this.Editmode==false){
      alert("Beneficiary already registered. RCH ID :  : " + this.ECForm.controls['RCHID'].value)}
      else{
console.log('Edit mode ON')
data.stateCode = this.parentState
      data.districtCode = this.parentDistrict
      data.healthBlockCode = this.parentBlock;
      data.healthFacilityCode = this.parentFacility
      data.healthFacilityType = this.parentFacilityType
      data.healthSubFacilityCode = this.parentSubcenter
      data.villageCode = this.parentVillage

data.anmId = Number(this.ECForm.controls['healthProvider'].value);
data.mpwId = Number(this.ECForm.controls['MPW'].value);
data.ashaId = Number(this.ECForm.controls['ASHA'].value);
data.registrationNo=Number(this.ECForm.controls['RCHID'].value);
data.dateRegis = dob_modified_date;
data.financialYr = String(this.ECForm.controls['finanacialYr'].value);


data.nameWife = this.ECForm.controls['PWfirstname'].value;
data.middleNameWife = this.ECForm.controls['PWSecondname'].value;
data.lastNameWife = this.ECForm.controls['PWLastname'].value;
data.aadharNo = 0
if (this.PWAccountDisabled == false) {
  data.pwAccNo = String(this.ECForm.controls['PWAccountNo'].value);
  data.pwBankId = Number(this.ECForm.controls['PWBankname'].value);
  data.pwBranchName = this.ECForm.controls['PWBranchname'].value;
  data.pwIfsccode = this.ECForm.controls['PWIFSCcode'].value;
  data.pwAadhaarLinked = Number(this.ECForm.controls['PWAadharLink'].value);
}
else {
  data.pwAccNo = "";
  data.pwBankId = 0;
  data.pwBranchName = "";
  data.pwIfsccode = "";
  data.pwAadhaarLinked = 0;
}
data.pwOccupation = Number(this.ECForm.controls['PWOccupation'].value);
data.pwLevelEducation = Number(this.ECForm.controls['PWEducation'].value);

data.wifeCurrentAge = this.ECForm.controls['PWage'].value;
data.pwDob = this.parseDate(this.ECForm.controls['PWDOB'].value);

if (this.ECForm.controls['PWMarriageAge'].value != "") {
  data.wifeMarryAge = Number(this.ECForm.controls['PWMarriageAge'].value);
}
else {
  data.wifeMarryAge = 0;
}

if (this.marked = true) {
  data.nameHusband = this.ECForm.controls['HusbandFirstname'].value;
  data.middleNameHusband = this.ECForm.controls['HusbandSecondname'].value;
  data.lastNameHusband = this.ECForm.controls['HusbandLastname'].value;
  data.husbandAadhaarNo = 0
  if (this.AccountNoDisabled == false) {
    data.husbandAccNo = String(this.ECForm.controls['HusbandAccountNo'].value);
    data.husbandBankId = Number(this.ECForm.controls['HusbandBankname'].value);
    data.husbandBranchName = this.ECForm.controls['HusbandBranch'].value;
    data.husbandIfsccode = this.ECForm.controls['HusbandIFSC'].value;
    data.husbandAadhaarLinked = Number(this.ECForm.controls['HusbandAadharLinked'].value);
  }
  else {
    data.husbandAccNo = "";
    data.husbandBankId = 0;
    data.husbandBranchName = "";
    data.husbandIfsccode = "";
    data.husbandAadhaarLinked = 0;
  }
  data.husbandOccupation = Number(this.ECForm.controls['HusbandOccupation'].value);
  data.husbandLevelEducation = Number(this.ECForm.controls['HusbandEducation'].value);

  if (this.ECForm.controls['HusbandAge'].value != "") {
    data.husCurrentAge = Number(this.ECForm.controls['HusbandAge'].value)
    data.husbandDob = this.parseDate(this.ECForm.controls['HusbandDOB'].value);
    data.husMarryAge = Number(this.ECForm.controls['HusbandMarriageAge'].value);
  }
  else {
    data.husCurrentAge = 0
    data.husbandDob = null
    data.husMarryAge = 0
  }
  
}
else {
  data.nameHusband = "";
  data.middleNameHusband = "";
  data.lastNameHusband = "";
  data.husbandAadhaarNo = 0
  data.husbandAccNo = "";
  data.husbandBankId = 0;
  data.husbandBranchName = "";
  data.husbandIfsccode = "";
  data.husbandAadhaarLinked = 0;
  data.husbandOccupation = 0;
  data.husbandLevelEducation = 0;
  data.husCurrentAge = 0;
  
  data.husbandDob = null;
  
  data.husMarryAge = 0;
}
data.religionCode = Number(this.ECForm.controls['Religion'].value);
data.caste = Number(this.ECForm.controls['Caste'].value);
if (this.ECForm.controls['Address'].value == "") { alert("Enter Address") } else {
  data.address = this.ECForm.controls['Address'].value;
}

data.maleChildBorn = Number(this.ECForm.controls['MaleBorn'].value);
data.femaleChildBorn = Number(this.ECForm.controls['FemaleBorn'].value);
data.otherChildBorn = Number(this.ECForm.controls['OtherBorn'].value);

data.maleChildLive = Number(this.ECForm.controls['MaleLive'].value);
data.femaleChildLive = Number(this.ECForm.controls['FemaleLive'].value);
data.otherChildLive = Number(this.ECForm.controls['OtherLive'].value);
data.mobileNo = this.ECForm.controls['mobno'].value;
data.whoseMobile = this.ECForm.controls['WhoseMobile'].value;
data.bplApl = Number(this.ECForm.controls['Category'].value);
data.youngChildAgeYear = Number(this.ECForm.controls['YoungestChildYear'].value);
data.youngChildAgeMonth = Number(this.ECForm.controls['YoungestChildMonth'].value);
data.youngChildGender = (this.ECForm.controls['YoungestChildSex'].value);

data.financialYear = da.year;
data.rurUrbHierarchy = this.RuralUrban
data.registerSrno = 99
data.caseNo = 1
data.flag = 0
data.ruralUrban = this.RuralUrban
data.talukaCode = this.talukacode
data.ipAddress = this.ipAddress
data.wardNo = this.wardcode
data.updatedBy = this.tokenservice.getUserId();
data.updatedOn=new Date();

data.sourceId = 0
data.infertilityStatus = ""
  let v=JSON.stringify(data) 
       console.log(v)
      ////debugger  
this.editECData(Number(this.ECForm.controls['RCHID'].value),1,data)
////debugger
      document.getElementById("NewEntry").focus();
     // let c : any='input22'
      //c.focus();
      }
    }
  }

  enableHusband(){
    this.whosemobile = [{ id: 'W', whosemobile: 'Self' }, { id: 'H', whosemobile: 'Husband' }, { id: 'N', whosemobile: 'Neighbour' }, { id: 'R', whosemobile: 'Relative' }, { id: 'O', whosemobile: 'Other' }];
    this.ECForm.controls['HusbandFirstname'].enable();
    this.ECForm.controls['HusbandSecondname'].enable();
    this.ECForm.controls['HusbandLastname'].enable();

    this.ECForm.controls['HusbandAccountNo'].enable();
    this.ECForm.controls['HusbandAccountNotAvailable'].enable();
    this.ECForm.controls['HusbandBankname'].enable();
    this.ECForm.controls['HusbandBranch'].enable();
    this.ECForm.controls['HusbandIFSC'].enable();
    this.ECForm.controls['HusbandAadharLinked'].enable();

    this.ECForm.controls['HusbandOccupation'].enable();
    this.ECForm.controls['HusbandEducation'].enable();
    this.ECForm.controls['HusbandAgeid'].enable();
    this.ECForm.controls['HusbandAgeid'].setValue('husbandage');
    //   this.ECForm.controls['HusbandDOBid'].enable();
    this.ECForm.controls['HusbandAge'].enable();
    this.ECForm.controls['HusbandDOB'].enable();
    this.ECForm.controls['HusbandMarriageAge'].enable();
  }

  disableHusband(){
    //debugger
    if (this.whosemobile.some(a => a.id = 'H'))
    if(this.ECForm.controls['WhoseMobile'].value == ''){
      console.log('already whose mobile value available')
    }else{
    this.whosemobile = [{ id: 'W', whosemobile: 'Self' }, { id: 'N', whosemobile: 'Neighbour' }, { id: 'R', whosemobile: 'Relative' }, { id: 'O', whosemobile: 'Other' }];
    }
  this.ECForm.controls['HusbandFirstname'].disable();
  this.ECForm.controls['HusbandSecondname'].disable();
  this.ECForm.controls['HusbandLastname'].disable();

  this.ECForm.controls['HusbandAccountNotAvailable'].disable();
  this.ECForm.controls['HusbandAccountNo'].disable();
  this.ECForm.controls['HusbandBankname'].disable();
  this.ECForm.controls['HusbandBranch'].disable();
  this.ECForm.controls['HusbandIFSC'].disable();
  this.ECForm.controls['HusbandAadharLinked'].disable();

  this.ECForm.controls['HusbandOccupation'].disable();
  this.ECForm.controls['HusbandEducation'].disable();
  this.ECForm.controls['HusbandAgeid'].disable();
  //this.ECForm.controls['HusbandDOBid'].disable();

  this.ECForm.controls['HusbandAge'].disable();
  this.ECForm.controls['HusbandDOB'].disable();
  this.ECForm.controls['HusbandMarriageAge'].disable();

  this.marked =true
  this.ECForm.controls['HusbandFirstname'].setValue('');
  this.ECForm.controls['HusbandSecondname'].setValue('');
  this.ECForm.controls['HusbandLastname'].setValue('');

  this.ECForm.controls['HusbandAccountNo'].setValue('');
  this.ECForm.controls['HusbandBankname'].setValue('');
  this.ECForm.controls['HusbandBranch'].setValue('');
  this.ECForm.controls['HusbandIFSC'].setValue('');
  this.ECForm.controls['HusbandAadharLinked'].setValue('0');

  this.ECForm.controls['HusbandOccupation'].setValue('');
  this.ECForm.controls['HusbandEducation'].setValue('');
  this.ECForm.controls['HusbandAge'].setValue(null);
  this.ECForm.controls['HusbandDOB'].setValue('');
  this.ECForm.controls['HusbandMarriageAge'].setValue('');
  }
  toggleVisibility(e) {
   //debugger
    this.marked = e.target.checked;
    

    if (e.target.checked === true) {
     this.disableHusband();

    }
    else {
     this.enableHusband();
    }

  }
  HusbandAccount() {
    if (this.ECForm.controls['HusbandAccountNo'].value == this.ECForm.controls['PWAccountNo'].value) {
      if (this.ECForm.controls['PWBankname'].value != '' && this.ECForm.controls['PWBranchname'].value != '' && this.ECForm.controls['PWIFSCcode'].value != '') {
        this.ECForm.controls['HusbandBankname'].disable();
        this.ECForm.controls['HusbandBranch'].disable();
        this.ECForm.controls['HusbandIFSC'].disable();
        this.ECForm.controls['HusbandAadharLinked'].disable();

        this.ECForm.controls['HusbandBankname'].setValue(this.ECForm.controls['PWBankname'].value);
        this.ECForm.controls['HusbandBranch'].setValue(this.ECForm.controls['PWBranchname'].value);
        this.ECForm.controls['HusbandIFSC'].setValue(this.ECForm.controls['PWIFSCcode'].value);
        this.ECForm.controls['HusbandAadharLinked'].setValue(this.ECForm.controls['PWAadharLink'].value);
      }
      else if(this.ECForm.controls['HusbandBankname'].value != '' && this.ECForm.controls['HusbandBranch'].value != '' && this.ECForm.controls['HusbandIFSC'].value != ''){
       
        this.ECForm.controls['PWBankname'].setValue(this.ECForm.controls['HusbandBankname'].value);
        this.ECForm.controls['PWBranchname'].setValue(this.ECForm.controls['HusbandBranch'].value);
        this.ECForm.controls['PWIFSCcode'].setValue(this.ECForm.controls['HusbandIFSC'].value);
        this.ECForm.controls['PWAadharLink'].setValue(this.ECForm.controls['HusbandAadharLinked'].value);
        
      }
      else {
        //alert('hi')
      }
    }

    else {
      this.ECForm.controls['HusbandBankname'].enable();
      this.ECForm.controls['HusbandBranch'].enable();
      this.ECForm.controls['HusbandIFSC'].enable();
      this.ECForm.controls['HusbandAadharLinked'].enable();

      this.ECForm.controls['HusbandBankname'].setValue('');
      this.ECForm.controls['HusbandBranch'].setValue('');
      this.ECForm.controls['HusbandIFSC'].setValue('');
      this.ECForm.controls['HusbandAadharLinked'].setValue('0');
    }
  }
  accountnoDisable(e) {
    ////debugger
    if (e.target.checked == true) {
      this.ECForm.controls['HusbandAccountNo'].disable();
      this.ECForm.controls['HusbandBankname'].disable();
      this.ECForm.controls['HusbandBranch'].disable();
      this.ECForm.controls['HusbandIFSC'].disable();
      this.ECForm.controls['HusbandAadharLinked'].disable();
      this.ECForm.controls['HusbandAccountNo'].setValue('');
      this.ECForm.controls['HusbandBankname'].setValue('');

      this.ECForm.controls['HusbandBranch'].setValue('');
      this.ECForm.controls['HusbandIFSC'].setValue('');
      this.ECForm.controls['HusbandAadharLinked'].setValue('0');
      this.AccountNoDisabled = true
    }
    else {
      this.ECForm.controls['HusbandAccountNo'].enable();
      this.ECForm.controls['HusbandBankname'].enable();
      this.ECForm.controls['HusbandBranch'].enable();
      this.ECForm.controls['HusbandIFSC'].enable();
      this.ECForm.controls['HusbandAadharLinked'].enable();
    }

  }

  PWaccountnoDisable(e) {
    ////debugger
    if (e.target.checked == true) {
      this.ECForm.controls['PWAccountNo'].disable();
      this.ECForm.controls['PWBankname'].disable();
      this.ECForm.controls['PWBranchname'].disable();
      this.ECForm.controls['PWIFSCcode'].disable();
      this.ECForm.controls['PWAadharLink'].disable();
      this.PWAccountDisabled = true;

      this.ECForm.controls['PWAccountNo'].setValue('');

      this.ECForm.controls['PWBankname'].setValue('');
      this.ECForm.controls['PWBranchname'].setValue('');
      this.ECForm.controls['PWIFSCcode'].setValue('');
      this.ECForm.controls['PWAadharLink'].setValue('0');
    }
    else {
      this.ECForm.controls['PWAccountNo'].enable();
      this.ECForm.controls['PWBankname'].enable();
      this.ECForm.controls['PWBranchname'].enable();
      this.ECForm.controls['PWIFSCcode'].enable();
      this.ECForm.controls['PWAadharLink'].enable();
      this.PWAccountDisabled = false;
    }

  }
  rdpwage = true; rdHusbandage = true;
  SelectPWAge(e) {
    //console.log(e.target.value + " PWage");
    if (e.target.value == 'pwage') {
      this.ECForm.controls['PWage'].enable();
      this.ECForm.controls['PWDOB'].disable();
      this.rdpwage = true;
    }
    else {
      this.ECForm.controls['PWage'].disable();
      this.ECForm.controls['PWDOB'].enable();
      this.rdpwage = false
    }
  }
  ngbDatepicker: any
  changePWage() {
   ////debugger;
    if ((this.ECForm.controls['RegDate'].value) == "") {
      alert('Enter Date of Registration');
    }
    else {
      if (this.ECForm.controls['PWage'].value != "") {
        if (this.ECForm.controls['PWage'].value < 10 || this.ECForm.controls['PWage'].value > 60) {
          alert('Age Should be between 10 to 60 years')
          this.ECForm.controls.PWDOB.setValue('')
          this.ECForm.controls['PWage'].setValue('')
        } else {
          let birthday = Number(this.ECForm.controls['PWage'].value);

          let birthyear = [((this.ECForm.controls['RegDate'].value)).year - birthday]
          let birthdate = new Date();

          this.ngbDatepicker = '01-01-' + birthyear;
          if (this.ECForm.controls['PWage'].value > 49) {
            this.ECForm.controls.PWDOB.setValue({
              year: birthyear[0],
              month: 1,
              day: 1
            });
            alert('Beneficiary Age entered is grater then 49 years');
          }
          if ((this.ECForm.controls['PWDOB'].value) == "" || (this.ECForm.controls['PWDOB'].value) != "") {
            this.ECForm.controls.PWDOB.setValue({
              year: birthyear[0],
              month: 1,
              day: 1
            });
          }

        }
      }
      else {
        this.ECForm.controls.PWDOB.setValue('')
        this.ECForm.controls.PWage.setValue('')
      }
    }


    this.CheckChildAge_Women();
  }
  changePWDOB() {
    ////debugger;
    if ((this.ECForm.controls['RegDate'].value) == "") {
      alert('Enter Date of Registration');
    }
    else {

      let diff = (((this.ECForm.controls['RegDate'].value)).year - ((this.ECForm.controls['PWDOB'].value)).year)
      if (diff < 10 || diff > 60) {
        if ((this.ECForm.controls['PWDOB'].value) == "") {
          this.ECForm.controls['PWage'].setValue("");
        }
        else {
          this.ECForm.controls['PWage'].setValue(diff);
          alert('Age Should be between 10 to 60 years');
          // this.ECForm.controls['PWage'].setValue("");
          this.ECForm.controls['PWDOB'].setValue("");
        }
      }
      else {
        this.ECForm.controls['PWage'].setValue(diff);
      }
    }
  }


  changeHusbandage() {
   //debugger;
    if ((this.ECForm.controls['RegDate'].value) == "") {
      if(this.marked != true){
        alert('Enter Date of Registration');}
    }
    else {

      if (this.ECForm.controls['HusbandAge'].value != null && this.ECForm.controls['HusbandAge'].value >0) {
        if (this.ECForm.controls['HusbandAge'].value < 10 || this.ECForm.controls['HusbandAge'].value > 99) {
          this.ECForm.controls.HusbandDOB.setValue('');
          this.ECForm.controls['HusbandAge'].setValue('')
          alert('Age Should be between 10 to 99 years');
        }
        else {
          let birthday = Number(this.ECForm.controls['HusbandAge'].value);

          let birthyear = [((this.ECForm.controls['RegDate'].value)).year - birthday]
          let birthdate = new Date();

          this.ngbDatepicker = '01-01-' + birthyear;
          if ((this.ECForm.controls['HusbandDOB'].value) == "" || (this.ECForm.controls['HusbandDOB'].value) != "") {
            this.ECForm.controls.HusbandDOB.setValue({
              year: birthyear[0],
              month: 1,
              day: 1
            });
          }
         
        }
       }
      else {
        this.ECForm.controls.HusbandDOB.setValue('')
        this.ECForm.controls.HusbandAge.setValue('')
       
      } 
    }
    if (this.ECForm.controls['PWMarriageAge'].value != "") {
      this.changePWMage();
    }

  }

  changeHusbandDOB() {
   ////debugger;
   // alert(this.ECForm.controls['HusbandDOB'].value +"  ghfg")
    if ((this.ECForm.controls['RegDate'].value) == "") {
      if(this.marked != true){
      alert('Enter Date of Registration');}
    }
    else {
     // console.log(this.ECForm.controls['HusbandDOB'].value)
    if ((this.ECForm.controls['HusbandDOB'].value) != "" && (this.ECForm.controls['HusbandDOB'].value) !=null) {
        let diff = (((this.ECForm.controls['RegDate'].value)).year - ((this.ECForm.controls['HusbandDOB'].value)).year)
        if (diff < 10 || diff > 99) {
          if ((this.ECForm.controls['HusbandDOB'].value) == "") {
            this.ECForm.controls['HusbandAge'].setValue("");
          }
          else {
            this.ECForm.controls['HusbandAge'].setValue(diff);
            alert('Age Should be between 10 to 99 years');
            // this.ECForm.controls['PWage'].setValue("");
            this.ECForm.controls['HusbandDOB'].setValue("");
          }
        }
        else {
          this.ECForm.controls['HusbandAge'].setValue(diff);
        }
       }
      else {
        this.ECForm.controls.HusbandDOB.setValue('')
        this.ECForm.controls.HusbandAge.setValue('')
      } 
    }
  }

  changePWMage() {
    ////debugger
    if (this.ECForm.controls['PWMarriageAge'].value != '') {
      if (this.ECForm.controls['PWage'].value >= this.ECForm.controls['PWMarriageAge'].value) {
        if (this.ECForm.controls['PWage'].value != "" && this.ECForm.controls['PWMarriageAge'].value != "" && this.ECForm.controls['HusbandAge'].value != "") {
          let WifeAgeDiff = Number(this.ECForm.controls['PWage'].value) - Number(this.ECForm.controls['PWMarriageAge'].value)
          let HusbandAgeAtMarrige = Number(this.ECForm.controls['HusbandAge'].value) - WifeAgeDiff
          if (WifeAgeDiff >= 0) {
            this.ECForm.controls['HusbandMarriageAge'].setValue(HusbandAgeAtMarrige);
          }
          else {
            alert('Marriage age should be less than beneficiary current Age');
          }
        }

      }
    }
    else {
      this.ECForm.controls['HusbandMarriageAge'].setValue(0);
    }
  }


  SelectHAge(e) {
    //  if (this.marked = false) {
    if (e.target.value == 'husbandage') {
      this.rdHusbandage = true
      this.ECForm.controls['HusbandAge'].enable();
      this.ECForm.controls['HusbandDOB'].disable();
    }
    else {
      this.ECForm.controls['HusbandAge'].disable();
      this.ECForm.controls['HusbandDOB'].enable();
      this.rdHusbandage = false
    }
    //}
  }

  eligibleCoupleAgeDiff(e) {
    var txtWifeAgeCurrent = this.ECForm.controls['PWage'].value
    var txtWifeAgeAtMarriage = this.ECForm.controls['PWMarriageAge'].value
    var txtHusbandAgeCurrent = this.ECForm.controls['HusbandAge'].value
    var txtHusbandAgeAtMarriage = this.ECForm.controls['HusbandMarriageAge'].value



    if (txtWifeAgeCurrent != '' && txtWifeAgeAtMarriage != '' && txtHusbandAgeCurrent != '' && txtHusbandAgeAtMarriage != '') {

      var WifeAgeDiff = txtWifeAgeCurrent - txtWifeAgeAtMarriage;
      var HusbandAgeDiff = txtHusbandAgeCurrent - txtHusbandAgeAtMarriage;
      if (WifeAgeDiff != HusbandAgeDiff) {
        alert('Age Difference between current age and marriage age should be same for wife and husband');
        // document.getElementById(id).value = '';
        return false;
      }
    }
    return true;

  }
  // public selectedDate: NgbDate;
  parseDate(selectedDate: NgbDate): Date { //stirn
    let dateObject: Date = new Date();
   ////debugger
    if (selectedDate !== null) {
      dateObject.setDate(selectedDate.day);
      dateObject.setFullYear(selectedDate.year);
      dateObject.setMonth(selectedDate.month - 1);

      return dateObject;
    }

    else {
      return new Date();   //current date
    }  //this.dateObject= new Date(selectedDate.year,selectedDate.month,selectedDate.day);




  }
  onreset() {
    this.submitted = false;
    this.createForm();
    window.localStorage.removeItem("ECT-EC")

/*     this.ECForm.reset();
    this.ECForm.controls['RCHID'].setValue('');
    this.ECForm.controls['healthProvider'].setValue('0');
    this.ECForm.controls['MPW'].setValue('0');
    this.ECForm.controls['ASHA'].setValue('0');
    this.ECForm.controls['RegDate'].setValue('');
    this.ECForm.controls['finanacialYr'].setValue('');
    this.ECForm.controls['PWfirstname'].setValue('');
    this.ECForm.controls['PWSecondname'].setValue('');
    this.ECForm.controls['PWLastname'].setValue('');
    this.ECForm.controls['PWAccountNo'].setValue('');

    this.ECForm.controls['PWBankname'].setValue('');
    this.ECForm.controls['PWBranchname'].setValue('');
    this.ECForm.controls['PWIFSCcode'].setValue('');
    this.ECForm.controls['PWAadharLink'].setValue('0');
    this.ECForm.controls['PWOccupation'].setValue('');
    this.ECForm.controls['PWEducation'].setValue('');

    this.ECForm.controls['PWage'].setValue('');
    this.ECForm.controls['PWDOB'].setValue('');
    this.ECForm.controls['PWMarriageAge'].setValue('');
    this.ECForm.controls['HusbandFirstname'].setValue('');
    this.ECForm.controls['HusbandSecondname'].setValue('');
    this.ECForm.controls['HusbandLastname'].setValue('');
    this.ECForm.controls['HusbandAccountNo'].setValue('');
    this.ECForm.controls['HusbandBankname'].setValue('');

    this.ECForm.controls['HusbandBranch'].setValue('');
    this.ECForm.controls['HusbandIFSC'].setValue('');
    this.ECForm.controls['HusbandAadharLinked'].setValue('');
    this.ECForm.controls['HusbandOccupation'].setValue('0');
    this.ECForm.controls['HusbandEducation'].setValue('');
    this.ECForm.controls['HusbandAge'].setValue('');

    this.ECForm.controls['HusbandDOB'].setValue('');
    this.ECForm.controls['HusbandMarriageAge'].setValue('');
    this.ECForm.controls['Religion'].setValue('');
    this.ECForm.controls['Caste'].setValue('');
    this.ECForm.controls['Address'].setValue('');
    this.ECForm.controls['Totalborn'].setValue('0');
    this.ECForm.controls['MaleBorn'].setValue('0');
    this.ECForm.controls['FemaleBorn'].setValue('0');
    this.ECForm.controls['OtherBorn'].setValue('0');

    this.ECForm.controls['TotalLive'].setValue('0');
    this.ECForm.controls['FemaleLive'].setValue('');
    this.ECForm.controls['OtherLive'].setValue('');
    this.ECForm.controls['mobno'].setValue('0');
    this.ECForm.controls['WhoseMobile'].setValue('');
    this.ECForm.controls['Category'].setValue(''); 

    this.ECForm.controls['YoungestChildYear'].setValue('0');
    this.ECForm.controls['YoungestChildMonth'].setValue('');
    this.ECForm.controls['YoungestChildSex'].setValue('');
 */  }

  ChildBorn() {
   ////debugger
    this.ChildBornM = Number(this.ECForm.controls['MaleBorn'].value);
    this.ChildBornF = Number(this.ECForm.controls['FemaleBorn'].value);
    this.ChildBornO = Number(this.ECForm.controls['OtherBorn'].value);

    this.ChildBornSum = this.ChildBornM + this.ChildBornF + this.ChildBornO;
    if (this.ChildBornSum > 30) {
      alert('Total number of Children Born can not be more than 30');
      this.ECForm.controls['Totalborn'].setValue('0')
      this.ECForm.controls['MaleBorn'].setValue('0')
      this.ECForm.controls['FemaleBorn'].setValue('0')
      this.ECForm.controls['OtherBorn'].setValue('0')
    }
    else {
      this.ECForm.controls['Totalborn'].setValue(this.ChildBornSum)
      if ((this.ECForm.controls['PWage'].value) == "") {
        alert('Enter Mother age');

      }
      else {
        if ((this.ChildBornSum > (this.ECForm.controls['PWage'].value - 15)) || (this.ChildBornSum > 20)) {
          alert('Beneficiary age is ' + this.ECForm.controls['PWage'].value + '. Are you sure this beneficiary has ' + this.ChildBornSum + ' children.');
        }
      }
    }

    if (this.ChildBornM == 0 && this.ChildBornF == 0 && this.ChildBornO == 0) {
      // this.showYoungestchild = false;
      this.ECForm.controls['TotalLive'].setValue('0')
      this.ECForm.controls['MaleLive'].setValue('0')
      this.ECForm.controls['FemaleLive'].setValue('0')
      this.ECForm.controls['OtherLive'].setValue('0')

      this.ECForm.controls['YoungestChildSex'].disable();
      this.ECForm.controls['YoungestChildYear'].disable();
      this.ECForm.controls['YoungestChildMonth'].disable();

      this.ECForm.controls['YoungestChildSex'].setValue('');
      this.ECForm.controls['YoungestChildYear'].setValue('');
      this.ECForm.controls['YoungestChildMonth'].setValue('');
    }
    else if (this.ChildBornM == 0 && this.ChildBornF != 0 && this.ChildBornO != 0) {
      this.ECForm.controls['MaleLive'].setValue('0')
      this.ChildLivingF();
      this.ChildLivingO();
      this.ChildLiving();
    }
    else if (this.ChildBornM != 0 && this.ChildBornF == 0 && this.ChildBornO != 0) {
      this.ECForm.controls['FemaleLive'].setValue('0')
      this.ChildLivingO();
      this.ChildLivingM();
      this.ChildLiving();
    }
    else if (this.ChildBornM != 0 && this.ChildBornF != 0 && this.ChildBornO == 0) {
      this.ECForm.controls['OtherLive'].setValue('0')
      this.ChildLivingF();
      this.ChildLivingM();
      this.ChildLiving();
    }

    else if (this.ChildBornM == 0 && this.ChildBornF == 0 && this.ChildBornO != 0) {
      this.ECForm.controls['FemaleLive'].setValue('0')
      this.ECForm.controls['MaleLive'].setValue('0')
      this.ChildLivingO()
      this.ChildLiving();
    }
    else if (this.ChildBornM == 0 && this.ChildBornF != 0 && this.ChildBornO == 0) {
      this.ECForm.controls['OtherLive'].setValue('0')
      this.ECForm.controls['MaleLive'].setValue('0')
      this.ChildLivingF();
      this.ChildLiving();
    }
    else if (this.ChildBornM != 0 && this.ChildBornF == 0 && this.ChildBornO == 0) {
      this.ECForm.controls['OtherLive'].setValue('0')
      this.ECForm.controls['FemaleLive'].setValue('0')
      this.ChildLivingM();
      this.ChildLiving();
    }
    else {

      // this.showYoungestchild= true;
    }
  }
  ChildLivingM() {
   ////debugger
    if (Number(this.ECForm.controls['MaleLive'].value) <= Number(this.ECForm.controls['MaleBorn'].value)) {
      this.ChildLiving();
    } else {
      alert('No. of Live (Male) Children Should be less then or equal Total no. of Children Born(Male) ');
      this.ECForm.controls['MaleLive'].setValue('0');
      this.ChildLiving();
    }
  }

  ChildLivingF() {
   ////debugger
    if (Number(this.ECForm.controls['FemaleLive'].value) <= Number(this.ECForm.controls['FemaleBorn'].value)) {
      this.ChildLiving();
    } else {
      alert('No. of Live(Female) Children Should be less then or equal Total no. of Children Born(Female) ');
      this.ECForm.controls['FemaleLive'].setValue('0');
      this.ChildLiving();
    }
  }

  ChildLivingO() {
   ////debugger
    if (Number(this.ECForm.controls['OtherLive'].value) <= Number(this.ECForm.controls['OtherBorn'].value)) {
      this.ChildLiving();
    } else {
      alert('No. of Live(Other) Children Should be less then or equal Total no. of Children Born(Other) ');
      this.ECForm.controls['OtherLive'].setValue('0');
      this.ChildLiving();
    }
  }
  ChildLiving() {
   ////debugger
    this.vChildLivingM = Number(this.ECForm.controls['MaleLive'].value);
    this.vChildLivingF = Number(this.ECForm.controls['FemaleLive'].value);
    this.vChildLivingO = Number(this.ECForm.controls['OtherLive'].value);

    this.ChildLivingSum = this.vChildLivingM + this.vChildLivingF + this.vChildLivingO;
    ////debugger
    if (this.vChildLivingM != 0 && this.vChildLivingF != 0 && this.vChildLivingO != 0) {
      //this.showYoungestchild = true;
      this.ECForm.controls['YoungestChildSex'].enable();
      this.ECForm.controls['YoungestChildYear'].enable();
      this.ECForm.controls['YoungestChildMonth'].enable();
      this.childgender = [{ id: 'M', childgender: 'Male' }, { id: 'F', childgender: 'Female' }, { id: 'O', childgender: 'Other' }]
    }
    else if (this.vChildLivingM == 0 && this.vChildLivingF != 0 && this.vChildLivingO == 0) {
      //alert("Female")
      //  this.showYoungestchild = true;

      // this.childgender=[{id:'F', childgender:'Female'}]
      this.ECForm.controls['YoungestChildSex'].setValue("F")
      this.ECForm.controls['YoungestChildSex'].disable();
      this.ECForm.controls['YoungestChildYear'].enable();
      this.ECForm.controls['YoungestChildMonth'].enable();
    }
    else if (this.vChildLivingM != 0 && this.vChildLivingF == 0 && this.vChildLivingO == 0) {
      //  this.showYoungestchild = true;

      //this.childgender=[{id:'M', childgender:'Male'}]
      this.ECForm.controls['YoungestChildSex'].setValue("M")
      this.ECForm.controls['YoungestChildSex'].disable();
      this.ECForm.controls['YoungestChildYear'].enable();
      this.ECForm.controls['YoungestChildMonth'].enable();
    }
    else if (this.vChildLivingM == 0 && this.vChildLivingF == 0 && this.vChildLivingO != 0) {
      // alert("Other Live")
      //  this.showYoungestchild = true;

      //this.childgender=[{id:'O', childgender:'Other'}]
      this.ECForm.controls['YoungestChildSex'].setValue("O")
      this.ECForm.controls['YoungestChildSex'].disable();
      this.ECForm.controls['YoungestChildYear'].enable();
      this.ECForm.controls['YoungestChildMonth'].enable();
    }
    else if (this.vChildLivingM != 0 && this.vChildLivingF != 0 && this.vChildLivingO == 0) {

      // this.showYoungestchild = true;
      this.ECForm.controls['YoungestChildSex'].enable();
      this.childgender = [{ id: 'M', childgender: 'Male' }, { id: 'F', childgender: 'Female' }]
      // this.ECForm.controls['YoungestChildSex'].value('O')
      this.ECForm.controls['YoungestChildYear'].enable();
      this.ECForm.controls['YoungestChildMonth'].enable();
    }
    else if (this.vChildLivingM != 0 && this.vChildLivingF == 0 && this.vChildLivingO != 0) {
      // this.showYoungestchild = true;
      this.ECForm.controls['YoungestChildSex'].enable();
      this.ECForm.controls['YoungestChildYear'].enable();
      this.ECForm.controls['YoungestChildMonth'].enable();
      this.childgender = [{ id: 'M', childgender: 'Male' }, { id: 'O', childgender: 'Other' }]
    }

    else if (this.vChildLivingM == 0 && this.vChildLivingF != 0 && this.vChildLivingO != 0) {
      // this.showYoungestchild = true;
      this.ECForm.controls['YoungestChildSex'].enable();
      this.childgender = [{ id: 'F', childgender: 'Female' }, { id: 'O', childgender: 'Other' }]
    }
    else {
      // this.showYoungestchild = false;
      this.ECForm.controls['TotalLive'].setValue('0')
      this.ECForm.controls['YoungestChildSex'].disable();
      this.ECForm.controls['YoungestChildYear'].disable();
      this.ECForm.controls['YoungestChildMonth'].disable();
    }

    if (this.ChildLivingSum > 30) {
      alert('Total number of Live Children can not be more than 30');
      this.ECForm.controls['TotalLive'].setValue('0')
      this.ECForm.controls['MaleLive'].setValue('0')
      this.ECForm.controls['FemaleLive'].setValue('0')
      this.ECForm.controls['OtherLive'].setValue('0')

    }
    else {

      this.ECForm.controls['TotalLive'].setValue(this.ChildLivingSum)
    }
  }
  CheckChildAge_Women() {
    ////debugger
    if (Number(this.ECForm.controls['YoungestChildYear'].value) != 0) {
      if ((this.ECForm.controls['PWage'].value) == "") {
        alert('Enter Mother age');

      }
      else {
        if ((Number(this.ECForm.controls['PWage'].value) - Number(this.ECForm.controls['YoungestChildYear'].value)) < 10) {
          alert('Age differnece between mother and child should be atleast 10 years');
          this.ECForm.controls['YoungestChildYear'].setValue('0');
        }
      }
    }
  }

  onContinue() {
   ////debugger;
    if (this.gen_rchid > 0) {
      console.log(this.gen_rchid)
      window.localStorage.setItem("rchid", "ectKey")
      window.localStorage.setItem("ID",String(this.gen_rchid))
      this.router.navigate(['home/ectrack'])
     // this.router.navigate(['home/ectrack'], { queryParams: { ID: this.gen_rchid } })
    }
    else {
      alert("You can not continue until Eligible couples Registration")
    }
  }



  changeRegDate($event) {
    ////debugger
    let yr = String($event.year)
    if ($event.month > 3) {
      this.selectedFinencialYear = $event.year + "-" + (Number(yr.substr(2, 2)) + 1)
    }
    else {
      this.selectedFinencialYear = (Number(yr) - 1) + "-" + Number(yr.substr(2, 2))
    }

    this.ECForm.controls['finanacialYr'].setValue(this.selectedFinencialYear)
   /*  console.log(this.ECForm.controls['HusbandAge'].value);
    console.log(this.ECForm.controls['PWage'].value);
    console.log(this.ECForm.controls['PWDOB'].value);
    console.log(this.ECForm.controls['HusbandDOB'].value) */
    if (this.ECForm.controls['PWage'].value == "" && this.ECForm.controls['PWDOB'].value == "") { }
    else {
      if (this.rdpwage == true && this.ECForm.controls['PWage'].value != "") {
        this.changePWage();

      }
      else {
        this.changePWDOB();
      }
    }
    if (this.ECForm.controls['HusbandAge'].value == "" && this.ECForm.controls['HusbandDOB'].value == "") { }
    else {
      if (this.rdHusbandage == true && this.ECForm.controls['HusbandAge'].value != "") {
        this.changeHusbandage();
      }
      else {
        this.changeHusbandDOB();
      }
    }

  }



  getBankName(): void {
    this.backendApiService.getBankAPI().subscribe((res: Response) => {
      let response = JSON.parse(JSON.stringify(res));
      // console.log(response);
      this.bankname = response;
      //console.log(this.selectedState + "  from parent ");
    })
  }

  getReligions(): void {
    this.backendApiService.getReligionsAPI().subscribe((res: Response) => {
      let response = JSON.parse(JSON.stringify(res));
      // console.log(response);
      this.religions = response;
    })
  }

  getOccupations(): void {
    this.backendApiService.getOccupationsAPI().subscribe((res: Response) => {
      let response = JSON.parse(JSON.stringify(res));
      // console.log(response);
      this.occupations = response;
    })
  }

  getEducations(): void {
    this.backendApiService.getEducationsAPI().subscribe((res: Response) => {
      let response = JSON.parse(JSON.stringify(res));

      this.educations = response;
      //console.log(this.educations);
    })
  }
  getHealthProviderByANMType(subcentre: number, typeid: number): void {
   ////debugger
    let response
    this.backendApiService.getHealthProvideratSubcentre(subcentre, typeid).subscribe((res: Response) => {
      response = JSON.parse(JSON.stringify(res));
     console.log('fhgfh')
      console.log(response);
      this.healthProviderANM = response;
     if(this.healthProviderANM.length <1){
       this.healthProviderANM=[ {id: 0, name: "Not Available", contact_No: ""}]
     } 
    })
    
  }
  getHealthProviderByASHAType(subcentre: number, typeid: number): void {
    this.backendApiService.getHealthProvideratSubcentre(subcentre, typeid).subscribe((res: Response) => {
      let response = JSON.parse(JSON.stringify(res));
      //console.log(response);
      this.healthProviderASHA = response;
      if(this.healthProviderASHA.length <1){
        this.healthProviderASHA=[ {id: 0, name: "Not Available", contact_No: ""}]
      } 
    })
  }
  getHealthProviderByMPWType(subcentre: number, typeid: number): void {
    this.backendApiService.getHealthProvideratSubcentre(subcentre, typeid).subscribe((res: Response) => {
      let response = JSON.parse(JSON.stringify(res));
      //console.log(response);
      this.healthProviderMPW = response;
      if(this.healthProviderMPW.length <1){
        this.healthProviderMPW=[ {id: 0, name: "Not Available", contact_No: ""}]
      } 

    })
  }
  fetchHealthProviderOnSubcentreAndVillage() {

    if (this.selectedSubCentre != null) {
      this.getHealthProviderByANMType(this.selectedSubCentre, 2)
      this.getHealthProviderByASHAType(this.selectedSubCentre, 1)
      this.getHealthProviderByMPWType(this.selectedSubCentre, 5)
    }
    // else{
    //   alert("Set Hierarchy first")
    // }
  }
//////Post API Call//////////
  postECData(data: any): void {
   ////debugger
    console.log("inside post ec data")
    this.backendApiService.postECData(data).subscribe(res => {
      let response = JSON.parse(JSON.stringify(res))


      console.log(response);
      alert("Record saved successfully")
      // this.myForm.controls['villagePopulation'].setValue(this.VillageDetailsYearWise[0].villagePopulation),
      this.ecmodel = response;
      this.ECForm.controls['RCHID'].setValue(this.ecmodel.registrationNo)
      this.gen_rchid = this.ecmodel.registrationNo
      console.log("Generate RCH Id  :" + this.gen_rchid)
      this.btncontinue = true

      document.getElementById("NewEntry").focus();
    }, error => {
    })
  }

  ////Edit API Call////
  editECData(regID:number, caseno:number,data: any) {
   ////debugger
    console.log("inside edit ec data")
    this.backendApiService.editECData(regID, caseno, data).subscribe(res => {
      let response = JSON.parse(JSON.stringify(res))
      console.log(response);
      alert("Record updated successfully")
      // this.myForm.controls['villagePopulation'].setValue(this.VillageDetailsYearWise[0].villagePopulation),
      
      this.gen_rchid = this.ECForm.controls['RCHID'].value
      console.log("Generate RCH Id  :" + this.gen_rchid)
      this.btncontinue = true
          }, error => {
    })
  }  
  ////////

  onInputEntry(event, nextInput) {
   ////debugger
    let input = event.target.id;
    console.log(nextInput)
    nextInput.focus();

   if(input == 'OtherLiveid'){
if(this.ECForm.controls['MaleLive'].value >0 || this.ECForm.controls['FemaleLive'].value >0  || this.ECForm.controls['OtherLive'].value >0){
  nextInput ='input17'
  // alert('yes123');
  document.getElementById("Categoryid").focus();
 // alert('yes'); 
}
else{
 // document.getElementById("save").focus();  
 nextInput.focus();
}


   }
   if(input == 'save'){
    document.getElementById("Continue").focus();
    
   }
    

  }
  getecdetails(registrationId: number) {
    //debugger
    this.backendApiService.getECbyRegNo(registrationId).subscribe((res: Response) => {
      let response = JSON.parse(JSON.stringify(res))[0];
           console.log(response);

      this.bindformEC(response);

this.btncontinue=true;


    })
  }
  bindformEC(ec: ECModel) {
   //debugger
   console.log(ec)
    if ((this.usertypeid == 1) || (this.usertypeid == 2) || (this.usertypeid == 3)) {
      alert('National level, State level and District level user can not perform this action')
    }
    else if((this.usertypeid == 4) && (this.selectedHealthBlock==ec.healthBlockCode)){
 
    this.Editmode=true
 
    }
    else if((this.usertypeid == 5) && (this.selectedFacilityCode==ec.healthFacilityCode)){
      this.Editmode=true
    }
    else if((this.usertypeid == 6) && (this.selectedSubCentre==ec.healthSubFacilityCode)){
       this.Editmode=true
    }
    else{   //alert('Edit facility not available')
       this.Editmode=false    }
   
   
if(this.Editmode==true)
    {this.parentState=ec.stateCode;
      this.parentDistrict=ec.districtCode
      this.parentTaluka=ec.talukaCode
      this.parentBlock=ec.healthBlockCode
      this.parentFacilityType=ec.healthFacilityType
      this.parentFacility=ec.healthFacilityCode
      this.parentSubcenter=ec.healthSubFacilityCode
      this.parentVillage=ec.villageCode
      this.ECForm.controls['RCHID'].setValue(ec.registrationNo);
    this.ECForm.controls['healthProvider'].setValue(ec.anmId);
    if(ec.mpwId==null){
      this.ECForm.controls['MPW'].setValue('')
    }else{
    this.ECForm.controls['MPW'].setValue(ec.mpwId);}
    this.ECForm.controls['ASHA'].setValue(ec.ashaId);
    this.ECForm.controls['RegDate'].setValue(
    {
      year: new Date(ec.dateRegis).getFullYear(),
      month: new Date(ec.dateRegis).getMonth()+1,
      day: new Date(ec.dateRegis).getDate()
    });
    this.ECForm.controls['finanacialYr'].setValue(ec.financialYr);
    this.ECForm.controls['PWfirstname'].setValue(ec.nameWife);
    this.ECForm.controls['PWSecondname'].setValue(ec.middleNameWife);
    this.ECForm.controls['PWLastname'].setValue(ec.lastNameWife);
    if(ec.pwAccNo=='0'){
      this.ECForm.controls['PWAccountNo'].setValue('')
    }else{
    this.ECForm.controls['PWAccountNo'].setValue(ec.pwAccNo);}

if(ec.pwBankId==0){
  this.ECForm.controls['PWBankname'].setValue('')
}else{
    this.ECForm.controls['PWBankname'].setValue(ec.pwBankId);}
    if(ec.pwBranchName==null){
      this.ECForm.controls['PWBranchname'].setValue('')
    }else{
    this.ECForm.controls['PWBranchname'].setValue(ec.pwBranchName);}
    if(ec.pwIfsccode==null){
      this.ECForm.controls['PWIFSCcode'].setValue('')
    }else{
    this.ECForm.controls['PWIFSCcode'].setValue(ec.pwIfsccode);}
    if(ec.pwAadhaarLinked==null){
      this.ECForm.controls['PWAadharLink'].setValue('0')
    }else{
    this.ECForm.controls['PWAadharLink'].setValue(ec.pwAadhaarLinked);}
    if(ec.pwOccupation==0){
      this.ECForm.controls['PWOccupation'].setValue('')
    }else{
    this.ECForm.controls['PWOccupation'].setValue(ec.pwOccupation);}
    if(ec.pwLevelEducation==0){
      this.ECForm.controls['PWEducation'].setValue('')
    }else{
    this.ECForm.controls['PWEducation'].setValue(ec.pwLevelEducation);}

    this.ECForm.controls['PWage'].setValue(ec.wifeCurrentAge);
    this.ECForm.controls['PWDOB'].setValue(
      {
        year: new Date(ec.pwDob).getFullYear(),
        month: new Date(ec.pwDob).getMonth()+1,
        day: new Date(ec.pwDob).getDate()
      });
    this.ECForm.controls['PWMarriageAge'].setValue(ec.wifeMarryAge);
    
    this.ECForm.controls['HusbandFirstname'].setValue(ec.nameHusband);
    //alert(this.ECForm.controls['HusbandFirstname'].value)
       if(ec.nameHusband =="" || ec.nameHusband == null){
      
     this.disableHusband()
     const ele = document.getElementById("HusbandNotApplicableid") as HTMLInputElement;
ele.checked = true;
this.ECForm.controls['HusbandAge'].setValue(0);
    }
    else{
      
      this.enableHusband()
      const ele = document.getElementById("HusbandNotApplicableid") as HTMLInputElement;
ele.checked = false;
      this.ECForm.controls['HusbandFirstname'].setValue(ec.nameHusband);
      this.ECForm.controls['HusbandSecondname'].setValue(ec.middleNameHusband);
      this.ECForm.controls['HusbandLastname'].setValue(ec.lastNameHusband);
      if(ec.husbandAccNo=='0'){
        this.ECForm.controls['HusbandAccountNo'].setValue('')
      }else{
      this.ECForm.controls['HusbandAccountNo'].setValue(ec.husbandAccNo);}
      if(ec.husbandBankId==0){
        this.ECForm.controls['HusbandBankname'].setValue('')
      }else{
      this.ECForm.controls['HusbandBankname'].setValue(ec.husbandBankId);}
      if(ec.husbandBranchName==null){
        this.ECForm.controls['HusbandBranch'].setValue('')
      }else{
      this.ECForm.controls['HusbandBranch'].setValue(ec.husbandBranchName);}
      if(ec.husbandIfsccode==null){
        this.ECForm.controls['HusbandIFSC'].setValue('')
      }else{
      this.ECForm.controls['HusbandIFSC'].setValue(ec.husbandIfsccode);}
      
      if(ec.husbandAadhaarLinked==null){
        this.ECForm.controls['HusbandAadharLinked'].setValue('0')
      }else{
      this.ECForm.controls['HusbandAadharLinked'].setValue(ec.husbandAadhaarLinked);}
      if(ec.husbandOccupation==0){
        this.ECForm.controls['HusbandOccupation'].setValue('')
      }else{
      this.ECForm.controls['HusbandOccupation'].setValue(ec.husbandOccupation);}
if(ec.husbandLevelEducation==0){
  this.ECForm.controls['HusbandEducation'].setValue('')
}else{
      this.ECForm.controls['HusbandEducation'].setValue(ec.husbandLevelEducation);}

      if(ec.husCurrentAge >0){
      this.ECForm.controls['HusbandAge'].setValue(ec.husCurrentAge);
          this.ECForm.controls['HusbandDOB'].setValue(
        {
          year: new Date(ec.husbandDob).getFullYear(),
          month: new Date(ec.husbandDob).getMonth()+1,
          day: new Date(ec.husbandDob).getDate()
        });}
        else{
          this.ECForm.controls['HusbandAge'].setValue(0);
        } 
       
      this.ECForm.controls['HusbandMarriageAge'].setValue(ec.husMarryAge);
    }
    if(ec.religionCode ==0){
      this.ECForm.controls['Religion'].setValue('')
    }else{
    this.ECForm.controls['Religion'].setValue(ec.religionCode);}
    if(ec.caste==0){
      this.ECForm.controls['Caste'].setValue('')
    }else{
    this.ECForm.controls['Caste'].setValue(ec.caste);}
    this.ECForm.controls['Address'].setValue(ec.address);
    this.ECForm.controls['Totalborn'].setValue(ec.maleChildBorn+ec.femaleChildBorn+ec.otherChildBorn);
    this.ECForm.controls['MaleBorn'].setValue(ec.maleChildBorn);
    this.ECForm.controls['FemaleBorn'].setValue(ec.femaleChildBorn);
    if(ec.otherChildBorn==null){
      this.ECForm.controls['OtherBorn'].setValue('0')
    }else{
    this.ECForm.controls['OtherBorn'].setValue(ec.otherChildBorn);}

    this.ECForm.controls['TotalLive'].setValue(ec.maleChildLive+ec.femaleChildLive+ec.otherChildLive);
    this.ECForm.controls['MaleLive'].setValue(ec.maleChildLive);
    this.ECForm.controls['FemaleLive'].setValue(ec.femaleChildLive);
    if(ec.otherChildLive==null){
      this.ECForm.controls['OtherLive'].setValue('0')
    }else{
    this.ECForm.controls['OtherLive'].setValue(ec.otherChildLive);}
    this.ECForm.controls['mobno'].setValue(ec.mobileNo);
    this.ECForm.controls['WhoseMobile'].setValue(ec.whoseMobile);
    if(ec.bplApl==0){
      this.ECForm.controls['Category'].setValue('')
    }else{
    this.ECForm.controls['Category'].setValue(ec.bplApl);}

    this.ECForm.controls['YoungestChildYear'].setValue(ec.youngChildAgeYear);
    this.ECForm.controls['YoungestChildMonth'].setValue(ec.youngChildAgeMonth);
    this.ECForm.controls['YoungestChildSex'].setValue(ec.youngChildGender);
  }
  else{
    alert('Edit facility not available')
  }
 this. changePWage() ;
}
  
}
