/* eslint-disable prettier/prettier */

import { Flex } from "@chakra-ui/react";

const HomePage = () => {
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
      <h1>Safe</h1>
      <h1>Meds</h1>
    </Flex>
  );
};

export default HomePage;
