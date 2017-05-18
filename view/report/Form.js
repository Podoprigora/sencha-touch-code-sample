Ext.define('TouchApp.view.report.Form', {
    extend : 'Ext.Container',
    xtype : 'BidReportForm',
    
    config : {
        layout : 'fit',
        
        routePath : null,
        form : null
    },
    
    initialize : function() {
        this.callParent(arguments);
        
        this.buildTbar();
        this.buildItems();
        
        this.on('show', function(panel){
            panel.getForm().getScrollable().getScroller().scrollTo(0, 0, false);
        }, this);
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
                    title : 'Отчет <br/> о выполнении'
                },
                {
                    text : 'СОХРАНИТЬ',
                    ui : 'plain',
                    align : 'right',
                    scope : this,
                    handler : function(){
                        this.fireEvent('savebtntap', this);
                    }
                }
            ]
        });
    },
    
    buildItems: function(){
        var form = this.add({
            xtype : 'formpanel',
            scrollable : {
                direction: 'vertical'  
            }
        });
        this.setForm(form);
        
        var parentScroller = form.getScrollable().getScroller();
        
        form.add([
            {
                xtype : 'container',
                padding : '15 15 0 15',
                defaults : {
                    labelWidth : 130
                },
                items : [
                    {
                        xtype : 'hiddenfield',
                        name : 'id'
                    },
                    {
                        xtype : 'hiddenfield',
                        name : 'status'
                    },
                    {
                        xtype : 'nativedatefield',
                        label : 'Дата выполнения:',
                        placeHolder : 'Выберите дату',
                        name : 'completed_date',
                        required : true
                    }
                ]
            },
            {
                xtype : 'BidReportTasksEditingList',
                itemId : 'tasksList',
                store : Ext.create('TouchApp.store.BidReportTasksLocalStore'),
                parentScroller : parentScroller,
                listeners : {
                    scope : this,
                    addbtntap : function(tasksList) {
                        this.fireEvent('addtasksbtntap', this, tasksList);
                    },
                    rowactionsbtntap : function(tasksList, record){
                        this.fireEvent('tasksrowactionsbtntap', this, tasksList, record);
                    }
                }
            },
            {
                xtype : 'BidReportImagesEditingList',
                id : 'imagesList',
                margin : '10 0 0 0'
            },
            {
                xtype : 'container',
                padding : '10 15 15 15',
                items : [
                    {
                        xtype : 'textareafield',
                        name : 'comment',
                        label : 'Комментарий:',
                        placeHolder : 'Введите комментарий о выполненной работе.',
                        labelAlign : 'top',
                        maxRows: 6,
                        clearIcon : false,
                        parentScroller : parentScroller
                    }
                ]
            } 
        ]);
    },
    
    resetData : function() {
        this.down('BidReportTasksEditingList').getStore().removeAll();   
    }
    
});