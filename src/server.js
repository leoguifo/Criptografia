const http = require('http');
const fs = require('fs');

// Create an HTTP server

fs.readFile('./index.html', (err, html) => {
    const srv = http.createServer((req, res) => {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(html);
        res.end();

        console.log(req.on());
    });

    
    
    // Now that server is running
    srv.listen(8000, '127.0.0.1', () => {
    
    });
});
