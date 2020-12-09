import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { VillageprofileComponent } from './component/villageprofile/villageprofile.component';
import { LoginComponent } from './component/login/login.component';
import {HomeComponent} from './home/home.component';
import { DisclaimerComponent } from './component/disclaimer/disclaimer.component'
import{ RelatedLinksComponent } from './related-links/related-links.component'
import{LinkingPolicyComponent} from './linking-policy/linking-policy.component'
import { ForgotpasswordComponent } from './component/forgotpassword/forgotpassword.component';
import { OtpComponent } from './component/otp/otp.component';
import { RegistrationComponent } from './component/registration/registration.component';
import{EcprofileComponent} from './component/ecprofile/ecprofile.component';
import{DataentryComponent} from './component/dataentry/dataentry.component';
import { EctrackComponent } from './component/ectrack/ectrack.component';
import { ChangepasswordComponent } from './component/changepassword/changepassword.component';
import { ConfirmregistrationComponent } from './component/confirmregistration/confirmregistration.component';
import { ECReportComponent } from './component/ecreport/ecreport.component';
import { HierarchyComponent } from './component/hierarchy/hierarchy.component';
import { CommonmasterComponent } from './component/commonmaster/commonmaster.component';
import { BulkprofileReportComponent } from './component/bulkprofile-report/bulkprofile-report.component';
import { UserapprovalComponent } from './component/userapproval/userapproval.component';
import { ReportsComponent } from './component/reports/reports.component';
import {ReportComponent} from './component/report/report.component'
import { AssignroleComponent } from './component/assignrole/assignrole.component';
import { ComingSoonComponent } from './component/coming-soon/coming-soon.component';
import { AutheticationGuard } from './authetication.guard';
import { MustchangepasswordComponent } from './component/mustchangepassword/mustchangepassword.component';
import { NgxBootstrapModalComponent } from './ngx-bootstrap-modal/ngx-bootstrap-modal.component';
import { ChildPncComponent } from './component/child-pnc/child-pnc.component'; 

const routes: Routes = 
[

 {
  path:'',
   component:LoginComponent,
   pathMatch:'full'
 }, 

{
  path:'home',
  component:HomeComponent,
  canActivate:[AutheticationGuard],
 
  children:[
    {
     path:'',
     component:DashboardComponent,
     pathMatch:'full'
    },

    {
    path:'dashboard',
    component:ComingSoonComponent,
  },

  {
    path:'villageprofile',
    component:VillageprofileComponent,
  },
  {
    path:'ecprofile',
    component:EcprofileComponent,
  },
  {
    path:'dataentry',
    component:DataentryComponent,
  },
  {
    path:'ectrack',
    component:EctrackComponent,
    canActivate:[AutheticationGuard],
  },
  {
    path:'report',
    component:ReportComponent,
  },
  {
    path:'report/ecreport',
    component:ECReportComponent,
    pathMatch:'full'
     },
     {
      path:'report/BulkprofileReport',
      component:BulkprofileReportComponent,
      pathMatch:'full'
    },
     {
      path:'hierarchy',
      component:HierarchyComponent,
    },

    {
      path:'changepassword',
      component:ChangepasswordComponent,
      pathMatch:'full'
    },
    {
      path:'commonmaster',
      component:CommonmasterComponent,
    },
    {
      path:'reports',
      component:ReportsComponent,
    } ,
    {
      path:'comingsoon',
      component:ComingSoonComponent,
    } ,
    {
      path:'mustchangepassword',
      component:MustchangepasswordComponent,
      pathMatch:'full'
    }	
,
{
  path:'userapproval',
  component:UserapprovalComponent,

},
{
  path:'assignrole',
  component:AssignroleComponent,

},
{
  path:'childpnc',
  component:ChildPncComponent,

}
    
  ]
},

{
  path:'popup',
  component:NgxBootstrapModalComponent,
  pathMatch:'full'
},


{
  path:'login',
  component:LoginComponent,
  pathMatch:'full'
},
  {
    path:'disclaimer',
    component:DisclaimerComponent,
    pathMatch:'full'
  },
{
  path:'logout',
  component:LoginComponent,
  pathMatch:'full'
},
  
{
  path:'related-links',
  component:RelatedLinksComponent,
},

{
  path:'linking-policy',
  component:LinkingPolicyComponent,
},

{
  path:'forgotpassword',
  component:ForgotpasswordComponent,
  pathMatch:'full'
},
{
  path:'otp',
  component:OtpComponent,
  pathMatch:'full'
}
,

{
  path:'registration',
  component:RegistrationComponent,
  pathMatch:'full'
},


{
  path:'confirmregistration',
  component:ConfirmregistrationComponent,
  pathMatch:'full'
},
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule
 {


  }
