Ext.define('TouchApp.view.BidTasksList', {
    extend : 'Ext.Container',
    xtype : 'BidTasksList',
    
    config : {
        layout : 'fit',
        cls : 'inner-panel',
        store : []
    },
    
    initialize : function(){

        this.setStore(Ext.create('TouchApp.store.BidTasksLocalStore'));

        this.buildTbar();
        this.buildList();
        
        this.callParent(arguments);
    },
    
    buildTbar : function(){
        this.add({
            xtype  : 'titlebar',
            docked : 'top',
            ui : 'plain',
            items : [
                {
                    xtype : 'title',
                    title : 'ЗАДАЧИ',
                    itemId : 'title'
                }
            ]
        });
    },
    
    buildList : function(){
        this.add({
            xtype : 'list',
            store : this.getStore(),
            disableSelection : true,
            scrollable: {
                disabled : true
            },
            itemTpl : Ext.create('Ext.XTemplate', 
                '<div class="template-list-row">',
                    '<div class="field">{name}</div>',
                    '<div class="field"><span class="label">Кол-во:</span> {qty}</div>',
                '</div>'
            )
        });
    },
    
    setData : function(data){
        //this.down('#title').setTitle("ЗАДАЧИ " + ((data.length) ? " (<b>" + data.length + "</b>)" : ""));
        this.down('list').setData(data);
    }
});