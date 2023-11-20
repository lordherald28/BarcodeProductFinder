import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IAccordionModel } from './models/accordion.model';

@Component({
  selector: 'app-sidebar-filter',
  templateUrl: './sidebar-filter.component.html',
  styleUrls: ['./sidebar-filter.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class SidebarFilterComponent implements OnInit {

  isOpenCategoria = false;
  isOpenManufacture = false;
  isOpenBrand = false;
  isOpenAsin = false;
  isOpenTitle = false;
  isOpenMpn = false;
  isOpenBarcode = false;
  listAccordionsName: IAccordionModel[] = [{ description: '', name: '', isOpen: false }];
  searchTerm: string = ''; // Aquí mantienes el término de búsqueda actual
  filteredCategories: string[] = [];
  categories: string[] = ['Categoria 1', 'Categoria 2', 'Categoria 3'];
  isDropdownOpen = false;
  selectedCategory = '';



  constructor() { }

  ngOnInit(): void {
    this.filteredCategories = this.categories; // Inicializa con todas las categorías
    this.listAccordionsName = [{ description: 'Category', name: 'category', isOpen: false }]
  }

  toggleAccordion(accordionName: string): void {

    if (accordionName === 'category') {
      this.isOpenCategoria = !this.isOpenCategoria;

    } else if (accordionName === 'brand') {
      this.isOpenBrand = !this.isOpenBrand;

    } else if (accordionName === 'manufacture') {
      this.isOpenManufacture = !this.isOpenManufacture;
    }
    else if (accordionName === 'title') {
      this.isOpenTitle = !this.isOpenTitle;
    }
    else if (accordionName === 'asin') {
      this.isOpenAsin = !this.isOpenAsin;
    }
    else if (accordionName === 'barcode') {
      this.isOpenBarcode= !this.isOpenBarcode;
    }
    else if (accordionName === 'mpn') {
      this.isOpenMpn = !this.isOpenMpn;
    }
  }

  // Calcula la altura para cada sección del acordeón
  calculateHeight(isOpen: boolean): string {
    // console.log(isOpen)
    return isOpen ? '100px' : '0';
  }



}
