Ext.define('TouchApp.view.report.SelectAdditionalTasksPanel', {
    extend : 'Ext.Panel',
    xtype : 'BidReportSelectAdditionalTasksPanel',
    
    config : {
        layout : 'fit',
        list : null,
        bidId : null
    },
    
    initialize : function() {
        this.callParent(arguments);
        
        this.buildTbar();
        
        Ext.defer(function(){
            this.buildSearchBar();
            this.buildFbar();
            this.buildList();
            
            this.on('show', this.onShow, this, {delay : 300});
            this.on('hide', this.onHide, this);
        }, 300, this); 
    },
    
    buildTbar : function(){
        this.add([
            {
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
                        title : 'Выберите задачи'
                    },
                    {
                        iconCls : 'search',
                        ui : 'plain',
                        align : 'right',
                        scope : this,
                        handler : this.onToggleSearchTbar
                    }
                ]
            }
        ]);
    },
    
    buildSearchBar : function(){
        this.add({
            xtype : 'toolbar',
            docked : 'top',
            ui : 'search',
            itemId : 'searchTbar',
            hidden : true,
            
            showAnimation: {
                preserveEndState: true,
                duration: 50,
                from: {
                    'opacity': 0
                },
                to : {
                    'opacity': 1
                }
            },
            
            items : [
                {
                    xtype : 'searchfield',
                    placeHolder : 'Поиск',
                    autoCapitalize: false,
                    flex : 1,
                    listeners : {
                        scope : this,
                        change : this.onSearch
                    }
                }
            ]
        });
    },
    
    buildFbar : function(){
        this.add({
            xtype : 'toolbar',
            itemId : 'fbar',
            docked : 'bottom',
            ui : 'plain',
            layout : 'hbox',
            height : 40,
            defaults : {
                flex : 1
            },
            items : [
                {
                    xtype : 'button',
                    ui : 'light',
                    text : 'ОТМЕНА',
                    action : 'back'
                },
                {
                    xtype : 'button',
                    itemId : 'btnAccept',
                    text : 'ПРИМЕНИТЬ',
                    ui : 'action',
                    disabled : true,
                    scope : this,
                    handler : function(){
                        this.fireEvent('acceptbtntap', this);  
                    }
                }
            ]
        });
    },
    
    buildList : function(){
        
        var list = this.add({
            xtype : 'dataview',
            store : Ext.create('TouchApp.store.BidReportAdditionalTasksStore'),
            cls : 'x-dataview-list',
            useComponents : true,
            defaultType : 'checkboxListItem',
            mode : 'MULTI',
            masked : {
                xtype : 'loadmask'
            },
            loadingText : ' ',
            listeners : {
                scope : this,
                itemtap : this.onItemTap,
                selectionchange : this.onSelectionChange
            },
            plugins : [
                {
                    xtype : 'dataviewpaging',
                    autoPaging : true
                }
            ]
        });
        
        this.setList(list);
        this.doFilterByBidId();
    },
    
    onItemTap : function(dataview, index, item, record, e) {
        var checkboxField = item.query('checkboxfield')[0];

        if (e.getTarget('.x-field-checkbox')) {
            if (checkboxField.getChecked()) {
                dataview.deselect(record);
            }
        } else {
            checkboxField.getChecked() ? checkboxField.uncheck() : checkboxField.check();   
        }
    },
    
    onSelectionChange : function(dataview, records) {
        this.down('#btnAccept').setDisabled(dataview.getSelectionCount() == 0);
    },
    
    onSearch : function(field, value) {
        this.getList().getStore().filter("query", {"$like" : value});
        this.getList().getStore().loadPage(1);
    },
    
    doFilterByBidId : function(){        
        this.getList().getStore().filter("id", this.getBidId());
        this.getList().getStore().loadPage(1);
    },
    
    onToggleSearchTbar : function() {
        var searchTbar = this.down('#searchTbar'),
            saerchField = searchTbar.down('searchfield');
            
        if (searchTbar.getHidden()) {
            searchTbar.show();
            Ext.defer(function(){
                saerchField.focus();   
            }, 250);
            
        } else {
            saerchField.reset();
            searchTbar.hide();
        }
    },
    
    onShow : function() {
        this.doFilterByBidId();
    }, 
    
    onHide : function() {
        this.destroy();
    }
    
});