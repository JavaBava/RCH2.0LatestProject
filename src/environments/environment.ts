// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
production: false,

stateUrl:  "http://164.100.61.93/States",
districtUrl: "http://164.100.61.93/Districts/",
healthBlockUrl:  "http://164.100.61.93/HealthBlocks/",
healthPHCUrl:  "http://164.100.61.93/HealthPhcs/",
healthSubCentreUrl:  "http://164.100.61.93/HealthSubcentres/",
talukaUrl:  "http://164.100.61.93/Talukas/",
villageUrl:"http://164.100.61.93/VillageDetails/",
healthPHCByBlockAndType:"http://164.100.61.93/HealthPhcs/GetHealthPhcbyTypeBlock?blockcode=",

postVillageWiseeProfile:"http://164.100.61.93/VillagewiseProfile/saveVillageDetails",
VillageWiseProfile:"http://164.100.61.93/VillagewiseProfile/GetVillageDetailsByHierarchy?HealthFacility_code=",
loginUrl:"http://164.100.61.93/login?Username=",
HealthProvideratSubcentre:"http://164.100.61.93/HealthProvider/HealthProvideratSubcentre?",
searchHealthProviderById:"http://164.100.61.93/HealthProvider/HealthProviderByID?providerid=",
getUser:"http://164.100.61.93/getUser",
getYearWiseVillageDetails: "http://164.100.61.93/VillagewiseProfile/GetYearWiseVillageDetails?year=",
updateVillageWiseDetails:"http://164.100.61.93/VillagewiseProfile/updateVillageDetails?id=",
healthFacilityType:"http://164.100.61.93/HealthFacilityMaster",
getVillageAtSubCentre:"http://164.100.61.93/VillageDetails/SubcentreVillage?subcenterCode=",
getSearch:"http://164.100.61.93/GetECRegistration",

//nisha
BankDetails: "http://164.100.61.93/BankDetails",
Religions:"http://164.100.61.93/Religions",
Occupations:"http://164.100.61.93/Occupations",
Educations:"http://164.100.61.93/Educations",

FacilityType:"http://164.100.61.93/HealthFacilityMaster",
village:"http://164.100.61.93/VillageDetails/SubcentreVillage?subcenterCode=",
HealthPhcbyTypeBlock:"http://164.100.61.93/HealthPhcs/GetHealthPhcbyTypeBlock?blockcode=",
postECData:"http://164.100.61.93/SaveEC",
editECData:"http://164.100.61.93/UpdateEC?registrationNo=",
//bunty ji

forgotpassotpUrl:"http://164.100.61.93/ResetPassword",

VerifyUserInfoUrl:"http://164.100.61.93/VerifyUserInfo",

VerifyotpUrl:"http://164.100.61.93/VerifyOTP",

userCreateFirstStepUrl:"http://164.100.61.93/CreateUser",

UserTypeUrl:  "http://164.100.61.93/TypeMaster",

FacilityTypeUrl:  "http://164.100.61.93/HealthFacilityMaster",

 
changepassotpUrl:"http://164.100.61.93/UpdatePassword",

registrationrequestUrl:  "http://164.100.61.93/GetUserLists",

userapprovedUrl:  "http://164.100.61.93/UpdateUserStatus",

assingroleUrl:  "http://164.100.61.93/GetRoles",

applicationUrl:  "http://164.100.61.93/GetApplication",

userRoleAppicationAssignedUrl:  "http://164.100.61.93/AssignRoles",

IsUserAvailableUrl:  "http://164.100.61.93/IsUserAvailable",

GenerateOTPUrl:  "http://164.100.61.93/GenerateOTP",

SendEmailUrl:  "http://164.100.61.93/SendEmail",

SearchUsersUrl:  "http://164.100.61.93/GetECRegistration",

//brijesh sir
ecreportdata:"http://164.100.61.93/getECHierarchy?phc=",
bulkprofilereportdata:"http://164.100.61.97/api/BulkProfile?dcode=",





//Ashutosh
getECbyRegNo:"http://164.100.61.93/getECbyRegNo?registration_no=",
getECTbyRegNo:"http://164.100.61.93/getECTbyRegNo?registration_no=",
getHealthFacility: "http://164.100.61.93/HealthFacilityMaster",
getHealthFacilityType:"http://164.100.61.93/HealthPhcs/GetHealthPhcbyTypeBlock?",
saveEctdetails : "http://164.100.61.93/SaveECT",
getMethods : "http://164.100.61.93/GetMethods",
getEctVisit: "http://164.100.61.93/GetECTDetailsVisit?",
editEct : "http://164.100.61.93/UpdateECT?"


};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
