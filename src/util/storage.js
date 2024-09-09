export const LocalStorage = {
    setItem: (key, value) => { localStorage.setItem(key, value); },
    setItemWithExpiry: (key, value, expiry) => {
        // if the expiry time is 0, it means there is no need to add the item
        if (expiry === 0) return
        localStorage.setItem(key, value)
        let timer;
        if (expiry) {
            timer = setTimeout(() => {
                this.removeItem(key);
                timer && clearTimeout(timer)
            }, expiry)
        }
    },
    getItem: (key) => { localStorage.getItem(key); },
    removeItem: (key) => { localStorage.removeItem(key); },
    clearAll: () => { localStorage.clear(); }
}

export const SessionStorage = {
    setItem: (key, value) => { sessionStorage.setItem(key, value); },
    getItem: (key) => { sessionStorage.getItem(key); },
    removeItem: (key) => { sessionStorage.removeItem(key); },
    clearAll: () => { sessionStorage.clear(); }
} 
