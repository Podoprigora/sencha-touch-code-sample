Ext.define('TouchApp.view.report.ImagesPreviewPanel', {
    extend : 'Ext.Carousel',
    xtype  :'BidReportImagesPreviewPanel',
    
    config : {
        cls : 'images-viewer',
        directionLock : true,
        
        loadedRecords : null
    },
    
    initialize : function() {
        this.callParent(arguments);
        
        this.buildTbar();
        
        this.on('activeitemchange', this.onActiveItemChange, this, {delay : 1000});
        this.on('resize', this.onResize, this, {delay : 1500});
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
                    title : 'Изображения'
                },
                {
                    text : 'УДАЛИТЬ',
                    iconCls : 'delete',
                    ui : 'plain',
                    align : 'right',
                    scope : this,
                    handler : function(){
                        this.fireEvent('deletebtntap', this);  
                    }
                }
            ]
        });
    },
    
    buildItems : function(records, activeIndex) {
        var records = records || [],
            activeIndex = activeIndex || 0;
        
        if (records.length) {
            if (Ext.encode(TouchApp.ux.util.Format.recordsToArray(records)) != Ext.encode(TouchApp.ux.util.Format.recordsToArray(this.getLoadedRecords()))) {
            
                this.removeAll();
                
                for (var i in records) {
                    this.add({
                        xtype: 'imageviewer',
                        style: {
                            backgroundColor: '#E0E0E0'
                        },
                        imageSrc: Ext.String.format("{0}?image={1}&w=800&api_key={2}", TouchApp.Settings.getUrl('bids.previewImage'), records[i].get('image'), TouchApp.Settings.getIdentity('api_key'))
                    });
                }
                
                this.setLoadedRecords(records);
            }

            this.setActiveItem(parseInt(activeIndex));
        }
        
    },
    
    onActiveItemChange : function(container, value, oldValue, eOpts) {        
        if (oldValue) {
            oldValue.resetZoom();
            this.getActiveItem().resize();
        }
    },
    
    onResize : function(component, eOpts) {
        var activeItem= this.getActiveItem();
        if (activeItem) {
            activeItem.resize();   
        }
    },
    
    onDragStart: function(e) {
        var scroller = this.getActiveItem().getScrollable().getScroller();
        if (e.targetTouches.length === 1 && (e.deltaX < 0 && scroller.getMaxPosition().x === scroller.position.x) || (e.deltaX > 0 && scroller.position.x === 0)) {
            this.callParent(arguments);
        }
    },
    onDrag: function(e) {
        if (e.targetTouches.length == 1)
            this.callParent(arguments);
    },
    onDragEnd: function(e) {
        if (e.targetTouches.length < 2)
            this.callParent(arguments);
    }
})