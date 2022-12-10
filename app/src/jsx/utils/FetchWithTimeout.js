// Function taken from https://dmitripavlutin.com/timeout-fetch-request/
export default async function fetchWithTimeout(resource, options = {}) {
    const { timeout = process.env.REACT_APP_FETCH_TIMEOUT } = options;

    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
    const response = await fetch(resource, {
        ...options,
        signal: controller.signal
    });
    clearTimeout(id);
    return response;
}