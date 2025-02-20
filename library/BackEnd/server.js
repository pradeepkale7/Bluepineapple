
const express = require('express');
const app = express();
const cors = require("cors");
const bookRoutes = require("./routes/BookRoute");
const libraryRoute = require("./routes/LibraryRoute");
const userRoute = require("./routes/UserRoute");

app.use(express.json());
app.use(cors());


// User defined routes
app.use("", bookRoutes, libraryRoute, userRoute);


app.listen(8000, () => {
    console.log("Server has Started at port 5000")
})

