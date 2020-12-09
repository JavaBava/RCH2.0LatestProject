import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BackendAPIService } from '../service/backend-api.service';
import { TokenStorageService } from 'src/app/Core/service/token/tokenstoreage.service';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HierarchyModel } from '../../Core/Model/hierarchyModel';
import { HierarchyService } from '../../Core/service/hierarchy/hierarchy.service'
import { invalid } from '@angular/compiler/src/render3/view/util';


@Component({
  selector: 'app-hierarchy',
  templateUrl: './hierarchy.component.html',
  styleUrls: ['./hierarchy.component.css']
})
export class HierarchyComponent implements OnInit {
  @Output() usehierarchy: EventEmitter<any> = new EventEmitter()

  hierarchyMobj = new HierarchyModel();
  currenthierarchy=new HierarchyModel();
  RuralUrban: string ="R";
  usertypeid: number; statename: string; districtName: string; healthBlockName: string; facilityName: string;
  stateid1: number; distictid: number; blockid: number;healthPHCid:number;facilitytypeid:string;
  stateDisabled: boolean; districtDisabled: boolean; blockDisabled: boolean; facilityDisabled: boolean;facilityTypeDisabled:boolean;talukaDisabled:boolean


  facilityExists: boolean=false;
  SubfacilityExists: boolean=false;
  villageExists: boolean=false;

  constructor(private backendApiService: BackendAPIService,
    private hierarchyService: HierarchyService,
    private tokenservice: TokenStorageService) { }


  ngOnInit(): void {
    this.getStateData();  
   /*  this.hierarchyMobj=this.hierarchyService.getHierarchy();
    if(this.hierarchyMobj!=null)
    {debugger
      this.selectedState = this.hierarchyMobj.stateid;
      this.selectedDistrict = this.hierarchyMobj.districtid;
      this.selectedHealthBlock = this.hierarchyMobj.blockid;
      this.selectedFacilityType=this.hierarchyMobj.facilitytypeid
      this.selectedFacilityCode=this.hierarchyMobj.facilityid
      this.selectedSubCentre=this.hierarchyMobj.subfacilityid 
      this.selectedVillage=this.hierarchyMobj.villageid
    } */
    this.usertypeid = this.tokenservice.utypeId;
    this.statename = this.tokenservice.statename;
    this.stateid1 = this.tokenservice.stateid;
    this.distictid = this.tokenservice.districtid;
    this.blockid = this.tokenservice.healthblockid;
    this.districtName = this.tokenservice.districtname;
    this.healthBlockName = this.tokenservice.healthblockname;
    this.facilityName = this.tokenservice.facilityname;
    this.healthPHCid=this.tokenservice.phcId
    this.facilitytypeid=this.tokenservice.facilityType
   
    this.hierarchyMobj.RuralUrban="R"
  //debugger
  this.currenthierarchy=this.hierarchyService.getHierarchy();
  if(this.currenthierarchy==undefined)
  {
    this.checkuser();
  }
  else{
    this.bindHierarchy();
  }
   // this.getFacilityType();

   
  
  }

  bindHierarchy()
  {
   ////debugger
    this.checkuser();
    if(this.currenthierarchy.stateid>0)
    {
      this.selectedState = this.currenthierarchy.stateid;
      this.changeDistrict();
    }
    if(this.currenthierarchy.districtid>0)
    {
      this.selectedDistrict = this.currenthierarchy.districtid;
      this.changeHealthBlock();
    }
    if(this.currenthierarchy.blockid>0)
    {
      this.selectedHealthBlock = this.currenthierarchy.blockid;
       this.changeHealthPHC();
    }
    if(this.currenthierarchy.facilitytypeid>0)
    {
      
      this.selectedFacilityType=this.currenthierarchy.facilitytypeid
      this.changeFacilityType();
    }
    if(this.currenthierarchy.facilityid>0)
    {
      this.selectedFacilityCode=this.currenthierarchy.facilityid
      this.changeHealthSubCentres();
    }
    if(this.currenthierarchy.subfacilityid>0)
    {     
      this.selectedSubCentre=this.currenthierarchy.subfacilityid
      this.changeVillage();
    }
    if(this.currenthierarchy.villageid>0)
    {    
      this.selectedVillage=this.currenthierarchy.villageid
      this.getVillage()
    }   
    if(this.currenthierarchy.talukacode !="")
    {
      this.selectedTaluka=this.currenthierarchy.talukacode
    }
   
   this.usehierarchy.emit(this.hierarchyMobj)
  } 

  div2: boolean = false;
  div1: boolean = true;
  selectedVillage;
  selectedTaluka;
  selectedSubCentre;
  selectedFacilityCode;
  selectedHealthBlock;
  selectedDistrict;
  selectedState;
  selectedFacilityType;
  selectedward =null; 

  state: Array<any>;
  district: Array<any>;
  healthBlock: Array<any>;
  healthPHC: Array<any>;
  healthSubcentres: Array<any>;
  talukas: Array<any>;
  village: Array<any>;
  VillageWiseProfile: Array<any>;
  FacilityType: Array<any>;

  checkuser(): void {
//debugger
    if (this.usertypeid == 1) {
      this.selectedState = this.stateid1;
      this.hierarchyMobj.stateid = this.selectedState;
      this.changeDistrict();
     
    }
    else if (this.usertypeid == 2) {
      this.selectedState = this.stateid1
      this.changeDistrict();
      this.stateDisabled = true;
      this.hierarchyMobj.stateid = this.selectedState;
    }
    else if (this.usertypeid == 3) {
      this.selectedState = this.stateid1
      this.selectedDistrict = this.distictid
      this.changeDistrict();
      this.changeHealthBlock();
      this.stateDisabled = true; this.districtDisabled = true;
      this.hierarchyMobj.stateid = this.selectedState;
      this.hierarchyMobj.districtid = this.selectedDistrict;
    }
    else if (this.usertypeid == 4) {
      this.selectedState = this.stateid1
      this.selectedDistrict = this.distictid
      this.selectedHealthBlock = this.blockid

      this.changeDistrict();
      this.changeHealthBlock();
    //  this.getHealthPHC(this.selectedHealthBlock);

      this.stateDisabled = true; this.districtDisabled = true; this.blockDisabled = true;

      let data = { state: this.selectedState, district: this.selectedDistrict, block: this.selectedHealthBlock, facility: "", subfacility: "", village: "" }
      this.hierarchyMobj.stateid = this.selectedState;
      this.hierarchyMobj.districtid = this.selectedDistrict;
      this.hierarchyMobj.blockid = this.selectedHealthBlock;
      

    }
    else if (this.usertypeid == 5) {
     //debugger
      this.selectedState = this.stateid1
      this.selectedDistrict = this.distictid
      this.selectedHealthBlock = this.blockid
      this.selectedFacilityType=this.facilitytypeid
      this.selectedFacilityCode=this.healthPHCid

      this.changeDistrict();
      this.changeHealthBlock();
      //this.getHealthPHC(this.selectedHealthBlock);
      this.changeHealthSubCentres();

      this.stateDisabled = true; this.districtDisabled = true; this.blockDisabled = true; this.facilityDisabled = true; this.facilityTypeDisabled=true
      this.hierarchyMobj.stateid = this.selectedState;
      this.hierarchyMobj.districtid = this.selectedDistrict;
      this.hierarchyMobj.blockid = this.selectedHealthBlock;
      this.hierarchyMobj.facilitytypeid=this.selectedFacilityType;
      this.hierarchyMobj.facilityid=this.selectedFacilityCode;
    }
    else if (this.usertypeid == 6) {
      this.selectedState = this.statename;
      this.stateDisabled = !this.stateDisabled;
    }
    else { }
    this.hierarchyMobj.RuralUrban=this.RuralUrban
    this.hierarchyMobj.ward=this.selectedward
    this.hierarchyMobj.talukacode=this.selectedTaluka
    this.hierarchyService.setHierarchy(this.hierarchyMobj);
    this.usehierarchy.emit(this.hierarchyMobj)
   
  }
  changeUrban() {
      this.div2 = true;
    this.div1 = false;
this.RuralUrban="U";
this.selectedward=0
  }

  changeRural() {
       this.div2 = false;
    this.div1 = true;
this.RuralUrban="R"
this.selectedward=null;
  }
  getVillageSubcenter(subcentre: number): void {
    //debugger
    this.backendApiService.getVillage(subcentre).subscribe((res: Response) => {
      let response = JSON.parse(JSON.stringify(res));
      this.village = response;
      if(response.length ==0){

        this.villageExists=true;
        this.hierarchyMobj.villageid=0
        this.usehierarchy.emit(this.hierarchyMobj)
              }
              else
              {
                this.villageExists=false;
              }
    })
  }
  getFacilityType(): void {
    this.backendApiService.getFacilityType().subscribe((res: Response) => {
      let response = JSON.parse(JSON.stringify(res));
      this.FacilityType = response;
    })
  }


  getStateData(): void {
    this.backendApiService.getStateAPI().subscribe((res: Response) => {
      let response = JSON.parse(JSON.stringify(res));
      this.state = response;
    })
  }

  getVillageWiseProfileData(healthFacility: number, subcentre: number, village: number): void {
    this.backendApiService.getVillageWiseProfileAPI(healthFacility, subcentre, village).subscribe((res: Response) => {
      let response = JSON.parse(JSON.stringify(res));
      this.VillageWiseProfile = response;
    })
  }

  getDistrictData(id: string): void {
    this.backendApiService.getDistrictAPI(id).subscribe((res: Response) => {
      let response = JSON.parse(JSON.stringify(res));
      this.district = response;

    })
  }

  getHealthBlockData(id: string): void {
    this.backendApiService.getHealthBlocksAPI(id).subscribe((res: Response) => {
      let response = JSON.parse(JSON.stringify(res));
      this.healthBlock = response;
     
      //alert(this.healthBlock[0].tcode)
     
    })
  }


  getHealthPHC(id: string): void {
    this.backendApiService.getHealthPHCAPI(id).subscribe((res: Response) => {
      let response = JSON.parse(JSON.stringify(res));
      this.healthPHC = response;
      this.selectedTaluka=this.healthPHC[0].tcode
      this.hierarchyMobj.talukacode=this.selectedTaluka
      this.hierarchyService.setHierarchy(this.hierarchyMobj);
      this.usehierarchy.emit(this.hierarchyMobj)
    })
  }
 
  getHealthSubCentres(id: string): void {

    this.backendApiService.getHealthSubcentersAPI(id).subscribe((res: Response) => {
      let response = JSON.parse(JSON.stringify(res));
      this.healthSubcentres = response;
      if(response.length ==0){

        this.SubfacilityExists=true;
              }
              else
              {
                this.SubfacilityExists=false;
              }
    })
  }
  getTalukaData(id: string): void {
    this.backendApiService.getTalukasAPI(id).subscribe((res: Response) => {
      let response = JSON.parse(JSON.stringify(res));
      this.talukas = response;
      this.selectedTaluka=response[0].tcode;
     this.hierarchyMobj.talukacode=this.selectedTaluka
     this.hierarchyService.setHierarchy(this.hierarchyMobj);
     this.usehierarchy.emit(this.hierarchyMobj)
    })
  }

  getVillageData(id: number): void {
    this.backendApiService.getVillageAPI(id).subscribe((res: Response) => {
      let response = JSON.parse(JSON.stringify(res));
      this.village = response;

    })
  }

  changeDistrict() {

    this.getDistrictData(this.selectedState);
   // this.selectedDistrict="";
    // this.healthBlock=[0]
    // this.FacilityType=[0]
    // this.healthPHC=[0]
    // this.healthSubcentres=[0];
    // this.village=[0];


    // let data = { state: this.selectedState }
    // console.log(data)
    // this.usehierarchy.emit(data)
   
      this.hierarchyMobj.stateid=this.selectedState
      this.hierarchyMobj.districtid=undefined 
      this.hierarchyMobj.blockid=undefined 
      this.hierarchyMobj.facilityid = undefined 
      this.hierarchyMobj.subfacilityid=undefined 
      this.hierarchyMobj.villageid=undefined 
      this.hierarchyService.setHierarchy(this.hierarchyMobj);
          this.usehierarchy.emit(this.hierarchyMobj)
      //this.hierarchyService.setHierarchy(this.hierarchyMobj);
      //this.currenthierarchy.stateid=this.selectedState
  }

  changeHealthBlock() {
    this.getTalukaData(this.selectedDistrict);
    this.getHealthBlockData(this.selectedDistrict);
    
this.talukaDisabled=true
//this.selectedHealthBlock="";
    // this.FacilityType=[0]
    // this.healthPHC=[0]
    // this.healthSubcentres=[0];
    // this.village=[0];
    this.getFacilityType();
   
this.hierarchyMobj.stateid=this.selectedState
this.hierarchyMobj.districtid=this.selectedDistrict
this.hierarchyMobj.blockid=undefined 
this.hierarchyMobj.facilityid = undefined 
this.hierarchyMobj.subfacilityid=undefined 
this.hierarchyMobj.villageid=undefined 
this.hierarchyMobj.talukacode=this.selectedTaluka;  
    
this.hierarchyService.setHierarchy(this.hierarchyMobj);

  this.usehierarchy.emit(this.hierarchyMobj)
  }
  changeHealthPHC() {
    //this.getHealthPHC(this.selectedHealthBlock);
    
    this.hierarchyMobj.blockid=this.selectedHealthBlock
   // this.hierarchyMobj.facilityid=this.selectedFacilityCode;
   this.hierarchyMobj.facilityid = undefined 
   this.hierarchyMobj.subfacilityid=undefined 
   this.hierarchyMobj.villageid=undefined 
   this.hierarchyService.setHierarchy(this.hierarchyMobj);
    this.usehierarchy.emit(this.hierarchyMobj)

    this.healthPHC=[0]
    this.healthSubcentres=[0];
    this.village=[0];
//alert(this.hierarchyMobj.facilityid)
  } 

  changeHealthSubCentres() {
    
    this.getHealthSubCentres(this.selectedFacilityCode);
    this.hierarchyMobj.facilitytypeid=this.selectedFacilityType;
   // this.hierarchyMobj = new HierarchyModel()
  // this.selectedSubCentre=""
   this.hierarchyMobj.blockid=this.selectedHealthBlock
    this.hierarchyMobj.facilityid = this.selectedFacilityCode
    this.hierarchyMobj.subfacilityid=undefined 
    this.hierarchyMobj.villageid=undefined 
    this.hierarchyService.setHierarchy(this.hierarchyMobj);
    this.usehierarchy.emit(this.hierarchyMobj)

    this.village=[0];
  }
  changeVillage() {
    this.village=[0];
    this.selectedVillage=undefined
    this.getVillageSubcenter(this.selectedSubCentre);
    
    this.hierarchyMobj.subfacilityid = this.selectedSubCentre
    this.hierarchyMobj.villageid=undefined
    
    this.hierarchyService.setHierarchy(this.hierarchyMobj);
    this.usehierarchy.emit(this.hierarchyMobj)
   
  }

  getVillage() {
    //this.getVillageWiseProfileData(this.selectedFacilityCode, this.selectedSubCentre, this.selectedVillage)
    this.hierarchyMobj.villageid=this.selectedVillage
    this.hierarchyService.setHierarchy(this.hierarchyMobj);
    this.usehierarchy.emit(this.hierarchyMobj)
  }
  changeFacilityType() {
   //debugger
    this.getHealthPHCtypeblock(this.selectedHealthBlock, this.selectedFacilityType);
    console.log(this.healthPHC.length)
    console.log(this.healthPHC)
    /* if(this.healthPHC.length ==1){
      console.log('Not Available')
      this.facilityExists=true;
            }
            else
            {
              this.facilityExists=false;
            } */
    this.selectedFacilityCode=""
    this.selectedSubCentre=""
    this.healthSubcentres=[0];
    this.village=[0];
   // this.selectedFacilityCode=""
    this.hierarchyMobj.blockid=this.selectedHealthBlock
    this.hierarchyMobj.facilitytypeid=this.selectedFacilityType;
    this.hierarchyMobj.facilityid = undefined
    this.hierarchyMobj.subfacilityid=undefined
    this.hierarchyMobj.villageid=undefined
    this.usehierarchy.emit(this.hierarchyMobj)

   
  }
  getHealthPHCtypeblock(block: number, ftype: number): void {
    this.backendApiService.getHealthPhcbyTypeBlock(block, ftype).subscribe((res: Response) => {
      let response = JSON.parse(JSON.stringify(res));
      this.healthPHC = response;
      //debugger
      if(response.length ==0){

this.facilityExists=true;
      }
      else
      {
        this.facilityExists=false;
      } 
    })
  }

}
