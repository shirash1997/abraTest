import { LightningElement, track } from 'lwc';

export default class AppMain extends LightningElement {
    @track currentPage = 'home';
    @track isTaPage = false;
    @track cartItems = [];


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

    handleAddToCart(event) {
        const newItem = event.detail;
        console.log('new item on main app: '+newItem);
        // בדיקה אם הפריט כבר קיים בעגלה
        const existingItem = this.cartItems.find(item => item.id === newItem.id);

        if (existingItem) {
            existingItem.quantity += newItem.quantity;
            existingItem.totalPrice = existingItem.price * existingItem.quantity;
        } else {
            this.cartItems = [...this.cartItems, { ...newItem, totalPrice: newItem.price * newItem.quantity }];
        }

        console.log('🛒 עגלה מעודכנת: ', JSON.stringify(this.cartItems));
    }

}