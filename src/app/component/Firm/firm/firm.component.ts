import { Component, OnInit } from '@angular/core';
import {Product} from '../../../Models/Product';
import {ProductService} from '../../../services/product.service';
import {OverlayPanel} from 'primeng/overlaypanel';
import { MessageService } from 'primeng/api';
import {Firm} from '../../../Models/Firm'
import {FirmService} from '../../../services/firm.service'
import {NgForm} from '@angular/forms'
@Component({
  selector: 'app-firm',
  templateUrl: './firm.component.html',
  styleUrls: ['./firm.component.css']
})
export class FirmComponent implements OnInit {

  products: Product[];
  
  restFirm:NgForm

      // IsActive: boolean = false;
      firm:Firm ;

    
  selectedProduct: Product;

  constructor
  (
    private productService: ProductService,
     private messageService: MessageService,
     private firmSer:FirmService
  ) 
  {
      this.firm =
      {
        IsActive:true ,code:'' ,name:'' 
      }
  }

  ngOnInit() {
      this.productService.getProductsSmall().then(products => this.products = products);
      console.log(this.firm)
  }

  onRowSelect(event) {
      this.messageService.add({severity: 'info', summary: 'Product Selected', detail: event.data.name});
  }
  submitFirmDetais(logg:NgForm){
    console.log(this.firm)
    console.log(logg)
    this.restFirm=logg
    console.log(this.restFirm)
    this.firmSer.insertFirm(this.firm).subscribe(firm=>{
      logg.reset()
      console.log("Mabrook Y asta")
    }),error=>
  {
      console.log(error);
  }
  }
  selected(logg){
    console.log(logg)
  }
}
