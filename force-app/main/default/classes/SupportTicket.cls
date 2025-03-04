public with sharing class SupportTicket {
    public String customerName{ get; set; }
    public String issueDescription{ get; set; }
    public Integer priority{ get; set; }

    public SupportTicket(String customerName, String issueDescription, Integer priority) {
        this.customerName=customerName;
        this.issueDescription=issueDescription;
        Integer priority=priority;
    }

    public String toString(){
        return 'Customer: ' + customerName + ', Issue: ' + issueDescription + ', Priority: ' + priority;;
    }


}