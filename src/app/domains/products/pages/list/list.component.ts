import { Component, Input, SimpleChange, SimpleChanges, inject, input, signal } from '@angular/core';

import { ProductComponent } from './../../components/product/product.component';
import { HeaderComponent } from '@shared/components/header/header.component';
import { Product } from '@shared/models/product.model';
import { CartService } from '@shared/services/cart.service';
import { ProductService } from '@shared/services/product.service';
import { CategoryService } from '@shared/services/category.service';
import { category } from '@shared/models/category.model';
import { RouterLinkWithHref } from '@angular/router';


@Component({
  selector: 'app-list',
  standalone: true,
  imports: [ProductComponent, HeaderComponent, RouterLinkWithHref],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export default class ListComponent {

  products = signal<Product[]>([]);
  categories = signal<category[]>([]);

  private cartService = inject(CartService);
  private productService = inject(ProductService);
  private categoryService = inject(CategoryService);

  @Input() category_id?: string;

  ngOnInit() {
    this.getCategory();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.getProducts();
  }

  addToCart(product: Product) {
    this.cartService.addTocart(product);
  }

  private getProducts() {
    this.productService.getProducts(this.category_id)
      .subscribe({
        next: (products) => {
          this.products.set(products as Product[]);
        },
        error: (error) => {
          console.log(error);
        }
      });
  }

  private getCategory() {
    this.categoryService.getAll()
      .subscribe({
        next: (data) => {
          this.categories.set(data);
        },
        error: (error) => {
          console.log(error);
        }
      });
  }
}
