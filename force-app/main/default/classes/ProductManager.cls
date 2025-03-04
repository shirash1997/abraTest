public with sharing class ProductManager {
    private List<Product> products{get;set;};
    
    public ProductManager(List<Product> products) {
        products= new List<Product>();
    }
    
    public  addProduct(Product product){
        products.add(product);
        
    }
    public  removeProductByName(String name){
        for(Product prd:products){
            if(prd.Name==name){
                products.remove(prd.Id);
            }
        }
    }
    public   calculatTotalVAlueOfAllProducts(List<Product> products){
        String totalValue=0;
        for(Product prd:products){
            totalValue+=prd.calculateProductTitalValue(prd.Id);
        }
        return totalValue;
        
    }
}