public without sharing class CafeOrderMailer {
    @AuraEnabled
    public static void sendOrderEmail(Id orderId, String email) {
        // שליפת ההזמנה והלקוח
        Order__c order = [
            SELECT Id, Name, Total_Price__c, Date__c, Account__r.LastName
            FROM Order__c
            WHERE Id = :orderId
            LIMIT 1
        ];

        String customerName = order.Account__r.LastName;

        // שליפת פריטים
        List<Order_Item__c> items = [
            SELECT Name, Quantity__c, Unit_Price__c
            FROM Order_Item__c
            WHERE Order__c = :orderId
        ];

        // בניית שורות המוצרים
        List<String> itemRows = new List<String>();
        for (Order_Item__c item : items) {
            itemRows.add(
                '<tr>' +
                    '<td style="padding: 8px;">' + item.Name + '</td>' +
                    '<td style="text-align: center;">' + item.Quantity__c + '</td>' +
                    '<td style="text-align: center;">' + item.Unit_Price__c.setScale(2) + ' ₪</td>' +
                '</tr>'
            );
        }
        String logoUrl = 'https://abra6-dev-ed.develop.my.salesforce.com.lightning.force.com/resource/MidnightBrewLogo';


        String body =
            '<html><body dir="rtl" style="font-family: Arial, sans-serif; background-color: #f9f6f1; color: #3b3b3b; padding: 20px;">' +
            '<div style="max-width: 600px; margin: auto; background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.05);">' +
            '<div style="text-align: center;">' +
            '<img src="' + logoUrl + '" alt="הבית של הקפה" style="max-height: 60px; margin-bottom: 24px;" />' +
            '<h2 style="color: #5e473a;">תודה על ההזמנה!</h2>' +
            '<p style="font-size: 16px;">שלום ' + customerName + ',</p>' +
            '<p>ההזמנה שלך התקבלה בהצלחה. הנה הפרטים:</p>' +
            '</div>' +

            '<hr style="margin: 30px 0;" />' +

            '<div style="font-size: 15px; line-height: 1.6;">' +
            '<p><strong>מספר הזמנה:</strong> ' + order.Name + '</p>' +
            '<p><strong>תאריך:</strong> ' + order.Date__c.format() + '</p>' +
            '<p><strong>סה״כ לתשלום:</strong> ' + order.Total_Price__c.setScale(2) + ' ₪</p>' +
            '</div>' +

            '<h3 style="margin-top: 30px; color: #5e473a;">פרטי ההזמנה:</h3>' +
            '<table style="width: 100%; border-collapse: collapse;">' +
            '<thead>' +
            '<tr style="background-color: #f2ece6;">' +
            '<th style="text-align: right; padding: 10px;">שם המוצר</th>' +
            '<th style="text-align: center; padding: 10px;">כמות</th>' +
            '<th style="text-align: center; padding: 10px;">מחיר ליחידה</th>' +
            '</tr>' +
            '</thead>' +
            '<tbody>' + String.join(itemRows, '') + '</tbody>' +
            '</table>' +

            '<p style="margin-top: 40px;">מקווים לראותך שוב בקרוב,</p>' +
            '<p style="font-weight: bold;">צוות הבית של הקפה ☕</p>' +

            '<div style="margin-top: 40px; text-align: center; font-size: 12px; color: #999;">' +
            '<p>המייל נשלח אוטומטית. אין להשיב אליו.</p>' +
            '</div>' +
            '</div></body></html>';

        // שליחת המייל
        Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
        mail.setToAddresses(new String[] { email });
        mail.setSubject('אישור הזמנה - הבית של הקפה');
        mail.setHtmlBody(body);

        Messaging.sendEmail(new Messaging.SingleEmailMessage[] { mail });
    }
}
