import axios from "axios";
import * as React from "react";
import { useState } from "react";
import "./App.css";
import { checkSlots, cowinData } from "./utils";

const Form = () => {
    const [loading, setLoading] = useState(true);
    const [searchBase, setSearchBase] = useState<'district' | 'pincode'>('district');
    const [state, setState] = useState<{ state_id: string; state_name: string; }>();
    const [district, setDistrict] = useState<{ district_id: string; district_name: string; }>();
    const [enableVoiceNotification, setEnableVoiceNotification] = useState(true);
    const [enableNotification, setEnableNotification] = useState(true);
    const [stateList, setStateList] = useState<any[]>([]);
    const [districtList, setDistrictList] = useState<any[]>([]);
    const [timeList, setTimeList] = useState<any[]>([]);
    const [age, setAge] = useState<{ '18': boolean; '45': boolean; }>({ '18': true, '45': true });
    const [time, setTime] = useState<any>(1);
    const [pinCodes, setPinCodes] = useState<any>('');
    const [notificationData, setNotificationData] = useState<cowinData>();

    const setData = () => {
        if (chrome.alarms) {
            const now = new Date();
            const date = `${now.getDate()}-${now.getMonth() + 1}-${now.getFullYear()}`
            let cowin_data: any = {
                age,
                date,
                enableVoiceNotification,
                enableNotification
            }
            if (searchBase == 'district') {
                cowin_data['district'] = district;
                cowin_data['state'] = state;
            } else {
                cowin_data['pincodes'] = pinCodes.replace(/\s/g, '').split(',');
            }
            setNotificationData(cowin_data);
            checkSlots(cowin_data);
            chrome.storage.local.set({
                cowin_data
            });
            chrome.alarms.clearAll();
            chrome.notifications.clear('notification');
            chrome.alarms.create('refresh', { periodInMinutes: time });
        }
    }

    const handleTimeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setTime(event.target.value)
    }

    const handlePinCodeChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setPinCodes(event.target.value)
    }

    const handleStateChange = (event: any) => {
        setLoading(true);
        const stateId = event.target.value;
        const stateFromStateList = stateList.find(state => state.state_id == stateId);
        async function getDistricts() {
            const districtResponse = await axios.get(`https://cdn-api.co-vin.in/api/v2/admin/location/districts/${stateId}`)
            setDistrictList(districtResponse.data.districts)
            setState(stateFromStateList);
            setLoading(false);
        }
        getDistricts();
    }

    const handleDistrictChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const districtId = event.target.value;
        const districtFromDistrictList = districtList.find(district => district.district_id == districtId);
        setDistrict(districtFromDistrictList);
    }

    const handleReset = () => {
        setNotificationData(undefined);
        chrome.storage.local.clear();
        chrome.alarms.clearAll();
        chrome.notifications.clear('notification');
    }

    React.useEffect(() => {
        let stateResponse: any;
        async function getStates() {
            stateResponse = await axios.get("https://cdn-api.co-vin.in/api/v2/admin/location/states")
            setStateList(stateResponse.data.states);
            setLoading(false);
        }
        getStates();
        chrome.storage.local.get('cowin_data', ({ cowin_data }) => {
            if (cowin_data) {
                const { district, pincodes, age, state } = cowin_data;
                if (district) {
                    setSearchBase('district')
                    setState(state);
                    handleStateChange({ target: { value: state.state_id } })
                    setDistrict(district);
                } else {
                    setSearchBase('pincode')
                    setPinCodes(pincodes?.join(','));
                }
                setAge(age);
                setEnableNotification(cowin_data.enableNotification);
                setEnableVoiceNotification(cowin_data.enableVoiceNotification);
                setNotificationData(cowin_data);
            }
        })
        for (let i = 0; i < 30; i++) {
            timeList.push({ seconds: (i + 1), timeDisplay: `${i + 1} Minute(s)` })
        }
        setTimeList([...timeList]);
    }, [])

    return (
        <section>
            {
                notificationData
                    ? <div>
                        <div className="inputs-margin">
                            Notifications active for&nbsp;
                            {
                                searchBase == 'district'
                                    ? `${district?.district_name}, ${state?.state_name}.`
                                    : `Pincodes: ${pinCodes}.`
                            }
                        </div>
                        <div className="inputs-margin">
                            Age: {(age['18'] && age['45']) ? '18 - 44, 45+' : age['18'] ? '18 - 44' : age['45'] ? '45' : '18 - 44, 45+'}
                        </div>
                        <div className="inputs-margin">
                            Notifications: {
                                enableNotification && enableVoiceNotification
                                    ? 'Push and Voice Notifications active'
                                    : enableNotification && !enableVoiceNotification
                                        ? 'Push notifications active'
                                        : 'Voice notifcations active'
                            }
                        </div>
                        <div className="inputs-margin">
                            <button onClick={() => setNotificationData(undefined)}>Edit</button>
                            <button onClick={handleReset}>Reset</button>
                        </div>
                    </div>
                    : <form noValidate>
                        <div className="text-center margin-bottom">
                            <button type="button" className={age['18'] ? 'active' : ''} onClick={() => setAge({ ...age, '18': !age['18'] })}>18 - 44</button>
                            <button type="button" className={age['45'] ? 'active' : ''} onClick={() => setAge({ ...age, '45': !age['45'] })}>45+</button>
                            <button type="button" className={searchBase == 'district' ? 'active' : ''} onClick={() => setSearchBase('district')}>District</button>
                            <button type="button" className={searchBase == 'pincode' ? 'active' : ''} onClick={() => setSearchBase('pincode')}>Pincode</button>
                        </div>
                        {
                            loading
                                ? <p className="text-center">Loading . . .</p>
                                : <>
                                    {
                                        searchBase == 'district'
                                            ? (
                                                <>
                                                    <label htmlFor="district" className="inputs-margin">Select State:</label>
                                                    <select
                                                        defaultValue={state?.state_id}
                                                        onChange={handleStateChange}
                                                        id="state"
                                                        name="State"
                                                    >
                                                        <option value='' disabled>Select State</option>
                                                        {stateList?.map((state: any) => (
                                                            <option value={state.state_id}>{state.state_name}</option>
                                                        ))}
                                                    </select>

                                                    {
                                                        state && (<>
                                                            <label htmlFor="district" className="inputs-margin">Select District:</label>
                                                            <select
                                                                defaultValue={district?.district_id}
                                                                onChange={handleDistrictChange}
                                                                id="district"
                                                                name="District"
                                                            >
                                                                <option value='' disabled>Select District</option>
                                                                {districtList?.map((district: any) => (
                                                                    <option value={district.district_id}>{district.district_name}</option>
                                                                ))}
                                                            </select>
                                                        </>)
                                                    }
                                                </>
                                            )
                                            : (
                                                <>
                                                    <label htmlFor="pinCode" className="inputs-margin">Pin code(s):</label>
                                                    <textarea
                                                        id="pinCode"
                                                        name="Pin Codes"
                                                        rows={3}
                                                        defaultValue={pinCodes}
                                                        onChange={handlePinCodeChange}
                                                        placeholder="Enter pin code comma separated (Max 6 allowed)"
                                                    />
                                                </>
                                            )
                                    }
                                </>
                        }

                        <label htmlFor="district" className="inputs-margin">Select Notifications Interval:</label>
                        <select
                            onChange={handleTimeChange}
                            defaultValue={time}
                            id="time"
                            name="Time"
                        >
                            <option value='' disabled>Select Time</option>
                            {timeList?.map((time: any) => (
                                <option value={time.seconds}>{time.timeDisplay}</option>
                            ))}
                        </select>
                        <div className="text-center margin-bottom">
                            <button type="button" onClick={setData} disabled={searchBase == 'district' ? (!district?.district_id) : pinCodes?.length < 6}>
                                Schedule Notifications
                            </button>
                        </div>
                    </form>
            }
        </section >
    );
};

export default Form;
