Ext.define("TouchApp.store.MessagesStore", {
    extend: "Ext.data.Store",

    config : {
        model: "TouchApp.model.MessageModel",
        pageSize : 20,
        
        remoteFilter : true,
        remoteSort : true,
        
        proxy: {
            type: 'ajax',
            url : TouchApp.Settings.getUrl('messages.list'),
            
            reader: {
                type: "json"
            }
        },
        autoLoad: false
    }
});