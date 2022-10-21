import React from "react";
import { useAuthContext } from "../../InfiniteContext";
import Navigation from "../navigation/Navigation";
import Modal from "../../components/modal/Modal";

const Home = () => {
  const { screenIndex } = useAuthContext();
  return (
    <>
      {screenIndex === Screen.LOCAL ? (
        <>
          <Modal />
        </>
      ) : screenIndex === Screen.NATIONAL ? (
        <></>
      ) : (
        <></>
      )}
      <Navigation />
    </>
  );
};

const Screen = {
  LOCAL: 0,
  NATIONAL: 1,
  MY_PRAYER: 2,
};

export default Home;
