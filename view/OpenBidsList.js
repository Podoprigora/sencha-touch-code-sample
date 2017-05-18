Ext.define('TouchApp.view.OpenBidsList', {
    extend : 'TouchApp.view.BidsList',
    xtype : 'OpenBidsList',
    
    config : {
        toolbarTitle : 'Ожидающие <br/> заявки',
        routePath : 'bids/type/open'
    },
    
    constructor : function() {
        this.callParent(arguments);
        
        var store = Ext.create('TouchApp.store.BidsStore', {
            filters : [{property : 'folder', value : 'open'}]
        });
        
        this.setStore(store);
    }
})