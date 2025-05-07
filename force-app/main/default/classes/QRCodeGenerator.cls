public without sharing class QRCodeGenerator {
    public static String generateQRCodeURL(String content, Integer size) {
        String baseUrl = 'https://chart.googleapis.com/chart';
        String qrUrl = baseUrl + '?chs=' + size + 'x' + size + '&cht=qr&chl=' + EncodingUtil.urlEncode(content, 'UTF-8');
        return qrUrl;
    }
}
