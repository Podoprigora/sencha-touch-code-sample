Ext.define('TouchApp.store.PendingCountersStore', {
    extend : 'Ext.data.Store',
    
    config : {
        model : 'TouchApp.model.PendingCounterModel',
        autoLoad : false,
        proxy : {
            type : 'ajax',
            url : TouchApp.Settings.getUrl('pendingCounters'),
            reader : {
                type : 'json',
                rootProperty : 'records'
            }
        }
    }
});