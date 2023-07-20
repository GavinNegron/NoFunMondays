const { MongoClient, ServerApiVersion } = require('mongodb');
const client = new MongoClient(process.env.DB_CONNECT, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  });
const dbConn = async() => {
    async function run() {
        try {
          // Send a ping to confirm a successful connection
          await client.db("admin").command({ ping: 1 });
          console.log("Server pinged: Successfully connected to MongoDB Database");
        } finally {
          // Ensures that the client will close when you finish/error
          await client.close();
        }
      }
      run().catch(console.dir);
}
module.exports = dbConn;