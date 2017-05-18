Ext.define('TouchApp.view.BidsListFiltersForm', {
    extend : 'Ext.form.Panel',
    xtype : 'BidsListFiltersForm',
    
    config : {
        scrollable : {
            direction : 'vertical',
            directionLock : true
        },
        padding : 15
    },
    
    initialize : function() {
        this.callParent(arguments);
        
        this.buildTbar();
        this.buildFbar();
        this.buildFields();
    },
    
    buildTbar : function() {
        this.add({
            xtype : 'titlebar',
            docked : 'top',
            ui : 'plain',
            items : [
                {
                    iconCls : 'arrow_back',
                    align : 'left',
                    ui : 'plain',
                    action : 'back',
                    scope : this,
                    handler : function(){

                    }
                },
                {
                    xtype : 'title',
                    title : 'Параметры <br /> поиска'
                },
                {
                    text : 'ОЧИСТИТЬ ВСЕ',
                    ui : 'plain',
                    align : 'right',
                    scope : this,
                    handler : function(){
                        
                    }
                }
            ]
        });
    },
    
    buildFbar : function() {
        this.add({
            xtype : 'toolbar',
            docked : 'bottom',
            ui : 'plain',
            layout : {
                type : 'hbox'
            },
            items : [
                {
                    text : 'ПОКАЗАТЬ РЕЗУЛЬТАТЫ <br> <span>57 записей</span>',
                    ui : 'plain',
                    cls : 'button-search',
                    flex : 1
                }
            ]
        });    
    },
    
    buildFields : function() {
        this.add([
            {
                xtype : 'container',
                layout : 'hbox',
                defaults : {
                    flex : 1,
                    labelAlign : 'top'
                },
                items : [
                    {
                        xtype : 'datepickerfield',
                        label : 'Дата с:'
                    },
                    {
                        xtype : 'datepickerfield',
                        label : 'Дата по:',
                        margin : '0 0 0 15'
                    }
                ]
            },
            {
                xtype  : 'textfield',
                label : 'Торговая точка:',
                labelAlign : 'top'
            },
            {
                xtype  : 'textfield',
                label : 'Время выполнения:',
                labelAlign : 'top'
            },
            {
                xtype  : 'textfield',
                label : 'Описание работы:',
                labelAlign : 'top'
            }
        ]);
    }
});