// server.js में ये हेडर अपडेट करें
const response = await axios.post(
    'https://nfsa.up.gov.in/Food/TrackingRationCard/NFSARCSearch.aspx/BindData',
    { RCID: RCID },
    { 
        headers: { 
            'Content-Type': 'application/json',
            'Referer': 'https://nfsa.up.gov.in/Food/TrackingRationCard/NFSARCSearch.aspx',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
            'X-Requested-With': 'XMLHttpRequest'
        } 
    }
);
