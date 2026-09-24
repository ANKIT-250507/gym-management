import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-management',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './product-management.html',
  styleUrl: './product-management.css'
})
export class ProductManagement implements OnInit {

  products: any[] = [];
  loading = true;

  showModal = false;
  editing = false;
  selectedId = "";

  newProduct = {
    name: "",
    category: "",
    price: "",
    stock: "",
    description: ""
  };

  constructor(
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {

    this.loading = true;

    this.productService.getProducts().subscribe({

      next: (res: any) => {

        this.products = res.products;
        this.loading = false;

      },

      error: (err) => {

        console.error(err);
        this.loading = false;

      }

    });

  }

  addProduct() {

    if (this.editing) {

      this.productService.updateProduct(
        this.selectedId,
        this.newProduct
      ).subscribe({

        next: () => {

          alert("Product Updated Successfully");

          this.showModal = false;
          this.editing = false;

          this.loadProducts();

        },

        error: (err) => {

          console.error(err);

        }

      });

      return;

    }

    this.productService.addProduct(
      this.newProduct
    ).subscribe({

      next: () => {

        alert("Product Added Successfully");

        this.showModal = false;

        this.loadProducts();

      },

      error: (err) => {

        console.error(err);

      }

    });

  }
  editProduct(product: any) {

    this.editing = true;

    this.selectedId = product._id;

    this.newProduct = {

      name: product.name,

      category: product.category,

      price: product.price,

      stock: product.stock,

      description: product.description

    };

    this.showModal = true;

  }

  deleteProduct(id: string) {

    if (!confirm("Delete Product?")) return;

    this.productService.deleteProduct(id).subscribe({

      next: (res: any) => {

        alert(res.message);

        this.loadProducts();

      },

      error: (err) => {

        console.log(err);

      }

    });

  }

}