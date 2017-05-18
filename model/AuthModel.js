Ext.define('TouchApp.model.AuthModel', {
    extend : 'Ext.data.Model',
    
    config : {
        idProperty : 'id',
        fields : [
            {name : 'id', type : 'int', defaultValue : 0},
            {name : 'login', type : 'string'},
            {name : 'password', type : 'string'}
        ],
        
        validations : [
            {type : 'presence', field : 'login'},
            {type : 'presence', field : 'password'}
        ],
        
        proxy : {
            type : 'ajax',
            api : {
                create : TouchApp.Settings.getUrl('auth.login'),
                update : TouchApp.Settings.getUrl('auth.login')
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