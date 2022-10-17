import { LightningElement} from 'lwc';
import fetchAccount from '@salesforce/apex/AccountLWC.fetchAccount';
const cols = [{label:'Name',fieldName:'Name',type:'text'},
    {label:'Industry',fieldName:'Industry',type:'text'},
    {label:'Phone',fieldName:'Phone',type:'phone'},
    {label:'Revenue',fieldName:'AnnualRevenue',type:'currency'}];
export default class ApexConnect extends LightningElement {
    wiredResult;
    wiredError;
    columns=cols;
    key;
    isShow=false;
    //wire decorator
    /* @wire(fetchAccount)
    accountDataFetch({error,data}){
        if(data){
            this.wiredResult=data;
            console.table(data);
            this.wiredError=undefined;
        }
        else if (error){
            this.wiredResult=undefined;
            this.wiredError=error;
        }
    } */
    /* connectedCallback(){
        this.fetchTheAccount();
    } */
    //imperative call
    fetchTheAccount(){
        fetchAccount({search:this.key}) //apex class has run
        .then(data=>{this.wiredResult=data;})//receiving the response - returned from class
        .catch(error=>{this.wiredError=error;})//any issue will be captured by catch
    }
    handleInputText(event){
        this.key=event.target.value;
        if(this.key === '')
        {
            this.key='@#$%^&*()';
            this.isShow=false;
        }
        else
        {
        this.isShow=true;
        }
        this.fetchTheAccount();
        console.log(this.key);
    }
}