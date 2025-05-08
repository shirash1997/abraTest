public without sharing class ReservationService {
    @AuraEnabled
    public static Id createReservation(String fullName, Datetime reservationDateTime, Integer guestCount) {
        Reservation__c res = new Reservation__c(
            Full_Name__c = fullName,
        Reservation_Date__c = reservationDateTime,
        Guest_Count__c = guestCount
            );
        insert res;

        return res.Id;
    }
    
    @AuraEnabled(cacheable=true)
    public static List<String> getUnavailableHours(Date selectedDate) {
        DateTime startOfDay = DateTime.newInstance(selectedDate, Time.newInstance(0, 0, 0, 0));
        DateTime endOfDay = DateTime.newInstance(selectedDate, Time.newInstance(23, 59, 59, 999));
        
        List<Reservation__c> reservations = [
            SELECT Reservation_Date__c
            FROM Reservation__c
            WHERE Reservation_Date__c >= :startOfDay AND Reservation_Date__c <= :endOfDay
        ];
        
        List<String> takenSlots = new List<String>();
        for (Reservation__c res : reservations) {
            DateTime dt = res.Reservation_Date__c;
            String hour = dt.hour() < 10 ? '0' + dt.hour() : String.valueOf(dt.hour());
            String minute = dt.minute() < 10 ? '0' + dt.minute() : String.valueOf(dt.minute());
            takenSlots.add(hour + ':' + minute);
        }
        
        return takenSlots;
    }
    
}