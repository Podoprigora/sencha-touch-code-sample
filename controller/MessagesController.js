Ext.define('TouchApp.controller.MessagesController', {
    extend : 'Ext.app.Controller',
    
    config : {
        refs : {
            mainPanel : 'MainPanel',
            preloaderView : 'PreloaderView',
            list : 'MessagesList',
            view : 'MessageView',
            respondForm : 'MessageRespondForm'
        },
        control : {
            list : {
                itemtap : 'onListItemTap'
            },
            view : {
                respondbtntap : 'onRespondBtnTap'
            },
            respondForm : {
                sendbtntap : 'onSendRespondBtnTap'
            }
        },
        routes : {
            'messages' : 'onShowMessages',
            'messages/:id' : 'onShowMessageById',
            'messages/:id/respond' : 'onShowRespondForm'
        }
    },
    
    launch : function(){

    },
    
    onShowMessages : function() {
        var mainPanel = this.getMainPanel();
        
        if (mainPanel.showPreviousItem('MessagesListView') == false) {
            mainPanel.fadeAnimateActiveItem('MessagesList');
        }
    },
    
    onListItemTap : function(list, item, index, record, e){
        record.set('unread_count', 0);
        list.refresh();
        this.redirectTo('messages/' + record.get('id'));
    },
    
    onRespondBtnTap : function(view){
        var record = view.getForm().getRecord();
        this.redirectTo('messages/' + record.get('id') + "/respond");
    },
    
    onShowMessageById : function(id){
        var mainPanel = this.getMainPanel();
        
        if (mainPanel.showPreviousItem('MessageView')) {
            return false;
        }
        
        var preloaderView = mainPanel.leftSlideAnimateActiveItem('PreloaderView');
        preloaderView.setToolbarTitle('Сообщение <br/>№ ' + id);

        mainPanel.addPanel('MessageView', function(view){
            
            TouchApp.model.MessageHistoryModel.load(id, {
                success : function(record){
                    if (record) {
                        view.setToolbarTitle('Сообщение <br/>№ ' + id);
                        view.setRoutePath('messages/' + id);
                        
                        view.getForm().setRecord(record);
                        
                        var historyList = view.down('MessageHistoryList');
                        
                        historyList.getStore().removeAll();
                        historyList.getStore().add(record.get('history'));

                        mainPanel.setActiveItem(view);
                        
                        Ext.defer(function(){
                             historyList.getScrollable().getScroller().scrollToEnd(true);    
                        }, 600);
                    }
                }
            }); 
        });        
    },
    
    onShowRespondForm : function(id){
        var mainPanel = this.getMainPanel();
        
        if (this.getView()) {
            var form = mainPanel.fadeAnimateActiveItem('MessageRespondForm'),
                parentRecord = this.getView().getForm().getRecord();
                
            form.setToolbarTitle('Новое сообщение');
            form.setParentRecord(parentRecord);
        }
    },
    
    onSendRespondBtnTap : function(form) {
        var baseForm = form.getForm(),
            model  = Ext.create('TouchApp.model.MessageModel', baseForm.getValues());
            errors = model.validate(),
            me = this;
        
        if (! errors.isValid()) {
            errors.each(function(error){
                baseForm.getFields(error.getField()).markInvalid(true);
            });
            Ext.Msg.alert(null, 'Не заполнены обязательные поля!');
            return false;
        }
        
        Ext.Viewport.setMasked({
            xtype : 'loadmask',
            message : 'Отправка сообщения ...'
        });
        
        model.save({
            success : function(record, operation) {
                if (TouchApp.ux.util.Response.isValidStatus(operation.getResponse().responseText)) {
                    var mainPanel = me.getMainPanel(),
                        messagesList = mainPanel.down('MessagesList');
                    if (messagesList) {
                        messagesList.setReloadRequest(true);
                    }
                    mainPanel.goBack(2);
                }
            },
            callback : function() {
                Ext.Viewport.setMasked(false);   
            }
        });
        
    }
});