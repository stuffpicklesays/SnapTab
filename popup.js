chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
    document.getElementById('url').innerText = tab.url;
    new QRCode(document.getElementById("qrcode"), { text: tab.url, width: 160, height: 160 });
});
