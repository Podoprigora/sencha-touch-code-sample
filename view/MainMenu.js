Ext.define('TouchApp.view.MainMenu', {
    extend : 'Ext.Panel',
    xtype : 'MainMenu',
    
    config: {
        cls : 'main-menu',
        config : {
            routePath : 'nav'
        },
        scrollable : { 
            direction : 'vertical' 
        },
        layout: {
            type: 'vbox'
        },
        
        userLabel : null
    },
    
    initialize : function() {
        this.callParent(arguments);
        
        this.buildItems();
    },
    
    buildItems : function() {
        this.add([
            {
                xtype : 'container',
                itemId : 'header',
                docked : 'top',
                data : null,
                tpl : ['<div class="menu-header"><div class="menu-logo">&nbsp;</div><div class="menu-user-label">{userLabel}</div></div>'],
                flex : 1
            },
            {
                xtype  :'button',
                itemId : 'openBidsMenuItem',
                text : 'Ожидающие заявки',
                badgeText : null,
                iconCls : 'schedule',
                ui : 'plain',
                scope : this,
                handler : function() {
                    this.fireEvent('itemtap', this, 'bids/type/open');
                }
            },
            {
                xtype  :'button',
                text : 'Выполненные заявки',
                iconCls : 'done',
                ui : 'plain',
                scope : this,
                handler : function() {
                    this.fireEvent('itemtap', this, 'bids/type/close');
                }
            },
            {
                xtype  :'button',
                text : 'Отклоненные заявки',
                iconCls : 'do_not_disturb',
                ui : 'plain',
                scope : this,
                handler : function() {
                    this.fireEvent('itemtap', this, 'bids/type/reject');
                }
            },
            {
                xtype : 'button',
                itemId : 'messagesMenuItem',
                text : 'Сообщения',
                badgeText : null,
                iconCls : 'chat_bubble_outline',
                ui : 'plain',
                scope : this,
                handler : function() {
                    this.fireEvent('itemtap', this, 'messages');
                }
            },
            {
                xtype  :'button',
                text : 'Выход',
                iconCls : 'power_settings_new',
                ui : 'plain',
                scope : this,
                handler : function() {
                    this.fireEvent('logout', this);
                }
            }
        ]);
    },
    
    updateUserLabel : function(value) {
        var headerContainer = this.down('#header');
        if (headerContainer) {
            headerContainer.setData({userLabel : value});
        }
    }
});