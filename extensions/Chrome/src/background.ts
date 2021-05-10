import { checkSlots } from "./utils";

chrome.runtime.onInstalled.addListener(() => {
    chrome.alarms.create('refresh', { periodInMinutes: 1 });
    chrome.alarms.onAlarm.addListener((alarm) => {
        chrome.storage.local.get("cowin_data", (resp: any) => {
            checkSlots(resp.cowin_data)
        })
    });
});

chrome.notifications.onClicked.addListener(() => {
    var newURL = 'https://selfregistration.cowin.gov.in/';
    chrome.tabs.create({ url: newURL });
    chrome.notifications.clear('notification');
})

chrome.notifications.onClosed.addListener(() => {
    chrome.storage.local.clear();
    chrome.alarms.clearAll();
})
