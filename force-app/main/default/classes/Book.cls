public with sharing class Book {
    public String title;
    public String author;
    public Decimal price;

    public Decimal discountPrice(Decimal discountPrecentage){
        Decimal discountAmonut = price * (discountprecentage / 100);
        return price-discountAmonut;
    }
}