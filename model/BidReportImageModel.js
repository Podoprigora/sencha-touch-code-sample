Ext.define('TouchApp.model.BidReportImageModel', {
    extend : 'Ext.data.Model',
    
    config : {
        idProperty : 'id',
        fields : [
            {name : 'id', type : 'int'},
            {name : 'image', type : 'string'},
            {name : 'created', type : 'date', dateFormat : 'Y-m-d H:i:s'}
        ],
        
        proxy : {
            type : 'memory',
            reader : {
                type : 'json'
            },
            writer : {
                type : 'json'
            }
        }
    }
})