//Actual Apis
require("dotenv").config();
const express = require("express");
const { MongoClient } = require("mongodb");
// const base64 = require("js-base64");
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require("cors")

// MongoDB connection string
const uri = process.env.MONGODB_URI;

app.use(express.json());
app.use(cors())
let client, db;

// Function to connect to MongoDB
async function connectToMongo() {
    try {
        client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        db = client.db("Infostructure"); // Database name
        console.log('Connected to MongoDB');
    } catch (error) {
        console.log('Not connected to MongoDB', error.message);
    }
}


// A. Users 
// 1. Route to get all users 
// curl http://localhost:8000/users
app.get('/users', async (req, res) => {
    try {
        const usersCollection = db.collection('UsersList'); // Collection name
        const users = await usersCollection.find({}).toArray();
        res.json(users);
    } catch (error) {
        res.status(500).send('Error retrieving users');
    }
});
// 2. Route to get a single user by UserId
//curl -H "Authorization: Basic dXNlcjpwYXNzd29yZA==" -H "Accept: application/json" http://localhost:8000/users/EdnaMode213@gmail.com
app.get('/users/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const usersCollection = db.collection('UsersList'); // Collection name
        const user = await usersCollection.findOne({ UserId: userId });
        
        if (user) {
            res.json(user);
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        res.status(500).send('Error retrieving user');
    }
});
// 3. Add new user
/*
curl -X POST http://localhost:8000/users -H "Content-Type: application/json" -d '{"UserId": "Jimmyjimbo@gmail.com", "FirstName": "jimmy", "HomeAddress": "102 Main Avenue", "LastName": "jimbo", "MobileNumber": "0786542902"}'
*/
// Route to post a new user
app.post('/users', async (req, res) => {
    try {
        const newUser = {
            ...req.body,
            createdAt: new Date() // Add the current date and time
        };

        const usersCollection = db.collection('UsersList');
        const result = await usersCollection.insertOne(newUser);

        if (result) {
            console.log("User has been successfully posted");
            res.status(201).send({
                msg: "User has been successfully posted",
            });
        } else {
            res.status(500).send('Error inserting user');
        }
    } catch (error) {
        console.error('Error inserting user:', error); // More detailed logging
        res.status(500).send('Error processing request');
    }
});
// 4. Update user
//curl -X PUT -H "Authorization: Basic dGFiaXRoYUBnbWFpbC5jb206MTIzNDU=" -H "Content-Type: application/json" -d "{\"FirstName\": \"Edna\", \"HomeAddress\": \"11 Phillip Street\", \"LastName\": \"Smith\", \"MobileNumber\": \"0786542345\"}" http://localhost:8000/users/EdnaMode213%40gmail.com
app.put('/users/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const updatedData = req.body; // Get the updated user data from the request body
        const usersCollection = db.collection('UsersList');

        // Find and update the user
        const result = await usersCollection.updateOne(
            { UserId: userId }, // Filter
            { $set: updatedData } // Update operation
        );

        if (result.modifiedCount === 1) {
            res.json({ msg: 'User updated successfully' });
        } else if (result.matchedCount === 1) {
            res.status(304).send('No changes made'); // No changes made
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        console.error('Error updating user:', error.message);
        res.status(500).send('Error updating user');
    }
});
// 5 Delete user 
//curl -X DELETE http://localhost:8000/products/000 -H "Authorization: Basic dXNlcjpwYXNzd29yZA=="                                 
app.delete('/users/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const usersCollection = db.collection('UsersList'); // Collection name

        // Delete the user
        const result = await usersCollection.deleteOne({ UserId: userId });

        if (result.deletedCount === 1) {
            res.status(200).send('User successfully deleted');
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        console.error('Error deleting user:', error.message);
        res.status(500).send('Error deleting user');
    }
});

//login process
app.post('/login', (req, res) => {
    // from yousaf yt
    const { email, password } = req.body;
    const usersCollection = db.collection('UsersList')
    usersCollection.findOne({email: email})
    .then (user => {
        if (user){
            if (user.password === password){
                res.json("Success")
            }else{
                res.json("the password is incorrect")
            }
        }else{
            res.json("No record existed")
        }
    })

  });
  




// B. LOCATIONS
/*
curl -X GET http://localhost:8000/locations
*/
// 1. get all locations
app.get('/locations', async (req, res) => {
    try {
        const locationsCollection = db.collection('PotentialLocations'); // Updated collection name
        const locations = await locationsCollection.find({}).toArray();
        res.json(locations);
    } catch (error) {
        console.error('Error retrieving locations:', error.message); // Log the error
        res.status(500).send('Error retrieving locations');
    }
});

// 2. get location by userID
//curl -H "Authorization: Basic dXNlcjpwYXNzd29yZA==" -H "Accept: application/json" http://localhost:8000/locations/stacey@gmail.com
app.get('/locations/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const locationsCollection = db.collection('UsersLocation'); // Collection name

        // Find locations by UserId
        const locations = await locationsCollection.find({ UserId: userId }).toArray();

        if (locations.length > 0) {
            res.json(locations);
        } else {
            res.status(404).send('No locations found for this user');
        }
    } catch (error) {
        console.error('Error retrieving locations:', error.message);
        res.status(500).send('Error retrieving locations');
    }
});

// 3. Post a new user location 
/*
curl -X POST http://localhost:8000/locations -H "Authorization: Basic c3RhY2V5QGdtYWlsLmNvbTpwYXNzd29yZDEyMw==" -H "Content-Type: application/json" -d "{\"UserId\": \"stacey@gmail.com\", \"LocationId\": \"12345678\"}"
*/
app.post('/locations', async (req, res) => {
    try {
        const { UserId, LocationId } = req.body; // Extract userId and locationId from request body
        const locationsCollection = db.collection('UsersLocation'); // Collection name

        // Validate that userId and locationId are provided
        if (!UserId || !LocationId) {
            return res.status(400).send('UserId and LocationId are required');
        }

        // Insert new location data
        const result = await locationsCollection.insertOne({
            UserId: UserId,
            LocationId: LocationId
        });


        if (result) {
            res.status(201).send('Location successfully added ' + result.insertedId);
        } else {
            res.status(500).send('Error adding location');
        }
    } catch (error) {
        console.error('Error adding location:', error.message);
        res.status(500).send('Error adding location');
    }
});

// 4. Delete user location
/*
curl -X DELETE http://localhost:8000/locations/121212 -H "Authorization: Basic dXNlcjpwYXNzd29yZA=="
*/
app.delete('/locations/:userId', async (req, res) => {
    try {
        const userId = req.params.userId; // Extract userId from request parameters
        const locationsCollection = db.collection('UsersLocation'); // Collection name

        // Delete all locations for the given UserId
        const result = await locationsCollection.deleteMany({ UserId: userId });

        if (result.acknowledged) {
            res.status(200).send('All locations for the user successfully deleted');
        } else {
            res.status(404).send('No locations found for this user');
        }
    } catch (error) {
        console.error('Error deleting locations:', error.message);
        res.status(500).send('Error deleting locations');
    }
});

// 5 . update location
/*
curl -X PUT http://localhost:8000/locations/121212 -H "Authorization: Basic dXNlc
jpwYXNzd29yZA==" -H "Content-Type: application/j
son" -d "{\"Address\": \"123 New Street\", \"Cit
y\": \"New City\", \"State\": \"NC\", \"ZipCode\
": \"36912\"}"
*/
app.put('/locations/:userId', async (req, res) => {
    try {
        const userId = req.params.userId; // Extract userId from request parameters
        const newLocationData = req.body; // Extract new location data from request body
        const locationsCollection = db.collection('UsersLocation'); // Collection name

        // Validate that newLocationData is provided
        if (!newLocationData) {
            return res.status(400).send('New location data is required');
        }

        // Update the location by UserId
        const result = await locationsCollection.updateMany(
            { UserId: userId },
            { $set: newLocationData }
        );

        if (result.acknowledged) {
            res.status(200).send('Location(s) successfully updated');
        } else {
            res.status(404).send('Location(s) not found');
        }
    } catch (error) {
        console.error('Error updating location(s):', error.message);
        res.status(500).send('Error updating location(s)');
    }
});


// C. PRODUCTS
// 1. get all products 
/*
curl -X GET http://localhost:8000/products
*/
app.get('/products', async (req, res) => {
    try {
        const productsCollection = db.collection('ProductInformation'); // Updated collection name
        const products = await productsCollection.find({}).toArray();
        res.json(products);
    } catch (error) {
        console.error('Error retrieving products:', error.message); // Log the error
        res.status(500).send('Error retrieving products');
    }
});

// 2. get product by ProductID
/*
curl -H "Authorization: Basic dXNlcjpwYXNzd29yZA==" -H "Accept: application/json" http://localhost:8000/products/777
*/
app.get('/products/:productId', async (req, res) => {
    try {
        const productId = req.params.productId; // Extract accountNumber from request parameters
        const productsCollection = db.collection('ProductInformation'); // Collection name

        // Find bank details by AccountNumber
        const productDetails = await productsCollection.findOne({ ProductId : productId });

        if (productDetails) {
            res.json(productDetails);
        } else {
            res.status(404).send('Product details not found');
        }
    } catch (error) {
        console.error('Error retrieving Product details:', error.message); // Log the error
        res.status(500).send('Error retrieving Product details');
    }
});

// 3. Add product 
/*
curl -X POST http://localhost:8000/products -H "Content-Type: application/json" -d '{"Price": "R6 550", "Description": "Gucci dog chain", "ProductName": "Collar king", "ProductBrand": "Gucci", "ProductId": "4490", "Category": "Chains"}'
*/
app.post('/products', async (req, res) => {
    try {
        const newProduct = req.body; // Extract new product details from request body
        const productsCollection = db.collection('ProductInformation'); // Collection name

        // Validate that necessary fields are provided
        if (!newProduct.Price || !newProduct.Description || !newProduct.ProductName || !newProduct.ProductBrand || !newProduct.ProductId || !newProduct.Category) {
            return res.status(400).send('All product fields are required');
        }

        // Insert the new product
        const result = await productsCollection.insertOne(newProduct);

        if (result.acknowledged) {
            res.status(201).send('Product successfully added');
        } else {
            res.status(500).send('Error adding product');
        }
    } catch (error) {
        console.error('Error adding product:', error.message);
        res.status(500).send('Error adding product');
    }
});

// 4. Delete product
/*
curl -X DELETE http://localhost:8000/products/000 -H "Authorization: Basic dXNlcjpwYXNzd29yZA=="    
*/
app.delete('/products/:productId', async (req, res) => {
    try {
        const productId = req.params.productId; // Extract accountNumber from request parameters
        const productsCollection = db.collection('ProductInformation'); // Collection name

        // Delete bank details by AccountNumber
        const result = await productsCollection.deleteOne({ ProductId: productId });

        if (result.acknowledged) {
            res.status(200).send('Product with id : {' + productId + '} successfully deleted');
        } else {
            res.status(404).send('Product not found');
        }
    } catch (error) {
        console.error('Error deleting Product details:', error.message); // Log the error
        res.status(500).send('Error deleting Product details');
    }
});

// 5. Update ProductID
/*
curl -X PUT http://localhost:8000/products/777 -H "Content-Type: application/json" -d '{"Price": "R2 750", "Description": "The bed is white and has a very steady base", "ProductName": "King sized bed", "ProductBrand": "Burrow", "Category": "Beds"}'
*/
app.put('/products/:productId', async (req, res) => {
    try {
        const productId = req.params.productId; // Extract productId from request parameters
        const newProductDetails = req.body; // Extract new product details from request body
        const productsCollection = db.collection('ProductInformation'); // Collection name

        // Validate that newProductDetails is provided
        if (!newProductDetails) {
            return res.status(400).send('New product details are required');
        }

        // Update the product details by ProductId
        const result = await productsCollection.updateOne(
            { ProductId: productId },
            { $set: newProductDetails }
        );

        if (result.acknowledged) {
            res.status(200).send('Product successfully updated');
        } else {
            res.status(404).send('Product not found');
        }
    } catch (error) {
        console.error('Error updating product:', error.message);
        res.status(500).send('Error updating product');
    }
});


// D. BANK DETAILS 
/*
curl -X GET http://localhost:8000/bankdetails
*/
// 1. get All bank details 
app.get('/bankdetails', async (req, res) => {
    try {
        const productsCollection = db.collection('UsersBankDetails'); // Updated collection name
        const products = await productsCollection.find({}).toArray();
        res.json(products);
    } catch (error) {
        console.error('Error retrieving bank details:', error.message); // Log the error
        res.status(500).send('Error retrieving bank details');
    }
});

// 2. get user bank details by Accountnumber
/*
curl -X GET -H "Authorization: Basic dXNlcjpwYXNzd29yZA==" http://localhost:8000/bankdetails/1233323456789
*/
app.get('/bankdetails/:accountNumber', async (req, res) => {
    try {
        const accountNumber = req.params.accountNumber; // Extract accountNumber from request parameters
        const bankDetailsCollection = db.collection('UsersBankDetails'); // Collection name

        // Find bank details by AccountNumber
        const bankDetails = await bankDetailsCollection.findOne({ AccountNumber: accountNumber });

        if (bankDetails) {
            res.json(bankDetails);
        } else {
            res.status(404).send('Bank details not found');
        }
    } catch (error) {
        console.error('Error retrieving bank details:', error.message); // Log the error
        res.status(500).send('Error retrieving bank details');
    }
});

// 3. Post new bank details 
/*
curl -X POST http://localhost:8000/bankdetails -H "Authorization: Basic dXNlcjpwYXNzd29yZA==" -H "Content-Type: application/json" -d "{\"AccountNumber\": \"0987654321\", \"CCV\": \"432\", \"BankName\": \"Standard Bank\", \"UserId\": \"sampuckett@gmail.com\", \"CardExpirationDate\": \"12/2/2026\", \"CardType\": \"Visa\"}"
*/
app.post('/bankdetails', async (req, res) => {
    try {
        const newBankDetails = req.body; // Extract new bank details from request body
        const bankDetailsCollection = db.collection('UsersBankDetails'); // Collection name

        // Validate that necessary fields are provided
        if (!newBankDetails.AccountNumber || !newBankDetails.CCV || !newBankDetails.BankName || !newBankDetails.UserId || !newBankDetails.CardExpirationDate || !newBankDetails.CardType) {
            return res.status(400).send('All bank details fields are required');
        }

        // Insert the new bank details
        const result = await bankDetailsCollection.insertOne(newBankDetails);

        if (result.acknowledged) {
            res.status(201).send('Bank details successfully added');
        } else {
            res.status(500).send('Error adding bank details');
        }
    } catch (error) {
        console.error('Error adding bank details:', error.message);
        res.status(500).send('Error adding bank details');
    }
});

// 4. delete user bank details by AccountNumber 
/*
curl -X DELETE http://localhost:8000/bankdetails/1234567890
*/
app.delete('/bankdetails/:accountNumber', async (req, res) => {
    try {
        const accountNumber = req.params.accountNumber; // Extract accountNumber from request parameters
        const bankDetailsCollection = db.collection('UsersBankDetails'); // Collection name

        // Delete bank details by AccountNumber
        const result = await bankDetailsCollection.deleteOne({ AccountNumber: accountNumber });

        if (result.acknowledged) {
            res.status(200).send('Bank details successfully deleted');
        } else {
            res.status(404).send('Bank details not found');
        }
    } catch (error) {
        console.error('Error deleting bank details:', error.message); // Log the error
        res.status(500).send('Error deleting bank details');
    }
});

// 5. update bank details 
/*
curl -X PUT http://localhost:8000/bankdetails/1233323456789 -H "Content-Type: application/json" -d '{"CCV": "510", "BankName": "Standard Bank", "UserId": "david@gmail.com", "CardExpirationDate": "12/21/2035", "CardType": "mastercard"}'
*/
app.put('/bankdetails/:accountNumber', async (req, res) => {
    try {
        const accountNumber = req.params.accountNumber; // Extract accountNumber from request parameters
        const newBankDetails = req.body; // Extract new bank details from request body
        const bankDetailsCollection = db.collection('UsersBankDetails'); // Collection name

        // Validate that newBankDetails is provided
        if (!newBankDetails) {
            return res.status(400).send('New bank details are required');
        }

        // Update the bank details by AccountNumber
        const result = await bankDetailsCollection.updateOne(
            { AccountNumber: accountNumber },
            { $set: newBankDetails }
        );

        if (result.acknowledged) {
            res.status(200).send('Bank details successfully updated');
        } else {
            res.status(404).send('Bank details not found');
        }
    } catch (error) {
        console.error('Error updating bank details:', error.message);
        res.status(500).send('Error updating bank details');
    }
});



// Initialise connection to MongoDb and start server on ports
app.listen(PORT, async () => {
    await connectToMongo();
    console.log(`Server is running on port ${PORT}`);
});



