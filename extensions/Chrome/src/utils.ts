import axios from "axios";

export interface cowinData {
    age: { '18': boolean; '45': boolean; };
    date: string;
    state: { state_id: string; state_name: string; };
    district: { district_id: string; district_name: string; };
    pincodes: string[];
    enableVoiceNotification: boolean;
    enableNotification: boolean;
}

export function checkSlots(resp: cowinData) {
    if (resp.district && resp.district.district_id) {
        getSlotsByDistrict(resp)
    } else if (resp.pincodes?.length) {
        getSlotsByPincodes(resp)
    }
}

function getSlotsByDistrict({
    age,
    date,
    district,
    enableVoiceNotification,
    enableNotification
}: cowinData) {
    axios.get(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=${district.district_id}&date=${date}`)
        .then(res => checkAvailableAndShowNotifications(res, age['18'] && age['45'] ? false : age['18'] ? 18 : age['45'] ? 45 : false, enableVoiceNotification, enableNotification));
}

function getSlotsByPincodes({
    age,
    date,
    pincodes,
    enableVoiceNotification,
    enableNotification
}: cowinData) {
    Promise.all(pincodes.map(pincode => axios.get(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=${pincode}&date=${date}`))).then(response => {
        response.forEach(res => { checkAvailableAndShowNotifications(res, age['18'] && age['45'] ? false : age['18'] ? 18 : age['45'] ? 45 : false, enableVoiceNotification, enableNotification) })
    });
}

function checkAvailableAndShowNotifications(res: any, age: number | boolean, enableVoiceNotification: boolean, enableNotification: boolean) {
    const available = res.data?.centers?.filter((center: any) => center.sessions.find((session: any) => {
        if (age) {
            return session.min_age_limit === age && session.available_capacity > 0;
        } else {
            return session.available_capacity > 0;
        }
    }))
    showNotifications(available, enableVoiceNotification, enableNotification)
}

function showNotifications(available: any[], enableVoiceNotification: boolean, enableNotification: boolean) {
    const availableForNotification = available
    // .filter((center: any) => stopNotifications.indexOf(center.center_id.toString()) === -1);
    if (availableForNotification?.length > 0) {
        if (enableVoiceNotification) {
            // speak({ text: 'The Vaccine is available. Hurry!' });
            const audio = new Audio(
                'https://media.geeksforgeeks.org/wp-content/uploads/20190531135120/beep.mp3',
            );
            audio.play();
        }
        if (enableNotification) {
            const doses: { 18: number, 45: number } = availableForNotification
                .reduce((sessions, center) => sessions.concat(center.sessions), [])
                .reduce((doseObj: { 18: number, 45: number }, session: { available_capacity: number; min_age_limit: 18 | 45 }) => {
                    if (session.min_age_limit == 18) {
                        doseObj[18]++
                    }
                    if (session.min_age_limit == 45) {
                        doseObj[45]++
                    }
                    return doseObj
                }, { 18: 0, 45: 0 })
            let contextMsg = 'Doses:'
            if (doses[18]) { contextMsg += ` 18 -> ${doses[18]}` }
            if (doses[45]) { contextMsg += ` 45 -> ${doses[45]}` }
            chrome.notifications.clear('notification');
            chrome.notifications.create('notification', {
                title: 'Vaccine Available',
                message: 'Close to stop notifications, Click to go to COWIN site',
                contextMessage: contextMsg,
                type: 'basic',
                iconUrl: './icon128.png',
                isClickable: true,
                requireInteraction: true
            })
        }
    }
}