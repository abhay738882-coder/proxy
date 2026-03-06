const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

// 1. CORS को पूरी तरह खोलें ताकि ब्राउज़र प्री-फ्लाइट रिक्वेस्ट मान ले
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// 2. Preflight रिक्वेस्ट को हैंडल करें
app.options('*', cors()); 

app.post('/api/rc-status', async (req, res) => {
    try {
        const { RCID } = req.body;
        console.log("Fetching for RCID:", RCID); // सर्वर लॉग्स में चेक करने के लिए

        const response = await axios.post(
            'https://nfsa.up.gov.in/Food/TrackingRationCard/NFSARCSearch.aspx/BindData',
            { RCID: RCID },
            { 
                headers: { 
                    'Content-Type': 'application/json',
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
                } 
            }
        );
        res.json(response.data);
    } catch (error) {
        console.error("Backend Error:", error.message);
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
