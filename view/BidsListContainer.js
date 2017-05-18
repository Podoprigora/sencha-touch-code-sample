Ext.define('TouchApp.view.BidsListContainer', {
    extend : 'Ext.Carousel',
    xtype : 'BidsListContainer',
    
    config : {
        indicator : false,
        directionLock : true
    },
    
    initialize : function(){

        this.callParent(arguments);
        
        this.buildItems();
    },
    
    buildItems : function() {
        this.add([  
            {
                xtype : 'BidsList',
                cls : 'toolbar-bg-orange',
                toolbarTitle : 'Ожидающие <br/> заявки',
                store : Ext.create('TouchApp.store.BidsStore', {
                    filters : [{property : 'folder', value : 'open'}]
                })
            },
            {
                xtype : 'BidsList',
                cls : 'toolbar-bg-green',
                toolbarTitle : 'Выполненные <br/> заявки',
                store : Ext.create('TouchApp.store.BidsStore', {
                    filters : [{property : 'folder', value : 'close'}]
                })
            },
            {
                xtype : 'BidsList',
                cls : 'toolbar-bg-red',
                toolbarTitle : 'Отклоненные <br/> заявки',
                store : Ext.create('TouchApp.store.BidsStore', {
                    filters : [{property : 'folder', value : 'reject'}]
                })
            }
            
        ]);
    }
});