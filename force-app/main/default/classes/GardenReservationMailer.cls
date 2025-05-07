public with sharing class GardenReservationMailer {
    @AuraEnabled
    public static void sendReservationEmail(String email, String fullName, Datetime reservationDateTime, Integer guestCount, Id reservationId) {
        String formattedDate = reservationDateTime.format('dd/MM/yyyy');
        String formattedTime = reservationDateTime.format('HH:mm');

        String logoUrl = 'https://abra6-dev-ed.develop.my.salesforce.com/sfc/dist/version/download/?oid=00DWU00000Ed9Zi&ids=068WU000009bbZh&d=%2Fa%2FWU0000004vHR%2FkDnYLp8wqbGqkhQZau0H8vxJpjkxoovA9z_ITqIlzoo&asPdf=false';

        // 🔳 יצירת קישור QR להזמנה

        String qrUrl = 'https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=https://midnightbrew.coffee/reservation?Id=' + reservationId;

        String body =
            '<html><body dir="rtl" style="font-family: Arial, sans-serif; background-color: #f9f6f1; color: #3b3b3b; padding: 20px;">' +
            '<div style="max-width: 600px; margin: auto; background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.05);">' +
            '<div style="text-align: center;">' +
            '<img src="' + logoUrl + '" alt="MidnightBrew" style="max-height: 60px; margin-bottom: 24px;" />' +
            '<h2 style="color: #5e473a;">ההזמנה לגינה התקבלה!</h2>' +
            '<p style="font-size: 16px;">שלום ' + fullName + ',</p>' +
            '<p>שמחים שבחרת לשבת איתנו בגינת הקפה שלנו. הנה הפרטים:</p>' +
            '</div>' +

            '<hr style="margin: 30px 0;" />' +

            '<div style="font-size: 15px; line-height: 1.6;">' +
            '<p><strong>תאריך ההזמנה:</strong> ' + formattedDate + '</p>' +
            '<p><strong>שעה:</strong> ' + formattedTime + '</p>' +
            '<p><strong>מספר משתתפים:</strong> ' + guestCount + '</p>' +
            '</div>' +

            '<div style="text-align: center; margin-top: 30px;">' +
            '<p>הצג את ה-QR הבא כשאתה מגיע:</p>' +
            '<img src="' + qrUrl + '" alt="QR להזמנה" style="width: 250px; height: 250px;" />' +
            '</div>' +

            '<p style="margin-top: 40px;">נשמח לארח אותך בשקט שבגינה שלנו 🌿</p>' +
            '<p style="font-weight: bold;">צוות MidnightBrew ☕</p>' +

            '<div style="margin-top: 40px; text-align: center; font-size: 12px; color: #999;">' +
            '<p>המייל נשלח אוטומטית. אין להשיב אליו.</p>' +
            '</div>' +
            '</div></body></html>';

        Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
        mail.setToAddresses(new String[] { email });
        mail.setSubject('אישור הזמנה לגינה - MidnightBrew');
        mail.setHtmlBody(body);

        List<OrgWideEmailAddress> oweaList = [
            SELECT Id FROM OrgWideEmailAddress WHERE Address = 'vahav.shira1997@gmail.com' LIMIT 1
        ];
        if (!oweaList.isEmpty()) {
            mail.setOrgWideEmailAddressId(oweaList[0].Id);
        }

        Messaging.sendEmail(new Messaging.SingleEmailMessage[] { mail });
    }
}
