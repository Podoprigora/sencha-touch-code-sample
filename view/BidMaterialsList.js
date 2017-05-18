Ext.define('TouchApp.view.BidMaterialsList', {
    extend : 'Ext.Container',
    xtype : 'BidMaterialsList',
    
    config : {
        layout : 'fit',
        cls : 'inner-panel',
        autoHeight : true,
        store : []
    },
    
    initialize : function(){
        
        this.callParent(arguments);
        
        this.setStore(Ext.create('TouchApp.store.BidMaterialsLocalStore'));

        this.buildTbar();
        this.buildList();
    },
    
    buildTbar : function(){
        this.add({
            xtype  : 'titlebar',
            docked : 'top',
            ui : 'plain',
            items : [
                {
                    xtype : 'title',
                    title : 'МАТЕРИАЛЫ',
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
            scrollable : {
                disabled : true
            },
            variableHeights : false,
            itemTpl : Ext.create('Ext.XTemplate', 
                '<div class="template-list-row">',
                    '<div class="field">{name}</div>',
                    '<div class="field"><span class="label">Кол-во:</span> {qty}</div>',
                '</div>'
            )
        });
    },
    
    setData : function(data){
        //this.down('#title').setTitle("МАТЕРИАЛЫ " + ((data.length) ? " (<b>" + data.length + "</b>)" : ""));
        this.down('list').setData(data);
    }
    
});