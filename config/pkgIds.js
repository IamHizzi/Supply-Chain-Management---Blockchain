var collectionForMyIds = ["ItemId", "ConsignmentId", "ManifestId"];
const uri = require("./keys").uri;
const { MongoClient } = require("mongodb");
  const clientdb = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
// databases
function createIdsForMyapp() {
  clientdb.connect((err) => {
    const db1 = clientdb.db("TMS");
    collectionForMyIds.forEach(function (name) {
      db1.createCollection(name, (err, res) => {
        if (err) throw err;
        //console.log(name, "Collection Created");
      });
    });
    var items = db1.collection("ItemId")
    var cons = db1.collection("ConsignmentId")
    var  mfs = db1.collection("ManifestId")
    items.insert({_id: "item_id" , sequence_value : 0 })
    cons.insert({_id: "consignment_id" , sequence_value : 0 })
    mfs.insert({_id: "manifest_id" , sequence_value : 0 })    
    // perform actions on the collection object
    //clientdb.close();
  });
}



module.exports.createIds = createIdsForMyapp;