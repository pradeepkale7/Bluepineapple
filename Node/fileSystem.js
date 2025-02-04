const fs = require('fs');


function logFile() {
    const content = '\n Log entry at  ' + new Date().toDateString() + "\n";

    fs.appendFile('log.txt',content,(err)=>{
        if(err){
            console.log("Error writing to file");
        }else{
            console.log("Log Entry sucessful");
        }
    });
}

function syncContent(){
const data=fs.readFileSync('log.txt','utf-8');
console.log("Sync Content : " + data);
}

function asyncContent(){
    fs.readFile('log.txt',function(err,data){
        if(err){
            console.log(err);
        }else{
            console.log("\nAsync Content : " + data);
        }
    })
    
}

fs.writeFile('log.txt', "This is a log File", (err) => {
    if (err) {
        console.error(err);
    } else {
        console.log("A new File Created");
        logFile();
    }
});

console.log("Reading file Content via blocking \n");
syncContent();
console.log("Reading file Content via non-blocking \n");
asyncContent();





setTimeout(function(){
    console.log("Inside Set Timeout");
},0)

setImmediate(function(){
    console.log("Inside setImmediate");
})

process.nextTick(function(){
    console.log("Inside process.nextTick()");
})

console.log("Starting the programming");
  