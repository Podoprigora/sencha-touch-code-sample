Ext.define('TouchApp.store.BidMaterialsLocalStore', {
    extend : 'Ext.data.Store',
    
    config : {
        model : 'TouchApp.model.BidMaterialModel',
        type : 'memory',
        reader : {
            type : 'json'
        }
    }
});