import { LightningElement } from 'lwc';
import htmlone from './lifeCycleHooks.html';
import htmltwo from './lch2.html';
import htmlthree from './lch3.html';
export default class LifeCycleHooks extends LightningElement {
    greeting='Hello Good Morning';
    textValue;
    activePage=1;
    constructor(){
        super();
        console.log('Constructor called');
    }
    connectedCallback(){
        console.log('Connected Callback called');
    }
    renderedCallback(){
        console.log('Rendered Callback called');
    }

    handleButtonClick(){
        if(this.greeting==='Hello Good Morning')
            this.greeting='Hello Good Afternoon';
        else
            this.greeting='Hello Good Morning';
    }

    handleInputEvent(event){
        this.textValue=event.target.value;
    }
    handlePageOne(){
    this.activePage=2;
    }
    handlePageTwo(){
    this.activePage=3;
    }
    handlePageThree(){
    this.activePage=1;
    }
    // eslint-disable-next-line consistent-return
    render(){
        if(this.activePage===1)
        return htmlone;
        else if(this.activePage===2)
        return htmltwo;
        else if(this.activePage===3)
        return htmlthree;
    }
}