import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/Core/service/token/tokenstoreage.service';

import { SharedserviceService } from 'src/app/component/service/sharedservice.service';




@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  username:string;
  constructor(private tokenservice:TokenStorageService, public router: Router,public sharedservice: SharedserviceService) { }
  isSidebarVisible : string ;
  @Output() SideBarVisiblity: EventEmitter<string> =   new EventEmitter();
  ngOnInit(): void { 
    this.username=this.tokenservice.Username;
  }
 
  SideBarVisibilityChange(){
    if(this.isSidebarVisible =='block'){
      this.isSidebarVisible = 'none'
    }
    else{
    this.isSidebarVisible = 'block'
    }
    this.SideBarVisiblity.emit(this.isSidebarVisible);
  }
  logout(){
    console.log("inside logout")
    window.sessionStorage.removeItem("login");
   window.localStorage.removeItem("login");
this.tokenservice.signOut();

console.log(window.localStorage.getItem("login"))

this.router.navigate(['/login'])


  }
  
  
  public _openedheader: boolean = false;
  public _toggleHeader() { 
    this._openedheader = !this._openedheader;
  }
  
////////// communicate two component ( sidebar ) through shared service
  public ClickSidebar() {
	 this.sharedservice.setBlue(true);
  }


}
