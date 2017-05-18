Ext.define('TouchApp.store.IdentityLocalStore', {
    extend : 'Ext.data.Store', 
    
    config : {
        model : 'TouchApp.model.IdentityModel',
        storeId : 'IdentityLocalStore'
    }
})