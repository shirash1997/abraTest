@IsTest
public class HTTPMockFactory implements HttpCalloutMock {
    private Integer statusCode;
    private String statusMessage;
    private String responseBody;
    private Map<String, String> responseHeaders;

    public HTTPMockFactory(
        Integer statusCode,
        String statusMessage,
        String responseBody,
        Map<String, String> responseHeaders
    ) {
        this.statusCode = statusCode;
        this.statusMessage = statusMessage;
        this.responseBody = responseBody;
        this.responseHeaders = responseHeaders;
    }

    public HttpResponse respond(HttpRequest req) {
        HttpResponse res = new HttpResponse();
        res.setStatusCode(this.statusCode);
        res.setStatus(this.statusMessage);
        res.setBody(this.responseBody);

        if (this.responseHeaders != null) {
            for (String key : this.responseHeaders.keySet()) {
                res.setHeader(key, this.responseHeaders.get(key));
            }
        }
        return res;
    }
}
