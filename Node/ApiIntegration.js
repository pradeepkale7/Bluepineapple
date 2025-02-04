 

async function fetchData() {

    try {
        return new Promise((resolve, reject) => {

            setTimeout(() => {
                const sucess = Math.random() > 0.2;

                if (sucess) {
                    resolve("Data fetched sucessfully");
                } else {
                    reject("Error something went wrong");
                }
            }, 2000);
        })
    } catch (err) {
        console.log("Error Occur");
    }
}


async function printData() {

    try {
        const data = await fetchData();
        console.log(data);
    } catch (error) {
        console.error(error);
    }
}

printData();

import fetch from 'node-fetch';



async function getPosts() {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const body = await response.json();

    for (let i = 0; i < 5; i++) {
        console.log("Title : " + body[i].title);
        console.log("Body : " + body[i].body + "\n");
    }

}

getPosts();


    const data1= await fetch("https://jsonplaceholder.typicode.com/posts");
    const post= await data1.json();
    const data2 = await fetch('https://jsonplaceholder.typicode.com/comments');
    const comments= await data2.json();




Promise.all([post,comments])
    .then(([data1,data2])=>{

        for (let i = 0; i < 5; i++) {
            console.log("Object "+ Number(i+1) );
            console.log(data1[i]);
        }
        for (let i = 0; i < 5; i++) {
            console.log("Object "+ Number(i+1) );
            console.log(data2[i]);
        }


});