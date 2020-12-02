import { BrowserModule } from '@angular/platform-browser';
import {NgModule } from '@angular/core';
import {AccordionModule} from 'primeng/accordion';    
import { AppComponent } from './app.component';
import {MenubarModule} from 'primeng/menubar';
import {NavBarComponent} from './component/nav-bar/nav-bar.component'
// import { Routes } from '@angular/router';
import { RouterModule, Routes } from '@angular/router';
import { AddDrugComponent } from './component/Drugs/add-drug/add-drug.component';
import { AppRoutingModule} from './app-routing.module';
import { ShowDrugComponent } from './component/Drugs/show-drug/show-drug.component'
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
// import {DrugService} from './services/drug.service'
import { HttpClient, HttpClientModule } from '@angular/common/http';;
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
// import { HttpClientModule, HttpClient } from  '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import {InputTextModule} from 'primeng/inputtext';
import {CheckboxModule} from 'primeng/checkbox';
import {RadioButtonModule} from 'primeng/radiobutton';
import {TabViewModule} from 'primeng/tabview';
import {DropdownModule} from 'primeng/dropdown';
import {CalendarModule} from 'primeng/calendar';
import {InputMaskModule} from 'primeng/inputmask';
import {ToastModule} from 'primeng/toast';
import {SliderModule} from 'primeng/slider';
import {MultiSelectModule} from 'primeng/multiselect';
import {ContextMenuModule} from 'primeng/contextmenu';
import {DialogModule} from 'primeng/dialog';
import {ProgressBarModule} from 'primeng/progressbar';
import {SignupComponent} from './component/signup/signup.component';
import { ToastComponent } from './toast/toast.component';
import { EditDrugComponent } from './component/Drugs/edit-drug/edit-drug.component';
import { AddSubCategoryComponent } from './component/SubCategory/add-sub-category/add-sub-category.component';
// import { EditSubCategoryComponent } from './component/SubCategory/edit-sub-category/edit-sub-category.component';
import {ShowCategoriesComponent} from './component/Category/show-categories/show-categories.component'
import { ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import { AdminComponent } from '../app/component/admin/admin.component';
import {FileUploadModule} from 'primeng/fileupload';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {KeyFilterModule} from 'primeng/keyfilter';
import {ToolbarModule} from 'primeng/toolbar';
import {SplitButtonModule} from 'primeng/splitbutton';
import {RatingModule} from 'primeng/rating';
import {InputNumberModule} from 'primeng/inputnumber';
import { FirmComponent } from './component/Firm/firm/firm.component';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {InputSwitchModule} from 'primeng/inputswitch';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { HomeComponent } from './component/home/home.component';
import {FormComponent} from '../app/component/form/form.component';
import { AddOrderComponent } from '../app/component/Orders/add-order/add-order.component'
import {PickListModule} from 'primeng/picklist';
import {OrderListModule} from 'primeng/orderlist';
import {OrderDetails} from '../app/Models/OrderDetails';
import { EmployeeComponent } from './component/Employee/emplyee/employee.component';
import { AllUserComponent } from './component/Users/all-user/all-user.component';
import {DrugService} from '../app/services/drug.service'
import{TranslateModule,TranslateLoader} from '@ngx-translate/core'
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatMenuModule } from '@angular/material/menu';

import { CommonModule, registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';

import {VirtualScrollerModule} from 'primeng/virtualscroller';
import { NodesService } from '../app/services/nodes.service';
import {PanelMenuModule} from 'primeng/panelmenu';
import {TreeModule} from 'primeng/tree';
import { TestComponent } from './test/test.component';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import { Test2Component } from './test2/test2.component';
import {MatTooltipModule} from '@angular/material/tooltip';
// import { MaterialModule} from '@angular/material';
import {DashboardComponent} from '../app/component/dashboard/dashboard.component'

import { from } from 'rxjs';
import { PharmacyPledgeComponent } from './component/pharmacy-pledge/pharmacy-pledge.component';
import 'zone.js/dist/zone';
import "core-js/proposals/reflect-metadata";
import 'core-js/es/array';
import { TheraSubtheraComponent } from './component/thera-subthera/thera-subthera.component';
import { AllPharmaciesSupADMINComponent } from './component/all-pharmacies-sup-admin/all-pharmacies-sup-admin.component';
import { SuppliersComponent } from './component/suppliers/suppliers.component';
import { PatientsComponent } from './component/patients/patients.component'
registerLocaleData(en);


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    AddDrugComponent,
    ShowDrugComponent,
    SignupComponent,
    ToastComponent,
    EditDrugComponent,
    ShowCategoriesComponent,
    AddSubCategoryComponent,
    AdminComponent,
    FirmComponent,
    HomeComponent,
    FormComponent,
    AddOrderComponent,
    EmployeeComponent,
    AllUserComponent,
    TestComponent,
    Test2Component,
    DashboardComponent,
    PharmacyPledgeComponent,
    TheraSubtheraComponent,
    AllPharmaciesSupADMINComponent,
    SuppliersComponent,
    PatientsComponent
    
  ],
  imports: [
    BrowserModule,
    DropdownModule,
    SliderModule,
    BrowserAnimationsModule,
    FormsModule,
    TreeModule,
    InputTextareaModule,
    MatTooltipModule,
    InputTextModule,
    CalendarModule,
    AccordionModule,
    ToastModule,
    TabViewModule,
    OrderListModule,
 
    MultiSelectModule,
    ContextMenuModule,
    RatingModule,
    InputMaskModule,
    MenubarModule,
    RouterModule,
    ProgressBarModule,
    OverlayPanelModule,
    DialogModule,
    AppRoutingModule,
    TableModule,
    PickListModule,
    ButtonModule,
    InputNumberModule,
    CheckboxModule,
    HttpClientModule,
    RadioButtonModule,
    MatIconModule,
    ToastrModule,
    ToolbarModule,
    ConfirmDialogModule,
    ReactiveFormsModule,
    FileUploadModule,
    KeyFilterModule,
    SplitButtonModule,
    AutoCompleteModule,
    InputSwitchModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatSelectModule,
    MatInputModule,
    MatRadioModule,
    MatMenuModule,
    MatIconModule,
    VirtualScrollerModule,
    PanelMenuModule,
    CommonModule,
    DynamicDialogModule,
    ToastModule,
    TableModule,
    ButtonModule,
    // ConfirmationService,
    RouterModule.forRoot([]),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
    // IconsProviderModule,
 
  ],
  // schemas: [
  //   CUSTOM_ELEMENTS_SCHEMA
  // ],
  providers: [
    DrugService,NodesService,
    MessageService,ConfirmationService,
    // EmployeeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
