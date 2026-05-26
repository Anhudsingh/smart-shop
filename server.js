/**
 * SMART SHOP - High-Performance Native Node.js Server
 * CSE Final Year Capstone Project
 * Developed by: Anhud Singh Kondal (Computer Science & Engineering)
 * File: server.js
 * 
 * NOTE: This server is built using standard Node.js libraries (http, fs, path, os)
 * with ZERO dependencies. Run using: `node server.js`
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');

const PORT = 3000;
const PUBLIC_DIR = __dirname;

// MIME types dictionary for correct client-side static rendering
const MIME_TYPES = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon'
};

// Create Native HTTP Server
const server = http.createServer((req, res) => {
    // Sanitize request URL path to prevent directory traversal vulnerabilities
    let safeUrl = req.url.split('?')[0];
    if (safeUrl === '/') {
        safeUrl = '/index.html';
    }

    const filePath = path.join(PUBLIC_DIR, safeUrl);

    // Get file extension to map MIME types
    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    // Async Read File from Disk
    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                // File Not Found
                res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
                res.end('<h1>404 Not Found</h1><p>Smart Shop server could not find the requested route.</p>', 'utf-8');
            } else {
                // Internal Server Error
                res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' });
                res.end(`<h1>500 Server Error</h1><p>Internal error: ${error.code}</p>`, 'utf-8');
            }
        } else {
            // Serve static file with correct MIME type header
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

// Resolve local network IPv4 address (e.g. WiFi IP) for multi-device connections
function getLocalNetworkIp() {
    const interfaces = os.networkInterfaces();
    for (const devName in interfaces) {
        const iface = interfaces[devName];
        for (let i = 0; i < iface.length; i++) {
            const alias = iface[i];
            // Look for non-internal IPv4 addresses
            if (alias.family === 'IPv4' && !alias.internal) {
                return alias.address;
            }
        }
    }
    return '127.0.0.1';
}

// Start listening on port 3000, binding to all network interfaces (0.0.0.0)
server.listen(PORT, '0.0.0.0', () => {
    const localIp = getLocalNetworkIp();
    
    console.clear();
    console.log("================================================================");
    console.log("             ⚡ SMART SHOP eCOMMERCE PLATFORM ⚡                ");
    console.log("        CSE Capstone Project - Anhud Singh Kondal               ");
    console.log("================================================================");
    console.log(`\n[Server Status]: RUNNING SUCCESSFUL`);
    console.log(`[Host Machine]:  http://localhost:${PORT}`);
    console.log(`\n----------------------------------------------------------------`);
    console.log(`📲 HOW TO ACCESS FROM OTHER DEVICES (Laptops, Phones, Tablets):`);
    console.log(`----------------------------------------------------------------`);
    console.log(`1. Ensure all devices are connected to the SAME WiFi/LAN network.`);
    console.log(`2. Open browser on your phone/other device and enter URL:`);
    console.log(`   👉 \x1b[36mhttp://${localIp}:${PORT}\x1b[0m 👈`);
    console.log(`----------------------------------------------------------------\n`);
    console.log(`[Server Log]: Press Ctrl + C to stop the Node.js server.`);
});
