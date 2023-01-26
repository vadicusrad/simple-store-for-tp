const baseUrl = 'https://6230a297f113bfceed575b81.mockapi.io/database/products';

async function getData() {
    return await fetch(baseUrl);
}

export default getData;
