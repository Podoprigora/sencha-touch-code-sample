Ext.define('TouchApp.store.BidTasksLocalStore', {
    extend : 'Ext.data.Store',
    
    config : {
        model : 'TouchApp.model.BidTaskModel',
        proxy : {
            type : 'memory',
            reader : {
                type : 'json'
            }
        }
    }
});