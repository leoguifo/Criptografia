const http = require('http');
var formidable = require('formidable');
const fs = require('fs');
const crypt = require('./crypt');
const decrypt = require('./decrypt');

fs.readFile('./index.html', (err, html) => {
    const srv = http.createServer((req, res) => {

        if (req.method == 'POST') {
            var form = new formidable.IncomingForm();
            if (req.url == '/encrypt') {

                form.parse(req, (err, fields, files) => {
                    var oldpath = files.arquivo.path;
                    var newpath = './' + files.arquivo.name;
                    fs.rename(oldpath, newpath, (err) => {
                        crypt();
                        fs.readFile('./output.crypt', (err, file) => {
                            res.setHeader('Content-Disposition', ' attachment; filename="encrypt.crypt"');
                            res.write(file);
                            res.end();
                        });
                    })
                });
            }

            if (req.url == '/decrypt') {
                form.parse(req, (err, fields, files) => {
                    var oldpath = files.arquivo.path;
                    var newpath = './' + files.arquivo.name;
                    fs.rename(oldpath, newpath, (err) => {
                        decrypt();
                        fs.readFile('./decrypted.txt', (err, file) => {
                            res.setHeader('Content-Disposition', ' attachment; filename="decrypt.txt"');
                            res.write(file);
                            res.end();
                        });
                    })
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
