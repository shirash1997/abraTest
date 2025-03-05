import { LightningElement, track } from 'lwc';
import confettiScript from '@salesforce/resourceUrl/confetti';
import applauseSFX from '@salesforce/resourceUrl/applause';
import { loadScript } from 'lightning/platformResourceLoader';

export default class WheelOfFortune extends LightningElement {
    @track rotation=0;
    @track isSpinning = false;
    @track selectedPrize = null;
    @track confettiInitialized = false;
    @track dontShowWinning = false;
    prizes = [
        "AGENT FORCE", "Lightning Component", "Salesforce MVP", "Trailhead Champion", 
        "Einstein AI", "Flow Master", "Admin Hero", "LWC Rockstar"
    ];

    colors = ["#FF5733", "#33FF57", "#5733FF", "#FF33A1", "#33FFF5", "#F5FF33", "#A133FF", "#FF8C33"];

    connectedCallback() {
        console.log("🔍 Loading Confetti Script...");
        loadScript(this, confettiScript)
            .then(() => {
                console.log("✅ Confetti script loaded");
                this.confettiInitialized = true;
            })
            .catch(error => {
                console.error("❌ Error loading confetti script:", error);
            });
        this.dontShowWinning = true;
    }

    get dontShowWinning(){
        if(this.isSpinning){
            this.dontShowWinning = true;
        }
        return this.dontShowWinning;
    }

    get buttonLabel() {
        return this.isSpinning ? '...מסתובב' : '🎡 סובב את הגלגל';
    }

    playApplauseSound() {
        let audio = new Audio(applauseSFX);
        audio.play().catch(error => console.error("🔊 Audio play error:", error));
    }

    triggerConfetti() {
        if (this.confettiInitialized && window.confetti) {
            window.confetti({
                particleCount: 300,
                spread: 180,
                startVelocity: 45,
                scalar: 2,
                gravity: 0.4,
                origin: { x: 0.5, y: 0.4 }
            });
        } else {
            console.error("Confetti script not loaded!");
        }
    }

    get segments() {
        const numSegments = this.prizes.length;
        const anglePerPrize = 360 / numSegments;
        const radius = 240;
        const center = 250;
        let segments = [];
    
        this.prizes.forEach((prize, index) => {
            const startAngle = index * anglePerPrize;
            const endAngle = (index + 1) * anglePerPrize;
            const largeArcFlag = anglePerPrize > 180 ? 1 : 0;
    
            const x1 = center + radius * Math.cos((Math.PI / 180) * startAngle);
            const y1 = center + radius * Math.sin((Math.PI / 180) * startAngle);
            const x2 = center + radius * Math.cos((Math.PI / 180) * endAngle);
            const y2 = center + radius * Math.sin((Math.PI / 180) * endAngle);
    
            const pathData = `M ${center} ${center} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
    
            const textRadius = radius * 0.7;
            const textAngle = startAngle + anglePerPrize / 2;
            const textX = center + textRadius * Math.cos((Math.PI / 180) * textAngle);
            const textY = center + textRadius * Math.sin((Math.PI / 180) * textAngle);
    
            let textRotation = textAngle;
            if (textRotation > 90 && textRotation < 270) {
                textRotation += 180; 
            }
    
            segments.push({
                index,
                d: pathData,
                color: this.colors[index % this.colors.length],
                prize,
                textX,
                textY,
                textTransform: `rotate(${textRotation}, ${textX}, ${textY})`
            });
        });
    
        return segments;
    }

    spinWheel() {
        if (this.isSpinning) return; // ✅ מונע לחיצה כפולה בזמן סיבוב
        console.log("✅ Starting spinWheel function...");
        this.dontShowWinning = true;
        this.isSpinning = true; // 🔒 נועל את הכפתור
        console.log("🔄 Setting isSpinning = true");
    
        const minSpins = 6; // קצת יותר סיבובים כדי שזה ירגיש טבעי
        const maxSpins = 10;
        const spins = Math.floor(Math.random() * (maxSpins - minSpins + 1)) + minSpins;
    
        const anglePerPrize = 360 / this.prizes.length;
    
        // 🎯 בחירת פרס אקראי
        const randomPrizeIndex = Math.floor(Math.random() * this.prizes.length);

    
        console.log(`🎯 Prize Selected Before Spin: ${this.selectedPrize}`);
    
        // ✅ חישוב זווית כך שהפרס הנבחר יגיע **למיקום המחט (90°)**
        const finalRotation = -(spins * 360) - ((randomPrizeIndex + 0.5) * anglePerPrize) - 90;
    
        console.log(`🎡 Calculated Final Rotation: ${finalRotation} degrees`);
    
        this.rotation = finalRotation;
    
        const wheelElement = this.template.querySelector('.wheel');
    
        if (!wheelElement) {
            console.error("❌ Wheel element not found in DOM!");
            this.isSpinning = false;
            return;
        }
    
        console.log("✅ Wheel element found in DOM.");
    
        // ✅ איפוס האנימציה לפני תחילת הסיבוב (כדי שלא יתחיל בהאטה)
        wheelElement.style.transition = "none";
        wheelElement.style.transform = `rotate(${this.rotation % 360}deg)`;
    
        // ✅ חיכוי קצר כדי לאפס את ה-`transition` ואז להפעיל מחדש
        setTimeout(() => {
            const spinTime = Math.random() * (6.5 - 5) + 5; // 📌 זמן רנדומלי בין 5 ל-6.5 שניות
            const easing = "cubic-bezier(0.25, 1, 0.3, 1)"; // 📌 עדכון לעקומה שמאטה בלי עצירה חדה
    
            console.log("🎬 Starting animation...");
            wheelElement.style.transition = `transform ${spinTime}s ${easing}`;
            wheelElement.style.transform = `rotate(${finalRotation}deg)`;
        }, 50); // חיכוי קצר כדי לאפס את האנימציה
    
        // ✅ מחכים לסיום האנימציה לפני שמאפשרים ללחוץ שוב
        wheelElement.addEventListener('transitionend', () => {
            console.log("🛑 Transition ended. Stopping spin...");
            this.isSpinning = false; 
            this.dontShowWinning = false;// ✅ עכשיו אפשר ללחוץ שוב!
            console.log(`🏆 Final Prize Selected: ${this.selectedPrize}`);
            this.selectedPrize = this.prizes[randomPrizeIndex];
            // ✅ הפעלת קונפטי + סאונד
            this.triggerConfetti();
            this.playApplauseSound();
        }, { once: true });
    }
    
    
    
      
    get wheelStyle() {
        let rotationValue = this.rotation || 0; // אם rotation לא מוגדר, נגדיר אותו כ-0
        return `transform: rotate(${rotationValue}deg);`;
    }
}
   
    