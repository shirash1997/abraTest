public without sharing class ReservationService {
    @AuraEnabled
    public static void createReservation(String fullName, Datetime reservationDateTime) {
        Reservation__c res = new Reservation__c(
            Full_Name__c = fullName,
            Reservation_Date__c = reservationDateTime
        );
        insert res;
    }
}