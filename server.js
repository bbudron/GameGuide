const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;

// Configure to allow for requests
app.use(express.urlencoded({extended:true}));
app.use(express.json());
// Serve up static assets
app.use(express.static("client/build"));

// Routes
const routes = require("./routes")();
app.use('/',routes);

// Start the API server
app.listen(PORT, () => console.log(`LISTENING ON PORT ${PORT}`));