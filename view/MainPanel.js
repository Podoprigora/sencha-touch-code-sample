Ext.define('TouchApp.view.MainPanel', {
    extend : 'Ext.Container',
    xtype : 'MainPanel',
    
    config : {
        
        layout : {
            type : 'card'
        },
        
        previousPanels : [],
        
        leftSlideAnimation : {
            type : 'cover',
            direction : 'left',
            duration : 250
        },
        
        rightSlideAnimation : {
            type : 'reveal',
            direction : 'right',
            duration : 250
        },
        
        fadeAnimation : { 
            type : 'fade', 
            duration : 250,
            out : true
        }
    },
    
    initialize : function(){

        this.callParent(arguments);
        
        this.addBeforeListener('activeitemchange', this.onBeforeItemChange, this);
        //this.addAfterListener('activeitemchange', this.onAfterItemChange, this);
    },
    
    onBeforeItemChange : function(card, newItem, oldItem) {
        
        if (Ext.isEmpty(newItem.oldItem)) {
            if (oldItem && Ext.isEmpty(oldItem.isPreloader) == false) {
                newItem.oldItem = oldItem.oldItem;
                oldItem.oldItem = null;
            } else {
                newItem.oldItem = oldItem;   
            }
        }
    },
    
    onAfterItemChange : function(card, newItem, oldItem) {
        
        if (! newItem) {
            return false;
        }

        var index,
            panels = this.getPreviousPanels(),
            newId = newItem.getItemId();
  
        for (index in panels) {
            if (panels[index].getItemId() == newId) {
                panels.splice(index, 1);
                break;
            }
        }
        
        panels.splice(0, 0, newItem);
        if (panels.length > 10 && newId != "mainMenu") {
            var panel = panels.pop();
            panel.destroy();
        }
    },
    
    addPanel : function(xtype, fn, delay) {
        
        var delay = delay || 100;
        
        var panel = this.down(xtype);
        
        if (Ext.isEmpty(panel)) {
            Ext.defer(function(){
                panel = this.add({
                    xtype : xtype,
                    hidden : true
                });
            
                fn(panel);
            }, delay, this);
        } else {         
            fn(panel);
        }
    },
    
    showPreviousItem : function(xtype) {
        var activeItem = this.getActiveItem(),
            oldItem = activeItem.oldItem,
            xtype = Ext.valueFrom(xtype, null),
            viewportMenus = Ext.Viewport.getMenus(),
            bottomMenu = viewportMenus['bottom'];

        if (Ext.isEmpty(bottomMenu) == false && bottomMenu.getHidden() == false) {
            Ext.Viewport.hideMenu('bottom');
        }
        
        Ext.Viewport.setMasked(false);
        
        if (Ext.isEmpty(xtype) || (oldItem && oldItem.isXType(xtype))) {

            activeItem.oldItem = null;
            
            this.animateActiveItem(oldItem, this.getFadeAnimation());
            
            if (Ext.isFunction(activeItem.resetData)) {
                Ext.defer(function(){
                    activeItem.resetData();
                }, 500);
            }
            
            return true;
        }
        return false;
    },
    
    goBack : function(index){
        var index = Ext.valueFrom(index, 1),
            activeItem = this.getActiveItem(),
            preloaderView = this.down('PreloaderView');
        
        this._destroyOldItems(activeItem, index);
        
        if (preloaderView) {
            preloaderView.oldItem = null;        
            preloaderView.hide();
        }
        
        history.go(-index);    
    }, 
    
    _destroyOldItems : function(item, depth) {
        
        if (Ext.isEmpty(item.oldItem) == false && depth >= 1) {
            this._destroyOldItems(item.oldItem, --depth);
            item.destroy();
        } else {
            return false;
        }
    },
    
    fadeAnimateActiveItem : function(xtype) {
        this.animateActiveItem(xtype, this.getFadeAnimation());
        return this.getActiveItem();
    },
    
    leftSlideAnimateActiveItem : function(xtype){
        //this.animateActiveItem(xtype, this.getLeftSlideAnimation());
        this.animateActiveItem(xtype, this.getFadeAnimation());
        return this.getActiveItem(); 
    },
    
    rightSlideAnimateActiveItem : function(xtype){
        //this.animateActiveItem(xtype, this.getRightSlideAnimation());
        this.animateActiveItem(xtype, this.getFadeAnimation());
        return this.getActiveItem();
    },
    
    showActiveItem : function(activeItem, delay) {
        var delay = delay || 250;
        
        if (activeItem.activeItemAnimation) {
            activeItem.activeItemAnimation.destroy();
        }
        
        Ext.defer(function(){
            this.setActiveItem(activeItem);
        }, delay, this);
    }
});