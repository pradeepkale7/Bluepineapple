
const express = require('express');
const app = express();

app.use(express.json());

const requestDetails = (req, res, next) => {
    console.log(req.method);
    console.log(req.url);
    next();
}

app.use(requestDetails);


app.get('/', (req, res) => {
    res.send("Wlocome to Express!");
})

app.post("/data", (req, res) => {
    console.log("Received Data:", req.body);
    res.send("Data received ");
});

app.get('/users', (req, res) => {
    const users = [
        { id: 1, name: "Pradeep" },
        { id: 2, name: "Ram" },
        { id: 3, name: "Sham" },
        { id: 4, name: "Rohit" },
    ];
    res.json(users);
});

app.get('/external-posts', async (req, res) => {
 

    const [post,comments]= await Promise.all(([data1,data2])=>{
       const data1= fetch('https://jsonplaceholder.typicode.com/posts').then(data=>data.json());
      const  data2= fetch('https://jsonplaceholder.typicode.com/comments').then(data=>data.json());
        
      resolve([data1,data2]);
    })
  });

  res.send(posts[0],comments[0]);

// const data= await fetch('https://jsonplaceholder.typicode.com/posts').then(data=>data.json());
// res.send(data);


app.get('/error', (req, res, next) => {
    throw new Error('Database error');
})


app.use((req, res) => {
    res.status(404).send("Error 404 :Route not found!");
})


app.use((err, req, res, next) => {
    console.error("EEEEEEEEE", err.stack);
    res.status(500).send("Something went wrong ");

});

app.listen(3000, () => {
    console.log("Server Started at port 3000");
})