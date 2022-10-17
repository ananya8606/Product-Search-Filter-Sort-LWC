import { LightningElement, wire } from "lwc";
import { getPicklistValues } from "lightning/uiObjectInfoApi";

// messageChannels
import { publish, MessageContext } from "lightning/messageService";
import FILTER_CHANNEL from "@salesforce/messageChannel/ProductFilterChannel__c";

// fields
import FAMILY_FIELD from "@salesforce/schema/Product2.Family";
export default class ProductFilters extends LightningElement {
	families = [];
	minPrice;
	maxPrice;
	brand;
	sku;

	@wire(getPicklistValues, {
		recordTypeId: "0125g0000022HbB",
		fieldApiName: FAMILY_FIELD
	})
	familyPicklistValues;

	@wire(MessageContext)
	messageContext;

	handleChange(event) {
		this[event.target.name] = event.detail.value;
		console.log(event.detail.value);
		this.publishChange();
	}

	publishChange() {
		const message = {
			filtersData: {
				families: this.families,
				minPrice: this.minPrice,
				maxPrice: this.maxPrice,
				sku: this.sku,
				brand: this.brand
			}
		};
		publish(this.messageContext, FILTER_CHANNEL, message);
	}
}
