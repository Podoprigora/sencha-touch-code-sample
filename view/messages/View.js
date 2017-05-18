Ext.define('TouchApp.view.messages.View', {
    extend : 'Ext.Container',
    xtype : 'MessageView',
    
    config : {
        layout : 'fit',
        routePath : null,
        messageId : null,
        form : null,
        toolbarTitle : null
    },
    
    
    initialize : function(){
        this.callParent(arguments);
        
        this.buildTbar();
        this.buildForm();
        this.buildHistoryList();
    },
    
    buildTbar : function(){
        this.add({
            xtype : 'titlebar',
            docked : 'top',
            ui : 'plain',
            items : [
                {
                    iconCls : 'arrow_back',
                    align : 'left',
                    ui : 'plain',
                    action : 'back'
                },
                {
                    xtype : 'title',
                    itemId : 'tbarTitle',
                    title : 'Сообщение'
                },
                {
                    text : 'ОТВЕТИТЬ',
                    iconCls : 'reply',
                    ui : 'plain',
                    align : 'right',
                    scope : this,
                    handler : function(){
                        this.fireEvent('respondbtntap', this);
                    }
                }
            ]
        });
    },
    
    updateToolbarTitle : function(title){
        var tbarTitle = this.down('#tbarTitle');
        if (tbarTitle) {
            tbarTitle.setTitle(title);
        }
    },
    
    buildForm : function(){
        var form = this.add({
            xtype  :'formpanel',
            layout : 'fit',
            items : [
                {
                    xtype : 'hiddenfield',
                    name : 'id'
                }
            ]
        });
        this.setForm(form);
    },
    
    buildHistoryList : function(){
        this.add({
            xtype : 'MessageHistoryList'
        });
    }
    
});