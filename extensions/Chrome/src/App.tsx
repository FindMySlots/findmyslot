import * as React from "react";
import logo from "./logo.svg";
import "./App.css";
import Form from "./Form";

const App = () => {
    return (
        <div className="App">
            <header className="App-header">
                <h3 className="text-center">
                    Find my slots - Covid Vaccine slot availability tacker
                </h3>
            </header>
            <Form/>
        </div>
    );
};

export default App;
