public with sharing class AccountLWC {
    @AuraEnabled(cacheable=true)
    public static List<Account> fetchAccount(String search) {
    String searchItem='%'+search+'%';
    return [select id,name,phone,Industry,AnnualRevenue from Account where name like:searchItem limit 1000];
    }
    @AuraEnabled
    public static List<Contact> fetchContact() {
    return [select id,name,phone,email,account.name,accountid from Contact limit 1000];
    }
    @AuraEnabled
    public static list<Product2> fetchCarModel() {
    return [select ProductCode,Name,Family,Product_Detail__c from Product2];
    }
    @AuraEnabled (Cacheable=true)
    public static List<Car_Model__c> fetchCarModels(String field, String sortOrder){
        String abc='launched';
        return Database.query('SELECT id,Car__c,Name,Car_Model_Details__c,Stage__c,LastModifiedDate FROM Car_Model__c WHERE Stage__c = :abc ORDER BY '+field+' '+sortOrder);
    }
}
