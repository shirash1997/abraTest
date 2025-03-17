import { LightningElement } from 'lwc';
import FontAwesome from '@salesforce/resourceUrl/FontAwesome';

export default class Footer extends LightningElement {
    connectedCallback() {
        let link = document.createElement("link");
        link.href = `${FontAwesome}/all.min.css`;
        link.rel = "stylesheet";
        document.head.appendChild(link);
    }
}
