import * as React from "react";
import {useState} from "react";
import "./App.css";

const Form = () => {
    const [age, setAge] = useState<any>();
    const [pinCodes, setPinCodes] = useState<any>();
    const setData = () => {
        console.log('in here')
        if (chrome.alarms) {
            console.log('in here 2')
            chrome.storage.local.set({
                "cowin_data": {
                    age: 18,
                    pinCode: 411045,
                    date: '03-05-2021',
                }
            });
            chrome.alarms.clearAll();
            chrome.alarms.create('refresh', {periodInMinutes: 1});
        }
    }

    const handleAgeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setAge(event.target.value)
        console.log(event.target.value)
    }

    const handlePinCodeChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setPinCodes(event.target.value)
    }

    return (
        <section>
            <form noValidate>
                <fieldset>
                    <label htmlFor="age">Age</label>
                    <select
                        defaultValue={age}
                        onChange={handleAgeChange}
                        id="age"
                        name="Age"
                    >
                        <option value='' disabled>Select Age Group</option>
                        <option value={18}>Below 45</option>
                        <option value={45}>Above 45</option>
                    </select>
                </fieldset>
                <fieldset>
                    <label htmlFor="pinCode">Pin code(s)</label>
                    <textarea
                        id="pinCode"
                        name="Pin Codes"
                        rows={3}
                        defaultValue={pinCodes}
                        onChange={handlePinCodeChange}
                    />
                </fieldset>
            </form>
            <div>
                Table goes here
            </div>
            <button onClick={setData}>
                setData
            </button>
        </section>
    );
};

export default Form;
