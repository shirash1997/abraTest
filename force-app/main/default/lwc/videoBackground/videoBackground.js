import { LightningElement } from 'lwc';
import backgroundVideo from '@salesforce/resourceUrl/backgroundVideo'; // שם הקובץ שלך

export default class VideoBackground extends LightningElement {
    videoSource = backgroundVideo; // קישור לוידאו

    // פונקציה להסרת controls אחרי שהוידאו התחיל להתנגן

}
