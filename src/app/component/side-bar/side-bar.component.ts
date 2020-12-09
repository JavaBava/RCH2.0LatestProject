import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/Core/service/token/tokenstoreage.service';
import { Router } from '@angular/router';

import { SharedserviceService } from 'src/app/component/service/sharedservice.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

showmobilescreenDiv: boolean=false;

  username:string; designation:string; location:string; usertypeid:number;
  constructor( private tokenservice:TokenStorageService, public router: Router,public sharedservice: SharedserviceService) { }

  changeToBlue = false;
  changeToOrange = false;
  public _opened2: boolean = false;
  
  public _opened: boolean = false;
  
  ngOnInit(): void {
    
    this.username=this.tokenservice.getUserName;
    this.designation=this.tokenservice.userDesignation;
    
    this.usertypeid=this.tokenservice.utypeId;
    if(this.usertypeid==1)
    {           this.location =this.tokenservice.statename;         }
    else if(this.usertypeid==2)
    { this.location="State : "  + this.tokenservice.statename;  
  }
  else if(this.usertypeid==3)
        {this.location="District : " +this.tokenservice.districtname;  
      }
        else if(this.usertypeid==4)
        {this.location="Health Block : " +this.tokenservice.healthblockname}
        else if(this.usertypeid==5)
    {this.location="Health Facility : " +this.tokenservice.facilityname}
    else if(this.usertypeid==6)
    {this.location="Health Sub Facility : "}
    else{      this.location=""    }
    
    if(this.designation ===null){
      this.designation="Not Available"
    }

    console.log(this.designation);
	
	////////////// communicating with header component through service
	
	 this.sharedservice.getBlue().subscribe(x => { 

   
	  
        //this.changeToBlue = x;
		if(x==true)
		{
		//this.mobilescreen_open();
		 this._opened = !this._opened;
		}
      }) 
	  
  }

  logout(){
    console.log("inside logout")
   window.sessionStorage.removeItem("login");
this.tokenservice.signOut();

console.log(window.localStorage.getItem("login"))

this.router.navigate(['/login'])


  }
  
  status: boolean = false;
  
   mobilescreen_open(){
   
     if( this.showmobilescreenDiv== true)
	 {
	 this.showmobilescreenDiv= false;
	 }
	 else{
		 this.showmobilescreenDiv= true; 
	 }

  }
  

 /*
  public _toggleSidebar() { alert('yes clicked');
    this._opened = !this._opened;
  }
 */  
  


}
