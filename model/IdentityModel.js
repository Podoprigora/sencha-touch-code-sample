Ext.define('TouchApp.model.IdentityModel', {
    extend : 'Ext.data.Model',
    
    config : {
        identifier : 'uuid',
        fields : [
            {name : 'user_id', type : 'int'},
            {name : 'first_name', type : 'string'},
            {name : 'last_name', type : 'string'},
            {name : 'patronymic', type : 'string'},
            {name : 'api_key', type : 'string'},
            {name : 'geo', type : 'string'}
        ],
        proxy : {
            type : 'localstorage',
            id : 'identitystorage'
        }
    }
});