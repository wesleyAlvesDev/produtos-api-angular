import { Component, Inject, OnInit } from '@angular/core';
import { ProductDeleteComponent } from '../product-delete/product-delete.component';
import { Product } from '../product.model';
import { ProductService } from '../product.service';
import {MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-product-read',
  templateUrl: './product-read.component.html',
  styleUrls: ['./product-read.component.css']
})
export class ProductReadComponent implements OnInit {

  products: Product[] = [];

  displayedColumns = ['name', 'price', 'action'];

  constructor(private productService: ProductService,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<ProductDeleteComponent>
   ) { }

  ngOnInit(): void {
    this.initProducts();
    
  }

  initProducts() {
    this.productService.read().subscribe(product => {
      console.log(product);
      this.products = product;
    });
  }
}
