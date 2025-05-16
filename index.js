const fs = require('node:fs');
const http = require('node:http');
const path = require('node:path');

const server = http.createServer((req,res)=>{
  if(req.method === 'GET' && req.url.startsWith('/library/')){
    const fileName = decodeURIComponent(req.url.split('/library/')[1]);
    const filePath = path.join(__dirname, 'library', `${fileName}.pdf`);

    fs.readFile(filePath,(err,data)=>{
      if(err){
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        return res.end("Error loading the PDF file.");
      }
      res.writeHead(200,{'content-type':'application/pdf'});
      res.end(data);
    });
  } else {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Welcome to your personal library, Shashank!');
  }
});

server.listen(3000, ()=>{
  console.log("Server has started in localhost 3000");
});