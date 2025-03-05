import { LightningElement } from 'lwc';
import backgroundVideo from '@salesforce/resourceUrl/backgroundVideo';

export default class VideoBackground extends LightningElement {
connectedCallback() {
    videoSource = backgroundVideo;
}
}


