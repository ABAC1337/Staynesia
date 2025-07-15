const midtransClient = require('midtrans-client');

const core = new midtransClient.CoreApi({
    isProduction: process.env.MIDTRANS_ENV,
    serverKey: process.env.MIDTRANS_SERVER_KEY
});

const snap = new midtransClient.Snap({
    isProduction: process.env.MIDTRANS_ENV,
    serverKey: process.env.MIDTRANS_SERVER_KEY
});

module.exports = { core, snap };