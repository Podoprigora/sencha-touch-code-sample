Ext.define('TouchApp.view.AuthForm', {
    extend : 'Ext.form.Panel',
    xtype : 'AuthForm',
    
    config : {
        scrollable : {
            direction : 'vertical'
        }
    },
    
    initialize : function(){
        this.callParent(arguments);
        
        this.buildItems();
    },
    
    buildItems : function(){
        var parentScroller = this.getScrollable().getScroller();
        this.add({
            xtype : 'container',
            padding : '100 40 0 40',
            items : [
                {
                    xtype : 'container',
                    html : '<center><div class="app-logo">&nbsp;</div></center>',
                    anchor : '100%',
                    margin : '0 0 25 0'
                },
                {
                    xtype : 'textfield',
                    name : 'login',
                    ui : 'login',
                    placeHolder : 'Введите логин',
                    autoCapitalize: false,
                    required : true,
                    clearIcon : false,
                    listeners : {
                        scope : this,
                        change : function(field, value){
                            this.down('passwordfield').focus();
                        }
                    }
                },
                {
                    xtype : 'passwordfield',
                    name : 'password',
                    ui : 'password',
                    placeHolder : 'Введите пароль',
                    required : true,
                    clearIcon : false
                },
                {
                    xtype : 'button',
                    text : 'ВОЙТИ',
                    ui : 'action',
                    anchor : '100%',
                    margin : '10 0 0 0',
                    scope : this,
                    handler : function() {
                        this.fireEvent('authorize', this);
                    }
                }
            ]
        });
    }
});