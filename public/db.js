const request = window.indexedDB.open("budgetDB", 1);
let db,
    tx,
    store;

request.onupgradeneeded = function (e) {
    const db = request.result;
    db.createObjectStore("transaction", { keyPath: "_id" });
};

request.onerror = function (e) {
    console.log("There was an error");
};

function dbCheck() {
    let transaction = db.transaction("[pending]", "readwrite");
    let store = db.objectStore("transaction");
    let getAll = store.getAll();

    getAll.onsuccess = function (e) {
        db = request.result;
        // tx = db.transaction("transaction", "readwrite");
        // store = tx.objectStore("transaction");


        // fetch request

        db.onerror = function (e) {
            console.log("error");
        };
        if (method === "put") {
            store.put(object);
        }
        if (method === "clear") {
            store.clear();
        }
        if (method === "get") {
            const all = store.getAll();
            all.onsuccess = function () {
                resolve(all.result);
            };
        }
        tx.oncomplete = function () {
            db.close();
        };
    };
}


function saveRecord(record) {
    let transaction = db.transaction("pending", "readwrite");
    let store = db.objectStore("transaction");
    store.add(record)
}

window.addEventListener("online", dbCheck);


