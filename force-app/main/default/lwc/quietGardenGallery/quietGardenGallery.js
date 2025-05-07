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
  @track showThankYou;
  @track timeSlots = [];


  openLightbox1() { this.lightboxImage = this.img1; this.isLightboxOpen = true; }
  openLightbox2() { this.lightboxImage = this.img2; this.isLightboxOpen = true; }
  openLightbox3() { this.lightboxImage = this.img3; this.isLightboxOpen = true; }

  closeLightbox() { this.isLightboxOpen = false; this.lightboxImage = null; }

  connectedCallback() {
    this.generateTimeSlots();
  }
  
  generateTimeSlots() {
    const startHour = 8;
    const endHour = 24;
    const slots = [];
  
    for (let hour = startHour; hour < endHour; hour++) {
      slots.push(`${hour.toString().padStart(2, '0')}:00`);
      slots.push(`${hour.toString().padStart(2, '0')}:30`);
    }
  
    this.timeSlots = slots;
  }

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
  
    const fullNameInput = this.template.querySelector('input[type="text"]');
    const dateInput = this.template.querySelector('input[type="date"]');
    const timeSelect = this.template.querySelector('select');
  
    if (!fullNameInput || !dateInput || !timeSelect) {
      console.error('אלמנט אחד או יותר לא נמצא בטופס');
      return;
    }
  
    const fullName = fullNameInput.value;
    const date = dateInput.value;
    const time = timeSelect.value;
  
    const dateTimeString = `${date}T${time}:00`;
    const reservationDateTime = new Date(dateTimeString).toISOString();
    const guestCount = this.template.querySelector('[data-id="guest-count"]').value;

    createReservation({ fullName, reservationDateTime, guestCount })
      .then(() => {
        this.isModalOpen = false;
        this.showThankYou = true;
      })
      .catch(error => {
        console.error('שגיאה בשליחת ההזמנה:', error);
        alert('אירעה שגיאה בשליחת ההזמנה. נסה שוב.');
      });
  }
  
}