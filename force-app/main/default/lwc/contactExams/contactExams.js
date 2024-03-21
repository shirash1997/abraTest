import { LightningElement, api, wire } from 'lwc';
import getContactExams from '@salesforce/apex/ContactExamController.getContactExams';

export default class ContactExams extends LightningElement {
    @api recordId; // Define recordId property

    exams = []; // Exam data
    averageScore = 0; // Avg Score

    // Load exams data using wire service
    @wire(getContactExams, { contactId: '$recordId' })
    wiredExams({ error, data }) {
        if (data) {
            this.exams = data.map(exam => ({
                ...exam,
                expanded: false // Add expanded property for each exam
            }));
            // Calculate average score
            this.calculateAverageScore();
        } else if (error) {
            // Handle error
            console.error('Error loading exams:', error);
        }
    }

    // Calculate average score
    calculateAverageScore() {
        let totalScore = 0;
        for (const exam of this.exams) {
            totalScore += exam.TotalScore__c; // Update field name
        }
        this.averageScore = this.exams.length > 0 ? totalScore / this.exams.length : 0;
    }

    // Toggle questions visibility for an exam
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
