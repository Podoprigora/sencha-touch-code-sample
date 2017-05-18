Ext.define('TouchApp.view.messages.HistoryList', {
    extend : 'Ext.dataview.List',
    xtype : 'MessageHistoryList',
    
    config : {
        disableSelection : true,
        variableHeights : false,
        cls : 'list-cards'
    },
    
    initialize : function(){
        
        this.setStore(Ext.create('TouchApp.store.MessageHistoryLocalStore'));
        this.setItemTpl(this.buildTtemTpl());
        
        this.callParent(arguments);
    },
    
    buildTtemTpl : function(){
        return Ext.create('Ext.XTemplate', 
            '<div class="template-list-row">',
                '<div class="field field-type-user">{sender}</div>',
                '<div class="field field-type-date">{created:this.getDate}</div>',
                '<div class="field field-type-message">{message}</div>',
            '</div>',
            {
                getDate : function(date){
                    return Ext.util.Format.date(date, 'H:i d.m.Y')
                }
            }
        );
    }
});