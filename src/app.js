require('dotenv').config();
const express = require('express');
const cors = require('cors');
require('./config/db'); 
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/v1/users', require('./routes/userRoutes'));
app.use('/api/v1/groups', require('./routes/groupRoute'));
//app.use('/api/v1/events', require('./routes/eventRoutes'));
//app.use('/api/v1/proposals', require('./routes/proposalRoutes'));

app.get('/', (req, res) => {
    res.send('CommonGround API is running!');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});