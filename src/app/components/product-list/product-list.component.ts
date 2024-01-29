import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { CartItem } from 'src/app/common/cart-item';
import { CartService } from 'src/app/services/cart.service';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  currentCategoryId: number = 1;
  searchMode: boolean = false;
  previousCategoryId: number = 1;

  //properties for pagination
  thePageNumber: number = 1;
  thePageSize: number = 12;
  theTotalElements: number = 0;

  constructor(private productService: ProductService,
              private cartService: CartService,
              private route: ActivatedRoute) { }

  @ViewChild('paginationElement', { static: false }) pagination!: NgbPagination;

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }
  
  listProducts() {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if (this.searchMode) {
      this.handleSearchProducts();
    } else {
      this.handleListProducts();
    };

  }

  handleListProducts() {
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');
    if (hasCategoryId) {
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
    } else {
      this.currentCategoryId = 1;
    }

    //
    // Check if we have a different category than previous
    // Note: angular will reuse a component if it is currently being viewed
    //
    // If we have a different category id than previous, then set thePageNumber back to 1
    if (this.previousCategoryId != this.currentCategoryId) {
      this.thePageNumber = 1;
    }
    this.previousCategoryId = this.currentCategoryId;

    this.productService.getProductListPaginate(
      this.thePageNumber - 1,
      this.thePageSize,
      this.currentCategoryId
    ).subscribe(
      data => {
        this.products = data._embedded.products;
        this.thePageNumber = data.page.number + 1; //spring data rest page numbers start at 0
        this.thePageSize = data.page.size;
        this.theTotalElements = data.page.totalElements;
      }
    );
  }

  onPageChange(pageNumber: number) {
    this.pagination.page = pageNumber;
    this.listProducts();
  }

  handleSearchProducts() {
    const keyword: string = this.route.snapshot.paramMap.get('keyword')!;

    this.productService.searchProducts(keyword).subscribe(
      data => {
        this.products = data;
      }
    )
  }

  addToCart(theProduct: Product) {
    console.log(`Adding to cart: ${theProduct.name}, ${theProduct.unitPrice}`);
    const theCartItem = new CartItem(theProduct);
    this.cartService.addToCart(theCartItem);
  }
}
