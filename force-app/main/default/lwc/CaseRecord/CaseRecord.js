import { LightningElement, track, wire } from 'lwc';
import getCases from '@salesforce/apex/casesRecords.getCases';

export default class caseListSearch extends LightningElement {
    @track cases;
    @track searchKey='';
    @track filteredItems=[];

    @wire(getCases)
    wiredCases({error,data}){
        if(data){
            this.cases=data;
            this.filteredItems=data;
        }else if(error){
            console.error('Error fetching cases', error);
        }
    }
    handleSearch(event){
        this.searchKey=event.target.value.toLowerCase();
        this.filteredItems=this.cases.fileter(item=>item.Subject.toLowerCase().includes(this.searchKey)) ;
        this.noResult=this.filteredItems.lenght===0;
}
}