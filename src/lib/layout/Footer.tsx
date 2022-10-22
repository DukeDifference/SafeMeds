import { Flex, Link, Text } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Flex as="footer" width="full" justifyContent="center">
      <Text fontSize="sm" color="gray.500">
        {new Date().getFullYear()} -{" "}
        <Link
          href="https://safe-meds.vercel.app"
          isExternal
          rel="noopener noreferrer"
        >
          SafeMeds
        </Link>
      </Text>
    </Flex>
  );
};

export default Footer;
