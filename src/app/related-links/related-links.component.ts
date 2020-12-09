import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-related-links',
  templateUrl: './related-links.component.html',
  styleUrls: ['./related-links.component.css']
})
export class RelatedLinksComponent implements OnInit {

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
