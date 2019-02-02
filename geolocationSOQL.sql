SELECT Name, Email, MailingAddress, MailingCity, MailingState, MailingCountry, MailingLatitude, MailingLongitude
FROM Contact 
WHERE distance(MailingAddress, geolocation(37.775, -122.418), 'mi') < 50 
ORDER BY distance(MailingAddress, geolocation(37.775, -122.418), 'mi')
LIMIT 20;

--THE 2nd parameter for distance(1,2,3) is the point to measure FROM
