Ext.define('TouchApp.view.messages.List', {
    extend : 'TouchApp.ux.base.List',
    xtype : 'MessagesList',
    
    config : {
        toolbarTitle : 'Сообщения',
        routePath : 'messages'
    },
    
    initialize : function() {
        
        this.setStore(Ext.create('TouchApp.store.MessagesStore'));
        this.setListItemTpl(this.buildListItemTpl());
        
        this.callParent(arguments);
    },
    
    buildListItemTpl : function(){
        return Ext.create('Ext.XTemplate', 
            '<div class="template-list-row {unread_count:this.getStyle}">',
                '<div class="field-box"><div class="field-type-user">{user}</div> <div class="field-type-date field-align-right">{created:this.getDate}</div></div>',
                '<div class="field">{message:this.getMessage}</div>',
            '</div>',
            {
                getStyle : function(unreadCount) {
                    if (Ext.isEmpty(unreadCount) || unreadCount == 0) {
                        return 'row-disabled';
                    }
                    return 'row-active';
                },
                getDate : function(date){
                    return Ext.util.Format.date(date, 'd.m.Y')
                },
                getMessage : function(message){
                    return Ext.String.ellipsis(message, 120, true);
                }
            }
        );
    },
    
    buildSortPanel : function() {
        var items = [
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
        ]; 
        this.callParent([items, 220, 90]);
    }
});