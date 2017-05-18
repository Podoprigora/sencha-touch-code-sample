Ext.define('TouchApp.model.PendingCounterModel', {
    extend : 'Ext.data.Model',
    
    config : {
        idProperty : 'name',
        fields : [
            {name : 'name', type : 'string'},
            {name : 'value', type : 'int'}
        ],
        
        proxy : {
            type : 'memory',
            reader : {
                type : 'json'
            }
        }
    }
});