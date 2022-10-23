/* eslint-disable @typescript-eslint/no-unused-vars */

import { Flex } from "@chakra-ui/react";

import DrugSearch from "lib/components/DrugSearch";

const Home = () => {
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
      <DrugSearch />
    </Flex>
  );
};

export default Home;
