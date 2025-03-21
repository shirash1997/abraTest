import { LightningElement, track } from 'lwc';
import CoffeeImages from '@salesforce/resourceUrl/CoffeeImages'; // חיבור לסטטי ריסורס

export default class MenuPage extends LightningElement {
    @track selectedItem = null;
    menuSections = [
        {
            title: 'תפריט הקפה שלנו ☕',
            items: [
                { id: 1, name: 'קפוצ׳ינו "כשהארי פגש את סאלי"', icon: '💑', price: 18, description: 'החיים מלאים הפתעות, אבל קפוצ׳ינו טוב זה תמיד סיפור אהבה בטוח.', image: `${CoffeeImages}/cappuccino.jpg` },
                { id: 2, name: 'לאטה "אישה יפה"', icon: '👠', price: 19, description: 'קטיפתי, מתוק, ונראה מיליון דולר - כמו ג׳וליה רוברטס ברודיאו דרייב.', image: `${CoffeeImages}/latte.jpg` },
                { id: 3, name: 'אמריקנו "גוסיפ גירל"', icon: '🗽', price: 15, description: 'קלאסי, מחוספס ומלא באופי כמו השדרה החמישית. XOXO, Gossip Girl.', image: 'americano-.jpg' },
                { id: 4, name: 'מוקה "סקס והעיר הגדולה"', icon: '👗', price: 21, description: 'שוקולד וקפה ברומן סוער יותר מהדייטים של קארי בראדשו.', image: 'mocha.jpg' },
                { id: 5, name: 'ריסטרטו "מגי פגש את ג׳ייק"', icon: '🎭', price: 16, description: 'חזק, קצר ומלא תשוקה כמו סיפור אהבה בלתי אפשרי.', image: 'ristretto.jpg' },
                { id: 6, name: 'פלאט וויט "ארוחת בוקר בטיפאני׳ס"', icon: '💎', price: 20, description: 'אלגנטי, נצחי, וגורם לך לרצות ללבוש שמלת ערב ולהסתובב בניו יורק.', image: 'flat_white.jpg' },
                { id: 7, name: 'אספרסו "מועדון ארוחת הבוקר"', icon: '☕', price: 14, description: 'אם יש משהו שמחבר בין כולם – זה אספרסו טוב בבוקר.', image: 'espresso.jpg' },
                { id: 8, name: 'קורטדו "דירה להשכיר"', icon: '🏙️', price: 18, description: 'כוס קטנה אבל עם אופי גדול - בדיוק כמו ניו יורק של פעם.', image: 'cortado.jpg' },
                { id: 9, name: 'מאקיאטו "החתונה של החבר שלי"', icon: '💍', price: 18, description: 'מתוק, חזק וקצת מסובך – כמו רגשות שאסור להודות בהם.', image: 'macchiato.jpg' },
                { id: 10, name: 'קפה קר "סיפור אהבה"', icon: '❄️', price: 19, description: 'קפה קר, אבל מלא חמימות בלב – ממש כמו רגעים בלתי נשכחים.', image: 'iced_coffee.jpg' }
            ]
        },
        {
            title: '🥐 חייב משהו בצד, לא?',
            items: [
                { id: 11, name: 'קרואסון "הרומן שלי עם אנני"', icon: '📝', price: 12, description: 'חמאה, שכבות ורגש עמוק – כמו הסצנה על גשר ברוקלין.', image: 'croissant.jpg' },
                { id: 12, name: 'דונאט "כשהארי פגש את סאלי"', icon: '🍩', price: 10, description: '"אני אקח מה שהיא לקחה" – ואולי גם דונאט בצד?', image: 'donut.jpg' },
                { id: 13, name: 'בייגל "יום אחד"', icon: '🥯', price: 14, description: 'שנים של אהבה מתפתחת, ובייגל טוב תמיד מחכה לך בסוף.', image: 'bagel.jpg' },
                { id: 14, name: 'בראוני "אתה פשוט לא בקטע שלה"', icon: '🍫', price: 13, description: 'עשיר, אינטנסיבי, ולא צריך אף אחד אחר כדי ליהנות ממנו.', image: 'brownie.jpg' },
                { id: 15, name: 'פאי תפוחים "משהו ללבוש"', icon: '🍏', price: 15, description: 'נוסטלגי, נצחי, ועושה לך חשק לטייל בסנטרל פארק.', image: 'apple_pie.jpg' }
            ]
        },
        {
            title: '🍸 אלכוהול קטן',
            items: [
                { id: 16, name: 'איריש קופי "החתונה של החבר שלי"', icon: '🥃', price: 25, description: 'תמיד יש ערב אחד שבו אתה צריך קפה עם קצת אלכוהול.', image: 'irish_coffee.jpg' },
                { id: 17, name: 'בייליס "שדרות מדיסון"', icon: '🍸', price: 22, description: 'חלק, מתוק, ונראה מיליון דולר – בדיוק כמו השדרות היוקרתיות של העיר.', image: 'baileys.jpg' },
                { id: 18, name: 'אספרסו מרטיני "סקס והעיר הגדולה"', icon: '👠', price: 30, description: 'המשקה הרשמי של ניו יורק בלילה – אלגנטי, מתוחכם ומעורר.', image: 'espresso_martini.jpg' }
            ]
        }
    ];
    openPopup(event) {
        const itemId = event.currentTarget.dataset.id;
        this.selectedItem = this.menuSections
            .flatMap(section => section.items)
            .find(item => item.id === parseInt(itemId, 10));
    }

    closePopup() {
        this.selectedItem = null;
    }
}
