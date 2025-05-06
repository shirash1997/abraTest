import { LightningElement, api} from 'lwc';
import { loadStyle } from 'lightning/platformResourceLoader';
import Styles from '@salesforce/resourceUrl/Styles';
import logo from '@salesforce/resourceUrl/MidnightBrewLogo';

export default class MenuComponent extends LightningElement {
    logoUrl = logo;
    @api cartItems = [];
    @api orderPlaced = false;


    connectedCallback(){
        loadStyle(this, Styles);
        this.addEventListener('orderplaced', this.handleOrderPlaced.bind(this));
        
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

  

    get showCartBadge() {
        console.log('order placed in menu component '+this.orderPlaced);
        return !this.orderPlaced;
    }

    @api
    resetOrderPlaced() {
        this.orderPlaced = false;
    }

}