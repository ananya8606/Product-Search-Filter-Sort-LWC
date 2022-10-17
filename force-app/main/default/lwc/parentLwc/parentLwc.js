import { LightningElement } from 'lwc';

export default class ParentLwc extends LightningElement {
    parentMessage='This is direct message change from parent';
    handleData(){
        console.log('Child Data Called');
        this.template.querySelector('c-child-lwc').message='This is a data sent from Parent';
    }
}