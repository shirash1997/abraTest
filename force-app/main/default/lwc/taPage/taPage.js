import { LightningElement, track } from 'lwc';

export default class TaPage extends LightningElement {
    @track cart = [];

    coffeeItems = [
        { id: 1, name: 'קפוצ׳ינו', price: 18, description: 'קפה עשיר עם קצף חלב קרמי ומתקתק.' },
        { id: 2, name: 'לאטה', price: 19, description: 'אספרסו עם חלב חם מוקצף בעדינות.' },
        { id: 3, name: 'אמריקנו', price: 15, description: 'אספרסו עם תוספת מים חמים - קפה דליל יותר עם טעמים חזקים.' },
        { id: 4, name: 'אספרסו', price: 14, description: 'מנה מרוכזת של אספרסו חזק ומעורר.' }
    ];

    foodItems = [
        { id: 11, name: 'קרואסון', price: 12, description: 'קרואסון חמאה חם וטרי, מוגש עם ריבת תות ותערובת גבינות.' },
        { id: 12, name: 'דונאט', price: 10, description: 'דונאט מצופה שוקולד ואבקת סוכר.' },
        { id: 13, name: 'בייגל', price: 14, description: 'בייגל טרי עם שמנת וסלמון.' },
        { id: 14, name: 'בראוני', price: 13, description: 'בראוני עשיר בשוקולד עם אגוזי מלך.' }
    ];

    addToCart(event) {
        const itemId = parseInt(event.target.dataset.id, 10);
        const allItems = [...this.coffeeItems, ...this.foodItems];
        const selectedItem = allItems.find(item => item.id === itemId);

        if (selectedItem) {
            this.cart.push(selectedItem);
            console.log('נוסף לעגלה:', selectedItem);
        }
    }
}
