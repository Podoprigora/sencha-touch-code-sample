Ext.define('TouchApp.model.BidModel', {
    extend : 'Ext.data.Model',
    
    config : {
        idProperty : 'id',
        fields : [
            {name : 'id', type : 'int'},
            {name : 'status', type : 'int'},
            {name : 'name', type : 'string'},
            {name : 'address', type : 'string'},
            {name : 'geo', type : 'string'},
            {name : 'needtime', type : 'string'},
            {name : 'contact', type : 'string'},
            {name : 'description', type : 'string'},
            {name : 'createdate', type : 'date', dateFormat : 'Y-m-d H:i:s'},
            {name : 'transferdate', type : 'date', dateFormat : 'Y-m-d H:i:s'},
            {name : 'author', type : 'auto', convert : function(v){
                if (! v) {
                    return "";
                }
                
                var res = new Array();
                
                if (v.last_name) {
                    res.push(v.last_name);
                }
                if (v.first_name) {
                    res.push(" ");
                    res.push(v.first_name);
                }
                if (v.phone1) {
                    res.push(", ");
                    res.push(v.phone1);
                }
                if (v.phone2) {
                    res.push(", ");
                    res.push(v.phone2);
                }
                return res.join("");
            }},
            {name : 'tasks', type : 'auto'},
            {name : 'materials', type : 'auto'}
        ],
        
        hasMany : [
            {
                model : 'TouchApp.model.BidTaskModel',
                name : 'getTasks',
                associationKey : 'tasks'
            },
            {
                model : 'TouchApp.model.BidMaterialModel',
                name : 'getMaterials',
                associationKey : 'materials'
            }
        ],
        
        proxy : {
            type : 'ajax',
            api : {
                read : TouchApp.Settings.getUrl('bids.read')
            },
            reader : {
                type : 'json'
            },
            writer : {
                type : 'json'
            }
        }
    }
});