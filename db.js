const MongoClient = require('mongodb').MongoClient;

const uri = "mongodb+srv://filiipp:<12012000filipp>@cluster0-hhu4a.mongodb.net/test?retryWrites=true&w=majority"
MongoClient.connect(uri, { useNewUrlParser: true }, function(err, client) {
   if(err) {
        console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
   }
   console.log('Connected...');
   const collection = client.db("test").collection("devices");
   client.close();
});