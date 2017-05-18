Ext.define('TouchApp.model.BidReportModel', {
    extend : 'Ext.data.Model',
    
    config : {
        idProperty : 'id',
    
        fields : [
            {name : 'id', type : 'int'},
            {name : 'status', type : 'int'},
            {name : 'completed_date', type : 'date', dateFormat : 'Y-m-d'},
            {name : 'comment', type : 'string'},
            {name : 'geo', type : 'string'},
            {name : 'tasks', type : 'auto'},
            {name : 'images', type : 'auto'}
        ],
        
        hasMany : [
            {
                model : 'TouchApp.model.BidReportTaskModel',
                name : 'getTasks',
                associationKey : 'tasks'
            }
        ],
        
        proxy : {
            type : 'ajax',
            api : {
                read : TouchApp.Settings.getUrl('bids.report.read'),
                create : TouchApp.Settings.getUrl('bids.report.save'),
                update : TouchApp.Settings.getUrl('bids.report.save')
            },
            reader : {
                type : 'json'
            },
            writer : {
                type : 'json'
            }
        }
    }
    
});