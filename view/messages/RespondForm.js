Ext.define('TouchApp.view.messages.RespondForm', {
    extend : 'Ext.Container',
    xtype : 'MessageRespondForm',
    
    config : {
        layout : 'fit',
        toolbarTitle : null,
        form : null,
        parentRecord : null
    },
    
    initialize : function() {
        this.callParent(arguments);
        
        this.buildTbar();
        
        Ext.defer(function(){
            this.buildForm();
            
            this.on('hide', this.onHide, this);
        }, 300, this);
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
                    itemId : 'tbarTitle'
                },
                {
                    text : 'ОТПРАВИТЬ',
                    iconCls : 'send',
                    ui : 'plain',
                    align : 'right',
                    scope : this,
                    handler : function(){
                        this.fireEvent('sendbtntap', this);
                    }
                }
            ]
        });
    },
    
    updateToolbarTitle : function(title){
        var tbarTitle = this.down('#tbarTitle');
        if (tbarTitle) {
            tbarTitle.setTitle(title);
        }
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
                    xtype : 'hiddenfield',
                    name : 'parent_id'
                },
                {
                    xtype : 'hiddenfield',
                    name : 'recipient_id'
                },
                {
                    xtype : 'textfield',
                    name : 'recipient',
                    label : 'Получатель:',
                    disabled : true,
                    labelWidth : 90
                },
                {
                    xtype : 'textareafield',
                    name : 'message',
                    label : 'Сообщение:',
                    placeHolder : 'Введите текст сообщения',
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
        var form = this.getForm(),
            parentRecord = this.getParentRecord();
           
        if (parentRecord) {
            form.getFields('parent_id').setValue(parentRecord.get('parent_id'));
            if (parentRecord.get('recipient_id') == TouchApp.Settings.getIdentity('user_id')) {
                form.getFields('recipient_id').setValue(parentRecord.get('sender_id'));
                form.getFields('recipient').setValue(parentRecord.get('sender'));
            } else {
                form.getFields('recipient_id').setValue(parentRecord.get('recipient_id'));
                form.getFields('recipient').setValue(parentRecord.get('recipient'));   
            }
        }
        
        form.getFields('message').focus();
    },
    
    onHide : function(){
        this.destroy();
    }
    
});