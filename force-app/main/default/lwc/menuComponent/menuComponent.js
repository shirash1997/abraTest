import { LightningElement, api} from 'lwc';
import { loadStyle } from 'lightning/platformResourceLoader';
import Styles from '@salesforce/resourceUrl/Styles';
import logo from '@salesforce/resourceUrl/MidnightBrewLogo';

export default class MenuComponent extends LightningElement {
    logoUrl = logo;
    @api cartItems = [];


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


  get cartTotalQuantity() {
        return this.cartItems.reduce((total, item) => total + item.quantity, 0);
    }


}