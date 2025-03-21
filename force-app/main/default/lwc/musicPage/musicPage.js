import { LightningElement } from 'lwc';
import musicVideo from '@salesforce/resourceUrl/musicVideo';

export default class MusicPage extends LightningElement {
    videoUrl = `${musicVideo}/video.html`;

    connectedCallback(){
            console.log('video url in music:'+`${this.videoUrl}`);
    }
}