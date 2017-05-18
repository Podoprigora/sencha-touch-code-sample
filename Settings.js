Ext.define('TouchApp.Settings', {
    
    singleton: true,
    
    requires : [
        'TouchApp.model.IdentityModel'
    ],
    
    config : {
        identityModel : null,
        baseUrl : 'http://iposm.localhost.dev/mobapi/',
        //baseUrl : 'http://192.168.1.100/mobapi/',
        //baseUrl : 'https://iposm.net/mobapi/',
        urls : {
            'auth.login' : 'auth/login',
            'pendingCounters' : 'index/pending-counters',
            'bids.list' : 'bids/list',
            'bids.read' : 'bids/read',
            'bids.report.read' : 'bids/read-report',
            'bids.report.save' : 'bids/accept',
            'bids.reject' : 'bids/reject',
            'bids.report.available.tasks' : 'bids/report-additional-tasks' ,
            'bids.makePdf' : 'bids/make-pdf',
            'bids.locations' : 'http://iposm.localhost.dev/geom/locations.php',
            'bids.uploadImages' : 'bids/upload-images',
            'bids.previewImage' : 'bids/preview-image',
            'messages.list' : 'messages/list',
            'messages.read' : 'messages/read',
            'messages.save' : 'messages/save'
        }
    },
    
    constructor : function(config) {
        this.initConfig(config);
    },
    
    getUrl: function(key) {
        return this.getBaseUrl() + this.getUrls()[key];
    },
    
    setIdentity : function(property, value) {
        this.getIdentityModel().set(property, value);
        this.getIdentityModel().save();
    },
    
    getIdentity : function(property) {
        return this.getIdentityModel().get(property);   
    }
});