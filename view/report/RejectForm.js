Ext.define('TouchApp.view.report.RejectForm', {
    extend : 'Ext.Panel',
    xtype : 'BidReportRejectForm',
    
    config: {
        layout : 'fit',
        bidId : null,
        form : null
    },
    
    initialize : function() {
        this.callParent(arguments);
        
        this.buildTbar();
        
        Ext.defer(function(){
            this.buildForm();
            
            this.on('hide', this.onHide, this);
        }, 300, this);
        
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
                    action : 'back'
                },
                {
                    xtype : 'title',
                    title : 'Отклонение заявки'
                },
                {
                    text : 'СОХРАНИТЬ',
                    ui : 'plain',
                    align : 'right',
                    scope : this,
                    handler : function() {
                        this.fireEvent('savebtntap', this);
                    }
                }
            ]
        }); 
    },
    
    buildForm : function() {
        var form = this.add({
            xtype : 'formpanel',
            scrollable : {
                direction : 'vertical'
            },
            padding : '15 15 0 15',
            items : [
                {
                    xtype : 'textfield',
                    name : 'id',
                    label : 'Заявка №',
                    labelWidth : 90,
                    disabled : true
                },
                {
                    xtype : 'textareafield',
                    name : 'comment',
                    label : 'Причина отклонения заявки',
                    placeHolder : 'Введите причину отклонения заявки',
                    labelAlign : 'top',
                    maxRows : 6,
                    margin : '15 0 0 0'
                }
            ]
        });
        this.setForm(form);
        
        this.initFields();
    },
    
    initFields : function() {
        this.getForm().getFields('id').setValue(this.getBidId());
        this.getForm().getFields('comment').focus();
    },
    
    onHide : function(){
        this.destroy();
    }
});