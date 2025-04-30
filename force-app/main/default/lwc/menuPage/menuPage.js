import { LightningElement, track , api} from 'lwc';
import CoffeeImages from '@salesforce/resourceUrl/CoffeeImages'; // חיבור לסטטי ריסורס

export default class MenuPage extends LightningElement {
    @track selectedItem = null;
    @track cart = []; 
    @api isTaPage; // האם זה עמוד TA? (בברירת מחדל - false)
    @api showAlcohol; 
    @track quantities = {};
    // האם להציג את תפריט האלכוהול? (בברירת מחדל - כן)
    menuSections = [
        {
            title: 'תפריט הקפה שלנו ☕',
            items: [
                { id: 1, name: 'קפוצ׳ינו "כשהארי פגש את סאלי"', icon: '💑', price: 18, quantity:0, description: 'החיים מלאים הפתעות, אבל קפוצ׳ינו טוב זה תמיד סיפור אהבה בטוח.',details: 'קפוצ׳ינו עשוי ממנת אספרסו חמה המשלבת חלב מוקצף בעל מרקם קרמי. מוגש בכוס חרס בנפח של 150 מ"ל.',  image:  `${CoffeeImages}/cappuccino.jpg` },
                { id: 2, name: 'לאטה "אישה יפה"', icon: '👠', price: 19, quantity:0, description: 'קטיפתי, מתוק, ונראה מיליון דולר - כמו ג׳וליה רוברטס ברודיאו דרייב.', details:'לאטה עשוי ממנת אספרסו בשילוב עם חלב חם ומעט קצף חלב למעלה. מוגש בכוס זכוכית בנפח של 240 מ"ל.', image: `${CoffeeImages}/latte.jpg` },
                { id: 3, name: 'אמריקנו "גוסיפ גירל"', icon: '🗽', price: 15, quantity:0 ,description: 'קלאסי, מחוספס ומלא באופי כמו השדרה החמישית. XOXO, Gossip Girl.', details: 'אמריקנו מורכב ממנת אספרסו בתוספת מים חמים, היוצרים משקה חלק עם טעמים מעודנים. מוגש בכוס חרס בנפח של 180 מ"ל.' ,image: `${CoffeeImages}/americano.jpg` },
                { id: 4, name: 'מוקה "סקס והעיר הגדולה"', icon: '👗', price: 21, quantity:0, description: 'שוקולד וקפה ברומן סוער יותר מהדייטים של קארי בראדשו.', details: 'מוקה הוא שילוב בין אספרסו, שוקולד מומס וחלב חם מוקצף. מוגש בכוס חרס או זכוכית בנפח של 220 מ"ל.',  image: `${CoffeeImages}/macchiato.jpg` },
                { id: 5, name: 'ריסטרטו "מגי פגש את ג׳ייק"', icon: '🎭', price: 16, quantity:0, description: 'חזק, קצר ומלא תשוקה כמו סיפור אהבה בלתי אפשרי.', details: 'ריסטרטו הוא גרסה קצרה וחזקה יותר של אספרסו, המיוצרת עם פחות מים. טעמו עשיר, מרוכז ועמוק. מוגש בכוס אספרסו קטנה.', image: `${CoffeeImages}/ristretto.jpg` },
                { id: 6, name: 'פלאט וויט "ארוחת בוקר בטיפאני׳ס"', icon: '💎', price: 20, quantity:0, description: 'אלגנטי, נצחי, וגורם לך לרצות ללבוש שמלת ערב ולהסתובב בניו יורק.', details: 'פלאט וויט עשוי ממנת אספרסו עם חלב חם מוקצף קלות, היוצר מרקם חלק ונעים. מוגש בכוס חרס או זכוכית בנפח של 160 מ"ל.', image: `${CoffeeImages}/flat_white.jpg` },
                { id: 7, name: 'אספרסו "מועדון ארוחת הבוקר"', icon: '☕', price: 14, quantity:0, description: 'אם יש משהו שמחבר בין כולם – זה אספרסו טוב בבוקר.', details: 'אספרסו קלאסי המיוצר ממנת קפה טחון בלחץ גבוה, המעניק משקה קצר עם קרמה עשירה. מוגש בכוס אספרסו קטנה בנפח של 30 מ"ל.',image: `${CoffeeImages}/espresso.jpg` },
                { id: 8, name: 'קורטדו "דירה להשכיר"', icon: '🏙️', price: 18, quantity:0, description: 'כוס קטנה אבל עם אופי גדול - בדיוק כמו ניו יורק של פעם.', details: 'קורטדו הוא אספרסו בתוספת מעט חלב חם מאודה, המאזן את החומציות והמרירות של הקפה. מוגש בכוס זכוכית קטנה בנפח של 100 מ"ל.', image: `${CoffeeImages}/cortado.jpg` },
                { id: 9, name: 'מאקיאטו "החתונה של החבר שלי"', icon: '💍', price: 18, quantity:0, description: 'מתוק, חזק וקצת מסובך – כמו רגשות שאסור להודות בהם.', details: 'מאקיאטו הוא מנה קטנה של אספרסו עם טיפה של קצף חלב מעל. מוגש בכוס אספרסו קטנה ומדגיש את הטעמים החזקים של הקפה.' , image: `${CoffeeImages}/macchiato.jpg` },
                { id: 10, name: 'קפה קר "סיפור אהבה"', icon: '❄️', price: 19, quantity:0, description: 'קפה קר, אבל מלא חמימות בלב – ממש כמו רגעים בלתי נשכחים.', details: 'קפה קר עשוי ממנת אספרסו שנשפכת על קרח ומוגשת עם חלב קר או מים. משקה מרענן ומעורר המתאים לימים חמים. מוגש בכוס גדולה בנפח של 300 מ"ל.' , image: `${CoffeeImages}/iced_coffee.jpg` }
            ]
        },
        {
            title: 'חייב משהו בצד, לא? 🥐',
            items: [
                { id: 11, name: 'קרואסון "הרומן שלי עם אנני"', icon: '📝', price: 12, quantity:0, description: 'חמאה, שכבות ורגש עמוק – כמו הסצנה על גשר ברוקלין.', details: 'קרואסון חמאה קלאסי בעל שכבות אווריריות ומתפצחות. עשוי מבצק עלים המיוצר בשיטה מסורתית הכוללת קיפול חזרתי של בצק וחמאה. מוגש טרי וחם.', image: `${CoffeeImages}/croissant.jpg` },
                { id: 12, name: 'דונאט "כשהארי פגש את סאלי"', icon: '🍩', price: 10,quantity:0, description: '"אני אקח מה שהיא לקחה" – ואולי גם דונאט בצד?', details: 'דונאט מטוגן או אפוי, עשוי בצק שמרים מתוק, מצופה בשוקולד או סוכר ולעיתים ממולא בריבה, קרם או ריבת חלב. מוגש טרי ומפתה.' , image: `${CoffeeImages}/donut.jpg` },
                { id: 13, name: 'בייגל "יום אחד"', icon: '🥯', price: 14,quantity:0, description: 'שנים של אהבה מתפתחת, ובייגל טוב תמיד מחכה לך בסוף.', details: 'בייגל עגול ומתקתק, עשוי מבצק שמרים מבושל ומאפה בתנור לקבלת מרקם צפוף לעיס וקרום פריך. מוגש עם חמאה, גבינה או סלמון מעושן.', image: `${CoffeeImages}/bagel.jpg` },
                { id: 14, name: 'בראוני "אתה פשוט לא בקטע שלה"', icon: '🍫',quantity:0, price: 13, description: 'עשיר, אינטנסיבי, ולא צריך אף אחד אחר כדי ליהנות ממנו.', details: 'בראוני עשיר ושוקולדי, בעל מרקם רך במרכז עם קרום דק ומתפצח למעלה. מתאים למי שאוהב עוגות שוקולד דחוסות ומספקות.', image: `${CoffeeImages}/'brownie.jpg` },
                { id: 15, name: 'פאי תפוחים "משהו ללבוש"', icon: '🍏', price: 15,quantity:0, description: 'נוסטלגי, נצחי, ועושה לך חשק לטייל בסנטרל פארק.', details: 'פאי תפוחים ביתי עם בצק פריך ומילוי תפוחים מתובלים בקינמון וסוכר. מוגש חם עם כדור גלידת וניל לצידו.', image: `${CoffeeImages}/apple_pie.jpg` }
            ]
        },
        {
            title: 'אלכוהול קטן 🍸',
            items: [
                { id: 16, name: 'איריש קופי "החתונה של החבר שלי"', icon: '🥃', price: 25, description: 'תמיד יש ערב אחד שבו אתה צריך קפה עם קצת אלכוהול.', details: 'משקה חם המשלב אספרסו חזק, ויסקי אירי, סוכר וקצפת עשירה מעל. מוגש בכוס זכוכית שקופה בנפח של 240 מ"ל, אידיאלי לערבים קרים ומיוחדים.', image: `${CoffeeImages}/irish_coffee.jpg` },
                { id: 17, name: 'בייליס "שדרות מדיסון"', icon: '🍸', price: 22, description: 'חלק, מתוק, ונראה מיליון דולר – בדיוק כמו השדרות היוקרתיות של העיר.', details: 'משקה קרמי ומתוק המיוצר מערבוב של אספרסו עם ליקר בייליס (שוקולד, שמנת ואירלנד). מוגש בכוס נמוכה בנפח של 150 מ"ל ומיועד למי שאוהב שילוב אלגנטי של אלכוהול וקפה.', image: `${CoffeeImages}/baileys.jpg`},
                { id: 18, name: 'אספרסו מרטיני "סקס והעיר הגדולה"', icon: '👠', price: 30, description: 'המשקה הרשמי של ניו יורק בלילה – אלגנטי, מתוחכם ומעורר.', details: 'קוקטייל קלאסי המשלב אספרסו קר, וודקה וליקר קפה (כמו קאלואה). מוגש בכוס מרטיני אלגנטית בנפח של 120 מ"ל עם קישוט של פולי קפה למראה מושלם.' , image: `${CoffeeImages}/espresso_martini.jpg` }
            ]
        }
    ];

    connectedCallback() {
        console.log('is TA page?', this.isTaPage);
        console.log('filteredMenuSections:' +JSON.stringify(this.filteredMenuSections));
    }
    
    openPopup = (event) => {
        const target = event.target;
    
        // מניעת פתיחת פופאפ אם נלחץ על כפתור או אלמנט בתוך quantity-buttons
        if (
            target.tagName === 'BUTTON' ||
            target.closest('.quantity-buttons')
        ) {
            return;
        }
    
        const itemId = parseInt(event.currentTarget.dataset.id, 10);
        const foundItem = this.menuSections
            .flatMap(section => section.items)
            .find(item => item.id === itemId);
    
        if (foundItem) {
            this.selectedItem = foundItem;
        }
    };
    

    closePopup = () => {
        this.selectedItem = null;
    };

    stopPropagation = (event) => {
        event.stopPropagation();
    };

    get filteredMenuSections() {
        if (this.isTaPage) {
            return this.menuSections.filter(section => 
                (section.title === 'תפריט הקפה שלנו ☕') || 
                (section.title === 'חייב משהו בצד, לא? 🥐')
            );
        } else {
            console.log('filteredMenuSections after click:' +JSON.stringify(this.menuSections)); // זה יוחזר כאשר isTaPage הוא false - כלומר, כל התפריטים המלאים.
            return this.menuSections;
        }
    }
    



    handleIncreaseQuantity(event) {
        const itemId = parseInt(event.target.dataset.id, 10);

        this.menuSections = this.menuSections.map(section => ({
            ...section,
            items: section.items.map(item => {
                if (item.id === itemId) {
                    return { ...item, quantity: item.quantity + 1 };
                }
                return item;
            })
        }));
    }

    handleDecreaseQuantity(event) {
        const itemId = parseInt(event.target.dataset.id, 10);

        this.menuSections = this.menuSections.map(section => ({
            ...section,
            items: section.items.map(item => {
                if (item.id === itemId && item.quantity > 0) {
                    return { ...item, quantity: item.quantity - 1 };
                }
                return item;
            })
        }));
    }

    handleAddToCart(event) {
        const itemId = event.currentTarget.dataset.id;
        const quantity = this.getQuantity(itemId);

        if (quantity > 0) {
            const item = this.menuSections.flatMap(section => section.items).find(item => item.id == itemId);
            addItemToCart(item, quantity);
            this.quantities = { ...this.quantities, [itemId]: 0 };
        }
    }

    addToCart(event) {
        const itemId = parseInt(event.target.dataset.id, 10);
        
        const selectedItem = this.menuSections
            .flatMap(section => section.items)
            .find(item => item.id === itemId);
    
        if (selectedItem && selectedItem.quantity > 0) {
            // מוודאים שאנחנו מעבירים רק את הנתונים הנחוצים לעגלה
            const cartItem = { 
                id: selectedItem.id,
                name: selectedItem.name,
                price: selectedItem.price,
                quantity: selectedItem.quantity,
                description: selectedItem.description,
                image: selectedItem.image,
                totalPrice: selectedItem.price * selectedItem.quantity 
            };

            this.dispatchEvent(new CustomEvent('addtocart', { detail: cartItem }));
    

            console.log('✅ עגלה מעודכנת: ', JSON.stringify(cartItem));
        } else {
            alert('🛒 נא לבחור כמות לפני הוספה לעגלה.');
        }
    }
    
    stopPropagation = (event) => {
        event.stopPropagation();
    };
    
}