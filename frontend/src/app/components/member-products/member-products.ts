import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-member-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './member-products.html',
  styleUrl: './member-products.css'
})
export class MemberProducts implements OnInit {
  products: any[] = [];
  searchTerm = '';
  loading = true;
  errorMessage = '';

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  get filteredProducts(): any[] {
    const term = this.searchTerm.trim().toLowerCase();

    if (!term) return this.products;

    return this.products.filter((p: any) =>
      [p.name, p.category, p.description].some((value: any) =>
        String(value || '').toLowerCase().includes(term)
      )
    );
  }

  loadProducts(): void {
    this.loading = true;
    this.errorMessage = '';

    this.productService.getProducts().subscribe({
      next: (res: any) => {
        const data = res?.products ?? res?.data ?? res;
        this.products = Array.isArray(data) ? data : [];
        this.loading = false;
      },
      error: (err: any) => {
        console.error('Member products error:', err);
        this.errorMessage =
          err.error?.message || 'Unable to load products. Please try again.';
        this.loading = false;
      }
    });
  }
}