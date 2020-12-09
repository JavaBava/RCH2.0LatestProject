import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-disclaimer',
  templateUrl: './disclaimer.component.html',
  styleUrls: ['./disclaimer.component.css']
})
export class DisclaimerComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }


  changePage(){

    if(window.localStorage.getItem("login")!=null){

      this.router.navigate(['/home'])
    }
    else{
      this.router.navigate(['/login'])
    }
  }


}
