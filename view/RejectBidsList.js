Ext.define('TouchApp.view.RejectBidsList', {
    extend : 'TouchApp.view.BidsList',
    xtype : 'RejectBidsList',
    
    config : {
        toolbarTitle : 'Отклоненные <br/> заявки',
        routePath : 'bids/type/reject'
    },
    
    constructor : function() {
        this.callParent(arguments);
        
        var store = Ext.create('TouchApp.store.BidsStore', {
            filters : [{property : 'folder', value : 'reject'}]
        });
        
        this.setStore(store);
    }
})