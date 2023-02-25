class App {
    constructor() {
        this.dbName = 'app-inventory';
        this.dbVersion = 1;
    }

    async initObjectStore() {
        return new Promise((resolve, reject) => {
            let request = indexedDB.open(this.dbName, this.dbVersion);

            request.onsuccess = event => {
                resolve(event.target.result);
            };

            request.onerror = event => {
                reject(event);
                alert('Error Event, check console');
                //console.error(event);
            }

            request.onupgradeneeded = event => {
                //console.log('idb onupgradeneeded firing');

                let db = event.target.result;

                let objectStore = db.createObjectStore('items', {
                    keyPath: 'id',
                    autoIncrement: true
                });

                objectStore.createIndex('nama', 'nama', {
                    unique: false
                });

                objectStore = db.createObjectStore('customers', {
                    keyPath: 'id',
                    autoIncrement: true
                });

                objectStore.createIndex('nama', 'nama', {
                    unique: false
                });
            };
        });
    }

    async initDB() {
        return new Promise((resolve, reject) => {
            let request = indexedDB.open(this.dbName, this.dbVersion);

            request.onsuccess = event => {
                resolve(event.target.result);
            };

            request.onerror = event => {
                reject(event);
                alert('Error Event, check console');
                //console.error(event);
            }
        });
    }

    deleteDB() {
        let request = indexedDB.deleteDatabase(this.dbName);

        request.onsuccess = event => {
            console.log(event.target.result);
        };

        request.onerror = event => {
            reject(event);
            alert('Error Event, check console');
            //console.error(event);
        }
    }

    async getDataAll(objectName) {
        let db = await this.initDB();

        return new Promise((resolve, reject) => {
            let transaction = db.transaction([objectName], 'readonly');

            transaction.onerror = event => {
                reject(event);
            };

            let store = transaction.objectStore(objectName);
            store.getAll().onsuccess = event => {
                resolve(event.target.result);
            };
        });
    }

    async getData(objectName, key) {
        let db = await this.initDB();

        return new Promise((resolve, reject) => {
            let transaction = db.transaction([objectName], 'readonly');

            transaction.onerror = event => {
                reject(event);
            };

            let store = transaction.objectStore(objectName);
            store.get(key).onsuccess = event => {
                resolve(event.target.result);
            };
        });
    }

    async removeData(objectName, key) {
        let db = await this.initDB();

        return new Promise((resolve, reject) => {
            let transaction = db.transaction([objectName], 'readwrite');

            transaction.oncomplete = event => {
                resolve();
            };

            transaction.onerror = event => {
                reject(event);
            };

            let store = transaction.objectStore(objectName);
            store.delete(key);
        });
    }

    async removeDataAll(objectName) {
        let db = await this.initDB();

        return new Promise((resolve, reject) => {
            let transaction = db.transaction([objectName], 'readwrite');

            transaction.oncomplete = event => {
                resolve();
            };

            transaction.onerror = event => {
                reject(event);
            };

            let store = transaction.objectStore(objectName);
            store.clear();
        });
    }

    async store(objectName, data) {
        let db = await this.initDB();

        return new Promise((resolve, reject) => {
            let transaction = db.transaction([objectName], 'readwrite');
            transaction.oncomplete = event => {
                resolve();
            };

            transaction.onerror = event => {
                reject(event);
            };

            let store = transaction.objectStore(objectName);
            store.put(data);
        });
    }

    async loadFile(file) {
        return new Promise((resolve, reject) => {
            let reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = () => reject(reader.result);
            reader.readAsDataURL(file);
        });
    }
}