@IsTest
public class CalculatorTests {
    @IsTest
    static void testDivideByZero() {
        // GIVEN
        Integer numerator = 10;
        Integer denominator = 0; // Division by zero

        // WHEN
        try {
            Test.startTest();
            Calculator.divide(numerator, denominator); // Static method call
            Test.stopTest();
            Assert.fail('An exception should have been thrown for division by zero');
        } catch (Calculator.CalculatorException e) {
            // THEN
            Assert.isTrue(
                e.getMessage().equalsIgnoreCase('Cannot divide by zero'),
                'Unexpected exception message: ' + e.getMessage()
            );
        }
    }
}
