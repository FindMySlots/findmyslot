import axios from "axios";
import * as React from "react";
import { useState } from "react";
import "./App.css";
import { checkSlots } from "./background";

const Form = () => {
    const [loading, setLoading] = useState(true);
    const [searchBase, setSearchBase] = useState('district');
    const [state, setState] = useState('');
    const [district, setDistrict] = useState('');
    const [stateList, setStateList] = useState<any[]>([]);
    const [districtList, setDistrictList] = useState<any[]>([]);
    const [timeList, setTimeList] = useState<any[]>([]);
    const [age, setAge] = useState<any>({ '18': true, '45': true });
    const [time, setTime] = useState<any>(1);
    const [pinCodes, setPinCodes] = useState<any>('');
    const setData = () => {
        if (chrome.alarms) {
            const now = new Date();
            const date = `${now.getDate()}-${now.getMonth() + 1}-${now.getFullYear()}`
            let cowin_data: any = {
                age: age['18'] && age['45'] ? false : age['18'] ? 18 : age['45'] ? 45 : false,
                date,
                enableVoiceNotification: true,
                enableNotification: true
            }
            if (searchBase === 'district') {
                cowin_data['district_id'] = district;
            } else {
                cowin_data['pincodes'] = pinCodes.replace(/\s/g, '').split(',');
            }
            checkSlots(cowin_data);
            chrome.storage.local.set({
                cowin_data
            });
            chrome.alarms.clearAll();
            chrome.alarms.create('refresh', { periodInMinutes: time });
        }
    }

    const handleTimeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setTime(event.target.value)
    }

    const handlePinCodeChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setPinCodes(event.target.value)
    }

    const handleStateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setLoading(true);
        setState(event.target.value);
        axios.get(`https://cdn-api.co-vin.in/api/v2/admin/location/districts/${event.target.value}`).then(res => {
            setDistrictList(res.data.districts)
            setLoading(false);
        });
    }

    const handleDistrictChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setDistrict(event.target.value)
    }

    React.useEffect(() => {
        axios.get("https://cdn-api.co-vin.in/api/v2/admin/location/states").then(res => {
            setStateList(res.data.states);
            setLoading(false);
        });
        for (let i = 0; i < 30; i++) {
            timeList.push({ seconds: (i + 1), timeDisplay: `${i + 1} Minute(s)` })
        }
        setTimeList([...timeList]);
    }, [])

    return (
        <section>
            <form noValidate>
                <div className="text-center margin-bottom">
                    <button type="button" className={age['18'] ? 'active' : ''} onClick={() => setAge({ ...age, '18': !age['18'] })}>18 - 44</button>
                    <button type="button" className={age['45'] ? 'active' : ''} onClick={() => setAge({ ...age, '45': !age['45'] })}>45+</button>
                    <button type="button" className={searchBase === 'district' ? 'active' : ''} onClick={() => setSearchBase('district')}>District</button>
                    <button type="button" className={searchBase === 'pincode' ? 'active' : ''} onClick={() => setSearchBase('pincode')}>Pincode</button>
                </div>

                {
                    loading
                        ? <p className="text-center">Loading . . .</p>
                        : <>
                            {
                                searchBase === 'district'
                                    ? (
                                        <>
                                            <label htmlFor="district" className="inputs-margin">Select State:</label>
                                            <select
                                                defaultValue={state}
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
                                                        defaultValue={district}
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
            </form>
            <div className="text-center margin-bottom">
                <button onClick={setData} disabled={searchBase === 'district' ? (!state || !district) : pinCodes.length < 6}>
                    Schedule Notifications
                </button>
            </div>
        </section>
    );
};

export default Form;
