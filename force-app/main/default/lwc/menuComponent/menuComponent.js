import { LightningElement } from 'lwc';
import { loadStyle } from 'lightning/platformResourceLoader';
import Styles from '@salesforce/resourceUrl/Styles';

export default class MenuComponent extends LightningElement {

    connectedCallback(){
        loadStyle(this, Styles);
    }
}