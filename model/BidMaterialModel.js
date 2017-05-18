Ext.define('TouchApp.model.BidMaterialModel', {
    extend : 'Ext.data.Model',
    
    config : {
        idProperty : 'id',
        fields : [
            {name : 'id', type : 'int'},
            {name : 'material_id', type : 'int'},
            {name : 'name', type : 'string'},
            {name : 'qty', type : 'int'}
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