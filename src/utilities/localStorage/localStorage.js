const Cookies = require('js-cookie');

const hasLocalStorage = (function() {
    try {
        localStorage.setItem('foo', 'bar');
        localStorage.removeItem('foo');
        return true;
    } catch (e) {
        return false;
    }
}());

const localStorage = {
    localStorage: {
        set: function(key, value){
            value = JSON.stringify(value);
            if (hasLocalStorage) {
                localStorage.setItem(key, value);
            } else {
                Cookies.set(key, value);
            }
        },
        get: function(key) {
            if (hasLocalStorage) {
                const value = localStorage.getItem(key);
                return value ? JSON.parse(value) : value;
            } else {
                return Cookies.getJSON(key);
            }
        },
        remove: function(key) {
            if (hasLocalStorage) {
                localStorage.removeItem(key);
            } else {
                Cookies.remove(key);
            }
        },
        getLength: function() {
            if (hasLocalStorage) {
                let keys = [];
                for (let key in localStorage.get()) {      
                    if (localStorage.get().hasOwnProperty(key)) keys.push(key);
                }
                return keys.length;
            } else {
                let keys = [];
                for (let key in Cookies.getJSON()) {      
                    if (Cookies.getJSON().hasOwnProperty(key)) keys.push(key);
                }
                return keys.length;
            }
        },
        getAll: function() {
            if (hasLocalStorage) {
                return localStorage.get();
            } else {
                return Cookies.getJSON();
            }
        }
    }
}

module.exports = localStorage;