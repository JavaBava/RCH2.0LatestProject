import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  


  

  title = 'RCH 2.0';
  isSidebarVisible ="block"
  SideBarVisiblityHandler(isSidebarVisible: string) {
    this.isSidebarVisible = isSidebarVisible;

    console.log("count");
  }

  


}
