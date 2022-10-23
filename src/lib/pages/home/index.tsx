/* eslint-disable @typescript-eslint/no-unused-vars */

import { Button, Flex } from "@chakra-ui/react";
import { signIn } from "next-auth/react";
import { NextSeo } from "next-seo";

import OnboardingForm from "lib/components/OnboardingForm";
import CTASection from "lib/components/samples/CTASection";
import SomeImage from "lib/components/samples/SomeImage";
import SomeText from "lib/components/samples/SomeText";

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
      {/* <NextSeo title="Home" />
      <Button
        onClick={(e) => {
          e.preventDefault();
          signIn("google");
        }}
      >
        Sign in With Google
      </Button>
      <SomeText />
      <SomeImage />
      <CTASection /> */}

      <OnboardingForm />
    </Flex>
  );
};

export default Home;
