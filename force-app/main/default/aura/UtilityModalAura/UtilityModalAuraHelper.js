({
    checkExistingOpportunities: function(component) {
        var action = component.get("c.hasClosedWonOpportunities");
        action.setCallback(this, function(response) {
            if (response.getState() === "SUCCESS" && response.getReturnValue() === true) {
                var actionModal = component.get('c.showModal');
                actionModal.setParams({ message: "כבר קיימות הזדמנויות סגורות במערכת!" });
                $A.enqueueAction(actionModal);
            }
        });
        $A.enqueueAction(action);
    },

    subscribeToPushTopic: function(component) {
        const empApi = component.find('empApi');
        const channel = component.get('v.channel');
        const replayId = -1;

        empApi.subscribe(channel, replayId, $A.getCallback(function(eventReceived) {
            console.log('Event Received: ', JSON.stringify(eventReceived));
            const opportunityName = eventReceived.data.sobject.Name;

            var action = component.get('c.showModal');
            action.setParams({ message: "הזדמנות חדשה '" + opportunityName + "' נסגרה ב-Closed Won!" });
            $A.enqueueAction(action);
        })).then(function(subscription) {
            console.log('Subscribed to channel: ' + subscription.channel);
            component.set('v.subscription', subscription);
        });
    }
})
