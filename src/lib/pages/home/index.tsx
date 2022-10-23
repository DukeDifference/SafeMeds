import { Flex } from "@chakra-ui/react";
import { NextSeo } from "next-seo";

import DrugSearch from "lib/components/DrugSearch";

const Home = () => {
  return (
    <Flex direction="column" w="full">
      <NextSeo title="Home" />
      <DrugSearch />
    </Flex>
  );
};

export default Home;
