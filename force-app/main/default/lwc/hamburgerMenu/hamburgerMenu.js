import { LightningElement, track } from 'lwc';

export default class HamburgerMenu extends LightningElement {
    @track isHamburgerOpen = false;

    toggleHamburgerMenu() {
        this.isHamburgerOpen = !this.isHamburgerOpen;

        const overlay = this.template.querySelector('.hamburger-overlay');
        const content = this.template.querySelector('.hamburger-content');

        if (this.isHamburgerOpen) {
            overlay.style.display = 'block';
            content.style.transform = 'translateX(0)';
        } else {
            overlay.style.display = 'none';
            content.style.transform = 'translateX(100%)';
        }
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
