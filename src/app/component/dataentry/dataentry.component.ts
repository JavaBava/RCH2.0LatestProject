import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/Core/service/token/tokenstoreage.service';

@Component({
  selector: 'app-dataentry',
  templateUrl: './dataentry.component.html',
  styleUrls: ['./dataentry.component.css']
})
export class DataentryComponent implements OnInit {

  usertypeid: number;
  constructor(public router: Router,private tokenservice: TokenStorageService) { }

  ngOnInit(): void {
    this.usertypeid = this.tokenservice.utypeId;
      
  }


  callvillageprofile(){

    this.router.navigate(['/home/villageprofile'])
  }

  callecprofile(){
     //debugger
    if ((this.usertypeid == 1) || (this.usertypeid == 2) || (this.usertypeid == 3)) {
      alert('National level  and State level and District user not be able add/edit beneficiary records')
    }
    else{
    this.router.navigate(['/home/ecprofile'])
    }
  }
  callectracking(){
    this.router.navigate(['/home/ectrack'])
  }
}
