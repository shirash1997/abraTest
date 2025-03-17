import { LightningElement} from 'lwc';
import { loadStyle } from 'lightning/platformResourceLoader';
import Styles from '@salesforce/resourceUrl/Styles';
import logo from '@salesforce/resourceUrl/MidnightBrewLogo';

export default class MenuComponent extends LightningElement {
    logoUrl = logo;

    connectedCallback(){
        loadStyle(this, Styles);
    }

    navigateToHome() {
        this.currentPage = 'home';
        this.dispatchEvent(new CustomEvent('navigation', { detail: 'home' } ));
    }

    navigateToMenu() {
        this.dispatchEvent(new CustomEvent('navigation', { detail: 'menu'  }));
    }

    navigateToCart() {
        this.dispatchEvent(new CustomEvent('navigation', { detail:  'cart'  }));
    }





}