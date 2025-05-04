import { LightningElement, track } from 'lwc';
import quietGardenGallery from '@salesforce/resourceUrl/quietGardenGallery';

export default class QuietGardenGallery extends LightningElement {
  img1 = `${quietGardenGallery}/GalleryGarden_Optimized/img1.jpg`;
  img2 = `${quietGardenGallery}/GalleryGarden_Optimized/img2.jpg`;
  img3 = `${quietGardenGallery}/GalleryGarden_Optimized/img3.jpg`;
  @track isLightboxOpen = false;
  @track lightboxImage;
  @track isModalOpen = false;

  renderedCallback() {
    const dateInput = this.template.querySelector('input[type="date"]');
    const timeInput = this.template.querySelector('input[type="time"]');

    if (dateInput) {
        dateInput.setAttribute('lang', 'he');
        dateInput.setAttribute('dir', 'rtl');
    }
    if (timeInput) {
        timeInput.setAttribute('lang', 'he');
        timeInput.setAttribute('dir', 'rtl');
    }
    }
  openLightbox1() { this.lightboxImage = this.img1; this.isLightboxOpen = true; }
  openLightbox2() { this.lightboxImage = this.img2; this.isLightboxOpen = true; }
  openLightbox3() { this.lightboxImage = this.img3; this.isLightboxOpen = true; }

  closeLightbox() { this.isLightboxOpen = false; this.lightboxImage = null; }

  openReservationModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  stopPropagation(event) {
    event.stopPropagation();
  }

  handleSubmit(event) {
    event.preventDefault();
    alert('ההזמנה נשלחה! נשמח לראותך 😊');
    this.isModalOpen = false;
  }
}
