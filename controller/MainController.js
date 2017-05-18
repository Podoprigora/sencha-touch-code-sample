Ext.define('TouchApp.controller.MainController', {
    extend : 'Ext.app.Controller',
    
    config : {
        
        refs : {
            mainPanel : 'MainPanel',
            mainMenu : 'MainMenu',
            authForm : 'AuthForm',
            preloaderView : 'PreloaderView'
        },
        
        control : {
            'button[action=showmainmenu]' : {
                tap : 'onShowMainMenuTap'  
            },
            'button[action=back]' : {
                tap : 'onActivePreviousItem'
            },
            mainMenu : {
                itemtap : 'onMenuItemTap',
                logout : 'onLogout'
            },
            authForm : {
                authorize : 'onAuthorization'
            },
            preloaderView : {
                backbtntap : 'onHidePreloaderView'
            }
        },
        routes : {
            'nav' : 'showMainMenu',
            'auth' : 'showAuthForm'
        }
    },
    
    launch : function() {
        var me = this;
        var identityStore = Ext.getStore('IdentityLocalStore');
        
        identityStore.load();
        
        if (identityStore.getCount() == 0) {
            this.redirectTo('auth');
        }  else {
            this.initAjaxHandlers();
            me.updateGeoPosition();
            
            this.redirectTo('nav');   
        }
    },
    
    initAjaxHandlers: function(){
        
        var identityStore = Ext.getStore('IdentityLocalStore');
        
        if (identityStore.getCount() == 0) {
            identityStore.load();   
        }
        
        var identityRecord = identityStore.getAt(0);
        
        TouchApp.Settings.setIdentityModel(identityRecord);
        
        Ext.Ajax.setTimeout(120000);
            
        Ext.Ajax.on('beforerequest', function(conn, options, eOptions){
            if (identityRecord) {
                if (Ext.isEmpty(options.headers)) {
                    options['headers'] = {};
                }
                options.headers['Authorization'] = identityRecord.get('api_key');    
            }
        }, this);
        
        Ext.Ajax.on('requestcomplete', function(conn, response){
            var responseStatus = TouchApp.ux.util.Response.validateStatus(conn, response);
            if (responseStatus == 403) {
                identityStore.removeAll();
                identityStore.sync();

                this.redirectTo('auth');
            }
        }, this);
    },
    
    updateGeoPosition : function() {
        var me = this;
        
        function onSuccess(position){
            TouchApp.Settings.setIdentity('geo', [position.coords.latitude,position.coords.longitude].join(","));
        };
        
        function onError(error) {
            console.log('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
        };
        
        navigator.geolocation.getCurrentPosition(onSuccess, onError, { maximumAge: 120000, timeout: 30000, enableHighAccuracy: true });
        setInterval(function(){
            navigator.geolocation.getCurrentPosition(onSuccess, onError, { maximumAge: 120000, timeout: 30000, enableHighAccuracy: true });
        }, 90000);
    },
    
    updatePendingCounters : function() {
        var pendingCountersStore = Ext.getStore('PendingCountersStore'),
            mainMenu = this.getMainMenu(),
            mainPanel = this.getMainPanel(),
            me = this;
        
        pendingCountersStore.load({
            callback : function(records){
                if (records.length) {
                    Ext.Array.forEach(records, function(item){
                        var value = item.get('value') > 0 ? item.get('value') : null;
                        if (item.get('name') == 'bids_open') {
                            mainMenu.down('#openBidsMenuItem').setBadgeText(value);
                        } else if (item.get('name') == 'messages') {
                            mainMenu.down('#messagesMenuItem').setBadgeText(value);      
                        }     
                    });
                }
            }
        });
    },

    onMenuItemTap : function(mainPanel, routePath) {
        this.redirectTo(routePath);
    },
    
    onAuthorization : function(form) {
        var model = Ext.create('TouchApp.model.AuthModel', form.getValues());
        
        if (model.isValid() == false) {
            Ext.Msg.alert(null, 'Не заполнены обязательные поля!');
            form.down('field[name=login]').markInvalid(true);
            form.down('field[name=password]').markInvalid(true);
            return false;
        }
        
        Ext.Viewport.setMasked({xtype : 'loadmask'});
        
        model.save({
            success : function(record, operation) {
                if (! TouchApp.ux.util.Response.isValidStatus(operation.getResponse().responseText)) {
                    form.down('field[name=login]').markInvalid(true);
                    form.down('field[name=password]').markInvalid(true);    
                } else {
                    var response = Ext.decode(operation.getResponse().responseText),
                        identityStore = Ext.getStore('IdentityLocalStore');
  
                    identityStore.load();    
                    identityStore.removeAll();
                    
                    identityStore.add(response.records);
                    identityStore.sync();
                    
                    this.initAjaxHandlers();
                    this.updateGeoPosition();
                    this.redirectTo('nav');
                }
            },
            callback : function() {
                Ext.Viewport.setMasked(false);   
            }
        }, this);
    },
    
    showAuthForm : function() {
        var identityStore = Ext.getStore('IdentityLocalStore');
        identityStore.load();
        if (identityStore.getCount() == 0){
            this.getMainPanel().fadeAnimateActiveItem('AuthForm');    
        } else {
            history.back();
        }
    },
    
    onShowMainMenuTap : function(){
        this.redirectTo('nav');
    },
    
    showMainMenu : function() {
        var mainPanel = this.getMainPanel(),
            activeItem = mainPanel.getActiveItem();
        if (activeItem.isXType('MainMenu') == false) {
            
            var mainMenu = mainPanel.fadeAnimateActiveItem('MainMenu');
            
            if (Ext.isEmpty(mainMenu.getUserLabel())) {
                var identityStore = Ext.getStore('IdentityLocalStore'),
                    identityRecord = identityStore.getAt(0);
                if (identityRecord) {
                    mainMenu.setUserLabel([identityRecord.get('last_name'), identityRecord.get('first_name'), identityRecord.get('patronymic')].join(" "));    
                }  
            }
            
            this.updatePendingCounters();
        }
    },
    
    onLogout : function() {
        Ext.Msg.confirm(null, 'Выйти из приложения?', function(btn ){
            if (btn == 'yes') {                
                var identityStore = Ext.getStore('IdentityLocalStore');
                identityStore.load();
                identityStore.removeAll();
                identityStore.sync();
                
                this.redirectTo('auth');
            } 
        }, this);
    },
    
    onActivePreviousItem : function(e, el) {
        var mainPanel = this.getMainPanel(),
            activeItem = mainPanel.getActiveItem(),
            oldItem = activeItem.oldItem;
        
        if (oldItem && Ext.isEmpty(oldItem._routePath) == false) {
            window.history.back();
        } else {
            mainPanel.showPreviousItem();
        }
    },
    
    onHidePreloaderView : function() {
        var mainPanel = this.getMainPanel(),
            activeItem = mainPanel.getActiveItem(),
            oldItem = activeItem.oldItem;
            
        activeItem.oldItem = null;

        mainPanel.animateActiveItem(oldItem, mainPanel.getFadeAnimation());   
    }
});