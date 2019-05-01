({

applyFilter: function(component, event, helper) {
        console.log(event.which);
        // on close (esc key), if cursor is in the filter box...
        // it throws an undefined error. $A.util.isUndefinedOrNull(clinics) returns false.
        // so we listen for the escape key, which is keyCode 27 in the containing div
        var isEnterKey = event.keyCode === 13;
        if (isEnterKey) {
            console.log("Filtering clinics...");
            component.set("v.loaded", false);
            var clinics = component.get("v.clinicsRaw");
            var nameValue = component.get("v.nameFilter");
            console.log(nameValue);
            if ($A.util.isUndefinedOrNull(nameValue)) {nameValue = ''}
            var zipValue = component.get("v.zipFilter");
            console.log(zipValue);
            if ($A.util.isUndefinedOrNull(zipValue)) {zipValue = ''}
            var result = clinics;
            result = result.filter(clinic => clinic.Name.toLowerCase().includes(nameValue.toLowerCase()) 
                                   && clinic.Location_Zip__c.toLowerCase().includes(zipValue.toLowerCase()));
            component.set("v.clinicsFiltered", result);
            component.set("v.loaded", true);
        }
    }
    
})
