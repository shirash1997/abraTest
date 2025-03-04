public class Calculator {
    public static Decimal divide(Integer numerator, Integer denominator) {
        if (denominator == 0) {
            throw new CalculatorException('Cannot divide by zero');
        }
        return numerator / (Decimal)denominator;
    }

    public class CalculatorException extends Exception {}
}
