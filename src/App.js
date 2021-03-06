import React from "react";
import Map from "./components/Map/Map";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Info from "./components/Middle Section/Info/Info";

function App() {
  return (
    <>
      <Header />
      <Info />
      <Map></Map>
      <Footer />
    </>
  );
}

export default App;
