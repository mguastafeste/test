SELECT Id,Name,litify_pm__Matter__c FROM litify_pm__Matter_Stage_Activity__c 
WHERE litify_pm__Matter__r.Global_Litify_Id__c > '323670'
AND litify_pm__Set_As_Active_At__c = null
AND (
           Name IN ('Pre-Litigation', 'Opening') 
           OR (Name = 'Funds in Trust' AND litify_pm__Original_Matter_Stage__c = 'a0I1I000002ruvIUAQ')
         )
         
         
/* 

This query pulls any stages that have not been activated that contain a lot of tasks. Basically anything in opening.
We can remove line 6 if Funds in Trust can be done via a task set.

*/
