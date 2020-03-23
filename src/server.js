const http = require('http');
const fs = require('fs');
const crypt = require('./crypt');
const decrypt = require('./decrypt');

fs.readFile('./index.html', (err, html) => {
    const srv = http.createServer((req, res) => {

        if (req.method == 'POST') {
            if (req.url == '/encrypt') {
                var body = '';
                req.on('data', (data) => {
                    body += data;
                });
                req.on('end', () => {
                    crypt(body);
                    fs.readFile('./output.crypt', (err, file) => {
                        res.setHeader('Content-Disposition', ' attachment; filename="encrypt.crypt"');
                        res.write(file);
                        res.end();
                    });

                });
            }

            if (req.url == '/decrypt') {
                var body = '';
                req.on('data', (data) => {
                    body += data;
                });
                req.on('end', () => {
                    decrypt(body);
                    fs.readFile('./decrypted.txt', (err, file) => {
                        res.setHeader('Content-Disposition', ' attachment; filename="decrypt.txt"');
                        res.write(file);
                        res.end();
                    });
                });
            }

        } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(html);
            res.end();
        }
    });

    // Now that server is running
    srv.listen(8000, '127.0.0.1', () => {
    });
});
