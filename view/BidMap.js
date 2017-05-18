Ext.define('TouchApp.view.BidMap', {
    extend : 'Ext.Panel',
    xtype : 'BidMap',
    
    config : {
        layout : 'vbox',
        ymapUrl : null
    },
    
    initialize : function(){
        this.callParent(arguments);
        
        this.buildTbar();
        this.buildMap();
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
                    title : 'Местоположение <br /> торговой точки'
                }
            ]
        });
    },
    
    buildMap : function(){
        this.add({
            xtype : 'panel',
            itemId : 'Ymap',
            cls : 'iframe-panel',
            flex : 1,
            data : null,
            tpl : '<iframe src="{url}"></iframe>'
        });
    },
    
    updateYmapUrl : function(url){
        var ymap = this.down('#Ymap');
        
        ymap.setMasked({
            xtype : 'loadmask',
            message : 'Загрузка карты ...'
        });
        
        ymap.setData({url : url});
        
        Ext.defer(function(){
            ymap.setMasked(false);   
        }, 5000);
    }
});