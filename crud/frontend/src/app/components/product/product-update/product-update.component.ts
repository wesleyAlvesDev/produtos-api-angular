import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {

  productsForm!: FormGroup;

  product!: Product;

  constructor(private formBuilder: FormBuilder,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.productsForm = this.formBuilder.group({
      name: ['', Validators.required],
      price: ['', Validators.required]
    });

    let id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.productService.readById(id.replace(' ', '')).subscribe(product => {
        this.product = product;
        this.preencherForm(product, this.productsForm);
      });
    }
  }

  updateProduct(): void {
    const id = this.product.id;
    if (id !== null && id !== undefined) {
      const product = this.generateProductWithForm();
      this.productService.update(product, id).subscribe(product => {
        console.log(product);
        this.productService.showMessage("Produto Alterado!")
        this.router.navigate(['/products'])
      });
    }

  }

  cancel(): void {
    this.router.navigate(['/products']);
  }

  private generateProductWithForm() {
    const id = this.product.id;
    const productForm = this.productsForm.getRawValue();
    const product = {...productForm, id};
    return product;
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
