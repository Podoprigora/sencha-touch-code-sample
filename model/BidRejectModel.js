Ext.define('TouchApp.model.BidRejectModel', {
    extend : 'Ext.data.Model',
    
    config : {
        idProperty : 'id',
        
        fields : [
            {name : 'id', type : 'int'},
            {name : 'comment', type : 'string'}
        ],
        
        validations : [
            {field : 'comment', type : 'presence'}
        ],
        
        proxy : {
            type : 'ajax',
            api : {
                update : TouchApp.Settings.getUrl('bids.reject')
            },
            reader : {
                type  :'json'
            },
            writer : {
                type : 'json'
            }
        }
    }
});