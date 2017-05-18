Ext.define('TouchApp.model.MessageModel', {
    extend : 'Ext.data.Model',
    
    config : {
        idProperty : 'id',
        fields : [
            {name : 'id', type : 'int'},
            {name : 'parent_id', type : 'int'},
            {name : 'message', type : 'string'},
            {name : 'created', type : 'date', dateFormat : 'Y-m-d H:i:s', persist : false},
            {name : 'sender_id', type : 'int', persist : false},
            {name : 'sender_first_name', type : 'string', persist : false},
            {name : 'sender_last_name', type : 'string', persist : false},
            {name : 'sender', type : 'string', persist : false, convert : function(v, record){
                return [record.get('sender_last_name'), record.get('sender_first_name')].join(' ');    
            }},
            {name : 'recipient_id', type : 'int'},
            {name : 'recipient_first_name', type : 'string', persist : false},
            {name : 'recipient_last_name', type : 'string', persist : false},
            {name : 'recipient', type : 'string', persist : false, convert : function(v, record){
                return [record.get('recipient_last_name'), record.get('recipient_first_name')].join(' ');
            }},
            {name : 'unread_count', type : 'int', persist : false},
            {name : 'user', type : 'string', persist : false, convert : function(v, record){
                if (TouchApp.Settings.getIdentity('user_id') == record.get('sender_id')) {
                    return [record.get('recipient_last_name'), record.get('recipient_first_name')].join(' ');
                }
                return [record.get('sender_last_name'), record.get('sender_first_name')].join(' ');
            }}
        ],
        
        validations : [
            {field : 'parent_id', type : 'presence'},
            {field : 'recipient_id', type : 'presence'},
            {field : 'message', type : 'presence'}
        ],
        
        proxy : {
            type : 'ajax',
            api : {
                create : TouchApp.Settings.getUrl('messages.save')
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