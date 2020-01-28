const express = require('express');
const port = process.env.PORT || 3009;
const app = express();

app.use(express.static('public'));
app.listen(port);
