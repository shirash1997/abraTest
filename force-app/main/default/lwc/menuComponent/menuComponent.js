import { LightningElement } from 'lwc';
import { loadStyle } from 'lightning/platformResourceLoader';
import Styles from '@salesforce/resourceUrl/Styles';
import logo from '@salesforce/resourceUrl/MidnightBrewLogo';

export default class MenuComponent extends LightningElement {
    logoUrl = logo;
    
    connectedCallback(){
        loadStyle(this, Styles);
    }

    navigateToHome() {
        this.dispatchEvent(new CustomEvent('navigation', { detail: { page: 'home' } }));
    }

}