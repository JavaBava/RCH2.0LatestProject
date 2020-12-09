import { Component, OnInit,ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Form, Validators, RequiredValidator } from '@angular/forms';
import {BackendAPIService} from '../service/backend-api.service';
import { HierarchyModel } from '../../Core/Model/hierarchyModel'
import { HierarchyService } from 'src/app/Core/service/hierarchy/hierarchy.service';
import{HierarchyComponent} from '../hierarchy/hierarchy.component'
import { TokenStorageService } from 'src/app/Core/service/token/tokenstoreage.service';

@Component({
  selector: 'app-bulkprofile-report',
  templateUrl: './bulkprofile-report.component.html',
  styleUrls: ['./bulkprofile-report.component.css']
})
export class BulkprofileReportComponent implements OnInit {
  @ViewChild(HierarchyComponent) hc;
  hierarchyMobj =new HierarchyModel();
  selectedVillage;
  selectedSubCentre;
  selectedFacilityCode;
  selectedFacilityType;
  selectedHealthBlock;
  selectedDistrict;
  selectedState;
 

  constructor(private formBuilder: FormBuilder, private backendApiService: BackendAPIService,private hierarchyService:HierarchyService, private tokenservice: TokenStorageService) {
    
   }
   usehierarchyHandler(hierarchyMobj: HierarchyModel){
    this.hierarchyMobj = hierarchyMobj;
    this.selectedVillage=this.hierarchyMobj.villageid
    this.selectedSubCentre=this.hierarchyMobj.subfacilityid
    this.selectedFacilityCode=this.hierarchyMobj.facilityid
    this.selectedFacilityType=this.hierarchyMobj.facilitytypeid
    this.selectedHealthBlock=this.hierarchyMobj.blockid
    this.selectedDistrict=this.hierarchyMobj.districtid
    this.selectedState =this.hierarchyMobj.stateid
   
   
  }  
  ngOnInit(): void {
    this.createForm();

    
  }
  selectdYear:number


bulkprofiledatalist:any;
bid:number;
phcid:number;
subphcid:number;
vcode:number;


financial_year:Array<any>=[
  {code:2014, name:"2014-15"},
  {code:2015, name:"2015-16"},
  {code:2016, name:"2016-17"},
  {code:2017, name:"2017-18"},
  {code:2018, name:"2018-19"},
  {code:2019, name:"2019-20"},
  {code:2020, name:"2020-21"}
];

selectedFinencialYear=this.financial_year[2].code;
myForm: FormGroup;

private createForm() {

  this.myForm = this.formBuilder.group({
    
    
    stateCode: new FormControl(''),
    districtCode: new FormControl( '' ),
    healthBlockCode: new FormControl(  ''),
    healthFacilityCode: new FormControl(''),
    healthSubCentreCode: new FormControl(''),
    talukaCode: new FormControl( ''), 
    ruralUrban: new FormControl(''),
    villageCode: new FormControl( ''),
    finanacialYr: new FormControl( ''),
    healthFacilityType: new FormControl(''),
    rurUrbHierarchy: new FormControl( ''),
    
    
  } );
}

  


getebulkprofiledata(){
  
  
  // console.log(this.selectedFacilityCode+"inside village");
  if(typeof this.selectedFacilityCode=='undefined')
       {
         this.bid=this.selectedHealthBlock;
         this.phcid=0;
         this.subphcid=0;
         this.vcode=0;
       }
 else if(typeof this.selectedSubCentre=='undefined')
 {
         this.bid=this.selectedHealthBlock;
         this.phcid=this.selectedFacilityCode;
         this.subphcid=0;
         this.vcode=0;
 }
 else if(typeof this.selectedVillage=='undefined')
 {
         this.bid=this.selectedHealthBlock;
         this.phcid=this.selectedFacilityCode;
         this.subphcid=this.selectedSubCentre;
         this.vcode=0;
 }
 else
 {
  this.bid=this.selectedHealthBlock;
  this.phcid=this.selectedFacilityCode;
  this.subphcid=this.selectedSubCentre;
  this.vcode=this.selectedVillage;
 }
 this.backendApiService.getBulkprofileDataAPi(this.selectedDistrict,this.bid,this.phcid,this.subphcid,this.vcode,2020)
.subscribe((res:Response)=>{
let response=JSON.parse(JSON.stringify(res));

this.bulkprofiledatalist=response.Data;
console.log(this.bulkprofiledatalist);
});
 
}
downloadpdf(){
  if(typeof this.selectedFacilityCode=='undefined')
       {
         this.bid=this.selectedHealthBlock;
         this.phcid=0;
         this.subphcid=0;
         this.vcode=0;
       }
 else if(typeof this.selectedSubCentre=='undefined')
 {
         this.bid=this.selectedHealthBlock;
         this.phcid=this.selectedFacilityCode;
         this.subphcid=0;
         this.vcode=0;
 }
 else if(typeof this.selectedVillage=='undefined')
 {
         this.bid=this.selectedHealthBlock;
         this.phcid=this.selectedFacilityCode;
         this.subphcid=this.selectedSubCentre;
         this.vcode=0;
 }
 else
 {
  this.bid=this.selectedHealthBlock;
  this.phcid=this.selectedFacilityCode;
  this.subphcid=this.selectedSubCentre;
  this.vcode=this.selectedVillage;
 }
  this.getreport(this.bid,this.phcid,this.subphcid,this.vcode);
  }
  getreport(Bid:number,Phcid:number,Subphcid:number,Vcode:number){
  
  var urlstr ="http://164.100.61.97/Home/DownLoadBulkProfile?dcode="+this.selectedDistrict+"&bid="+Bid+"&phcid="+Phcid+"&subphcid="+Subphcid+"&vcode="+Vcode+"&fin_year="+2020;
  console.log(urlstr);
  window.location.href=urlstr
                    
  }

}
