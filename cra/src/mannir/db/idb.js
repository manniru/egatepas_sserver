var open = indexedDB.open("EGatePassDB", 1);
open.onupgradeneeded = function() {
  // Create the schema
  var db = open.result;
  var store = db.createObjectStore("MyObjectStore", { keyPath: "id" });
  var index = store.createIndex("NameIndex", ["name.last", "name.first"]);
};




const add = (data) => {
    open.onsuccess = function() {
        var db = open.result; // Start a new transaction
        var tx = db.transaction("MyObjectStore", "readwrite");
        var store = tx.objectStore("MyObjectStore");
        var index = store.index("NameIndex");
        store.put({ id: 1, name: { first: "Mannir", last: "Ahmad" }, age: 30 }); // Add some data
      
        var getMajid = store.get(1);
        getMajid.onsuccess = function() {
          console.log(getMajid.result.name.first);
        }; // => "Majid"
      
        tx.oncomplete = function() {
          db.close();
        };
      };
      console.log('Added!')
}

export default add;
