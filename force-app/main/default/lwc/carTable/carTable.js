import { LightningElement } from 'lwc';
import fetchCarModel from '@salesforce/apex/AccountLWC.fetchCarModel';
const cols = [{label:'Product Code',fieldName:'ProductCode',type:'text'},
    {label:'Name',fieldName:'Name',type:'text'},
    {label:'Type',fieldName:'Family',type:'text'},
    {label:'Description',fieldName:'Product_Detail__c',type:'RichTextArea'}];
export default class CarTable extends LightningElement {
    carData;
    carError;
    columns=cols;
    connectedCallback(){
        this.getCar();
    }
    getCar(){
        fetchCarModel()
        .then(data=>{ let result=[];
            data.forEach(dataItem=>{let tempData={};
            tempData=dataItem;
        result.push(tempData);
    })
        this.carData=result;
        console.table(result);
    })
        .catch(error=>{this.carError=error;})
    }
}