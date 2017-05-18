Ext.define('TouchApp.model.BidReportTaskModel', {
    extend : 'Ext.data.Model',
    
    config : {
        idProperty : 'id',
        fields : [
            {name : 'id', type : 'int'},
            {name : 'task_id', type : 'int'},
            {name : 'name', type : 'string'},
            {name : 'qty', type : 'int', defaultValue : 1},
            {name : 'countable', type : 'int'},
            {name : 'culc_type', type : 'string'},
            {name : 'price', type : 'float', defaultValue : 0},
            {name : 'minutes', type : 'int', defaultValue : 0},
            {name : 'completed', type : 'boolean'}
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
});