import React from "react";
import LatestCollection from "../Components/LatestCollection";
import Mainpage from "../Components/Mainpage";
import BestSeller from "../Components/BestSeller";




const Home = () => {
  return (
    <div>
      <Mainpage />
      <LatestCollection />
      <BestSeller/>
     
    </div>
  );
};

export default Home;
