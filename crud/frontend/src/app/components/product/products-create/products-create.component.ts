import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from '../product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-products-create',
  templateUrl: './products-create.component.html',
  styleUrls: ['./products-create.component.css']
})
export class ProductsCreateComponent implements OnInit {
  
  cadProducts!: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private productService: ProductService,
              private router: Router) { }

  ngOnInit(): void {
    this.cadProducts = this.formBuilder.group({
      name: ['', Validators.required],
      price: ['', Validators.required]
    });
  }

  createProduct(): void {
    let product: Product;
    product = this.cadProducts.getRawValue();
    this.productService.create(product).subscribe(res => {
      console.log(res);
      this.productService.showMessage("Produto Criado!");
      this.router.navigate(["/products"])
    });
  }

  cancel() {
    this.router.navigate(["/products"])
  }
}
