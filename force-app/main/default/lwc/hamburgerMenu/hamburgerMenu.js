import { LightningElement, track } from 'lwc';

export default class HamburgerMenu extends LightningElement {
    @track isHamburgerOpen = false;

    toggleHamburgerMenu() {
        this.isHamburgerOpen = !this.isHamburgerOpen;

        const bars = this.template.querySelectorAll('.bar');
        const content = this.template.querySelector('.hamburger-content');
        
        if (this.isHamburgerOpen) {
            // פתיחה של התפריט
            bars[0].classList.add('rotate-top');
            bars[1].classList.add('fade-out');
            bars[2].classList.add('rotate-bottom');
            content.classList.add('open');  // מוסיף את ה-class לפתיחה
        } else {
            // סגירה של התפריט
            bars[0].classList.remove('rotate-top');
            bars[1].classList.remove('fade-out');
            bars[2].classList.remove('rotate-bottom');
            content.classList.remove('open');  // מסיר את ה-class לסגירה
        }
    }

    navigateToMusic() {
        this.dispatchEvent(new CustomEvent('navigation', { detail: 'music' }));
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

    navigateToTA(){
        this.dispatchEvent(new CustomEvent('navigation', { detail: 'ta' }));
        this.toggleHamburgerMenu();
    }


}