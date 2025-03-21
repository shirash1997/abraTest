import { LightningElement } from 'lwc';
import performancesVideoResource from '@salesforce/resourceUrl/performancesVideo';

export default class MusicPage extends LightningElement {
    videoUrl = `${performancesVideoResource}/performancesVideo/video.html`;

    connectedCallback(){
            console.log('video url in music:'+`${this.videoUrl}`);
    }
}