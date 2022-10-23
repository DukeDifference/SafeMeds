import { Flex, Heading } from "@chakra-ui/react";

import OnboardingForm from "lib/components/OnboardingForm";

const Page = () => {
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
      <Heading>Just fill our form to get started!</Heading>
      <OnboardingForm />
    </Flex>
  );
};

export default Page;
