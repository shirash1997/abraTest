@IsTest
private class ExternalSearchTests {
    @IsTest
    static void testPositiveMocking() {
        // GIVEN: Mock with a successful response
        HTTPMockFactory mock = new HTTPMockFactory(
            200,
            'OK',
            'I found it!',
            new Map<String, String>()
        );
        Test.setMock(HttpCalloutMock.class, mock);

        // WHEN
        Test.startTest();
        String result = ExternalSearch.googleIt('epic search');
        Test.stopTest();

        // THEN
        Assert.areEqual('I found it!', result, 'Expected to receive mock response');
    }

    @IsTest
    static void testNegativeMocking() {
        // GIVEN: Mock with a 500 response
        HTTPMockFactory mock = new HTTPMockFactory(
            500,
            'Internal Server Error',
            'Something went wrong',
            new Map<String, String>()
        );
        Test.setMock(HttpCalloutMock.class, mock);

        // WHEN
        try {
            Test.startTest();
            ExternalSearch.googleIt('epic search');
            Test.stopTest();
            Assert.fail('Expected an exception to be thrown for a 500 response');
        } catch (ExternalSearch.ExternalSearchException e) {
            // THEN: Verify exception message contains status code
            Assert.isTrue(
                e.getMessage().contains('500'),
                'Expected exception message to include "500", but got: ' + e.getMessage()
            );
        }
    }
}
