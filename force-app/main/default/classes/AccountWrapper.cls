public with sharing class AccountWrapper {
    public class AWException extends exception {
    }
    
    Account thisAccount;
    
    public AccountWrapper(Account startWith) {
      thisAccount = startWith;
    }
    
    public Decimal getRoundedAvgPriceOfOpps() {
      AggregateResult[] aggResult = [
          SELECT AVG(Amount)
          FROM Opportunity
          WHERE accountId = :thisAccount.Id
          WITH USER_MODE
      ];
  
      // Handle no results or null averages
      if (aggResult.isEmpty() || aggResult[0].get('expr0') == null) {
          throw new AWException('No won Opportunities');
      }
  
      Decimal average = (Decimal) aggResult[0].get('expr0');
      Long modulus = Math.mod(Integer.valueOf(average), 1000);
      Decimal returnValue = (modulus >= 500)
          ? (average + 1000) - modulus
          : average - modulus;
  
      if (returnValue <= 0) {
          throw new AWException('No won Opportunities');
      }
      return returnValue;
  }
  
  
    
    public Boolean isHighPriority() {
      if(getRoundedAvgPriceOfOpps() > 100000.00) {
        return true;
      }
      return false;
    }
  }