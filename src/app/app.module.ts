import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SideBarComponent } from './component/side-bar/side-bar.component';
import { HeaderComponent } from './component/header/header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { FooterComponent } from './component/footer/footer.component';
import { VillageprofileComponent } from './component/villageprofile/villageprofile.component';
import { LoginComponent } from './component/login/login.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import{HttpClientModule} from '@angular/common/http';
import {BackendAPIService} from "./component/service/backend-api.service";
import { HomeComponent } from './home/home.component';
import{TokenStorageService} from './Core/service/token/tokenstoreage.service'
import { ForgotpasswordComponent } from './component/forgotpassword/forgotpassword.component';
import { OtpComponent } from './component/otp/otp.component';
import { RegistrationComponent } from './component/registration/registration.component';
import{EcprofileComponent} from './component/ecprofile/ecprofile.component';
import{DataentryComponent} from './component/dataentry/dataentry.component';
import { EctrackComponent } from './component/ectrack/ectrack.component';
import { EcreportComponent } from './Report/ecreport/ecreport.component';
import { ChangepasswordComponent } from './component/changepassword/changepassword.component';
import { ConfirmregistrationComponent } from './component/confirmregistration/confirmregistration.component';
import { ECReportComponent } from './component/ecreport/ecreport.component';
import { HierarchyComponent } from './component/hierarchy/hierarchy.component';
import { CommonmasterComponent } from './component/commonmaster/commonmaster.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserapprovalComponent } from './component/userapproval/userapproval.component';
import {RegistrationService} from "./component/registration/registration.service";
import { BulkprofileReportComponent } from './component/bulkprofile-report/bulkprofile-report.component';
import { ReportsComponent } from './component/reports/reports.component';

import {CalenderserviceService} from "./component/service/calenderservice.service";
import { NgbDateParserFormatter, NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import { AssignroleComponent } from './component/assignrole/assignrole.component';
import { ComingSoonComponent } from './component/coming-soon/coming-soon.component';
import { DatePipe } from '@angular/common'
import { NgxPaginationModule } from 'ngx-pagination';
import{AutheticationGuard} from './authetication.guard'
import { BlockCopyPasteDirective } from './component/login/block-copy-paste.directive';
import { MustchangepasswordComponent } from './component/mustchangepassword/mustchangepassword.component';

import {IpServiceService} from "./component/service/ip-service.service";
import {ForgotpasswordService} from "./component/service/forgotpassword.service";

import { ToastrModule } from 'ngx-toastr';
//import { SearchComponent } from './component/search/search.component';

import { SidebarModule } from 'ng-sidebar';
import {SharedserviceService} from "./component/service/sharedservice.service";
import { NgxBootstrapModalComponent } from './ngx-bootstrap-modal/ngx-bootstrap-modal.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ChildPncComponent } from './component/child-pnc/child-pnc.component';
import { InnerfooterComponent } from './component/innerfooter/innerfooter.component'; 
import { SearchComponent } from './component/search/search.component';




@NgModule({
  declarations: [
    AppComponent,
    SideBarComponent,
    HeaderComponent,
    DashboardComponent, 
    FooterComponent,
    VillageprofileComponent,
    LoginComponent,
    EcprofileComponent,
    HomeComponent,
    ForgotpasswordComponent,
    OtpComponent,
    RegistrationComponent,
    DataentryComponent,
    EctrackComponent,
    EcreportComponent,
    ChangepasswordComponent,
    ConfirmregistrationComponent,
    ECReportComponent,
    HierarchyComponent,
    CommonmasterComponent,
    UserapprovalComponent,
    BulkprofileReportComponent,
    ReportsComponent,
    
    UserapprovalComponent,
    BulkprofileReportComponent,
    AssignroleComponent,
    ComingSoonComponent,
    BlockCopyPasteDirective,
    MustchangepasswordComponent,
    SearchComponent,
    NgxBootstrapModalComponent,
    ChildPncComponent,
    InnerfooterComponent




   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BsDatepickerModule.forRoot(),
    BrowserAnimationsModule,
    NgxPaginationModule,
    SidebarModule.forRoot(),
    ToastrModule.forRoot(),
    ModalModule.forRoot() 


  ],
  providers: [DatePipe,AutheticationGuard,BackendAPIService,TokenStorageService,RegistrationService,{ provide: NgbDateParserFormatter, useClass: CalenderserviceService },IpServiceService,ForgotpasswordService,SharedserviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
