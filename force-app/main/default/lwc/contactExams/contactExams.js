import { LightningElement, api, wire } from 'lwc';
import getContactExams from '@salesforce/apex/ContactExamController.getContactExams';

export default class ContactExams extends LightningElement {
    @api recordId; 
    exams = []; 
    averageScore = 0; 

    @wire(getContactExams, { contactId: '$recordId' })
    wiredExams({ error, data }) {
        if (data) {
            this.exams = data.map(exam => ({
                ...exam,
                expanded: false 
            }));
            this.calculateAverageScore();
        } else if (error) {
            console.error('Error loading exams:', error);
        }
    }

    calculateAverageScore() {
        let totalScore = 0;
        for (const exam of this.exams) {
            totalScore += exam.TotalScore__c; 
        }
        this.averageScore = this.exams.length > 0 ? totalScore / this.exams.length : 0;
    }

    handleToggleQuestions(event) {
        const examId = event.target.dataset.examId;
        this.exams = this.exams.map(exam => {
            if (exam.Id === examId) {
                return { ...exam, expanded: !exam.expanded };
            }
            return exam;
        });
    }

}
