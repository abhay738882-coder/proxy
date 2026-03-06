const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors()); // यह आपके वेब पेज को अनुमति देगा
app.use(express.json());

app.post('/api/rc-status', async (req, res) => {
    try {
        const { RCID } = req.body;
        const response = await axios.post(
            'https://nfsa.up.gov.in/Food/TrackingRationCard/NFSARCSearch.aspx/BindData',
            { RCID: RCID },
            { headers: { 'Content-Type': 'application/json' } }
        );
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));