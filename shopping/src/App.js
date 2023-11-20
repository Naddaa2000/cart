import './App.css';
import Alert from './Components/Alert';
import LoadingBar from 'react-top-loading-bar'
import Cart from './Components/Cart';
import Login from './Components/Login';
import Navbar from './Components/Navbar';
import Product from './Components/Product';
import Signup from './Components/Signup';
import React, { useState, useRef } from 'react';

import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";



function App() {
  const ref = useRef(null)

  // state = {
  //   progress: 0
  // }
  // setProgress = (progress) => {
  //   this.setState({ progress: progress })
  // }
  const [alert, setAlert] = useState(null)

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      typ: type,
    })
    setTimeout(() => {
      setAlert(null)
    }, 1000);

  };
  const [progress, setProgress] = useState(0)

  return (
    <>
      <Router>
        <Navbar />
        <LoadingBar
          color='#f11946'
          progress={progress}
        //onLoaderFinished={() => setProgress(0)}
        />

        <Alert alert={alert} />

        <div className="container">
          <Routes>
            {/* <Route exact path="/home" element={<Home showAlert={showAlert} />} />
            <Route exact path="/about" element={<About />} /> */}
            <Route exact path="/login" element={<Login setProgress={setProgress} showAlert={showAlert} />} />
            <Route exact path="/signup" element={<Signup setProgress={setProgress} showAlert={showAlert} />} />
            <Route exact path="/product" element={<Product setProgress={setProgress} showAlert={showAlert} />} />
            <Route exact path="/cart" element={<Cart setProgress={setProgress} showAlert={showAlert} />} />
            <Route exact path="/" element={<Login setProgress={setProgress} showAlert={showAlert} />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
