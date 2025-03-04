import { LightningElement, track } from 'lwc';
import confettiScript from '@salesforce/resourceUrl/confetti';
import applauseSFX from '@salesforce/resourceUrl/applause';
import { loadScript } from 'lightning/platformResourceLoader';

export default class WheelOfFortune extends LightningElement {
    @track rotation = 0;
    @track isSpinning = false;
    @track selectedPrize = null;
    @track confettiInitialized = false;
    
    prizes = [
        "AGENT FORCE", "Lightning Component", "Salesforce MVP", "Trailhead Champion", 
        "Einstein AI", "Flow Master", "Admin Hero", "LWC Rockstar"
    ];

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
    }

    get wheelStyle() {
        return { transform: `rotate(${this.rotation}deg)` };
    }

    get buttonLabel() {
        return this.isSpinning ? 'מסתובב...' : '🎡 סובב את הגלגל';
    }

    playApplauseSound() {
        let audio = new Audio(applauseSFX);
        audio.play().catch(error => console.error("🔊 Audio play error:", error));
    }


    triggerConfetti() {
        if (this.confettiInitialized && window.confetti) {
            window.confetti({
                particleCount: 300, // הרבה יותר חלקיקים
                spread: 180, // התפזרות רחבה
                startVelocity: 45, // יותר מהירות
                scalar: 2, // גודל חלקיקים גדול יותר
                gravity: 0.4, // שיישארו יותר זמן
                origin: { x: 0.5, y: 0.4 } // יוצא מהאמצע למעלה
            });
            
        } else {
            console.error("Confetti script not loaded!");
        }
    }
    
    
        
    

    spinWheel() {
        if (this.isSpinning) return;

        this.isSpinning = true;
        const spins = Math.floor(Math.random() * 5) + 5; // 5-9 סיבובים
        const anglePerPrize = 360 / this.prizes.length;
        const randomPrizeIndex = Math.floor(Math.random() * this.prizes.length);

        const finalRotation = spins * 360 + (randomPrizeIndex * anglePerPrize);
        this.rotation += finalRotation;

        setTimeout(() => {
            this.isSpinning = false;

            // חישוב הזוכה בצורה מדויקת
            let normalizedRotation = (this.rotation % 360 + 360) % 360; // מבטיח שהערך יהיה חיובי
            let winningIndex = Math.floor(normalizedRotation / anglePerPrize);
            this.selectedPrize = this.prizes[winningIndex];

            // ✅ הפעלת קונפטי ומחיאות כפיים
            this.triggerConfetti();
            this.playApplauseSound();
        }, 3000);
    }
}
