import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css']
})
export class ProductDeleteComponent implements OnInit {

  productsForm!: FormGroup;

  product!: Product;

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.productsForm = this.formBuilder.group({
      name: ['', Validators.required],
      price: ['', Validators.required]
    });

    const id = this.route.snapshot.paramMap.get('id'); 
    if(id !== null) {
      this.productService.readById(id).subscribe(product => {
        this.product = product
        this.preencherForm(product, this.productsForm);
      });
    }
  }
  

  deleteProduct() {
    const id = this.product.id;
    if (id !== null && id !== undefined) {
      this.productService.delete(id).subscribe(product => {
        this.productService.showMessage("Produto Excluido!");
        this.router.navigate(['/products']);
      });
    }
  }

  cancel() {
    this.router.navigate(['/products'])
  }

  private preencherForm(obj: any, form: any) {
    if (!obj) {
      return;
    }

    Object.keys(obj).forEach(campo => {
      if (campo && form.contains(campo)) {
        form.get(campo).setValue(obj[campo]);
      }
    });
  }
}
