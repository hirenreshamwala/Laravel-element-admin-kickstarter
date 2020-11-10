import _ from 'lodash';

export default class Auth {
    constructor(user) {
        this.user = user;
    }

	avatar() {
		// return this.user.roles.map(role => role.name);
		const name = this.user.user.name || 'Admin';
		return this.user.user.avatar || 'https://ui-avatars.com/api/?name='+name+'&color=7F9CF5&background=EBF4FF';
	}

    roles() {
        return this.user.roles.map(role => role.name);
        // return this.user.roles.map(role => role);
    }

    hasAnyRole(){
        return (this.user.roles.length >= 1);
    }

    permissions() {
        return this.user.permissions.map(permission => permission.name);
        // return this.user.permissions;
    }

    hasPermission(permission){
        if(this.isSuperAdmin()){
            return true;
        }
        return this.permissions().indexOf(permission) !== -1;
    }

    isAdmin() {
        return this.roles().includes("Admin");
    }

    isSuperAdmin() {
        return this.roles().includes("Super");
    }

    isGuest() {
        return this.roles().includes("Guest");
    }

    can($permissionName) {
        return this.permissions().includes($permissionName);
    }

    modules(){
        let permissions = this.permissions();
        let pr = {};
        if(permissions){
            permissions.map(function(el){
                let module = el.split('.').shift();
                if(typeof pr[module] === 'undefined')  pr[module] = {};
                let obj = {};
                el.split('.').reduce((r, e) => {
                    (typeof r[e] === 'undefined') ? r[e] = {} : '';
                    r[e]['value'] = true;
                    return r[e];
                }, obj);
                pr = _.merge(pr, obj);
                return obj;
            });
        }
        return pr;
    }
    moduleHasPermission(permission){
        if(this.isSuperAdmin()){
            return true;
        } else {
            return permission.split('.').reduce(function(obj, i){
                if(obj[i] && obj[i]['value']){
                    return obj[i]['value'];
                } else {
                    return false
                }
            }, this.modules())
        }


    }
    modules_old(){
        let permissions = this.permissions();
        let userPermissions = {};
        for(let i = 0; i < permissions.length; i++){
            let permission = permissions[i];
            if(permission){
                let perms = permission.split('.');
                let moduleName = perms.shift();
                if(!Array.isArray(userPermissions[moduleName])){
                    userPermissions[moduleName] = [];
                }
                userPermissions[moduleName] = userPermissions[moduleName].concat(perms).unique();
            }
        }
        return userPermissions;
    }

    moduleHasPermissionw(module, permission){
        let moduleWisePermissions = this.modules();
        // const result =  permission.split('.').reduce((o,i)=>o[i], moduleWisePermissions);
        // console.log(result);
        // return (typeof moduleWisePermissions[module] !== 'undefined' && Array.isArray(moduleWisePermissions[module]) && moduleWisePermissions[module].indexof(permission) !== -1);
    }


}
