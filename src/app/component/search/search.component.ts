import { ViewChild } from '@angular/core';
import { Component, OnInit,Output ,EventEmitter} from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';


import {BackendAPIService} from '../service/backend-api.service';
import{HierarchyService} from '../../Core/service/hierarchy/hierarchy.service'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

//************************************************************************************************************ */  
  selectedHierarchy

  
//******************************************************************************************************** */
  @Output() useSearch: EventEmitter<any> = new EventEmitter()
 

  constructor(private hierarchyService:HierarchyService,private backendApiService: BackendAPIService,private formBuilder: FormBuilder) { }

 
  
  submitted :boolean=false
  searchForm: FormGroup;

  ngOnInit(): void {
    this.createForm();
    
  }

  minDate = { year: new Date().getFullYear() - 65, month: 4, day: 1 };
  maxDate = { year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate() };
  

  onreset(){
this.searchForm.reset();
this.submitted=false;

  }

  private createForm() {
    this.searchForm = this.formBuilder.group({
      PWfirstname: new FormControl('',[Validators.required,Validators.pattern('^[A-Z, a-z ,.-]+$')]),
      HusbandFirstname: new FormControl('',[Validators.required,Validators.pattern('^[A-Z, a-z ,.-]+$')]),
     // PWDOB: new FormControl(''),
      mobno: new FormControl('', [Validators.required,Validators.pattern('[6-9]{1}[0-9]{9}$')]),
    })}

    
    PWaccountnoDisable(e) {
      // //debugger
      if (e.target.checked == true) {
		  
		this.searchForm.controls['HusbandFirstname'].setValue('');  
        this.searchForm.controls['HusbandFirstname'].disable();
        //this.searchForm.controls['PWDOB'].setValidators(Validators.required)

 
      }
      else{
        this.searchForm.controls['HusbandFirstname'].enable();
       // this.searchForm.controls['PWDOB'].setValidators(null) 
      }
    }

    get f() {

      return this.searchForm.controls;
    }

  onSubmit(searchForm) {
 //debugger
    this.submitted = true;

    if (this.searchForm.invalid)
      return;
  
  //alert("inside submit in search")
  
  console.log(searchForm.value.PWfirstname)
  console.log(searchForm.value)
 
	/* if(searchForm.value.HusbandFirstname=='undefined')
	{
	this.funSearchUsers(searchForm.value.PWfirstname,"",searchForm.value.mobno);
	}
	else
	{
	this.funSearchUsers(searchForm.value.PWfirstname,searchForm.value.HusbandFirstname,searchForm.value.mobno);
	}
	
	 */
/*   let  data  = {
    "state_code": (this.selectedState).toString(),
    "district_code": (this.selectedDistrict).toString(),
    "block_code": (this.selectedHealthBlock).toString(),
    "facility_code": (this.selectedFacilityCode).toString(),
    "subfacility_code": (this.selectedSubCentre).toString(),
    "village_code": (this.selectedVillage).toString(),
    "name_wife":searchForm.value.PWfirstname,
    "name_husband": searchForm.value.PWfirstname,
    "mobile_no": searchForm.value.mobno
  } */

 
 
  this.getHeirarchy()
  console.log("inside search save")
  console.log(this.selectedHierarchy)
  this.useSearch.emit(searchForm.value);

  
  }
  getHeirarchy(): void {
  this.selectedHierarchy=this.hierarchyService.getHierarchy();
  
  console.log("inside search component get method of hierarchy")
console.log(this.selectedHierarchy)
let  data  = {
  "state_code": (this.selectedHierarchy.stateid).toString(),
  "district_code": (this.selectedHierarchy.districtid).toString(),
  "block_code": (this.selectedHierarchy.blockid).toString(),
  "facility_code": (this.selectedHierarchy.facilityid).toString(),
  "subfacility_code": (this.selectedHierarchy.subfacilityid).toString(),
  "village_code": (this.selectedHierarchy.villageid).toString(),
  "name_wife":this.searchForm.value.PWfirstname,
  "name_husband": this.searchForm.value.HusbandFirstname,
  "mobile_no": this.searchForm.value.mobno
}
console.log(JSON.stringify(data))



}


/*
funSearchUsers(PWfirstname:string,HusbandFirstname:string,mobno:string)
{
 let  data  = {
    "state_code": "4",
    "district_code": "1",
    "block_code": "1",
    "facility_code": "3",
    "subfacility_code": "129",
    "village_code": "10000052",
    "name_wife": PWfirstname,
    "name_husband": "",
    "mobile_no": mobno
  }
	 this.backendApiService.GetSearchUsersAPI(data).subscribe((res:Response)=> {
		 
		 let response=JSON.parse(JSON.stringify(res));
		 
		 console.log('GetSearchUsersAPI=');
    console.log(response);
	 this.useSearch.emit(response);
	 
		 },(error) => {
       
        alert('Something went wrong. Please try letter');	   
	 console.log('erro in GetSearchUsersAPI function');
	 console.log(error);
	
	 })
}

*/






}
