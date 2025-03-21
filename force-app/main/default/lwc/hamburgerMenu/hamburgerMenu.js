import { LightningElement, track } from 'lwc';

export default class HamburgerMenu extends LightningElement {
    @track isHamburgerOpen = false;

    get overlayClass() {
        return this.isHamburgerOpen ? 'show-overlay' : 'hide-overlay';
    }

    get contentClass() {
        return this.isHamburgerOpen ? 'slide-in' : 'slide-out';
    }

    // הגדרה נכונה של הפונקציה
    toggleHamburgerMenu() {
        this.isHamburgerOpen = !this.isHamburgerOpen;
    }

    navigateToShows() {
        this.dispatchEvent(new CustomEvent('navigation', { detail: 'shows' }));
        this.toggleHamburgerMenu();
    }

    navigateToLaptop() {
        this.dispatchEvent(new CustomEvent('navigation', { detail: 'laptop' }));
        this.toggleHamburgerMenu();
    }

    navigateToAboutUs() {
        this.dispatchEvent(new CustomEvent('navigation', { detail: 'aboutus' }));
        this.toggleHamburgerMenu();
    }
}
