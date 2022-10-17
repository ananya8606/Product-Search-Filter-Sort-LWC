import { LightningElement,track,wire} from 'lwc';
import fetchCarModels from '@salesforce/apex/AccountLWC.fetchCarModels';
const dataTablecolumns = [
    {
  label: 'Car', 
  sortable : true,
    fieldName:'CarUrl',
    type:'url',typeAttributes:{label:{fieldName:'CarName'}}
},
{
    label :'Model Number',
    sortable : true,
    fieldName:'CarModelUrl',
    type:'url',typeAttributes:{label:{fieldName:'Name'}}
  },
  {
    label : 'Stage',
    fieldName : 'Stage__c',
    type : 'text',
    sortable : true
  },
  {
    label: 'Last Modified Date', 
    fieldName: 'LastModifiedDate',
    sortable : true, 
    type: ' Date/Time'
  }
  ]


export default class CarModelServerSort extends LightningElement {
  @track results = [];
  @track columns = dataTablecolumns;
  @track sortBy = "LastModifiedDate";
  @track sortDirection = "desc";
  show = false;
  //since we have used the dynamic wiring,
  //the list is automatically refreshed when the sort direction or order changes.
  @wire(fetchCarModels, { field: "$sortBy", sortOrder: "$sortDirection" })
  AccountLWC({ error, data }) {
    if (data) {
      let result = [];
      data.forEach((dataItem) => {
        let tempData = {};
        tempData.CarName = dataItem.Car__c.Name;
        tempData.CarUrl = "/" + dataItem.Car__c;
        tempData.CarModelUrl = "/" + dataItem.Id;
        let obj = Object.assign({}, dataItem, tempData);
        result.push(obj);
      });
      this.results = result;
      console.log(this.results);
      console.table(result);
    }
    if (error) console.log(error);
  }
  updateColumnSorting(event) {
    let fieldName = event.detail.fieldName;
    let sortDirection = event.detail.sortDirection;
    //assign the values. This will trigger the wire method to reload.
    this.sortBy = fieldName;
    this.sortDirection = sortDirection;
  }
}