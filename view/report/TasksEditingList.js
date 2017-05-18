Ext.define('TouchApp.view.report.TasksEditingList', {
    extend : 'TouchApp.ux.EditingList',
    xtype : 'BidReportTasksEditingList',
    
    config : {
        rowActionsMenu : null
    },
    
    initialize : function(){
        this.callParent(arguments);
        
        this.buildTbar();
        this.buildRowActionsMenu();
        
        this.on('updatedata', function(){
            var count = this.getStore().getCount(),
                title = this.down('#title');
            
            title.setTitle('ЗАДАЧИ ' + ((count) ? ("(<b>" + count + "</b>)") : ""));
            
        }, this);
    },
    
    buildTbar : function() {
        this.add({
            xtype  : 'titlebar',
            docked : 'top',
            ui : 'plain',
            items : [
                {
                    xtype : 'title',
                    title : 'ЗАДАЧИ',
                    itemId : 'title'
                },
                {
                    iconCls : 'add_circle_outline',
                    align : 'right',
                    ui : 'plain',
                    scope : this,
                    handler : function(){
                        this.fireEvent('addbtntap', this);
                    }
                }
            ]
        });
    },
    
    buildRowActionsMenu : function() {
        var menu = Ext.create('Ext.ux.ContextMenu', {
            modal : {
                cls : 'x-mask-dark'
            },
            config : {
                record : null
            },
            items : [
                {
                    xtype : 'container',
                    itemId : 'title',
                    cls : 'x-title',
                    html : '...'
                },
                {
                    text : 'Удалить задачу',
                    ui : 'plain',
                    scope : this,
                    handler : this.onDeleteItem
                },
                {
                    text : 'Отмена',
                    ui : 'plain',
                    handler : function() {
                        Ext.Viewport.hideMenu('bottom');
                    }
                }
            ]
        });
        
        this.setRowActionsMenu(menu);
    },
    
    getEditingRow : function(record) {
        var me = this;
        var culcTypeField = {
            xtype : 'displayField'
        };
        
        if (record.get('culc_type') == 'minutes') {
            culcTypeField = {
                xtype : 'numberfield',
                name : 'minutes',
                label : 'Минуты:',
                labelWidth : 60,
                margin : '0 0 0 10',
                flex : 1
            };
        } else {
            culcTypeField = {
                xtype : 'displayField',
                name : 'price',
                label : 'Оплата:',
                labelWidth : 60,
                margin : '0 0 0 5',
                flex : 1
            };
        }

        return {
            xtype : 'container',
            cls : 'row-editor',
            layout : 'hbox',
            items : [
                {
                    xtype : 'container',
                    flex : 1,
                    items : [
                        {
                            xtype  :'container',
                            layout : 'hbox',
                            items : [
                                {
                                    xtype : 'hiddenfield',
                                    name : 'task_id'
                                },
                                {
                                    xtype : 'displayField',
                                    name : 'name',
                                    minWidth : 120,
                                    flex : 1
                                },
                                {
                                    xtype : 'button',
                                    iconCls : 'more_vert',
                                    ui : 'plain',
                                    scope : this,
                                    handler : function(btn){
                                        this.onShowRowActionsMenu(btn, this, record);
                                    }
                                }   
                            ]
                        },
                        {
                            xtype  :'container',
                            layout : 'hbox',
                            defaults : {
                                parentScroller : this.getParentScroller(),
                                parentContainer : this,
                                clearIcon : false
                            },
                            items : [
                                {
                                    xtype : (record.get('countable') ? 'numberfield' : 'displayField'),
                                    name : 'qty',
                                    label : 'Кол-во:',
                                    labelWidth : 60,
                                    flex : 1,
                                    listeners : {
                                        scope : this,
                                        change : function(field, value) {
                                            if (record.get('culc_type') == 'price') {
                                                field.up('container').down('displayField[name=price]').setValue(Number(record.get('price')*value));   
                                            }
                                        }
                                    }
                                },
                                culcTypeField,
                                {
                                    xtype : 'checkboxfield',
                                    name : 'completed'
                                }
                            ]
                        }
                    ]
                }
            ]
        };
    },
    
    onShowRowActionsMenu : function(btn, list, record) {
        this.fireEvent('rowactionsbtntap', this, record);
        
        var menu = this.getRowActionsMenu();
        
        menu.down('#title').setHtml(record.get('name'));
        menu.setRecord(record);
        
        Ext.Viewport.setMenu(menu, {
            side : 'bottom'
        });
        Ext.Viewport.showMenu('bottom');
    },
    
    onDeleteItem : function(btn) {
        var record = this.getRowActionsMenu().getRecord();
        this.getStore().remove(record);
        Ext.Viewport.hideMenu('bottom');
    }
    
});