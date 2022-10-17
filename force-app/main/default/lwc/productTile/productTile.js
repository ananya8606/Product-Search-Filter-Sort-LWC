import { LightningElement, api } from "lwc";
import { NavigationMixin } from 'lightning/navigation';
export default class ProductTile extends NavigationMixin(LightningElement) {
	@api product;
	@api
	get addedToCart() {
		return this.isAddedToCart;
	}
	set addedToCart(value) {
		this.isAddedToCart = value;
	}

	@api
	get defaultQuantity() {
		return this.quantity;
	}

	set defaultQuantity(value) {
		this.quantity = value;
	}

	quantity = 1;
	isAddedToCart;

	handleAddToCart() {
		this.isAddedToCart = true;
		this.dispatchEvent(
			new CustomEvent("addedtocart", {
				detail: {
					productId: this.product.Id,
					selectedQuantity: this.quantity
				}
			})
		);
	}

	handleRemoveFromCart() {
		this.isAddedToCart = false;
		this.quantity = 0;
		this.dispatchEvent(
			new CustomEvent("removedfromcart", {
				detail: {
					productId: this.product.Id,
				}
			})
		);
	}

	handleChange(event) {
		this.quantity = event.target.value;
	}

	get backgroundStyle() {
		return this.product.ImageUrl__c;
	}

	get totalPrice() {
		if(this.isAddedToCart)
		return this.quantity * this.product.Display_Price__c;
		return this.product.Display_Price__c;
	}
	get sku() {
		if(this.isAddedToCart)
		return parseInt(this.product.StockKeepingUnit, 10) - this.quantity;
		return parseInt(this.product.StockKeepingUnit,10);
	} 
	navigateToCarBookingPage() {
        this[NavigationMixin.Navigate]({
          type: "standard__objectPage",
          attributes: {
            objectApiName: "Car_Booking__c",
            actionName: "new"
          }
        });
	}
		navigateToCarPaymentPage() {
			this[NavigationMixin.Navigate]({
        type: "standard__objectPage",
        attributes: {
          objectApiName: "Car_Payment__c",
          actionName: "new"
        }
      });
}
navigateToProductPage() {
	this[NavigationMixin.Navigate]({
        type: "standard__recordPage",
        attributes: {
		recordId:this.product.Id,
          objectApiName: "Product2",
          actionName: "view"
        }
      });
}
}