Ext.define('TouchApp.view.BidsList', {
    extend : 'Ext.Container',
    xtype : 'BidsList',
    
    config : {
        layout : 'fit',
        toolbarTitle : '',
        store : null,
        list : null,
        sortPanel : null,
        reloadRequest : false
    },
    
    initialize : function() {
        this.callParent(arguments);
        
        this.buildTbar();

        Ext.defer(function(){
            this.buildSortPanel();
            this.buildSearchBar();
            this.buildList();
            
            this.relayEvents(this.getList(), ['itemtap']);
        
            this.getStore().on('load', this.onStoreLoad, this);
            
            this.on('show', this.onShow, this);
            
            this.getList().reload();
            
        }, 300, this);
    },
    
    buildTbar : function () {
        this.add([{
            xtype : 'titlebar',
            docked : 'top',
            ui : 'plain',
            items : [
                {
                    iconCls : 'menu',
                    ui : 'plain',
                    align : 'left',
                    action : 'showmainmenu'
                },
                {
                    xtype : 'title',
                    title : this.getToolbarTitle()
                },
                {
                    iconCls : 'sort_by_alpha',
                    ui : 'plain',
                    align : 'right',
                    scope : this,
                    handler : this.onShowSortOptions
                },
                {
                    iconCls : 'search',
                    ui : 'plain',
                    align : 'right',
                    scope : this,
                    handler : this.onToggleSearchTbar
                }
            ]
        }]);
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
                    autoCapitalize: false,
                    placeHolder : 'Поиск',
                    flex : 1,
                    listeners : {
                        scope : this,
                        change : this.onSearch
                    }
                }
            ]
        });
    },
    
    buildList : function(){
        
        this.add([
            {
                xtype : 'panel',
                itemId : 'totalsFbar',
                docked : 'bottom',
                cls : 'list-total-bar',
                tpl : 'Всего: <b>{count}</b>'
            },
            {
                xtype : 'list',
                store : this.getStore(),
                infinite : true,
                variableHeights : true,
                scrollToTopOnRefresh : false,
                disableSelection : false,
                pressedDelay : 10,
                loadingText : ' ',
                emptyText : 'Нет записей',
                
                plugins : [
                    {
                        xclass : 'Ext.plugin.ListPaging',
                        autoPaging : true
                    },
                    {
                        xclass: 'TouchApp.ux.PullRefreshFn',
                        refreshFn : function() {
                            this.getList().getStore().loadPage(1);
                        }
                    }
                ],
                
                itemTpl : Ext.create('Ext.XTemplate',            
                    '<div class="template-list-row">',
                        '<div class="field-num {status:this.getIconCls}">{transferdate:this.getDate} | № {id}</div>',
                        '<div class="field"><span class="label">Торговая точка:</span> {name}, {address}</div>',
                        '{needtime:this.getNeedtime}',
                        '{description:this.getDescription}',
                    '</div>', {
                        getIconCls : function(status) {
                            if (status == 0) {
                                return 'icon-wait';
                            } else if (status == 1) {
                                return 'icon-accept';
                            } else if (status == 2) {
                                return 'icon-reject';   
                            }
                        },
                        getDate : function(date) {
                            return Ext.util.Format.date(date, 'd.m.Y H:i');
                        },
                        getNeedtime : function(needtime){
                            if (needtime) {
                                return Ext.String.format('<div class="field"><span class="label">Время выполнения:</span>{0}</div>', needtime);
                            }
                        },
                        getDescription : function(description){
                            if (description) {
                                return Ext.String.format('<div class="field"><span class="label">Описание:</span>{0}</div>', Ext.String.ellipsis(description, 120, true));
                            }
                        }
                    }
                )
            }
        ]);
        
        this.setList(this.down('list'));
    },
    
    buildSortPanel : function() {
        this.setSortPanel(Ext.create('Ext.form.Panel', {
            cls : 'sort-panel',
            width : 220,
            minHeight : 90,
            padding : '5 5 5 15',
            modal : {
                cls : 'x-mask-dark'
            },
            centered : true,
            floating : true,
            hidden : true,
            hideOnMaskTap : true,
            
            /*showAnimation: {
                preserveEndState: true,
                duration: 150,
                from: {
                    'opacity': 0,
                    'top': 0
                },
                to : {
                    'opacity': 1,
                    'top': 5
                }
            },
            hideAnimation: {
                preserveEndState: true,
                duration: 150,
                from: {
                    'opacity': 1,
                    'top': 5
                },
                to: {
                    'opacity': 0,
                    'top': 0
                }
            },*/
            
            defaults : {
                labelWidth : 105,
                flex : 1,
                listeners : {
                    scope : this,
                    check : this.onChangeSorting
                }
            },
            items : [
                {
                    xtype : 'radiofield',
                    name : 'sort_type',
                    label : 'Новые вначале',
                    value : 'date-desc',
                    checked : true
                },
                {
                    xtype : 'radiofield',
                    name : 'sort_type',
                    label : 'Новые в конце',
                    value : 'date-asc'
                }
            ]
        }));
        
        Ext.Viewport.add(this.getSortPanel());
    },
    
    onStoreLoad : function(store, records){
        this.down('#totalsFbar').setData({count : store.getTotalCount()});    
    },
    
    onShow : function(){
        this.getList().deselectAll();
        
        /*if(this.getList().getStore().getCount() > this.getList().getStore().getPageSize()){
            this.getList().doRefresh();   
        }*/
        
        if (this.getReloadRequest()) {
            this.getList().reload();     
            this.setReloadRequest(false);
        }
    },
    
    onShowSortOptions : function(btn) {
        this.getSortPanel().show();
    },
    
    onChangeSorting : function(field) {
        var sort = field.getValue().split("-");
        
        this.getStore().setSorters({property : sort[0], direction : sort[1]});
        this.getList().reload();
        
        this.getSortPanel().hide();
    },
    
    onSearch : function(field, value) {
        this.getStore().filter("query", {"$like" : value});
        this.getList().reload();
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
    }
});