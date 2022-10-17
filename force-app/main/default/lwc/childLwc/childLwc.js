import { LightningElement,api} from 'lwc';

export default class ChildLwc extends LightningElement {
   @api message='This is child data';
   @api messageData='This is child data 2nd'; 
}