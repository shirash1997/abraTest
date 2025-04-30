({
    doInit: function(component, event, helper) {
        helper.checkExistingOpportunities(component); // קודם לבדוק קיים
        helper.subscribeToPushTopic(component);       // במקביל להתחבר ללייב
    },

    showModal: function(component, event, helper, message) {
        component.find('overlayLib').showCustomModal({
            header: "התראה על הזדמנויות",
            body: message,
            showCloseButton: true,
            cssClass: "custom-modal-class"
        });
    }
})
