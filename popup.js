document.getElementById('settings-btn').addEventListener('click', () => {
    const settingsDiv = document.getElementById('settings');
    settingsDiv.style.display = settingsDiv.style.display === 'none' ? 'block' : 'none';
});
chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
    document.getElementById('url').innerText = tab.url;
    new QRCode(document.getElementById("qrcode"), { text: tab.url, width: 160, height: 160 });
});
