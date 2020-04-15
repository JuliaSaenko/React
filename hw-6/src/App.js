import React from 'react';
import { Provider } from "react-redux";

import store from "./redux/store";
import GistsList from "./components/GistsList";

import './App.scss';
import GistInfo from "./components/GistInfo";


function App() {
  return (
   <Provider store={store}>
       <div className="app">
           <GistsList/>
           <GistInfo/>
       </div>
   </Provider>

  );
}

export default App;
