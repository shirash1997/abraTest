import { LightningElement, track } from 'lwc';
import quietGardenGallery from '@salesforce/resourceUrl/quietGardenGallery';
import createReservation from '@salesforce/apex/ReservationService.createReservation';
import getUnavailableHours from '@salesforce/apex/ReservationService.getUnavailableHours';
import sendReservationEmail from '@salesforce/apex/GardenReservationMailer.sendReservationEmail';

export default class QuietGardenGallery extends LightningElement {
  img1 = `${quietGardenGallery}/GalleryGarden_Optimized/img1.jpg`;
  img2 = `${quietGardenGallery}/GalleryGarden_Optimized/img2.jpg`;
  img3 = `${quietGardenGallery}/GalleryGarden_Optimized/img3.jpg`;

  @track isLightboxOpen = false;
  @track lightboxImage;
  @track isModalOpen = false;
  @track showThankYou = false;
  @track timeSlots = [];
  todayDate = new Date().toISOString().split('T')[0];

  openLightbox1() { this.lightboxImage = this.img1; this.isLightboxOpen = true; }
  openLightbox2() { this.lightboxImage = this.img2; this.isLightboxOpen = true; }
  openLightbox3() { this.lightboxImage = this.img3; this.isLightboxOpen = true; }

  closeLightbox() {
    this.isLightboxOpen = false;
    this.lightboxImage = null;
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

    const fullName = this.template.querySelector('[data-id="full-name"]').value;
    const date = this.template.querySelector('[data-id="date"]').value;
    const time = this.template.querySelector('[data-id="time"]').value;
    const guestCount = this.template.querySelector('[data-id="guest-count"]').value;
    const email = this.template.querySelector('input[type="email"]').value;


    const dateTimeString = `${date}T${time}:00`;
    const reservationDateTime = new Date(dateTimeString).toISOString();

    createReservation({ fullName, reservationDateTime, guestCount })
  .then((resId) => {
    this.isModalOpen = false;
    this.showThankYou = true;

    // ניקוי הטופס
    this.template.querySelector('[data-id="full-name"]').value = '';
    this.template.querySelector('[data-id="date"]').value = '';
    this.template.querySelector('[data-id="time"]').value = '';
    this.template.querySelector('[data-id="guest-count"]').value = '1';
    this.template.querySelector('input[type="email"]').value = '';
  

    // שליחת מייל נפרדת
    return sendReservationEmail({ email,
      fullName,
      reservationDateTime,
      guestCount,
      reservationId: resId });
  })
  .catch(error => {
    console.error('שגיאה:', error);
    alert('אירעה שגיאה בשליחת ההזמנה או המייל. נסה שוב.');
  });
  }

  handleDateChange(event) {
    const selectedDate = event.target.value;
    if (!selectedDate) return;

    getUnavailableHours({ selectedDate })
      .then(takenSlots => {
        this.generateTimeSlots(takenSlots);
      })
      .catch(error => {
        console.error('שגיאה בשליפת שעות תפוסות:', error);
      });
  }

  /**
   * מייצרת רשימת שעות פנויה בפורמט hh:mm בין 08:00–23:30
   * למעט שעות שזוהו כתפוסות.
   */
  generateTimeSlots(takenSlots = []) {
    const startHour = 8;
    const endHour = 24;
    const slots = [];

    for (let hour = startHour; hour < endHour; hour++) {
      ['00', '30'].forEach(min => {
        const time = `${hour.toString().padStart(2, '0')}:${min}`;
        if (!takenSlots.includes(time)) {
          slots.push(time);
        }
      });
    }

    this.timeSlots = slots;
  }
}
