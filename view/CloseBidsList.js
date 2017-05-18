Ext.define('TouchApp.view.CloseBidsList', {
    extend : 'TouchApp.view.BidsList',
    xtype : 'CloseBidsList',
    
    config : {
        toolbarTitle : 'Выполненные <br/> заявки',
        routePath : 'bids/type/close'
    },
    
    constructor : function() {
        this.callParent(arguments);
        
        var store = Ext.create('TouchApp.store.BidsStore', {
            filters : [{property : 'folder', value : 'close'}]
        });
        
        this.setStore(store);
    }
})