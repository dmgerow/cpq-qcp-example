List<Product2> products = [SELECT Id FROM Product2];
Pricebook2 priceBook = [
  SELECT Id, IsActive
  FROM Pricebook2
  WHERE IsStandard = TRUE
][0];
priceBook.IsActive = true;
update priceBook;
List<PricebookEntry> newEntries = new List<PricebookEntry>();
for (Product2 product : products) {
  PricebookEntry pbe = new PricebookEntry(
    Pricebook2Id = priceBook.Id,
    Product2Id = product.Id,
    UnitPrice = 1000,
    IsActive = true,
    UseStandardPrice = false
  );
  newEntries.add(pbe);
}
Database.SaveResult[] srList = Database.insert(newEntries, false);

// Iterate through each returned result
for (Database.SaveResult sr : srList) {
  if (sr.isSuccess()) {
    // Operation was successful, so get the ID of the record that was processed
    System.debug(
      'Successfully inserted PricebookEntry. Entry ID: ' + sr.getId()
    );
  } else {
    // Operation failed, so get all errors
    for (Database.Error err : sr.getErrors()) {
      System.debug('The following error has occurred.');
      System.debug(err.getStatusCode() + ': ' + err.getMessage());
      System.debug('PBE fields that affected this error: ' + err.getFields());
    }
  }
}
