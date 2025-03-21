import { LightningElement } from 'lwc';
import videoResource from '@salesforce/resourceUrl/backgroundVideo';

export default class HomePage extends LightningElement {
    videoUrl = `${videoResource}/videoBackground/video.html`;
}