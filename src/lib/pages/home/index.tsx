/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */

import { Flex } from "@chakra-ui/react";
import { useState } from "react";

import AuthenticationPage from "lib/components/home/AuthenticationPage";
import HomePage from "lib/components/home/HomePage";
import OnboardingPage from "lib/components/home/OnboardingPage";
import SomeText from "lib/components/samples/SomeText";

const Home = () => {
  const [screenID, setScreenID] = useState(2);

  function retrieveScreen() {
    switch (screenID) {
      case 0:
        return <HomePage />;
      case 1:
        return <AuthenticationPage />;
      case 2:
        return <OnboardingPage />;
      default:
        return <SomeText />;
    }
  }

  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="center"
      minHeight="70vh"
      gap={4}
      mb={8}
      w="full"
    >
      {retrieveScreen()}
    </Flex>
  );
};

export default Home;
