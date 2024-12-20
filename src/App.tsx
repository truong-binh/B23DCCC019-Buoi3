import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import store from "./store";
import ItemTable from "./components/ItemTable";
import ItemForm from "./components/ItemForm";

const App: React.FC = () => {
    return (
        <Provider store={store}>
            <Router>
                <div>
                    <h1>Bảng Thông Tin</h1>
                    <ItemForm />
                    <ItemTable />
                </div>
            </Router>
        </Provider>
    );
};

export default App;
