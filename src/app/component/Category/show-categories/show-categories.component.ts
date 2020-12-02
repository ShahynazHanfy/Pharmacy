import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService ,ConfirmationService} from 'primeng/api';
import { Table } from 'primeng/table';
import { Category } from '../../../Models/Category'
import { CategoryService } from '../../../services/category.service';


@Component({
  selector: 'app-show-categories',
  templateUrl: './show-categories.component.html',
  styleUrls: ['./show-categories.component.css']
})
export class ShowCategoriesComponent implements OnInit {

  categories: Category[];

  category: Category;

  displayModal: boolean;

  displayBasic: boolean;

  displayBasic2: boolean;

  displayMaximizable: boolean;

  displayPosition: boolean;

  position: string;

  editRowId:number

  loading: boolean = true;


  constructor(private CategoryService: CategoryService, 
    private ActivatedRoute: ActivatedRoute, 
    private messageService: MessageService, 
    private routee: Router,
    private confirmationService:ConfirmationService
    ) {

  }


  @ViewChild('dt') table: Table;
  ngOnInit(): void {
    console.log(localStorage.getItem("token"))
    this.CategoryService.GetAllCategories()
      .subscribe(category => {
        this.categories = category,
          console.log(this.categories),
          this.loading = false;
      }
        , error => {
          console.log(error);
        });
    this.category =
    {
      name: '', description: '', descriptionAR: '', nameAR: '',IsActive:true
    }

  }
  showSuccess() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Message Content' });
  }

  showInfo() {
    this.messageService.add({ severity: 'info', summary: 'Info', detail: 'Drug Deleted Successfully' });
  }

  showWarn() {
    this.messageService.add({ severity: 'warn', summary: 'Warn', detail: 'Drug Deleted Successfully' });
  }

  showError() {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Drug Deleted Successfully' });
  }

  showTopLeft() {
    this.messageService.add({ key: 'tl', severity: 'info', summary: 'Info', detail: 'Message Content' });
  }

  showModalDialog() {
    this.displayModal = true;
    this.ngOnInit();

    // console.log(id)
  }

  editModalDialog(id:number){
    this.editRowId=id
    this.displayBasic = true;
  this.CategoryService.getCategoryByID(id).subscribe(
    data=>{
     this.category= data ;
    //  console.log(data+"ddd")
    },error=>{console.log(error)}
  )
}
  
  confirm(id:number) {
      console.log("hello")
      console.log(id)

  this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        console.log(id)
        this.onDeleteRow(id)
          //Actual logic to perform a confirmation
      }
  });
}
  // editRow(id:number){
  //   this.CategoryService.getDrugByID(this.empId).subscribe(
  //     data=>{
  //      this.Drug= data
  //     //  console.log(data+"ddd")
  //     },error=>{console.log(error)}
  //   )
  //   // this.routee.navigate(['/editCategory/',id])
  //   }

  addNewCategory() {
    this.CategoryService.insertCategory(this.category)
      .subscribe(category => {
        console.log(category)
        console.log("Mabork y wa74")
        // this.routee.navigate(['/showCategories']).
        this.displayModal = false
        this.messageService.add({ severity: 'success', summary: 'Added', detail: 'Category Deleted Successfully' });
        this.CategoryService.GetAllCategories()
          .subscribe(categories => { 
            this.categories = categories,
            this.ngOnInit();
           }
          )
      }
        , error => {
          console.log(error);
        });
  }

  onDeleteRow(id: number) {
    console.log(id)
    // if (confirm('Are you sure to delete this Drug ?') == true) {
    // console.log("uuuu")
    this.CategoryService.deleteCategory(id)
      .subscribe(x => {
        console.log(x)
        this.CategoryService.GetAllCategories().subscribe(categories => { this.categories = categories })
        this.messageService.add({ severity: 'error', summary: 'Deleted', detail: 'Category Deleted Successfully' });
      })
  }


  EditCategory() {
    console.log(this.editRowId)
    this.CategoryService.updateCategory(this.category,this.editRowId)
    .subscribe(Drug => {
      this.displayBasic=false
      console.log("Mabork y wa74")
      this.routee.navigate(['/showCategories']) 
      this.ngOnInit() 
      this.messageService.add({ severity: 'info', summary: 'Updated', detail: 'Category Updated Successfully' });
  }
    ,error=>{console.log(error);
    });

  }

}
