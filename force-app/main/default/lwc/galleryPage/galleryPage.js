import { LightningElement, track } from 'lwc';
import quietGardenGallery from '@salesforce/resourceUrl/quietGardenGallery';
import CoffeeImages from '@salesforce/resourceUrl/CoffeeImages';

export default class GalleryPage extends LightningElement {
  img1 = `${quietGardenGallery}/GalleryGarden_Optimized/img1.jpg`;
  img2 = `${quietGardenGallery}/GalleryGarden_Optimized/img2.jpg`;
  img3 = `${quietGardenGallery}/GalleryGarden_Optimized/img3.jpg`;

  @track isLightboxOpen = false;
  @track lightboxImage = '';

  openLightbox(event) {
    this.lightboxImage = event.target.src;
    this.isLightboxOpen = true;
  }

  closeLightbox() {
    this.isLightboxOpen = false;
    this.lightboxImage = '';
  }

  stopPropagation(event) {
    event.stopPropagation();
  }

  get images() {
    return [
      { src: this.img1, alt: 'תמונה 1 מהגלריה' },
      { src: this.img2, alt: 'תמונה 2 מהגלריה' },
      { src: this.img3, alt: 'תמונה 3 מהגלריה' },
      { src: `${CoffeeImages}/cappuccino.jpg`, alt: 'קפוצ׳ינו' },
      { src: `${CoffeeImages}/latte.jpg`, alt: 'לאטה' },
      { src: `${CoffeeImages}/americano.jpg`, alt: 'אמריקנו' },
      { src: `${CoffeeImages}/macchiato.jpg`, alt: 'מוקה' },
      { src: `${CoffeeImages}/flat_white.jpg`, alt: 'פלאט וויט' },
      { src: `${CoffeeImages}/croissant.jpg`, alt: 'קרואסון' },
      { src: `${CoffeeImages}/donut.jpg`, alt: 'דונאט' },
      { src: `${CoffeeImages}/bagel.jpg`, alt: 'בייגל' },
      { src: `${CoffeeImages}/apple_pie.jpg`, alt: 'פאי תפוחים' },
      { src: `${CoffeeImages}/espresso_martini.jpg`, alt: 'אספרסו מרטיני' }
    ];
  }
}
