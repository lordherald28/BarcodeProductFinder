import { TestBed, waitForAsync, ComponentFixture } from '@angular/core/testing';
import { CardProductComponent } from './card-product.component';
import { SharedModule } from 'src/shared/shared.module';
import { mocksProductsModel } from 'src/core/helpers/mocks-objects';
import { By } from '@angular/platform-browser';
import { PROVIDERS_TOKENS, SYSTEM_CONFIG } from 'src/presentacion/config/system.config';

describe('CardProductComponent', () => {
  let component: CardProductComponent;
  let fixture: ComponentFixture<CardProductComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      providers: [{
        provide: PROVIDERS_TOKENS.CONFIG_SYSTEM,
        useValue: SYSTEM_CONFIG
      }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardProductComponent);
    component = fixture.componentInstance;
    component.product = {
      barcode_number: "886736874135",
      barcode_formats: "UPC-A 886736874135, EAN-13 0886736874135",
      mpn: "CE-XLR3200",
      model: "XLR",
      asin: "B01KUHG2G8",
      title: "Nike Red Running Shoes - Size 10",
      category: "Media > Books > Print Books",
      manufacturer: "Xerox",
      brand: "Xerox",
      description: "One of a kind, Nike Red Running Shoes that are great for walking, running and sports.",
      images: []
    }
    component.sysonfig = {
      defaultImageUrl: 'http://localhost:9876/assets/notProducto.webp',
      filterState: { filterState: '', isMustClear: false },
      url_logo: ''
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should use default image when no image is provided', () => {
    const imgElement = fixture.debugElement.query(By.css('.product-image img')).nativeElement;
    expect(imgElement.src).toBe('http://localhost:9876/assets/notProducto.webp');
  });

  
  it('should use default image when no image is provided', () => {
    const imgElement = fixture.debugElement.query(By.css('.product-image img')).nativeElement;
    expect(imgElement.src).toContain(component.sysonfig.defaultImageUrl);
  });

});
