Ext.define('TouchApp.view.report.ImagesEditingList', {
    extend : 'Ext.Container',
    xtype : 'BidReportImagesEditingList',
    
    config : {
        cls : 'inner-panel',
        layout : 'fit',
        store : null,
        list : null,
        imagesForm : null
    },
    
    initialize : function(){
        this.callParent(arguments);
        
        this.setStore(Ext.create('TouchApp.store.BidReportImagesLocalStore'));

        this.buildTbar();
        this.buildList();
        
        this.getStore().on('addrecords', this.onInitList, this);
        this.getStore().on('removerecords', this.onInitList, this);
    },
    
    buildTbar : function(){
        if (Ext.browser.is.WebView) {
            this.add({
                xtype : 'titlebar',
                docked : 'top',
                ui : 'plain',
                items : [
                    {
                        xtype : 'title',
                        itemId : 'title',
                        title : 'ИЗОБРАЖЕНИЯ'
                    },
                    {
                        iconCls : 'camera_enhance',
                        align : 'right',
                        ui : 'plain',
                        scope : this,
                        handler : function(){
                            this.fireEvent('camerabtntap', this);
                        }
                    },
                    {
                        iconCls : 'image',
                        align : 'right',
                        ui : 'plain',
                        scope : this,
                        handler : function(){
                            this.fireEvent('albumbtntap', this);
                        }
                    }
                ]
            });
        } else {
            this.add({
                xtype : 'titlebar',
                docked : 'top',
                ui : 'plain',
                items : [
                    {
                        xtype : 'title',
                        itemId : 'title',
                        title : 'ИЗОБРАЖЕНИЯ'
                    },
                    {
                        xtype : 'formpanel',
                        itemId : 'uploadImagesForm',
                        align : 'right',
                        width : 100,
                        height : 40,
                        layout : 'hbox',
                        scrollable : {
                            disabled : true
                        },
                        items : [
                            {
                                flex : 1
                            },
                            {
                                xtype : 'filefield',
                                cls : 'filefield-images',
                                name : 'upload_images',
                                accept : 'image/*',
                                multiple : true,
                                listeners : {
                                    scope : this,
                                    change : function(fl){
                                        this.fireEvent('filefieldchange', this);
                                    }
                                }
                            }
                        ]
                    }
                ]
            });
            this.setImagesForm(this.down('#uploadImagesForm'));
        }
    },
    
    buildList : function(){
        var list = this.add({
            xtype : 'dataview',
            cls : 'dataview-horizontal-images',
            store : this.getStore(),
            scrollable : {
                direction : 'horizontal',
                directionLock : true
            },
            inline : {
                wrap : false
            },
            itemTpl : Ext.create('Ext.XTemplate', 
                '<div class="image" style="background-image: url({image:this.getPath});"></div>',
                {
                    getPath : function(filename){
                        return Ext.String.format("{0}?image={1}&w=80&api_key={2}", TouchApp.Settings.getUrl('bids.previewImage'), filename, TouchApp.Settings.getIdentity('api_key'));   
                    }
                }
            ),
            listeners : {
                scope : this,
                itemtap : this.onItemTap
            }
        });
        
        this.setList(list);
    },
    
    onItemTap : function(dataview, index, item, record) {
        Ext.defer(function(){ 
            dataview.deselect(index);
            this.fireEvent('itemtap', dataview, index, record);
        }, 250, this);
    },
    
    onInitList : function(){
        var count = this.getStore().getCount();
        this.down('#title').setTitle('ИЗОБРАЖЕНИЯ ' + ((count) ? "(<b>" + count + "</b>)" : ""));
        
        this.getList().setHeight(((count) ? 135 : 0));
    }
});