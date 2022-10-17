public with sharing class ProductService {
	@AuraEnabled(cacheable=true)
	public static list<Product2> getProducts(
		String name,
		FilterWrapper filtersData
	) {
		String nameLike = '%' + name + '%';
        String abc= '000%';
		String query = 'SELECT Id,Name,ProductCode,Brand__c,ImageUrl__c, Display_Price__c,StockKeepingUnit,Product_Detail__c FROM Product2 WHERE Name like :nameLike AND ProductCode like :abc';

		System.debug('name ' + name);
		System.debug('filtersData ' + filtersData);
		if (filtersData != null) {
			if (
				filtersData.families != null &&
				filtersData.families.size() > 0
			) {
				String[] families = filtersData.families;
				query += ' AND Family IN :families';
			}
			if (filtersData.minPrice != null) {
				Decimal minPrice = filtersData.minPrice;
				query += ' AND Display_Price__c >= :minPrice';
			}
			if (filtersData.maxPrice != null) {
				Decimal maxPrice = filtersData.maxPrice;
				query += ' AND Display_Price__c <= :maxPrice';
			}
			if (String.isNotBlank(filtersData.brand)) {
				String brand = filtersData.brand;
				query += ' AND Brand__c = :brand';
			}
			if (String.isNotBlank(filtersData.sku)) {
				String sku = filtersData.sku;
				query += ' AND StockKeepingUnit >= :sku';
			}
		}
		return (Product2[]) Database.query(query);
	}

	public class FilterWrapper {
		@AuraEnabled
		public String[] families { get; set; }

		@AuraEnabled
		public Decimal minPrice { get; set; }

		@AuraEnabled
		public Decimal maxPrice { get; set; }

		@AuraEnabled
		public String brand { get; set; }

		@AuraEnabled
		public String sku { get; set; }
	}
}