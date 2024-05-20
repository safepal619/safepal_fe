import 'antd/dist/reset.css';
import React from 'react'

import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter  as Router} from "react-router-dom";
import { PersistGate } from 'redux-persist/integration/react'; 
import { persistStore } from 'redux-persist';
import { Provider } from "react-redux";

import store from './app/store';

const persistor = persistStore(store)

ReactDOM.createRoot(document.getElementById('root')).render(

        <Router>
        <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
    <App />
    </PersistGate>
    </Provider>
        
    </Router>

)





