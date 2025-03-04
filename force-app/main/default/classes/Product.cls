public with sharing class Product {
    private String name{get;set;}
    private Decimal price{get;set;}
    private Integer quantity{get;set;}

    public Product(String name, Decimal price, Integer quantity) {
       this.name=name;
       this.price=price;
       this.quantity=quantity;
    }

    public  Decimal calculateProductTotalValue(){
        return price*quantity;
    }


}