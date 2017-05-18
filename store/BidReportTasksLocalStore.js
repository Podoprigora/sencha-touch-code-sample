Ext.define('TouchApp.store.BidReportTasksLocalStore', {
    extend : 'Ext.data.Store',
    
    config : {
        model : 'TouchApp.model.BidReportTaskModel',
        proxy : {
            type : 'memory',
            reader : {
                type : 'json'
            }
        }
    }
})