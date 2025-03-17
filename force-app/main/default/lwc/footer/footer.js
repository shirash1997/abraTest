import { LightningElement } from 'lwc';
import FontAwesome from '@salesforce/resourceUrl/FontAwesome';

export default class Footer extends LightningElement {
    connectedCallback() {
        console.log('✅ FontAwesome Resource URL:', FontAwesome);
        let link = document.createElement("link");
         link.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css";
        link.rel = "stylesheet";
        document.head.appendChild(link);
    }
}
