SELECT Name, Phone, MailingAddress, MailingCity, MailingState, MailingCountry, MailingLatitude, MailingLongitude
FROM Account 
WHERE distance(MailingAddress, geolocation(37.775, -122.418), 'mi') < 50 AND Type = 'Clinic'
ORDER BY distance(MailingAddress, geolocation(37.775, -122.418), 'mi')
LIMIT 20;

--The 1st parameter for distance(1,2,3) will be the clinics' location field.
--The 2nd parameter for distance(1,2,3) is the point to measure FROM, ie zip code's location field.
--Schedule DLRS to fill # of cases for current month for each source overnight.
--When someone chooses a clinic, add +1 to the source's case count (to keep total accurate throughout day without dlrs).
--...How do we get this number on the account/clinic record?
--If rejected, log rejected reason & add to SOURCE.
--Need both the zipcode and the clinic to contain geolocation info to measure distance.
--Auto-add geolocation to existing accounts (does not support person accounts or custom address fields)
--...using CLEAN RULES in setup (possibly only available in classic).
