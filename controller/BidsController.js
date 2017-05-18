Ext.define('TouchApp.controller.BidsController', {
    extend: "Ext.app.Controller",

    config: {
        refs: {
            mainPanel : 'MainPanel',
            preloaderView : 'PreloaderView',
            bidsList : 'BidsList',
            bidView : 'BidView',
            bidReportForm : 'BidReportForm',
            bidReportRejectForm : 'BidReportRejectForm',
            bidReportTasks : 'BidReportTasksEditingList',
            bidReportAdditionalTasksList : 'BidReportSelectAdditionalTasksPanel',
            bidMap : 'BidMap',
            bidReportImagesEditor : 'BidReportImagesEditingList',
            bidReportImagesPreview : 'BidReportImagesPreviewPanel'
        },
        control: {
            bidsList : {
                itemtap : 'onBidsListItemTap'
            },
            bidView : {
                reportbtntap : 'onBidReportBtnTap',
                rejectbtntap : 'onBidRejectBtnTap',
                makepdfbtntap : 'onBidMakePdfBtnTap',
                locationbtntap : 'onBidLocationBtnTap'
            },
            bidReportForm : {
                savebtntap : 'onBidReportSave',
                addtasksbtntap : 'onBidReportTasksAddBtnTap'
            },
            bidReportRejectForm : {
                savebtntap : 'onBidReject'
            },
            bidReportAdditionalTasksList : {
                acceptbtntap : 'onBidReportAdditionalTasksAcceptBtnTap'
            },
            bidReportImagesEditor : {
                itemtap : 'onReportImageTap',
                filefieldchange : 'onUploadReportImages_Browser',
                albumbtntap : 'onReportImagesAlbumBtnTap',
                camerabtntap : 'onReportImageCameraBtnTap'
            },
            bidReportImagesPreview : {
                deletebtntap : 'onDeleteReportImage'
            }
        },
        routes : {
            'bids/:id' : 'onShowBidById',
            'bids/report/:id' : 'onShowBidReport',
            'bids/report/:id/imagePreview/:index' : 'onShowBidReportImages',
            'bids/reject/:id' : 'onShowBidRejectReport',
            'bids/report/:id/tasks' : 'onShowBidReportAdditionalTasks',
            'bids/type/:type' : 'onShowBids',
            'bids/location/:id' : 'onShowBidLocation'
        }
    },
    
    launch : function(){
        this.callParent(arguments);
    },
    
    onBidsListItemTap : function(list, index, target, record, e){
        this.redirectTo('bids/' + record.get('id'));
    },
    
    onBidReportBtnTap : function(bidView) {
        this.redirectTo('bids/report/' + bidView.getForm().getRecord().get('id'));
    },
    
    onBidRejectBtnTap : function(bidView){
        this.redirectTo('bids/reject/' + bidView.getForm().getRecord().get('id'));
    },
    
    onBidLocationBtnTap : function(bidView) {
        var record = bidView.getForm().getRecord();
      
        if (Ext.isEmpty(record.get('geo'))) {
            Ext.Msg.alert("Карта недоступна!", "Не задано местопложение торговой точки!");
            return false;
        }
        
        this.redirectTo('bids/location/' + record.get('id'));    
    },
    
    onBidReportTasksAddBtnTap : function(panel) {
        this.redirectTo('bids/report/' + panel.getForm().getRecord().get('id') + '/tasks');
    },

    onShowBids : function(type) {
        var mainPanel= this.getMainPanel(),
            type = type.toUpperCase().substr(0,1) + type.substr(1);
            
        if (mainPanel.showPreviousItem(type + 'BidsList')) {
            return false;    
        }

        if (mainPanel.getActiveItem().isXType(type + 'BidsList') == false) {
            mainPanel.leftSlideAnimateActiveItem(type + 'BidsList');       
        }
    },
    
    onShowBidById : function(id){
        var mainPanel= this.getMainPanel();
        
        if (mainPanel.showPreviousItem('BidView')) {
            return false;
        }
        
        var preloaderView = mainPanel.leftSlideAnimateActiveItem("PreloaderView");
        preloaderView.setToolbarTitle("Обзор заявки");
        
        mainPanel.addPanel('BidView', function(panel){

            TouchApp.model.BidModel.load(id, {
                success : function(record){
                    if (record) {
                        panel.setRoutePath('bids/' + id);
                        panel.getForm().setRecord(record);
                        
                        var tasksList = panel.down('BidTasksList');
                        tasksList.setData(record.get('tasks'));
                        
                        var materialsList = panel.down('BidMaterialsList');
                        materialsList.setData(record.get('materials'));
                        
                        panel.down('#btnReject').setHidden(record.get('status') == 2);
    
                        mainPanel.showActiveItem(panel);    
                    }
                }
            });
        });
    },
    
    onShowBidRejectReport : function(id){
        var mainPanel = this.getMainPanel();
        var form = mainPanel.fadeAnimateActiveItem('BidReportRejectForm');
        form.setBidId(id);
    },
    
    onShowBidReportAdditionalTasks : function(id){
        var tasksView = this.getMainPanel().leftSlideAnimateActiveItem('BidReportSelectAdditionalTasksPanel');
        tasksView.setBidId(id);
    },
    
    onShowBidReport : function(id){
        var mainPanel = this.getMainPanel();

        if (mainPanel.showPreviousItem('BidReportForm')) {
            return false;
        }

        var preloaderView = mainPanel.leftSlideAnimateActiveItem('PreloaderView');
        preloaderView.setToolbarTitle("Отчет <br/> о выполнении");
        
        mainPanel.addPanel('BidReportForm', function(panel){
            
            TouchApp.model.BidReportModel.load(id, {
                success : function(record){
                    if (record) {
                        panel.setRoutePath('bids/report/' + id);
                    
                        if (Ext.isEmpty(record.get('completed_date'))) {
                            record.set('completed_date', new Date());
                        }
                        
                        panel.getForm().setRecord(record);
                        
                        var tasksList = panel.down('#tasksList');
                        tasksList.getStore().removeAll();
                        tasksList.getStore().add(record.get('tasks'));
                        
                        var imagesList = panel.down('#imagesList');
                        imagesList.getStore().removeAll();
                        
                        if (Ext.isEmpty(record.get('images'))) {
                            imagesList.onInitList();    
                        } else {
                            imagesList.getStore().add(record.get('images'));    
                        }

                        mainPanel.showActiveItem(panel);
                    }
                }
            });
            
        });
    },
    
    onShowBidLocation : function(id){
        var mainPanel = this.getMainPanel(),
            bidView = this.getBidView();
            
        if (Ext.isEmpty(bidView)) {
            return false;
        }
        
        var record = bidView.getForm().getRecord();
            mapObject = new Array(),
            geo = record.get('geo');
        
        if (Ext.isEmpty(record) || Ext.isEmpty(geo)) {
            history.back();
            return false;
        }
            
        mapObject.push(geo.replace(",",";"));
        mapObject.push(record.get('name'));
        mapObject.push(record.get('address'));
        
        var mapPanel = mainPanel.fadeAnimateActiveItem('BidMap');
        
        mapPanel.setYmapUrl(Ext.String.format("{0}?objects=[{1}]", TouchApp.Settings.getUrls()['bids.locations'], mapObject.join(";")));
        
    },
    
    onBidReportSave : function(panel) {        
        var model = Ext.create('TouchApp.model.BidReportModel'),
            form = panel.getForm(),
            formRecord = form.getRecord(),
            tasksList = form.down('#tasksList'),
            imagesList = form.down('#imagesList'),
            isValidTasks = false,
            me = this;
            
        model.set(form.getValues());
        model.set('tasks', tasksList.getData());
        model.set('images', TouchApp.ux.util.Format.recordsToArray(imagesList.getStore().getRange()));
        
        if (Ext.isEmpty(TouchApp.Settings.getIdentity('geo')) == false) {
            model.set('geo', TouchApp.Settings.getIdentity('geo'));
        }

        Ext.Array.forEach(model.get('tasks'), function(task){
            if (Number(task.completed) > 0 || task.completed === true) {
                isValidTasks = true;
                return true;
            }
        });
        
        if (! isValidTasks) {
            Ext.Msg.alert("Невозможно сохранить отчет!", "Ни одна задача не отмечена как выполненная!");
            return false;
        }
        
        Ext.Viewport.setMasked({
            xtype : 'loadmask',
            message : 'Сохранение ...'
        });

        model.save({
            success : function(record, operation) {
                if (TouchApp.ux.util.Response.isValidStatus(operation.getResponse().responseText)) {

                    var closeBidsList = me.getMainPanel().down('CloseBidsList'),
                        rejectBidsList = me.getMainPanel().down('RejectBidsList'),
                        openBidsList = me.getMainPanel().down('OpenBidsList');
                    
                    if (Ext.isEmpty(closeBidsList) == false) {
                        closeBidsList.setReloadRequest(true)
                    }
                    if (Ext.isEmpty(rejectBidsList) == false) {
                        rejectBidsList.setReloadRequest(true)
                    }
                    if (Ext.isEmpty(openBidsList) == false) {
                        openBidsList.setReloadRequest(true);
                    }

                    me.getMainPanel().goBack(2);
                }   
            },
            callback : function() {
                Ext.Viewport.setMasked(false);
            }
        });
    },

    onBidReportAdditionalTasksAcceptBtnTap : function(panel) {
        var list = panel.getList(),
            selectedRecords = list.getSelection();
            
        if (selectedRecords.length) {
            var reportTasksList = this.getBidReportTasks();

            for (var i in selectedRecords) {
                if (Ext.isEmpty(reportTasksList.getStore().findRecord('task_id', selectedRecords[i].get('task_id')))) {
                    reportTasksList.getStore().add(Ext.create('TouchApp.model.BidReportTaskModel', selectedRecords[i].getData()));   
                }    
            }
            history.back();
        }
    },
    
    onBidReject : function(panel){
        var model = Ext.create('TouchApp.model.BidRejectModel', panel.getForm().getValues());
            errors = model.validate(),
            me = this;
        
        if (! errors.isValid()) {
            errors.each(function(error, index){
                panel.getForm().getFields(error.getField()).markInvalid(true);
            });
            Ext.Msg.alert(null, 'Не заполнены обязательные поля!');
            return false;
        }
        
        Ext.Viewport.setMasked({
            xtype : 'loadmask',
            message : 'Сохранение ...'
        });
        
        model.save({
            success : function(record, operation) {
                if (TouchApp.ux.util.Response.isValidStatus(operation.getResponse().responseText)) {
                    
                    var closeBidsList = me.getMainPanel().down('CloseBidsList'),
                        rejectBidsList = me.getMainPanel().down('RejectBidsList'),
                        openBidsList = me.getMainPanel().down('OpenBidsList');
                    
                    if (Ext.isEmpty(closeBidsList) == false) {
                        closeBidsList.setReloadRequest(true)
                    }
                    if (Ext.isEmpty(rejectBidsList) == false) {
                        rejectBidsList.setReloadRequest(true)
                    }
                    if (Ext.isEmpty(openBidsList) == false) {
                        openBidsList.setReloadRequest(true);
                    }
                    
                    me.getMainPanel().goBack(2);
                }
            },
            callback : function() {
                Ext.Viewport.setMasked(false);
            }
        });
        
    },
    
    onBidMakePdfBtnTap : function(bidView) {
        var identityStore = Ext.getStore('IdentityLocalStore');
        if (identityStore.getCount()) {
            var identityRecord = identityStore.getAt(0),
                bidRecord = bidView.getForm().getRecord();
            window.open(TouchApp.Settings.getUrl('bids.makePdf') + "?id=" + bidRecord.get('id') + "&api_key=" + identityRecord.get('api_key'), '_system', 'location=no');
        }
    },
    
    onUploadReportImages_Browser : function(list){
        var imagesForm = list.getImagesForm(),
            fileField = imagesForm.down('filefield'),
            files = fileField.getComponent().input.dom.files,
            gps = TouchApp.Settings.getIdentity('geo');

        /*if (Ext.isEmpty(gps)) {
            Ext.Msg.alert('Местоположение не определено!', 'Для загрузки изображений необходимо включить GPS! <br />(Если GPS включен подождите 10-30 сек. или перезапустите приложение.)');
            fileField.clear();
            return false;
        }*/
            
        if (files.length) {
            
            Ext.Viewport.setMasked({
                xtype  :'loadmask',
                message : 'Загрузка изображений ...'
            });
            
            imagesForm.submit({
                url : TouchApp.Settings.getUrl('bids.uploadImages'),
                method : 'POST',
                xhr2 : true,
                timeout : 120000,
                params : {
                    gps : gps
                },
                success : function(form, response) {
                    Ext.Viewport.setMasked(false);
                    
                    list.getStore().add(response.records);
                    fileField.clear();
                },
                failure : function(){
                    Ext.Viewport.setMasked(false);
                    fileField.clear();
                }
            });
        }
    },
    
    //Выбор и загрузка изображений из галереи (cordova plugin)
    onReportImagesAlbumBtnTap : function(list){
        window.imagePicker.getPictures(function(results){

            if (results.length == 0) {
                return false;
            }
            
            var gps = TouchApp.Settings.getIdentity('geo');
        
            /*if (Ext.isEmpty(gps)) {
                Ext.Msg.alert('Местоположение не определено!', 'Для загрузки изображений необходимо включить GPS! <br />(Если GPS включен подождите 10-30 сек. или перезапустите приложение.)');
                return false;
            }*/
            
            Ext.Viewport.setMasked({
                xtype  :'loadmask',
                message : 'Загрузка изображений ...'
            });
            
            var successUploaded = 0;
            
            for (var i=0; i<results.length; i++){
                
                TouchApp.ux.cordova.FileTransfer.upload({
                    filePath : results[i],
                    url : TouchApp.Settings.getUrl('bids.uploadImages'),
                    params : {
                        api_key : TouchApp.Settings.getIdentity('api_key'),
                        gps : gps
                    },
                    success : function(response){
                        if (response.status == 200) {
                            list.getStore().add(response.records);
                            successUploaded ++;
                        } 
                        if (successUploaded == results.length) {
                            Ext.Viewport.setMasked(false);    
                        }
                    },
                    failure : function() {
                        Ext.Viewport.setMasked(false);     
                    }
                });
            }
        });
    },
    
    // Загрузка снимка с камеры (phonegap)
    onReportImageCameraBtnTap : function(list) {
        
        var gps = TouchApp.Settings.getIdentity('geo');
        
        /*if (Ext.isEmpty(gps)) {
            Ext.Msg.alert('Местоположение не определено!', 'Для загрузки изображений необходимо включить GPS! <br />(Если GPS включен подождите 10-30 сек. или перезапустите приложение.)');
            return false;
        }*/
        
        Ext.device.Camera.capture({
            source : 'camera',
            destination : 'file',
            encoding : 'jpg',
            quality: 75,
            success : function(image) {                
                
                Ext.Viewport.setMasked({
                    xtype  :'loadmask',
                    message : 'Загрузка фото ...'
                });
                
                TouchApp.ux.cordova.FileTransfer.upload({
                    filePath : image,
                    url : TouchApp.Settings.getUrl('bids.uploadImages'),
                    params : {
                        api_key : TouchApp.Settings.getIdentity('api_key'),
                        gps : gps
                    },
                    success : function(response){
                        if (response.status == 200) {
                            list.getStore().add(response.records);    
                        }
                        Ext.Viewport.setMasked(false); 
                    },
                    failure : function() {
                        Ext.Viewport.setMasked(false); 
                    }
                });
            }
        });    
    },
    
    onReportImageTap : function(dataview, index, imageRecord) {
        var reportForm = this.getBidReportForm(),
            reportRecord = reportForm.getForm().getRecord();
        if (reportRecord && imageRecord) {
            this.redirectTo('bids/report/' + reportRecord.get('id') + '/imagePreview/' + index);    
        }
        
    },
    
    onShowBidReportImages : function(bidId, imageIndex) {
        var reportForm = this.getBidReportForm();
        
        if (reportForm) {
            var imagesStore = reportForm.down('#imagesList').getStore(),
                imagesCarousel = this.getMainPanel().fadeAnimateActiveItem('BidReportImagesPreviewPanel');
            imagesCarousel.buildItems(imagesStore.getRange(), imageIndex); 
        } else {
            this.redirectTo('nav');
        }
    },
    
    onDeleteReportImage : function(carousel){
        Ext.Msg.confirm(null, "Удалить изображение?", function(btn){
            if (btn == 'yes') {
                var reportForm = this.getBidReportForm();
        
                if (reportForm) {
                    var imagesList = reportForm.down('#imagesList');
                    imagesList.getStore().removeAt(carousel.getActiveIndex());
                    carousel.remove(carousel.getActiveItem());  
                }
            }
        }, this);   
    }
    
});