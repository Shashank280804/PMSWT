const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Connection URL and Database Name
const url = 'mongodb://localhost:27017';
const dbName = 'PMS';

// Use bodyParser middleware to parse JSON and form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Set up the route for saving a vehicle in the parking lot
app.post('/addVehicle', async (req, res) => {
  try {
    const client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = client.db(dbName);
    const collection = db.collection('Cars');

    const vehicleData = {
      name: req.body.name,
      vehicle_name: req.body.vehicle_name,
      vehicle_number: req.body.vehicle_number,
      entry_date: req.body.entry_date,
      exit_date: req.body.exit_date
    };

    await collection.insertOne(vehicleData);

    res.status(201).send('Vehicle added successfully');
  } catch (error) {
    console.error('Error adding vehicle:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Set up the route for getting all vehicles
app.get('/getVehiclesAll', async (req, res) => {
  try {
    const client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = client.db(dbName);
    const collection = db.collection('Cars');

    // Query all vehicles in the collection
    const allVehicles = await collection.find({}).toArray();

    console.log('All Vehicles:', allVehicles);

    res.json(allVehicles);
  } catch (error) {
    console.error('Error getting all vehicles:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Set up the route for editing a vehicle
app.put('/editVehicle/:id', async (req, res) => {
  try {
    const client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = client.db(dbName);
    const collection = db.collection('Cars');

    const vehicleId = req.params.id;

    // Update the vehicle with the provided ID
    await collection.updateOne(
      { _id: new MongoClient.ObjectID(vehicleId) },
      {
        $set: {
          name: req.body.name,
          vehicle_name: req.body.vehicle_name,
          vehicle_number: req.body.vehicle_number,
          entry_date: req.body.entry_date,
          exit_date: req.body.exit_date
        }
      }
    );

    res.status(200).send('Vehicle updated successfully');
  } catch (error) {
    console.error('Error editing vehicle:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Set up the route for deleting a vehicle
app.delete('/deleteVehicle/:id', async (req, res) => {
  try {
    const client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = client.db(dbName);
    const collection = db.collection('Cars');

    const vehicleId = req.params.id;

    // Delete the vehicle with the provided ID
    await collection.deleteOne({ _id: new MongoClient.ObjectID(vehicleId) });

    res.status(200).send('Vehicle deleted successfully');
  } catch (error) {
    console.error('Error deleting vehicle:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
