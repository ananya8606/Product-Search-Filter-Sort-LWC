import { LightningElement } from 'lwc';
import fetchContact from '@salesforce/apex/AccountLWC.fetchContact';
const cols = [{label:'Name',fieldName:'ContactUrl',type:'url',typeAttributes:{label:{fieldName:'Name'}}},
    {label:'Account',fieldName:'AccountUrl',type:'url',typeAttributes:{label:{fieldName:'AccountName'}}},
    {label:'Email',fieldName:'Email',type:'email'},
    {label:'Phone',fieldName:'Phone',type:'phone'}];
export default class ContactTable extends LightningElement {
    contactData;
    contactError;
    columns=cols;
    connectedCallback(){
        this.getContact();
    }
    getContact(){
        fetchContact()
        .then(data=>{ let result=[];
            data.forEach(dataItem=>{let tempData={};
            tempData=dataItem;
            tempData.AccountName=dataItem.Account.Name;
            tempData.AccountUrl='/'+dataItem.AccountId;
            tempData.ContactUrl='/'+dataItem.Id;
        result.push(tempData);
    })
        this.contactData=result;
        console.table(result);
    })
        .catch(error=>{this.contactError=error;})
    }
}