Ext.define('TouchApp.store.MessageHistoryLocalStore', {
    extend : 'Ext.data.Store',
    
    config : {
        model : 'TouchApp.model.MessageHistoryModel',
        proxy : {
            type : 'memory',
            reader : {
                type : 'json'
            }
        }
    }
});