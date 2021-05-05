chrome.runtime.onInstalled.addListener(() => {
    // console.log('onInstalled...');
    // create alarm after extension is installed / upgraded
    // chrome.alarms.create('refresh', { periodInMinutes: 1 });
});

chrome.alarms.onAlarm.addListener((alarm) => {
    console.log(alarm.name); // refresh
    console.log(chrome.storage.local.get("cowin_data", (resp) => console.log(resp)))
});