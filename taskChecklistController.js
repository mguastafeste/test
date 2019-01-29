({
    doInit: function(component, event, helper) {
        console.log("Running init (1/22 commit)...");
        // find buttons to disable for save changes on due date
        var button1 = component.find("saveButton");
        var button2 = component.find("cancelButton");
        // set buttons to active
        button1.set("v.disabled",true);
        button2.set("v.disabled",true);
        // reset the task lists
        component.set("v.allTasks",null);
        component.set("v.today",$A.localizationService.formatDate(new Date(), "YYYY-MM-DD"));
        // get the tasks by running the helpers
        helper.doInit1(component);
    },
    
    saveDateChanges: function(component, event, helper) {
        // find buttons to disable for save changes on due date
        var button1 = component.find("saveButton");
        var button2 = component.find("cancelButton");
        // set buttons to active
        button1.set("v.disabled",true);
        button2.set("v.disabled",true);
        // activate spinner
        $A.util.removeClass(component.find("saveSpinner"), "slds-hide");
        // run the apex method to save changes
        helper.saveDateChangesHelper(component);
    },
    
    handleDueDateChange: function(component, event, helper) {
        var eventMessage = event.getParam("changedTaskId");
        var changed = eventMessage.Id;
        console.log("changed: " + changed);
        console.log("eventMessage: " + eventMessage.Id);
        var taskArray = component.get("v.changedTasks");
        var ids = taskArray.map(function (item) {
            return item.Id;
        });
        console.log("ids: " + ids);
        var index = ids.indexOf(changed);
        console.log("index: " + index);
        if (index !== -1) {
            taskArray.splice(index, 1, eventMessage);
        } else {
            taskArray.push(eventMessage);
        };
        component.set("v.changedTasks", taskArray);
        var newIds = taskArray.map(function (item) {
            return item.Id;
        });
        console.log("new taskArray: "+ newIds);
        // find buttons to enable for save changes on due date
        var button1 = component.find("saveButton");
        var button2 = component.find("cancelButton");
        // set buttons to active
        button1.set("v.disabled",false);
        button2.set("v.disabled",false);
    },
    
    sortByName: function(component, event, helper) {
        var currentOrder = component.get("v.sort");
        var currentList = component.get("v.allTasks");
        currentOrder = !currentOrder;
        currentList.sort(function(a,b) {
            var t1 = a.Subject == b.Subject, t2 = a.Subject < b.Subject;
            return t1? 0: (currentOrder?-1:1)*(t2?1:-1);
        });
        component.set("v.sort", currentOrder);
        component.set("v.allTasks", currentList);
    },
    
    sortByCode: function(component, event, helper) {
        var currentOrder = component.get("v.sort");
        var currentList = component.get("v.allTasks");
        currentOrder = !currentOrder;
        currentList.sort(function(a,b) {
            var t1 = a.litify_pm__DefaultMatterTaskType__c == b.litify_pm__DefaultMatterTaskType__c, t2 = a.litify_pm__DefaultMatterTaskType__c < b.litify_pm__DefaultMatterTaskType__c;
            return t1? 0: (currentOrder?-1:1)*(t2?1:-1);
        });
        component.set("v.sort", currentOrder);
        component.set("v.allTasks", currentList);
    },
    
    sortByStatus: function(component, event, helper) {
        var currentOrder = component.get("v.sort");
        var currentList = component.get("v.allTasks");
        currentOrder = !currentOrder;
        currentList.sort(function(a,b) {
            var t1 = a.Status_Sort__c == b.Status_Sort__c, t2 = a.Status_Sort__c < b.Status_Sort__c;
            return t1? 0: (currentOrder?-1:1)*(t2?1:-1);
        });
        component.set("v.sort", currentOrder);
        component.set("v.allTasks", currentList);
    },
    
    sortByStaff: function(component, event, helper) {
        var currentOrder = component.get("v.sort");
        var currentList = component.get("v.allTasks");
        currentOrder = !currentOrder;
        currentList.sort(function(a,b) {
            var t1 = a.Owner.Name == b.Owner.Name, t2 = a.Owner.Name < b.Owner.Name;
            return t1? 0: (currentOrder?-1:1)*(t2?1:-1);
        });
        component.set("v.sort", currentOrder);
        component.set("v.allTasks", currentList);
    },
    
    sortByDueDate: function(component, event, helper) {
        var currentOrder = component.get("v.sort");
        var currentList = component.get("v.allTasks");
        currentOrder = !currentOrder;
        currentList.sort(function(a,b) {
            var t1 = a.ActivityDate == b.ActivityDate, t2 = a.ActivityDate < b.ActivityDate;
            return t1? 0: (currentOrder?-1:1)*(t2?1:-1);
        });
        component.set("v.sort", currentOrder);
        component.set("v.allTasks", currentList);
    },
    
    sortByTheme: function(component, event, helper) {
        var currentOrder = component.get("v.sort");
        var currentList = component.get("v.allTasks");
        currentOrder = !currentOrder;
        currentList.sort(function(a,b) {
            var t1 = a.litify_pm__Default_Matter_Task__r.Background_Theme__c > b.litify_pm__Default_Matter_Task__r.Background_Theme__c, t2 = a.litify_pm__Default_Matter_Task__r.Background_Theme__c < b.litify_pm__Default_Matter_Task__r.Background_Theme__c;
            return t1? 0: (currentOrder?-1:1)*(t2?1:-1);
        });
        component.set("v.sort", currentOrder);
        component.set("v.allTasks", currentList);
    },
    
    showFilters: function(component, event, helper) {
        $A.util.toggleClass(component.find("filters"), "slds-hide");
    },
    
    applyFilters: function(component, event, helper) {
        var tasks = component.get("v.rawTasks");
        var staffValue = component.get("v.ownerFilter");
        console.log("staff: "+staffValue+" ("+staffValue.length+")");
        var colorValue = component.get("v.colorFilter");
        console.log("color: "+colorValue+" ("+colorValue.length+")");
        var result = tasks;
        if(staffValue !== "") {
            result = result.filter(task => task.OwnerId == staffValue);
        }
        if(colorValue !== "") {
            result = result.filter(task => task.litify_pm__Default_Matter_Task__r.Background_Theme__c == colorValue);
        }
        component.set("v.allTasks", result);
    },
    
    clearFilters: function(component, event, helper) { 
        component.set("v.ownerFilter","");
        component.set("v.colorFilter","");
        var originalTasks = component.get("v.rawTasks");
        component.set("v.allTasks", originalTasks);
    },
    
    newTask: function(component, event, helper) {
        // must list all tasks from matter plan, regardless of stage (even if already complete)
        // same as needles, searchable by code
        var modalBody;
        var currentMatter = component.get("v.recordId");
        $A.createComponent("c:taskChecklistAddTask", {"matterId": currentMatter},
                           function(content, status, errorMessage) {
                               // modalBody.set("v.matterId", currentMatter);
                               if (status === "SUCCESS") {
                                   modalBody = content;
                                   component.find('overlayLib').showCustomModal({
                                       header: "Add a Task",
                                       body: modalBody, 
                                       showCloseButton: true,
                                       cssClass: "slds-modal_large",
                                       closeCallback: function() {
                                           // code here if you need a callback on close
                                       }
                                   })
                               } else {
                                   console.log("Error: " + errorMessage);
                               }                              
                           });
    },
    
    addTaskSet: function(component, event, helper) {
        // must list all task sets (i.e. stages under the RL Task Sets matter plan)
        // Matter_Stage.litify_pm__Task_Set__c = true
        // same as needles, searchable by name of task set
        var modalBody;
        var matter = component.get("v.recordId");
        $A.createComponent("c:taskChecklistAddTaskSet", {"matterId": matter},
                           function(content, status) {
                               if (status === "SUCCESS") {
                                   modalBody = content;
                                   // modalBody.set("v.matterId", matter); // adding matterId here loads AFTER success (so after load)
                                   // can't do anything with matterId on init if you do it this way
                                   component.find('overlayLib').showCustomModal({
                                       header: "Add a Task Set",
                                       body: modalBody, 
                                       showCloseButton: true,
                                       cssClass: "slds-modal_large",
                                       closeCallback: function() {
                                           // tried this to refresh the data... didnt work.
                                           // console.log("Modal closed, refreshing data...")
                                           // this.doInit(component, event, helper);
                                       }
                                   })
                               } else {
                                   console.log("Error: " + errorMessage);
                               }                              
                           });
    },
    
    handleCloseModal: function(component, event) {
        console.log("Heard! Closing the modal...");
        component.find('overlayLib').notifyClose();
    }
    
})
