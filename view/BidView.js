Ext.define('TouchApp.view.BidView', {
    extend : 'Ext.Container',
    xtype : 'BidView',
    
    config : {
        layout : 'fit',
        fullscreen : true,
        bidId : null,
        routePath : null,
        form : null
    },
    
    initialize : function(){
        this.callParent(arguments);
        
        this.buildTbar();
        this.buildForm();
        this.buildFbar();
        
        this.on('show', function(panel){
            panel.getForm().getScrollable().getScroller().scrollTo(0, 0, false);
        }, this); 
    },
    
    buildForm : function() {
        var form = this.add({
            xtype : 'formpanel',
            scrollable : {
                direction: 'vertical'   
            },
            items : [
                {
                    xtype : 'container',
                    cls : 'view-container',
                    padding : '10 15 0 15',
                    defaults : {
                        labelWrap : true,
                        labelWidth : null
                    },
                    items : [
                        {
                            xtype : 'displayField',
                            label : 'Статус:',
                            name : 'status',
                            listeners : {
                                change : function(field, value){
                                    field.removeCls('field-color-orange');
                                    field.removeCls('field-color-green');
                                    field.removeCls('field-color-red');
                                    if (value == 0) {
                                        field.addCls('field-color-orange');
                                        field.getComponent().displayElement.setHtml('Ожидает выполнения');
                                    } else if (value == 1) {
                                        field.addCls('field-color-green');
                                        field.getComponent().displayElement.setHtml('Выполненная');
                                    } else if (value == 2) {
                                        field.addCls('field-color-red');
                                        field.getComponent().displayElement.setHtml('Отклоненная');
                                    } 
                                    return "-";
                                }
                            }
                        },
                        {
                            xtype : 'displayField',
                            label : 'Номер:',
                            name : 'id'
                        },
                        {
                            xtype : 'displayField',
                            label : 'Дата передачи:',
                            name : 'transferdate',
                            listeners : {
                                change : function(field, value) {
                                    var date = Ext.util.Format.date(value, 'd.m.Y H:i');
                                    field.getComponent().displayElement.setHtml(date);
                                }
                            }
                        },
                        {
                            xtype : 'displayField',
                            label : 'Дата создания:',
                            name : 'createdate',
                            listeners : {
                                change : function(field, value) {
                                    var date = Ext.util.Format.date(value, 'd.m.Y H:i');
                                    field.getComponent().displayElement.setHtml(date);
                                }
                            }
                        },
                        {
                            xtype : 'displayField',
                            label : 'Автор:',
                            name : 'author'
                        },
                        {
                            xtype : 'displayField',
                            label : 'Наименование:',
                            name : 'name'
                        },
                        {
                            xtype : 'displayField',
                            label : 'Адрес:',
                            name : 'address'
                        },
                        {
                            xtype : 'displayField',
                            label : 'Контакт:',
                            name : 'contact'
                        },
                        {
                            xtype : 'displayField',
                            label : 'Время выполнения:',
                            name : 'needtime'
                        },
                        {
                            xtype : 'displayField',
                            label : 'Описание работы:',
                            labelAlign : 'top',
                            name : 'description'
                        }
                    ]
                },
                {
                    xtype : 'BidTasksList',
                    itemId : 'tasksList'
                },
                {
                    xtype : 'BidMaterialsList',
                    itemId : 'materialsList'
                }
            ]
        });
        this.setForm(form);
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
                    title : 'Обзор заявки'
                },
                {
                    iconCls : 'place',
                    ui : 'plain',
                    align : 'right',
                    scope : this,
                    handler : function(){
                        this.fireEvent('locationbtntap', this);
                    }
                },
                {
                    iconCls : 'file-pdf',
                    ui : 'plain',
                    align : 'right',
                    scope : this,
                    handler : function(){
                        this.fireEvent('makepdfbtntap', this);
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
                    itemId : 'btnReject',
                    ui : 'light',
                    cls : 'button-reject',
                    text : 'ОТКЛОНИТЬ',
                    scope : this,
                    handler : function() {
                        this.fireEvent('rejectbtntap', this);
                    }
                },
                {
                    xtype : 'button',
                    ui : 'action',
                    text : 'ОТЧЕТ',
                    scope : this,
                    handler : function(){
                        this.fireEvent('reportbtntap', this);
                    }
                }
            ]
        });
    }
});