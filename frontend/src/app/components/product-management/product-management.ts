import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-management.html',
  styleUrl: './product-management.css'
})
export class ProductManagement implements OnInit {

  products: any[] = [];
  loading = true;
  showModal = false;
  editing = false;
  selectedId = '';
  searchTerm = '';

  newProduct: any = this.emptyProduct();

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  private emptyProduct(): any {
    return {
      name: '',
      category: '',
      price: '',
      stock: '',
      description: ''
    };
  }

  get filteredProducts(): any[] {
    const term = this.searchTerm.trim().toLowerCase();

    if (!term) {
      return this.products;
    }

    return this.products.filter((product: any) =>
      [product.name, product.category, product.description]
        .some((value: any) =>
          String(value || '').toLowerCase().includes(term)
        )
    );
  }

  get inStockCount(): number {
    return this.products.filter(
      (product: any) => Number(product.stock) > 5
    ).length;
  }

  get lowStockCount(): number {
    return this.products.filter(
      (product: any) =>
        Number(product.stock) >= 0 && Number(product.stock) <= 5
    ).length;
  }

  get inventoryValue(): number {
    return this.products.reduce(
      (total: number, product: any) =>
        total + Number(product.price || 0) * Number(product.stock || 0),
      0
    );
  }

  loadProducts(): void {
    this.loading = true;

    this.productService.getProducts().subscribe({
      next: (res: any) => {
        const data = res?.products ?? res?.data ?? res;
        this.products = Array.isArray(data) ? data : [];
        this.loading = false;
      },
      error: (err: any) => {
        console.error('Products loading error:', err);
        this.products = [];
        this.loading = false;
      }
    });
  }

  openAddModal(): void {
    this.editing = false;
    this.selectedId = '';
    this.newProduct = this.emptyProduct();
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.editing = false;
    this.selectedId = '';
    this.newProduct = this.emptyProduct();
  }

  editProduct(product: any): void {
    this.editing = true;
    this.selectedId = product._id;

    this.newProduct = {
      name: product.name ?? '',
      category: product.category ?? '',
      price: product.price ?? '',
      stock: product.stock ?? '',
      description: product.description ?? ''
    };

    this.showModal = true;
  }

  addProduct(): void {
    const name = String(this.newProduct.name || '').trim();
    const category = String(this.newProduct.category || '').trim();
    const price = Number(this.newProduct.price);
    const stock = Number(this.newProduct.stock);

    if (
      !name ||
      !category ||
      this.newProduct.price === '' ||
      this.newProduct.stock === '' ||
      !Number.isFinite(price) ||
      !Number.isInteger(stock) ||
      price < 0 ||
      stock < 0
    ) {
      alert('Please enter valid product details.');
      return;
    }

    const productData = {
      name,
      category,
      price,
      stock,
      description: String(this.newProduct.description || '').trim()
    };

    if (this.editing) {
      this.productService.updateProduct(
        this.selectedId,
        productData
      ).subscribe({
        next: () => {
          alert('Product Updated Successfully');
          this.closeModal();
          this.loadProducts();
        },
        error: (err: any) => {
          console.error('Product update error:', err);
          alert(err.error?.message || 'Unable to update product.');
        }
      });

      return;
    }

    this.productService.addProduct(productData).subscribe({
      next: () => {
        alert('Product Added Successfully');
        this.closeModal();
        this.loadProducts();
      },
      error: (err: any) => {
        console.error('Product add error:', err);
        alert(err.error?.message || 'Unable to add product.');
      }
    });
  }

  deleteProduct(id: string): void {
    if (!confirm('Are you sure you want to delete this product?')) {
      return;
    }

    this.productService.deleteProduct(id).subscribe({
      next: (res: any) => {
        alert(res?.message || 'Product Deleted Successfully');
        this.loadProducts();
      },
      error: (err: any) => {
        console.error('Product delete error:', err);
        alert(err.error?.message || 'Unable to delete product.');
      }
    });
  }
}
