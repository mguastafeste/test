SELECT Id, Subject, Owner.Name, What.Name 
FROM Task 
WHERE Status='Open' 
AND WhatId IN (SELECT Id FROM litify_pm__Matter__c WHERE litify_pm__Status__c = 'Closed')
