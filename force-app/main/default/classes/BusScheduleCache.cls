public class BusScheduleCache {
    // Private variable for the Cache.OrgPartition
    private Cache.OrgPartition part;

    // Constructor: Initialize the partition variable
    public BusScheduleCache() {
        // Use Cache.Org.getPartition to initialize the partition
        part = Cache.Org.getPartition('local.BusSchedule');
    }

    // Method to store the bus schedule in the org cache
    public void putSchedule(String busLine, Time[] schedule) {
        // Store the schedule in the cache for the given busLine
        part.put(busLine, schedule);
    }

    // Method to retrieve the bus schedule from the org cache
    public Time[] getSchedule(String busLine) {
        // Attempt to retrieve the schedule from the cache
        Time[] schedule = (Time[]) part.get(busLine);

        // Handle cache miss
        if (schedule == null) {
            // Return default schedule if no value is found in the cache
            schedule = new Time[] {
                Time.newInstance(8, 0, 0, 0), // 8:00 AM
                Time.newInstance(17, 0, 0, 0) // 5:00 PM
            };
        }

        return schedule;
    }
}
