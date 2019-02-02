SELECT Id, MondayEndTime, MondayStartTime, 
TuesdayEndTime, TuesdayStartTime, 
WednesdayEndTime, WednesdayStartTime, 
ThursdayEndTime, ThursdayStartTime, 
FridayEndTime, FridayStartTime, 
SaturdayEndTime, SaturdayStartTime, 
SundayEndTime, SundayStartTime 
FROM BusinessHours 
WHERE IsDefault=true
