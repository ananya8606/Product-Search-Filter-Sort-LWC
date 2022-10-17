import { LightningElement } from 'lwc';

export default class FirstLwc extends LightningElement {
    greeting='Hello Good Morning';
    textValue;
    handleButtonClick(){
        if(this.greeting==='Hello Good Morning')
            this.greeting='Hello Good Afternoon';
        else
            this.greeting='Hello Good Morning';
    }

    handleInputEvent(event){
        this.textValue=event.target.value;
    }
}