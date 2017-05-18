Ext.define('TouchApp.view.PreloaderView', {
    extend : 'Ext.Panel',
    xtype : 'PreloaderView',
    
    isPreloader : true,
    
    config : {
        layout : 'fit',
        toolbarTitle : null
    },
    
    initialize : function() {
        
        this.callParent(arguments);
        
        this.buildTbar();
        this.buildBodyPreloader();
        
        this.on('show', this.onShow, this);
        this.on('hide', this.onHide, this);
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
                    scope : this,
                    handler : this.onBackButtonTap
                },
                {
                    xtype : 'title',
                    itemId : 'toolbarTitle',
                    title : ''
                }
            ]
        });
    },
    
    updateToolbarTitle : function(title) {
        this.down('#toolbarTitle').setTitle(title);
    },
    
    buildBodyPreloader : function() {
        var panel = this.add({
            xtype : 'panel'
        });
    },
    
    onShow : function() {        
        Ext.defer(function(){
            this.down('panel').setMasked({
                xtype : 'loadmask'
            });
        }, 100, this);
    },
    
    onHide : function() {
        this.down('panel').setMasked(false);   
    },
    
    onBackButtonTap : function() {
        this.down('panel').setMasked(false);
        this.fireEvent('backbtntap', this);
    }
});