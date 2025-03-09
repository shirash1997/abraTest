import { LightningElement, track } from 'lwc';

export default class AppMain extends LightningElement {
    @track currentPage = 'home';

    connectedCallback() {
        this.handleNavigation();
    }

    handleNavigation() {
        const urlParams = new URLSearchParams(window.location.search);
        this.currentPage = urlParams.get('page') || 'home';
    }

    get isHomePage() {
        return this.currentPage === 'home';
    }

    get isMenuPage() {
        return this.currentPage === 'menu';
    }

    get isCartPage() {
        return this.currentPage === 'cart';
    }
}
