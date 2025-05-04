import { LightningElement } from 'lwc';
import quietGardenGallery from '@salesforce/resourceUrl/quietGardenGallery';

export default class QuietGardenGallery extends LightningElement {
  img1 = `${quietGardenGallery}/GalleryGarden_Optimized/img1.jpg`;
  img2 = `${quietGardenGallery}/GalleryGarden_Optimized/img2.jpg`;
  img3 = `${quietGardenGallery}/GalleryGarden_Optimized/img3.jpg`;
  @track isLightboxOpen = false;
  @track lightboxImage;

  openLightbox1() {
    this.lightboxImage = this.img1;
    this.isLightboxOpen = true;
  }

  openLightbox2() {
    this.lightboxImage = this.img2;
    this.isLightboxOpen = true;
  }

  openLightbox3() {
    this.lightboxImage = this.img3;
    this.isLightboxOpen = true;
  }

  closeLightbox() {
    this.isLightboxOpen = false;
    this.lightboxImage = null;
  }

  stopPropagation(event) {
    event.stopPropagation();
  }
}

