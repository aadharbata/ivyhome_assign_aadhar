const axios = require('axios');

// Function to delay execution (to handle rate limiting)
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function extractAllNames(baseUrl, alphabet, baseDelayMs) {
    const extractedNames = new Set(); 
    const queue = [...alphabet];     
    let searchCount = 0;             
    const retryCounts = {};         

    while (queue.length > 0) {
        const query = queue.shift(); // Get the next prefix to explore
        searchCount++;               

        try {
           
            const response = await axios.get(`${baseUrl}?query=${query}`);
            if (response.status === 200 && response.data.results) {
                const results = response.data.results;

                for (const name of results) {
                    if (!extractedNames.has(name)) {
                        extractedNames.add(name); 
                        queue.push(name);         // Add as a new prefix for further exploration
                    }
                }
            } else {
                console.error(`Error: Received status ${response.status} for query "${query}"`);
            }

            // Reset retry count for successful queries
            retryCounts[query] = 0;

        } catch (error) {
            if (error.response && error.response.status === 429) {
                console.warn(`Rate limit hit for query "${query}". Retrying...`);

                // Handle Retry-After header if available
                const retryAfter = error.response.headers['retry-after'];
                if (!retryCounts[query]) retryCounts[query] = 0; // Initialize retry count

                let waitTime;
                if (retryAfter) {
                    waitTime = parseInt(retryAfter, 10) * 1000; // Use Retry-After header value
                } else {
                    waitTime = baseDelayMs * Math.pow(2, retryCounts[query]); // Exponential backoff
                }

                console.log(`Waiting for ${waitTime / 1000} seconds before retrying...`);
                await delay(waitTime);

                retryCounts[query]++; 
                queue.unshift(query); // Re-add query to queue for retry
            } else {
                console.error(`Error with query "${query}":`, error.message);
            }
        }

        await delay(baseDelayMs); // Delay between requests
    }

    console.log(`Total searches made: ${searchCount}`); 
    return Array.from(extractedNames); 
}

// Main function to execute the extraction process
(async () => {
    const baseUrl = "http://35.200.185.69:8000/v1/autocomplete";// can use different version by changing to example v2,v3...
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    const baseDelayMs = 500;

    console.log("Extracting all names from the autocomplete API...");
    const allNames = await extractAllNames(baseUrl, alphabet, baseDelayMs);

    console.log(`Total names extracted: ${allNames.length}`);
    console.log("Sample names:", allNames.slice(0, 10));
})();
