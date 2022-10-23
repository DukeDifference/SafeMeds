import { Flex, Heading } from "@chakra-ui/react";
// import { useSession } from "next-auth/react";
// import { useRouter } from "next/router";

import OnboardingForm from "lib/components/OnboardingForm";
// import getUserFromEmail from "lib/utils/db/getUserFromEmail";

const Page = () => {
  // const { data: session, status } = useSession();
  // const loading = status === "loading";
  // const router = useRouter();

  // if (loading) return null;
  // console.log("WE GOING");
  // if (!session) {
  // return <Heading my={10}>Please Login First</Heading>;
  // }
  // if (session.user && session.user.email) {
  // return getUserFromEmail(session.user.email).then((u) => {
  // if (u === null) {
  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="center"
      minHeight="70vh"
      gap={4}
      mx={4}
      mt={16}
      mb={8}
      w="full"
    >
      <Heading>Just fill our form to get started!</Heading>
      <OnboardingForm />
    </Flex>
  );
  // }
  // router.push("/");
  // return <Box />;
  // });
  // }
  // router.push("/");
  // return <Box />;
};

export default Page;
