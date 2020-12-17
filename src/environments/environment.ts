// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  
  Drug: 'http://localhost:51563/api/drugs/',
  PostDrugName: 'http://localhost:51563/api/Drugs/PostDrugName',
  DrugDetails: 'http://localhost:51563/api/DrugDetails/',
  DrugAndDrugDetails: 'http://localhost:51563/api/DrugDetails/GetDrugDetails/',
  Thera: 'http://localhost:51563/api/drugs/thera',
  theraById: 'http://localhost:51563/api/drugs/theraById/',
  ActiveThera: 'http://localhost:51563/api/drugs/activethera',
  TheraSub: 'http://localhost:51563/api/drugs/therasub',
  Forms: 'http://localhost:51563/api/drugs/forms',
  ActiveForms: 'http://localhost:51563/api/Forms/activeForm',
  Firm: 'http://localhost:51563/api/drugs/firms',
  Unit: 'http://localhost:51563/api/drugs/unit',
  ActiveUnit: 'http://localhost:51563/api/drugs/activeunit',
  ROAD: 'http://localhost:51563/api/drugs/ROAD',
  ActiveROAD: 'http://localhost:51563/api/drugs/ActiveROAD',
  Country: 'http://localhost:51563/api/drugs/country',
  ActiveCountry: 'http://localhost:51563/api/drugs/activecountry',
  therasubBYgroup: 'http://localhost:51563/api/drugs/therasubBYgroup/',
  category:'http://localhost:51563/api/Categories/', 
  subCategory:'http://localhost:51563/api/SubCategories/', 
  login:'http://localhost:51563/api/AuthenticateController',
  firms:'http://localhost:51563/api/Firms',
  firmsActive:'http://localhost:51563/api/Firms/activeFirm',
  subCategoryActive:'http://localhost:51563/api/SubCategories/activeSubCategory',
  form:'http://localhost:51563/api/Forms',
  order:'http://localhost:51563/api/Orders/',
  SoftDeleteorder:'http://localhost:51563/api/Orders/DeleteOrder/',
  orderViewModelByPharmacySource:'http://localhost:51563/api/Orders/GetOrderByPharmacySourceId/',
  orderViewModelByPharmacyTarget:'http://localhost:51563/api/Orders/GetOrderByPharmacyTargetId/',
  orderViewModelPutPendingStatus:'http://localhost:51563/api/Orders/PutOrderByPharmacyId/',
  pharmacy: 'http://localhost:51563/api/Pharmacies/',
  pledge: 'http://localhost:51563/api/drugs/pledge/',
  supplier: 'http://localhost:51563/api/drugs/Supplier',
  patient: 'http://localhost:51563/api/drugs/Patient',
  employee: 'http://localhost:51563/api/Employees/',
  getAllusersByPharmacyName: 'http://localhost:51563/api/Users/GetAllUsersByPharmacyName/',
  postPharmacy:'http://localhost:51563/api/Pharmacies/',
  getSupplierById :'http://localhost:51563/api/drugs/getSupplierById/',
  getPatientById :'http://localhost:51563/api/drugs/getPatientById/',

  production: false
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
