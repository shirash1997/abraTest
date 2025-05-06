import { LightningElement, track } from 'lwc';

export default class AppMain extends LightningElement {
    @track currentPage = 'home';
    @track isTaPage = false;
    @track cartItems = [];
    @track orderplaced = false;

    


    connectedCallback() {
        this.handleNavigation();
       console.log('current page: '+this.currentPage);
        // מאזין לשינויי URL בזמן אמת
        window.addEventListener('popstate', () => {
            this.handleNavigation();
        });
    }

    handleNavigation(event) {
        if (event && event.detail) {
            this.currentPage = event.detail;
            window.history.pushState({}, '', `?page=${event.detail}`);
        } else {
            const urlParams = new URLSearchParams(window.location.search);
            this.currentPage = urlParams.get('page') || 'home';
        }

        this.isTaPage = this.currentPage === 'ta';

        console.log(' ניווט לדף:', this.currentPage);
        console.log('האם זה עמוד TA?', this.isTaPage);
    }

    get isHomePage() {
        return this.currentPage === 'home';
    }

    get isMenuPage() {
        return this.currentPage === 'menu' || this.currentPage === 'ta';
    }

    get isCartPage() {
        return this.currentPage === 'cart';
    }

    get isMusicPage() {
        return this.currentPage === 'music';
    }

    get isTAPage(){
        return this.currentPage === 'ta'; 
    }

    get isLaptopPage(){
        return this.currentPage === 'laptop'; 
    }

    get isGallery() {
        return this.currentPage === 'gallery';
      } 

    get isAboutUsPage() {
        return this.currentPage === 'aboutus';
      }

    handleAddToCart(event) {
       
        this.cartItems = [...event.detail];

        console.log('🛒 עגלה מעודכנת: ', JSON.stringify(this.cartItems));
        const menuComponent = this.template.querySelector('c-menu-component');
        if (menuComponent) {
            menuComponent.resetOrderPlaced();
        }
    }

    get orderPlaced(){
        return this.orderplaced;
    }

    handleOrderPlaced(event) {
     this.orderplaced = event.detail;
     console.log(' בראשי ההזמנה בוצעה:', this.orderplaced);
}
}