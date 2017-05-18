Ext.define('TouchApp.model.BidTaskModel', {
    extend : 'Ext.data.Model',
    
    config : {
        idProperty : 'task_id',
        fields : [
            {name : 'id', type : 'int'},
            {name : 'task_id', type : 'int'},
            {name : 'name', type : 'string'},
            {name : 'qty', type : 'int'},
            {name : 'countable', type : 'int'},
            {name : 'culc_type', type : 'string'},
            {name : 'price', type : 'float'},
            {name : 'checked', type : 'int', defaultValue : 0}
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