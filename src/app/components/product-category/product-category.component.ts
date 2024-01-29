import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/common/category';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.css']
})
export class ProductCategoryComponent implements OnInit {

  productCategories: Category[] = [];
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.listProductCategories();
  }
  listProductCategories() {
    this.productService.getProductCategories().subscribe(
      data => {
        this.productCategories = data;
      }
    );
  }

}
