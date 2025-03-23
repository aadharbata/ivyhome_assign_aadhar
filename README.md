
# Autocomplete API Extraction

This project is designed to extract all possible names from an autocomplete API by systematically exploring prefixes and handling rate limits. It uses Node.js and Axios for making HTTP requests and implements features like exponential backoff for rate-limiting errors.

---

## **Features**
- Extracts unique names from the autocomplete API.
- Dynamically handles rate-limiting errors (`429 Too Many Requests`) using exponential backoff.
- Supports exploration of multiple API versions (`v1`, `v2`, etc.).
- Efficiently traverses prefixes using a queue-based approach.

---

## **Prerequisites**
Before you begin, ensure you have the following installed:
- **Node.js** (v12 or higher): [Download Node.js](https://nodejs.org/)
- **npm** (comes bundled with Node.js)

---

## **Installation**

Follow these steps to set up the project:

1. Clone this repository:
git clone https://github.com/username/repository-name.git



2. Navigate to the project directory:
cd repository-name


3. Install the required dependencies:
npm install


---

## **How to Start the Project**

To start the project, follow these steps:

1. Run the script:
node script.js



2. The script will:
- Extract all names from the autocomplete API.
- Handle rate-limiting errors dynamically.
- Log extracted names and total searches made.

---

## **Project Structure**
The project consists of the following files:

### 1. `script.js`
The main script that implements the logic for extracting names from the autocomplete API.

### 2. `.gitignore`
Ensures that unnecessary files (e.g., `node_modules`) are not pushed to GitHub.

### 3. `package.json`
Contains metadata about the project and its dependencies.

---

## **Implementation Details**

### **Logic Overview**
1. **Queue-Based Exploration**:
- The script starts with single-character prefixes (`a`, `b`, ..., `z`).
- It uses a queue to explore deeper prefixes returned by the API.

2. **Rate-Limiting Handling**:
- If the server responds with `429 Too Many Requests`, the script retries using exponential backoff.
- The delay increases exponentially with each retry (e.g., 1 second → 2 seconds → 4 seconds).

3. **Tracking Searches**:
- A counter tracks how many requests were made to extract all names.
- Logs are generated for debugging and monitoring progress.

4. **Dynamic Version Support**:
- The script supports multiple API versions (`v1`, `v2`, etc.) by dynamically constructing URLs.

---

### **Functions**
#### 1. `extractAllNames(baseUrl, alphabet, delayMs)`
- Extracts all possible names from the autocomplete API.
- Parameters:
- `baseUrl`: The base URL of the API.
- `alphabet`: Initial prefixes (e.g., `a`, `b`, ..., `z`).
- `delayMs`: Initial delay between requests.
- Returns: An array of unique names extracted from the API.

#### 2. `delay(ms)`
- Introduces a delay between requests to handle rate limiting.

---

### **Error Handling**
The script gracefully handles errors such as:
- **429 Too Many Requests**: Implements exponential backoff when rate limits are hit.
- **Network Errors**: Logs errors and retries failed requests.

---

## **Example Output**
When you run the script, you’ll see output like this:

Extracting all names from the autocomplete API...
Rate limit hit for query "aa". Retrying...
Waiting for 2 seconds before retrying...
Total searches made: 286
Total names extracted: 260
Sample names: [ 'aa', 'aabdknlvkc', 'aabrkcd', 'aadgdqrwdy', ... ]



---

## **Dependencies**
The project uses the following dependencies:
- [Axios](https://www.npmjs.com/package/axios): For making HTTP requests.
npm install axios

text

---

## **How to Contribute**
If you want to contribute to this project:
1. Fork this repository.
2. Create a new branch (`git checkout -b feature-name`).
3. Make your changes and commit them (`git commit -m "Added feature-name"`).
4. Push your changes (`git push origin feature-name`).
5. Create a pull request.

---

## **Author**
Your Name  
[Your Email Address]  
[Your GitHub Profile](https://github.com/username)

---

## **License**
This project is licensed under the MIT License.
How to Use This README
Replace placeholders like username, repository-name, and your personal details with actual values.

Save this content in a file named README.md in your project folder.

Commit and push it to GitHub:

bash
git add README.md
git commit -m "Added README file"
git push origin main
