import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { SubCategoryService } from '../../../services/sub-category.service'
import { SubCategory } from '../../../Models/SubCategory'
import { TheraSubGroup } from '../../../Models/TheraSubGroup'
import { Category } from '../../../Models/Category'
import { DrugService } from '../../../services/drug.service'
import { CategoryService } from '../../../services/category.service'

@Component({
  selector: 'app-add-sub-category',
  templateUrl: './add-sub-category.component.html',
  styleUrls: ['./add-sub-category.component.css']
})
export class AddSubCategoryComponent implements OnInit {
  selectedState: any = null;

  subCategories: SubCategory[];

  subCategory: SubCategory;

  categories: Category[]

  theraSubGroup: TheraSubGroup[]

  displayModal: boolean;

  displayBasic: boolean;

  displayBasic2: boolean;

  displayMaximizable: boolean;

  displayPosition: boolean;

  position: string;

  editRowId: number

  loading: boolean = true;

  constructor
  ( private SubCategoryService: SubCategoryService,
    private ActivatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private routee: Router,
    private drugService: DrugService,
    private CategoryService: CategoryService,
    private confirmationService: ConfirmationService
  ) {}

  @ViewChild('dt') table: Table;
  ngOnInit(): void {
    this.SubCategoryService.GetAllSubCategories()
      .subscribe(subcategory => {
        this.subCategories = subcategory,
          console.log(this.subCategories),
          this.loading = false;
      }
        , error => {
          console.log(error);
        });

    this.drugService.GetAllTheraSub().subscribe(therasub => {
      this.theraSubGroup = therasub
      console.log(this.theraSubGroup)
    })

    this.CategoryService.GetAllCategories().subscribe(cat => {
      this.categories = cat
      console.log(this.categories)
    })

    this.subCategory = {
      name: '', description: '', descriptionAR: '', nameAR: '', categoryID: 0, theraSubID: 0, IsActive: true
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
    this.ngOnInit()
  }

  editModalDialog(id: number) {
    console.log(id)
    this.editRowId = id
    this.displayBasic = true;
    this.SubCategoryService.getSubCategoryByID(id).subscribe(
      data => {
        this.subCategory = data
        //  console.log(data+"ddd")
      }, error => { console.log(error) }
    )
  }

  addNewSubCategory() {
    this.subCategory.theraSubID = Number(this.subCategory.theraSubID)
    this.subCategory.categoryID = Number(this.subCategory.categoryID)
    this.SubCategoryService.insertSubCategory(this.subCategory)
      .subscribe(subCategory => {
        console.log(subCategory)
        console.log("Mabork y wa74")
        this.displayModal = false
        this.messageService.add({ severity: 'success', summary: 'Added', detail: 'SubCategory Deleted Successfully' });
        this.SubCategoryService.GetAllSubCategories()
          .subscribe(subCategories => { this.subCategories = subCategories }
          )
        this.ngOnInit()
      }
        , error => {
          console.log(error);
        });
  }

  onDeleteRow(id: number) {
    console.log(id)
    this.SubCategoryService.deleteSubCategory(id)
      .subscribe(x => {
        console.log(x)
        this.SubCategoryService.GetAllSubCategories().subscribe(subCategories => { this.subCategories = subCategories })
        this.messageService.add({ severity: 'error', summary: 'Deleted', detail: 'Category Deleted Successfully' });
      })
  }

  EditCategory() {
    this.SubCategoryService.updateSubCategory(this.subCategory, this.editRowId)
      .subscribe(Drug => {
        this.displayBasic = false
        console.log("Mabork y wa74")
        this.routee.navigate(['/showSubCategories'])
        this.ngOnInit()
        this.messageService.add({ severity: 'info', summary: 'Updated', detail: 'Category Updated Successfully' });
      }
        , error => {
          console.log(error);
        });
  }
  confirm(id: number) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        this.onDeleteRow(id)
        //Actual logic to perform a confirmation
      }
    });
  }

}
