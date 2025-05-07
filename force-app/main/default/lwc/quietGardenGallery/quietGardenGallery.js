import { LightningElement, track } from 'lwc';
import quietGardenGallery from '@salesforce/resourceUrl/quietGardenGallery';
import createReservation from '@salesforce/apex/ReservationService.createReservation';

export default class QuietGardenGallery extends LightningElement {
  img1 = `${quietGardenGallery}/GalleryGarden_Optimized/img1.jpg`;
  img2 = `${quietGardenGallery}/GalleryGarden_Optimized/img2.jpg`;
  img3 = `${quietGardenGallery}/GalleryGarden_Optimized/img3.jpg`;
  @track isLightboxOpen = false;
  @track lightboxImage;
  @track isModalOpen = false;

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
    // כאן אפשר לשלב שליחה אמיתית או Toast
    alert('ההזמנה נשלחה! נשמח לראותך 😊');
    this.isModalOpen = false;
  }

  handleSubmit(event) {
    event.preventDefault();

    const fullName = this.template.querySelector('input[type="text"]').value;
    const date = this.template.querySelector('input[type="date"]').value; // YYYY-MM-DD
    const time = this.template.querySelector('input[type="time"]').value; // HH:MM

    const dateTimeString = `${date}T${time}:00`; // תבנית ISO מלאה
    const reservationDateTime = new Date(dateTimeString).toISOString(); // הפוך ל־UTC ISO

    createReservation({ fullName, reservationDateTime })
        .then(() => {
            alert('ההזמנה נשלחה! נשמח לראותך 😊');
            this.isModalOpen = false;
        })
        .catch(error => {
            console.error('שגיאה בשליחת ההזמנה:', error);
            alert('אירעה שגיאה בשליחת ההזמנה. נסה שוב.');
        });
}
}