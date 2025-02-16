const axios = require('axios');

const GOOGLE_IP_URLS = [
  'https://developers.google.com/static/search/apis/ipranges/googlebot.json',
  'https://developers.google.com/static/search/apis/ipranges/special-crawlers.json',
  'https://developers.google.com/static/search/apis/ipranges/user-triggered-fetchers.json',
  'https://developers.google.com/static/search/apis/ipranges/user-triggered-fetchers-google.json'
];

let googleBotIPs = [];

const fetchGoogleBotIPs = async () => {
  try {
    let allIps = [];

    for (const url of GOOGLE_IP_URLS) {
      const { data } = await axios.get(url);
      if (data && data.prefixes) {
        allIps = allIps.concat(
          data.prefixes.map((p) => p.ipv4Prefix || p.ipv6Prefix).filter(Boolean)
        );
      }
    }

    googleBotIPs = allIps;
    console.log(`Fetched ${googleBotIPs.length} Googlebot IP ranges`);
  } catch (error) {
    console.error('Error fetching Googlebot IPs:', error.message);
  }
};

fetchGoogleBotIPs();

setInterval(fetchGoogleBotIPs, 24 * 60 * 60 * 1000);

const isGoogleBotIP = async (ip) => {
  const { default: CIDR } = await import('ip-cidr');
  return googleBotIPs.some((cidr) => {
    try {
      return new CIDR(cidr).contains(ip);
    } catch {
      return false;
    }
  });
};

module.exports = { isGoogleBotIP };
