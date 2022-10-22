/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */

import { Flex } from "@chakra-ui/react";
import { useState } from "react";

import SomeImage from "lib/components/samples/SomeImage";
import SomeText from "lib/components/samples/SomeText";

const Home = () => {
  const [screenID, setScreenID] = useState(0);

  function retrieveScreen() {
    switch (screenID) {
      case 0:
        return <SomeText />;
      case 1:
        return <SomeImage />;
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
