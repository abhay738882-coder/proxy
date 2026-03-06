const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

// 1. CORS पूरी तरह खोलें (सभी ओरिजिन के लिए)
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// प्री-फ्लाइट रिक्वेस्ट हैंडलिंग (जरूरी है)
app.options('*', cors());

app.use(express.json());

app.post('/api/rc-status', async (req, res) => {
    try {
        const { RCID } = req.body;
        console.log("Request received for RCID:", RCID);

        // NFSA की वेबसाइट पर रिक्वेस्ट भेजें
        const response = await axios.post(
            'https://nfsa.up.gov.in/Food/TrackingRationCard/NFSARCSearch.aspx/BindData',
            { RCID: RCID },
            { 
                headers: { 
                    'Content-Type': 'application/json',
                    'Referer': 'https://nfsa.up.gov.in/Food/TrackingRationCard/NFSARCSearch.aspx',
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                    'X-Requested-With': 'XMLHttpRequest'
                } 
            }
        );
        
        // सर्वर लॉग्स में डेटा देखें
        console.log("NFSA Response Status:", response.status);
        
        // डेटा क्लाइंट को भेजें
        res.json(response.data);

    } catch (error) {
        // अगर कोई एरर आता है तो उसे लॉग में दिखाएं
        if (error.response) {
            console.error("NFSA Error Response:", error.response.data);
            res.status(error.response.status).json({ error: "NFSA Site Error" });
        } else {
            console.error("General Error:", error.message);
            res.status(500).json({ error: error.message });
        }
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
