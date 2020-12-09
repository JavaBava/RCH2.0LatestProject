import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { BackendAPIService } from '../service/backend-api.service';
import { TokenStorageService } from 'src/app/Core/service/token/tokenstoreage.service';
import { HierarchyModel } from '../../Core/Model/hierarchyModel';


@Component({
  selector: 'app-villageprofile',
  templateUrl: './villageprofile.component.html',
  styleUrls: ['./villageprofile.component.css']
})

export class VillageprofileComponent implements OnInit {
  hierarchyMobj = new HierarchyModel();
  submitted = false;

  sumOfTotal;
  selectedVillage;
  selectedSubCentre;
  selectedFacilityCode;
  selectedFacilityType;
  selectedHealthBlock;
  selectedDistrict;
  selectedState;
  selectedTaluka;
  selectedRuralUreban;
  selectedWard;

  fill_hierarchy = true
  RuralUrban: string; talukacode: string; wardcode: number

  constructor(private formBuilder: FormBuilder, private backendApiService: BackendAPIService, private tokenservice: TokenStorageService) { }

  showNotFoundMsg: boolean = false;




  ngOnInit(): void {
    this.createForm();
    console.log("inside type" + this.tokenservice.utypeId)

  }

  //**********************Hierarchy Implemented************************************************************* */

  usehierarchyHandler(hierarchyMobj: HierarchyModel) {
    this.hierarchyMobj = hierarchyMobj;
    this.selectedVillage = this.hierarchyMobj.villageid
    this.selectedSubCentre = this.hierarchyMobj.subfacilityid
    this.selectedFacilityCode = this.hierarchyMobj.facilityid
    this.selectedFacilityType = this.hierarchyMobj.facilitytypeid
    this.selectedHealthBlock = this.hierarchyMobj.blockid
    this.selectedDistrict = this.hierarchyMobj.districtid
    this.selectedState = this.hierarchyMobj.stateid
    this.selectedRuralUreban = this.hierarchyMobj.RuralUrban
    this.selectedTaluka = this.hierarchyMobj.talukacode
    this.selectedWard = this.hierarchyMobj.ward

    this.VillageDetailsYearWise = null
    this.VillageWiseProfile = null
    this.createForm();

    if (this.selectedState == undefined
      || this.selectedDistrict == undefined || this.selectedHealthBlock == undefined || this.selectedFacilityType == undefined
      || this.selectedFacilityCode == undefined || this.selectedSubCentre == undefined || this.selectedVillage == undefined
    ) {

      this.showNotFoundMsg = true;
      this.vmsg = "Select Hierachy First";
      this.fill_hierarchy = true

    }
    else {
      this.showNotFoundMsg = false;
      this.vmsg = null;
      this.fill_hierarchy = false
    }
    console.log("state : " + this.selectedState + " District : " + this.selectedDistrict + " Block : " + this.selectedHealthBlock + " Facility Type : " + this.selectedFacilityType + " Facility : " + this.selectedFacilityCode + " sub facility : " + this.selectedSubCentre + " village : " + this.selectedVillage)

    if (this.selectedSubCentre !== undefined) {

      this.fetchHealthProviderOnSubcentre(this.selectedSubCentre);
    }

    if (this.selectedVillage !== undefined) {
      this.getVillageWiseProfileData(this.selectedFacilityCode, this.selectedSubCentre, this.selectedVillage)
      this.getVillageDeatilsYearWise(this.selectedFinencialYear, this.selectedFacilityCode, this.selectedSubCentre, this.selectedVillage);

    }
  }

  //******************************************************************************************************** */


  //*********************************************************************************************************** */
  VillageWiseProfile: Array<any>;
  healthProviderANM: Array<any>;
  healthProviderANM2: Array<any>;
  healthProviderAWW: Array<any>;
  healthProviderASHA: Array<any>;
  healthProviderMPW: Array<any>;
  VillageDetailsYearWise: Array<any>;
  ANMNAme: any;
  ANM2Name: any;
  ASHAName: any;
  AWWName: any;
  MPWName: any;
  vmsg;


  financial_year: Array<any> = [
    { code: 2014, name: "2014-15" },
    { code: 2015, name: "2015-16" },
    { code: 2016, name: "2016-17" },
    { code: 2017, name: "2017-18" },
    { code: 2018, name: "2018-19" },
    { code: 2019, name: "2019-20" },
    { code: 2020, name: "2020-21" }
  ];

  selectedFinencialYear = this.financial_year[6].code;

  myForm: FormGroup;

  //********************************Create Form************************************************************ */

  private createForm() {

    this.myForm = this.formBuilder.group({

      sno: new FormControl(''),
      stateCode: new FormControl(''),
      districtCode: new FormControl(''),
      healthBlockCode: new FormControl(''),
      healthFacilityCode: new FormControl(''),
      healthSubCentreCode: new FormControl(''),
      talukaCode: new FormControl('00001'),
      fruName: new FormControl(''),
      ruralUrban: new FormControl(''),
      villageCode: new FormControl(''),
      villagePopulation: new FormControl('',
        [Validators.required,

        Validators.min(100),
        Validators.max(99999),
        Validators.pattern('[1-9]{1}[0-9]{0,5}'),

        ]),

      eligibleCouples: new FormControl('',
        [Validators.required,
        Validators.max(99999),
        Validators.pattern('[1-9]{1}[0-9]{0,5}'),




        ]),
      estimatedPw: new FormControl('',
        [Validators.required,
        Validators.max(99999),
        Validators.pattern('[1-9]{1}[0-9]{0,5}'),

        ]),
      estimatedInfant: new FormControl('',
        [
          Validators.required,

          Validators.max(99999),
          Validators.pattern('[1-9]{1}[0-9]{0,5}'),

        ]),
      estimatedChild: new FormControl('',
        [
          Validators.required,

          Validators.max(99999),
          Validators.pattern('[1-9]{1}[0-9]{0,5}'),

        ]),
      phcLl: new FormControl('', Validators.pattern('^[0]{1}[0-9]{2,4}-[1-9]{1}[0-9]{6,8}$')),
      phcMob: new FormControl('', Validators.pattern('[6-9]{1}[0-9]{9}$')),
      fruLl: new FormControl('', Validators.pattern('^[0]{1}[0-9]{2,4}-[1-9]{1}[0-9]{6,8}$')),
      fruMob: new FormControl('', Validators.pattern('[6-9]{1}[0-9]{9}$')),
      trsprtLl: new FormControl('', Validators.pattern('^[0]{1}[0-9]{2,4}-[1-9]{1}[0-9]{6,8}$'),
      ),
      trsprtMob: new FormControl('', Validators.pattern('[6-9]{1}[0-9]{9}$')),
      phcName: new FormControl(''),
      phcAddress: new FormControl(''),
      fruAddress: new FormControl(''),
      finanacialYr: new FormControl(this.selectedFinencialYear),
      healthFacilityType: new FormControl(''),
      rurUrbHierarchy: new FormControl(''),
      //wardNo: new FormControl(''),
      anmid: new FormControl('', [Validators.required]),
      anm2id: new FormControl('', [Validators.required]),
      mpwid: new FormControl('', [Validators.required]),
      ashaid: new FormControl('', [Validators.required]),
      awwid: new FormControl('', [Validators.required]),
      anmmob: new FormControl(''),
      anm2mob: new FormControl(''),
      mpwmob: new FormControl(''),
      ashamob: new FormControl(''),
      awwmob: new FormControl(''),
      createdBy: new FormControl(''),
      createdOn: new FormControl(''),
      updatedBy: new FormControl(''),
      updatedOn: new FormControl(''),
      anmname: new FormControl(''),
      anm2name: new FormControl(''),
      mpwname: new FormControl(''),
      ashaname: new FormControl(''),
      awwname: new FormControl(''),


    },
      {

        validator: [
          //this.validatePopulation('villagePopulation', 'eligibleCouples'),
          this.ConfirmedVillagePopulation('villagePopulation', 'eligibleCouples'),
          this.ConfirmedECPopulation('eligibleCouples', 'estimatedPw'),
          this.ConfirmedPWPopulation('estimatedPw', 'estimatedInfant'),
          this.ConfirmedInfantPopulation('estimatedInfant', 'estimatedChild'),
          this.checkSum1('villagePopulation', 'eligibleCouples', 'estimatedPw', 'estimatedInfant', 'estimatedChild'),
          this.ConfirmedANMOrMPW('anmid', 'mpwid')
        ]
      },
    );
  }








  //**************************************************************************************** */
  checkSum1(villagePopulation: any, eligibleCouples: any, estimatedPw: any, estimatedInfant: any, estimatedChild: any) {
    return (myForm: FormGroup) => {
      const vp = myForm.controls[villagePopulation];
      const ecp = myForm.controls[eligibleCouples];
      const epw = myForm.controls[estimatedPw];
      const ei = myForm.controls[estimatedInfant];
      const ec = myForm.controls[estimatedChild];

      if (ec.errors && !ec.errors.validSum) {
        return;
      }

      let vp1 = Number(vp.value)
      let ecp1 = Number(ecp.value)
      let epw1 = Number(epw.value)
      let ei1 = Number(ei.value)
      let ec1 = Number(ec.value)

      var tot = ecp1 + epw1 + ei1 + ec1;

      if (vp1 < tot) {
        ec.setErrors({ validSum: true });
      } else {
        ec.setErrors(null);
      }
    }

  }


  //************************************************************************************************************* */

  validateANMOrMPW(anm: any, mpw: any) {
    return (formGroup: FormGroup) => {
      const anm1 = formGroup.controls[anm];
      const mpw1 = formGroup.controls[mpw];

      // window.alert(villagePopulation.value  || couplePopulation.value )
      console.log((anm1.value || mpw1.value))

      if (!anm1 || !mpw1) {
        return null;
      }

      if (anm1.errors && mpw1.errors) {
        return null;
      }
      if (anm1.value == "0" && mpw1.value == "0") {
        mpw1.setErrors({ atleatOne: true });



      } else {
        mpw1.setErrors(null);
      }
    }


  }

  ConfirmedANMOrMPW(controlName: string, matchingControlName: string) {
    return (myForm: FormGroup) => {
      const control = myForm.controls[controlName];
      const matchingControl = myForm.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors.atleatOne) {
        return;
      }
      if (control.value == "0" && matchingControl.value == "0") {
        matchingControl.setErrors({ atleatOne: true });
      } else {
        matchingControl.setErrors(null);
      }
    }
  }



  //********************************************************************************************** */



  keyup(event) {
    var charCode = event.keyCode;

    if ((charCode > 64 && charCode < 91) || (charCode > 106 && charCode < 123) && charCode != 109) {

      event.preventDefault();
    }
    else
      return true;
  }

  //*************************************************************************************************************** */    

  get f() {

    return this.myForm.controls;
  }

  //******************************Submit Form***************************************************************** */


  submitForm(myForm) {
    console.log(myForm)

    console.log("inside submit")

    this.submitted = true;

    if (this.myForm.invalid)
      return;


    var finanacialYr = Number(this.myForm.get('finanacialYr').value)
    var villagePopulation = Number(this.myForm.get('villagePopulation').value)
    var eligibleCouples = Number(this.myForm.get('eligibleCouples').value)
    var estimatedPw = Number(this.myForm.get('estimatedPw').value)
    var estimatedInfant = Number(this.myForm.get('estimatedInfant').value)
    var estimatedChild = Number(this.myForm.get('estimatedChild').value)


    var anmid = Number(this.myForm.get('anmid').value);
    var anm2id = Number(this.myForm.get('anm2id').value);
    var ashaid = Number(this.myForm.get('ashaid').value);
    var awwid = Number(this.myForm.get('awwid').value);
    var mpwid = Number(this.myForm.get('mpwid').value);


    var serialno = 0;

    if (this.VillageDetailsYearWise != null) {
      serialno = this.VillageDetailsYearWise[0].sno
      console.log("inside serial no")

    }

    this.myForm.patchValue({


      sno: serialno,
      stateCode: this.selectedState,
      districtCode: this.selectedDistrict,
      healthBlockCode: this.selectedHealthBlock,
      healthFacilityCode: this.selectedFacilityCode,
      healthSubCentreCode: this.selectedSubCentre,
      talukaCode: this.selectedTaluka,
      healthFacilityType: this.selectedFacilityType,
      rurUrbHierarchy: this.selectedRuralUreban,
      ruralUrban:  this.selectedRuralUreban,
      villageCode: this.selectedVillage,
      anmid: anmid,
      ashaid: ashaid,
      mpwid: mpwid,
      anm2id: anm2id,
      awwid: awwid,
      anmname: this.ANMNAme,
      anm2name: this.ANM2Name,
      mpwname: this.MPWName,
      ashaname: this.ASHAName,
      awwname: this.AWWName,
      finanacialYr: finanacialYr,
      villagePopulation: villagePopulation,
      eligibleCouples: eligibleCouples,
      estimatedPw: estimatedPw,
      estimatedInfant: estimatedInfant,
      estimatedChild: estimatedChild


    });



    console.log(myForm)
    if (this.VillageDetailsYearWise != null) {
      var sno = this.VillageDetailsYearWise[0].sno
      console.log("inside serial no value and update village method#######" + this.VillageDetailsYearWise[0].sno)
      this.myForm.controls['updatedBy'].setValue(this.tokenservice.getUserId()),
        this.myForm.controls['updatedOn'].setValue(new Date())
      this.myForm.controls['createdBy'].setValue(this.VillageDetailsYearWise[0].createdBy),
        this.myForm.controls['createdOn'].setValue(this.VillageDetailsYearWise[0].createdOn),
        // this.myForm.controls['finanacialYr'].setValue(this.year)

        this.updateVillageWiseProfile(sno, myForm.value)
    }
    else {
      console.log("inside add village")

      this.myForm.controls['updatedBy'].setValue(null),
        this.myForm.controls['updatedOn'].setValue(null)
      this.myForm.controls['createdBy'].setValue(this.tokenservice.getUserId()),
        this.myForm.controls['createdOn'].setValue(new Date()),
        //this.myForm.controls['finanacialYr'].setValue(this.year)
        this.addVillageProfile(myForm.value);
    }





  }

  //****************************************Clear Form********************************************************* */
  clearMyForm() {

    var fin = this.myForm.get('finanacialYr').value

    this.myForm.reset();
    this.myForm.controls['finanacialYr'].setValue(fin);
  }


  //*******************************Validation of Estimation ****************************************************/ 

  ConfirmedVillagePopulation(controlName: string, matchingControlName: string) {
    return (myForm: FormGroup) => {
      const control = myForm.controls[controlName];
      const matchingControl = myForm.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors.validPop) {
        return;
      }

      let villagePopulation1 = Number(control.value)
      let couplePopulation1 = Number(matchingControl.value)


      if (villagePopulation1 < couplePopulation1) {
        matchingControl.setErrors({ validPop: true });
      } else {
        matchingControl.setErrors(null);
      }
    }
  }


  ConfirmedECPopulation(controlName: string, matchingControlName: string) {
    return (myForm: FormGroup) => {
      const control = myForm.controls[controlName];
      const matchingControl = myForm.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors.validPw) {
        return;
      }

      let ec1 = Number(control.value)
      let pwc1 = Number(matchingControl.value)


      if (ec1 < pwc1) {
        matchingControl.setErrors({ validPw: true });
      } else {
        matchingControl.setErrors(null);
      }
    }
  }

  ConfirmedPWPopulation(controlName: string, matchingControlName: string) {
    return (myForm: FormGroup) => {
      const control = myForm.controls[controlName];
      const matchingControl = myForm.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors.validInfant) {
        return;
      }

      let pwc1 = Number(control.value)
      let infantc1 = Number(matchingControl.value)




      if (pwc1 < infantc1) {
        matchingControl.setErrors({ validInfant: true });
      } else {
        matchingControl.setErrors(null);
      }
    }
  }

  ConfirmedInfantPopulation(controlName: string, matchingControlName: string) {
    return (myForm: FormGroup) => {
      const control = myForm.controls[controlName];
      const matchingControl = myForm.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors.validChild) {
        return;
      }

      let infantc1 = Number(control.value)
      let childc1 = Number(matchingControl.value)



      if (infantc1 < childc1) {
        matchingControl.setErrors({ validChild: true });
      } else {
        matchingControl.setErrors(null);
      }
    }
  }



  /* validatePopulation(villagePop : any , eligiblePop : any )
  {
    return (formGroup: FormGroup) => {
      debugger
      const villagePopulation = formGroup.controls[villagePop];
      const couplePopulation = formGroup.controls[eligiblePop];
 
      if(!villagePopulation|| !couplePopulation){
        return null;
 
      }
      
       if(villagePopulation.errors && !couplePopulation.errors.validPop){
 return null;
       }
 
         let villagePopulation1=Number(villagePopulation.value)
         let couplePopulation1=Number(couplePopulation.value)
   
   
          if (villagePopulation1 < couplePopulation1) {
            couplePopulation.setErrors({ validPop: true });
      
          } else {
            couplePopulation.setErrors(null);
          }
    
        }
       
 
        
 
      }
 
        
  */

  validateEligbleCouple(eligiblePop: any, pw: any) {
    return (formGroup: FormGroup) => {
      const ec = formGroup.controls[eligiblePop];
      const pwc = formGroup.controls[pw];
      if (!ec && !pwc) {
        return null;
      }

      if (ec.errors && !pwc.errors.validPw) {
        return null;
      }
      let ec1 = Number(ec.value)
      let pwc1 = Number(pwc.value)
      if (ec1 < pwc1) {
        pwc.setErrors({ validPw: true });
      } else {
        pwc.setErrors(null);
      }
    }

  }
  //************************************************************************************************** */
  validateInfant(pw: any, infant: any) {
    return (formGroup: FormGroup) => {
      const pwc = formGroup.controls[pw];
      const infantc = formGroup.controls[infant];


      if (!pwc && !infantc) {
        return null;
      }
      if (pwc.errors && !infantc.errors.validInfant) {
        return null;
      }

      let pwc1 = Number(pwc.value)
      let infantc1 = Number(infantc.value)

      if (pwc1 < infantc1) {
        infantc.setErrors({ validInfant: true });
      } else {
        infantc.setErrors(null);
      }

    }



  }

  //********************************************************************************************** */
  validateChild(infant: any, child: any) {
    return (formGroup: FormGroup) => {
      const infantc = formGroup.controls[infant];
      const childc = formGroup.controls[child];

      if (!infantc && !childc) {
        return null;
      }


      if (infantc.errors && !childc.errors.validChild) {
        return null;
      }

      let infantc1 = Number(infantc.value)
      let childc1 = Number(childc.value)
      if (infantc1 < childc1) {
        childc.setErrors({ validChild: true });

      } else {
        childc.setErrors(null);
      }


    }
  }

  //************************************Save method for Village Profile******************************************** */

  addVillageProfile(data: any): void {
    console.log("#####################    indise add village ################")
    let financialYear = this.myForm.get('finanacialYr').value;
    console.log(data)
    //console.log(JSON.stringify(data))
    this.backendApiService.post(data).subscribe(res => {
      let response = JSON.parse(JSON.stringify(res))
      console.log(response);
      alert("Record saved successfully")
      this.getVillageWiseProfileData(this.selectedFacilityCode, this.selectedSubCentre, this.selectedVillage);
      this.getVillageDeatilsYearWise(financialYear, this.selectedFacilityCode, this.selectedSubCentre, this.selectedVillage)






    }, error => {
      console.log("inside ts vp error")
      console.log(error)
    })
  }

  //********************************************Update village wise profile*************************************** */
  updateVillageWiseProfile(sno: number, data: any): void {

    let financialYear = this.myForm.get('finanacialYr').value;
    console.log("inside update village---######################")


    console.log(data)

    this.backendApiService.updateVillageWiseDetails(sno, data).subscribe(res => {
      let response = JSON.parse(JSON.stringify(res))
      console.log(response)
      alert("Update record successfully");
      this.getVillageWiseProfileData(this.selectedFacilityCode, this.selectedSubCentre, this.selectedVillage);

      this.getVillageDeatilsYearWise(financialYear, this.selectedFacilityCode, this.selectedSubCentre, this.selectedVillage);


    }, error => {
    })
  }

  //**************************Event for accepting only integers*******************************************  */

  keydownfunction(e) {
    var charCode = e.keyCode;

    var invalidChars = [
      "-",
      "+",
      "e",
    ];

    if (invalidChars.includes(e.key)) {
      e.preventDefault();
    }

    if((charCode >=96 && charCode<=105 ) || (charCode >=48 && charCode<=57) || charCode=="8" || charCode=="9" ){
      
      //alert(charCode)
    }
    else{
      e.preventDefault();
     // alert('hi')
    }

    /* if ((charCode > 64 && charCode < 91) || (charCode > 106 && charCode < 123) && charCode == 187) {

      e.preventDefault();
    } */

  }

  landLineFunction(e) {
    var charCode = e.keyCode;

    var invalidChars = [
      "+",
      "e",
    ];

    if (invalidChars.includes(e.key)) {
      e.preventDefault();
    }

   /*  if ((charCode > 64 && charCode < 91) || (charCode > 106 && charCode < 123) && charCode == 187) {

      e.preventDefault();
    } */

    if((charCode >=96 && charCode<=105 ) || (charCode >=48 && charCode<=57) || charCode=="8" || charCode=="9" ||charCode=="109" || charCode=="189"){
    }
    else{
      e.preventDefault();
  
    }

  }

  mobileFunction(e){
    var charCode = e.keyCode;
    if((charCode >=96 && charCode<=105 ) || (charCode >=48 && charCode<=57) || charCode=="8" || charCode=="9"){
    }
    else{
      e.preventDefault();
  
    }

  }

  _keyUp(e: any) {
    //debugger;
    var invalidChars = [
      "+",
      "e",
    ];

    if (invalidChars.includes(e.key) || (e.which > 48 || e.which < 96)) {
      e.preventDefault();
    }

  }





  _keyUpLandline(event: any) {

    if (event.which != 189 && event.which != 8 && event.which != 0 && event.which != 189 && event.which < 48 || event.which > 57 && event.which) {
      event.preventDefault();
    }




  }


  //************************** Get Method for village wise profile ***********************************************/ 

  getVillageWiseProfileData(healthFacility: number, subcentre: number, village: number): void {
    this.backendApiService.getVillageWiseProfileAPI(healthFacility, subcentre, village).subscribe((res: Response) => {
      let response = JSON.parse(JSON.stringify(res));
      console.log("inside village wise profile data")
      console.log(response);

      this.VillageWiseProfile = response;
    })
  }




  /* ********************************Health Provider API*********************************** */

  getHealthProviderByANMType(subcentre: number, typeid: number): void {
    this.backendApiService.getHealthProvideratSubcentre(subcentre, typeid).subscribe((res: Response) => {
      let response = JSON.parse(JSON.stringify(res));
      console.log(response);
      this.healthProviderANM = response;
      if(this.healthProviderANM.length <1){
        this.healthProviderANM=[ {id: 0, name: "Not Available", contact_No: ""}]
      }

    })
  }

  getHealthProviderByANM2Type(subcentre: number, typeid: number): void {
    this.backendApiService.getHealthProvideratSubcentre(subcentre, typeid).subscribe((res: Response) => {
      let response = JSON.parse(JSON.stringify(res));
      console.log(response);
      this.healthProviderANM2 = response;
      if(this.healthProviderANM2.length <1){
        this.healthProviderANM2=[ {id: 0, name: "Not Available", contact_No: ""}]
      }


    })
  }
  getHealthProviderByASHAType(subcentre: number, typeid: number): void {
    this.backendApiService.getHealthProvideratSubcentre(subcentre, typeid).subscribe((res: Response) => {
      let response = JSON.parse(JSON.stringify(res));
      console.log(response);
      this.healthProviderASHA = response;
      if(this.healthProviderASHA.length <1){
        this.healthProviderASHA=[ {id: 0, name: "Not Available", contact_No: ""}]
      }

    })
  }
  getHealthProviderByAWWType(subcentre: number, typeid: number): void {
    this.backendApiService.getHealthProvideratSubcentre(subcentre, typeid).subscribe((res: Response) => {
      let response = JSON.parse(JSON.stringify(res));
      console.log(response);
      this.healthProviderAWW = response;
      if(this.healthProviderAWW.length <1){
        this.healthProviderAWW=[ {id: 0, name: "Not Available", contact_No: ""}]
      }


    })
  }

  getHealthProviderByMPWType(subcentre: number, typeid: number): void {
    this.backendApiService.getHealthProvideratSubcentre(subcentre, typeid).subscribe((res: Response) => {
      let response = JSON.parse(JSON.stringify(res));
      console.log(response);
      this.healthProviderMPW = response;
      if(this.healthProviderMPW.length <1){
        this.healthProviderMPW=[ {id: 0, name: "Not Available", contact_No: ""}]
      }


    })
  }



  fetchHealthProviderOnSubcentre(subcentre_code: any) {
    console.log("inside health provider subcentre method")
    this.getHealthProviderByANMType(subcentre_code, 2)
    this.getHealthProviderByANM2Type(subcentre_code, 3)
    this.getHealthProviderByASHAType(subcentre_code, 1)
    this.getHealthProviderByMPWType(subcentre_code, 5)
    this.getHealthProviderByAWWType(subcentre_code, 8)

  }


  changeANMMobile(e) {
    console.log("inside change anm-----   " + e);
    const index = this.healthProviderANM.findIndex(x => x.id == e)
    var contact_no = this.healthProviderANM[index].contact_No;
    this.ANMNAme = this.healthProviderANM[index].name;
    this.myForm.controls['anmmob'].setValue(contact_no)


  }


  changeANM2Mobile(e) {
    console.log("inside change anm2-----" + e);
    const index = this.healthProviderANM2.findIndex(x => x.id == e)
    var ANM2contect_no = this.healthProviderANM2[index].contact_No;
    this.ANM2Name = this.healthProviderANM2[index].name;
    this.myForm.controls['anm2mob'].setValue(ANM2contect_no)



  }


  changeAWWMobile(e) {
    console.log("inside change aww-----" + e);
    const index = this.healthProviderAWW.findIndex(x => x.id == e)
    var AWWcontact_no = this.healthProviderAWW[index].contact_No;
    this.AWWName = this.healthProviderAWW[index].name;
    this.myForm.controls['awwmob'].setValue(AWWcontact_no)


  }

  changeMPWMobile(e) {
    console.log("inside change MPW-----" + e);

    const index = this.healthProviderMPW.findIndex(x => x.id == e)
    var MPWcontact_no = this.healthProviderMPW[index].contact_No;
    this.MPWName = this.healthProviderMPW[index].name;
    this.myForm.controls['mpwmob'].setValue(MPWcontact_no)


  }

  changeASHAMobile(e) {
    console.log("inside change asha-----" + e);

    const index = this.healthProviderASHA.findIndex(x => x.id == e)
    var ASHAcontact_no = this.healthProviderASHA[index].contact_No;
    this.ASHAName = this.healthProviderASHA[index].name;
    this.myForm.controls['ashamob'].setValue(ASHAcontact_no)


  }

  //********************************* Village details year wise********************************************* */
  getVillageDeatilsYearWise(year: number, healthfacility_code: number, subfacility_code: number, villagecode: number): void {
    console.log(year + "-------" + healthfacility_code + "----------" + subfacility_code + "--------" + villagecode)
    this.backendApiService.getVillageDetailsYearWise(year, healthfacility_code, subfacility_code, villagecode).subscribe((res: Response) => {
      let response = JSON.parse(JSON.stringify(res));
      console.log(response)
      console.log("village details year wise---------------------####################")
      console.log(response.length);
      if (response.length > 0) {
        this.VillageDetailsYearWise = response;

        console.log(this.VillageDetailsYearWise[0].phcName)
        this.VillageDetailsYearWise = response;
        this.myForm.controls['villagePopulation'].setValue(this.VillageDetailsYearWise[0].villagePopulation),
          this.myForm.controls['eligibleCouples'].setValue(this.VillageDetailsYearWise[0].eligibleCouples),
          this.myForm.controls['estimatedPw'].setValue(this.VillageDetailsYearWise[0].estimatedPw),
          this.myForm.controls['estimatedInfant'].setValue(this.VillageDetailsYearWise[0].estimatedInfant),
          this.myForm.controls['estimatedChild'].setValue(this.VillageDetailsYearWise[0].estimatedChild),
          this.myForm.controls['phcLl'].setValue(this.VillageDetailsYearWise[0].phcLl),
          this.myForm.controls['fruName'].setValue(this.VillageDetailsYearWise[0].fruName),
          this.myForm.controls['phcMob'].setValue(this.VillageDetailsYearWise[0].phcMob),
          this.myForm.controls['fruLl'].setValue(this.VillageDetailsYearWise[0].fruLl),
          this.myForm.controls['fruMob'].setValue(this.VillageDetailsYearWise[0].fruMob),
          this.myForm.controls['trsprtLl'].setValue(this.VillageDetailsYearWise[0].trsprtLl),
          this.myForm.controls['trsprtMob'].setValue(this.VillageDetailsYearWise[0].trsprtMob),
          this.myForm.controls['phcName'].setValue(this.VillageDetailsYearWise[0].phcName),
          this.myForm.controls['phcAddress'].setValue(this.VillageDetailsYearWise[0].phcAddress),
          this.myForm.controls['fruAddress'].setValue(this.VillageDetailsYearWise[0].fruAddress),
          // this.myForm.controls['finanacialYr'].setValue(this.selectedFinencialYear),
          this.myForm.controls['anmid'].setValue(this.VillageDetailsYearWise[0].anmid),
          this.myForm.controls['anm2id'].setValue(this.VillageDetailsYearWise[0].anm2id),
          this.myForm.controls['mpwid'].setValue(this.VillageDetailsYearWise[0].mpwid),
          this.myForm.controls['ashaid'].setValue(this.VillageDetailsYearWise[0].ashaid),
          this.myForm.controls['awwid'].setValue(this.VillageDetailsYearWise[0].awwid),
          this.myForm.controls['anmmob'].setValue(this.VillageDetailsYearWise[0].anmmob),
          this.myForm.controls['anm2mob'].setValue(this.VillageDetailsYearWise[0].anm2mob),
          this.myForm.controls['mpwmob'].setValue(this.VillageDetailsYearWise[0].mpwmob),
          this.myForm.controls['ashamob'].setValue(this.VillageDetailsYearWise[0].ashamob),
          this.myForm.controls['awwmob'].setValue(this.VillageDetailsYearWise[0].awwmob)

      }
      else if (response.length < 1) {
        console.log("inside else if condition")
        this.VillageDetailsYearWise = null;
        var fin = this.myForm.get('finanacialYr').value


        this.createForm();
        this.myForm.controls['finanacialYr'].setValue(fin)
        this.submitted = false
      }

    })
  }
  changeFinancialYear(e) {

    console.log("inside year change")
    this.VillageDetailsYearWise = null

    this.getVillageDeatilsYearWise(e, this.selectedFacilityCode, this.selectedSubCentre, this.selectedVillage);
  }

  downloadpdf() {
    this.getreport(this.selectedFacilityCode);
  }
  getreport(id: string) {
    console.log(id + "Village Profile Report.");
    var urlstr = "http://164.100.61.97/Home/Download?dcode=" + this.selectedDistrict + "&bid=" + this.selectedHealthBlock + "&PHC_Id=" + id + "&SUB_PHC_Id=" + this.selectedSubCentre + "&Vcode=" + this.selectedVillage;
    console.log(urlstr);
    window.location.href = urlstr

  }

}
