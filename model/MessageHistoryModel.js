Ext.define('TouchApp.model.MessageHistoryModel',{
    extend : 'TouchApp.model.MessageModel',
    
    config : {
        
        fields : [
            {name : 'history', type : 'auto'}
        ],
        
        proxy : {
            type : 'ajax',
            api : {
                read : TouchApp.Settings.getUrl('messages.read')
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