import React from 'react';
import '../styles/app.css';
import Header from '../layout/header';
import Footer from '../layout/footer';
import Home from '../pages/home';
const App = () =>  {
  return (
    <div className="app-wrapper">
      <Header/>
      <main style={{
        paddingTop: "100px",
        paddingBottom: "50px",
        minHeight: "90vh",
        overflow: "hidden",
        display: "block",
        position: "relative",
      }}>
      <Home />
      </main>
      <Footer/>
    </div>
  );
}

export default App;
