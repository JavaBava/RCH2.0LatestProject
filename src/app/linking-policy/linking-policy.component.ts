import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-linking-policy',
  templateUrl: './linking-policy.component.html',
  styleUrls: ['./linking-policy.component.css']
})
export class LinkingPolicyComponent implements OnInit {

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
