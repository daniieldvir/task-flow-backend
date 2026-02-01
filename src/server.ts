import { app } from './app';


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);

  // Keep-alive hack for Render free tier
  // Pings the server every 14 minutes to prevent it from spinning down (which happens after 15m of inactivity)
  const url = 'https://task-flow-backend-t5ng.onrender.com/health';
  const interval = 14 * 60 * 1000; // 14 minutes

  // Only run this in production or if explicitly enabled
  // (Sending a request to the live server from localhost is also fine, it keeps the live server awake)
  console.log(`[KeepAlive] Setting up ping to ${url} every 14 minutes`);
  
  // Use node's native fetch (available in Node 18+) or https module. 
  // Since we are using typescript and modern node, fetch is likely available.
  const ping = async () => {
    try {
      const response = await fetch(url);
      console.log(`[KeepAlive] Ping status: ${response.status} ${response.statusText}`);
    } catch (error) {
       // Ignore errors (e.g. if internet is down locally)
       console.log(`[KeepAlive] Ping failed: ${(error as Error).message}`); 
    }
  };

  // Initial ping
  ping();
  
  setInterval(ping, interval);
});
