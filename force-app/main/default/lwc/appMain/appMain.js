import { LightningElement, track } from 'lwc';

export default class AppMain extends LightningElement {
    @track currentPage = 'home';
    @track isTaPage = false;
    connectedCallback() {
        this.handleNavigation();
        
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
        return this.currentPage === 'menu';
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
}
