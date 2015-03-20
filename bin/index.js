#!/usr/bin/env node
var corsproxy = require("../lib/corsproxy");
var httpProxy = require("http-proxy");
var http = require('http');

var host = process.env.HOST || process.argv[2] || "127.0.0.1";
var port = process.env.PORT || process.argv[3] || 9292;
var secure = !!process.argv[4] || false;

// httpProxy.createServer(corsproxy).listen(port, host, function() {
//   console.log("%sCORS Proxy started on %s:%d", secure && 'Secure ' || '', host, port);
// });

var proxy = httpProxy.createProxyServer({});

var server = http.createServer(function (req, res) {
  corsproxy(req, res, proxy);
}).listen(port, host, function () {
  console.log("%sCORS Proxy started on %s:%d", secure && 'Secure ' || '', host, port);
});