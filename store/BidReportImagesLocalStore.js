Ext.define('TouchApp.store.BidReportImagesLocalStore', {
    extend : 'Ext.data.Store',
    
    config : {
        model : 'TouchApp.model.BidReportImageModel',
        proxy : {
            type : 'memory',
            reader : {
                type : 'json'
            }
        }
    }
});