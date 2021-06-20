import React, { useState, useEffect } from 'react';

import Header from './components/Header/Header'
import CodeArea from './components/CodeArea/CodeArea'
import Charts from './components/Charts/Charts'
import Footer from './components/Footer/Footer'
import Alert from './components/Alert/Alert';
import EventStringParser from './services/EventStringParser';
import {codeValue} from './constants/code.js';
import './App.css';


function App() {

    const [hasError, setHasError] = useState({})
    const [codeValues, setCodeValues] = useState({codeValue,value: codeValue})
    const [chartValues, setChartValues] = useState({eventStreamList: new EventStringParser()})
  
  useEffect(() => {
    onClickButton()
  }, [])

  const onClickButton = () => {

    try{

      const {value} = codeValues;

      const eventStreamList = new EventStringParser(value);
      
      eventStreamList.process();
      console.log({eventStreamList})
      setChartValues({eventStreamList})

    }catch(err){
      console.log(err)
      setHasError(err);
    }
  }

  let onChangeCode = value => {
      setCodeValues(value)
  }

  const dismissError = () => {
    setHasError({});
  }


    return (
      <Alert
          error = {hasError}
          dismiss = {dismissError}>
        
          <Header />

          <div className="visible-wrapper">
              <CodeArea onChange = {onChangeCode} {...codeValues} />
              <Charts {...chartValues}/>
          </div>
        
        <Footer onClickButton = {onClickButton}/>

      </Alert>
    );
  
}

export default App;