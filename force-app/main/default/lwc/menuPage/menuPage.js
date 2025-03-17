import { LightningElement } from 'lwc';

export default class MenuPage extends LightningElement {
    menuItems = [
        { id: 1, name: 'מאקיאטו מנהטן', icon: '🗽', price: 18 },
        { id: 2, name: 'קרמל פלאט ברוקלין', icon: '🌉', price: 19 },
        { id: 3, name: 'ריסטרטו ינשוף לילה', icon: '🦉', price: 16 },
        { id: 4, name: 'אמריקנו טיימס סקוור', icon: '🌆', price: 15 },
        { id: 5, name: 'פלאט וויט סוהו', icon: '🎨', price: 20 },
        { id: 6, name: 'לטה סנטרל פארק', icon: '🌳', price: 17 },
        { id: 7, name: 'אספרסו ברוקלין', icon: '🚇', price: 14 },
        { id: 8, name: 'מוקה הארלם', icon: '🎷', price: 21 },
        { id: 9, name: 'קורטדו צ׳לסי', icon: '🖼️', price: 18 },
        { id: 10, name: 'קפוצ׳ינו גראנד סנטרל', icon: '🚆', price: 19 }
    ];
}
