Ext.define("TouchApp.store.BidsStore", {
    extend: "Ext.data.Store",

    config : {
        model: "TouchApp.model.BidModel",
        pageSize : 20,
        
        remoteFilter : true,
        remoteSort : true,
        
        proxy: {
            type: 'ajax',
            url : TouchApp.Settings.getUrl('bids.list'),
            
            reader: {
                type: "json"
            }
        },
        autoLoad: false
    }
});