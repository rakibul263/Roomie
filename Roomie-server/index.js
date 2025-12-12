const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;
require("dotenv").config();

app.use(express.json());
app.use(cors());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.08bzjfv.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: false,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    const db = client.db("RoomieUserInfo");
    const RoomieUserCollection = db.collection("userInfo");
    const RoomieCollection = db.collection("roommate");
    const ListCollection = db.collection("mylist");

    // POST route
    app.post("/userInfo", async (req, res) => {
      const result = await RoomieUserCollection.insertOne(req.body);
      res.send(result);
    });

    app.get("/userInfo", async (req, res) => {
      const result = await RoomieUserCollection.find().toArray();
      res.send(result);
    });

    app.post("/roommate", async (req, res) => {
      const result = await RoomieCollection.insertOne(req.body);
      res.send(result);
    });

    app.get("/roommate", async (req, res) => {
      const result = await RoomieCollection.find().toArray();
      res.send(result);
    });

    app.post("/mylist", async (req, res) => {
      const result = await ListCollection.insertOne(req.body);
      res.send(result);
    });

    app.get("/mylist", async (req, res) => {
      const result = await ListCollection.find().toArray();
      res.send(result);
    });

    app.put("/roommate/:id", async (req, res) => {
      try {
        const id = req.params.id;

        if (!ObjectId.isValid(id)) {
          return res
            .status(400)
            .send({ success: false, message: "Invalid ID" });
        }

        const result = await RoomieCollection.updateOne(
          { _id: new ObjectId(id) },
          { $set: req.body }
        );

        if (result.modifiedCount > 0) {
          return res.send({
            success: true,
            message: "Profile updated successfully",
            result,
          });
        } else {
          return res.send({
            success: false,
            message: "No changes made",
            result,
          });
        }
      } catch (error) {
        res.status(500).send({ success: false, message: "Update failed" });
      }
    });

    app.delete("/mylist/:id", async (req, res) => {
      const result = await ListCollection.deleteOne({
        _id: new ObjectId(req.params.id),
      });
      res.send(result);
    });

    app.get("/roommate/:id", async (req, res) => {
      const result = await RoomieCollection.findOne({
        _id: new ObjectId(req.params.id),
      });
      res.send(result);
    });

    console.log("MongoDB connected");
  } catch (err) {
    console.error("Server Error:", err);
  }
}

run();

app.get("/", (req, res) => {
  res.send("Roomie Server is running...");
});

app.listen(port, () => {
  console.log(`Roomie server is running on port ${port}`);
});
