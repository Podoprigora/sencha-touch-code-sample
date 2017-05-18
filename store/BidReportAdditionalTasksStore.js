Ext.define('TouchApp.store.BidReportAdditionalTasksStore', {
    extend : 'Ext.data.Store',
    
    config : {
        model : 'TouchApp.model.BidTaskModel',
        pageSize : 20,
        
        remoteFilter : true,
        remoteSort : true,
        
        proxy : {
            type : 'ajax',
            url : TouchApp.Settings.getUrl('bids.report.available.tasks'),
            startParam : 'offset',
            reader : {
                type : 'json',
                totalProperty : 'count',
                rootProperty : 'records'
            }
        }
    }
})