public with sharing class LoopingCount {
    public void CountLoop() {
        Integer count = 0;
        do {
            count++;
            System.debug(count);
        } while (count < 10);
    }
}