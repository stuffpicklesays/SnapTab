function stripTrackingParameters(url) {
    const paramsToStrip = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid', 'fbclid'];
    const urlObj = new URL(url);
    paramsToStrip.forEach(param => urlObj.searchParams.delete(param));
    return urlObj.toString();
}


document.addEventListener('DOMContentLoaded', async () => {
    const settingsDiv = document.getElementById('settings');
    const stripCheckbox = document.getElementById('strip-tracking');

    document.getElementById('settings-btn').addEventListener('click', () => {
        settingsDiv.style.display = settingsDiv.style.display === 'none' ? 'block' : 'none';
    });



    function updateQRCode(shouldStrip = stripCheckbox.checked) {
        if (tab && tab.url) {
            let url = tab.url;
            if (shouldStrip) {
                    url = stripTrackingParameters(url);
            }
            document.getElementById('url').innerText = url;
            document.getElementById("qrcode").innerHTML = "";
            new QRCode(document.getElementById("qrcode"), { text: url, width: 160, height: 160 });
        }
    }
    const storagePromise = chrome.storage.local.get('stripTracking');
    const tabPromise = chrome.tabs.query({ active: true, currentWindow: true });

    const [storage, [tab]] = await Promise.all([storagePromise, tabPromise]);

    stripCheckbox.checked = Boolean(storage?.stripTracking);


    updateQRCode();
    stripCheckbox.addEventListener('change', (e) => {
        chrome.storage.local.set({ stripTracking: e.target.checked });
        updateQRCode();
    });
});
