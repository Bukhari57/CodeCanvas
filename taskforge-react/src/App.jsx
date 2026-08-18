import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Card from "./components/Card";
function App() {
  return (
    <>
      <Navbar />
      <Footer />
      <Card title="My Card 1" description="This is a simple card component." style={{backgroundColor: '#f0f0f0'}} />
        <Card title="My Card 2" description="This is a simple card component." style={{backgroundColor: '#e0e0e0'}} />
          <Card title="My Card 3" description="This is a simple card component." style={{backgroundColor: '#d0d0d0'}} />
    </>
  );
}

export default App;
