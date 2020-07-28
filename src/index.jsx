
import React from "react";
import ReactDOM from "react-dom";
import App from './main/app'

import {Provider} from "react-redux"
import configStore from "./store/storeConfig"

const store = configStore()

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>
    
    , document.getElementById("root"));
