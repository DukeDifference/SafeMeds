import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Image,
  VStack,
} from "@chakra-ui/react";
import { Collapse } from "@chakra-ui/transition";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";

import ExtLink from "../Link";
import NextLink from "../NextLink";

type MyDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function MyDrawer({ isOpen, onClose }: MyDrawerProps) {
  const { data: session, status } = useSession();
  const [show, setShow] = React.useState(false);
  const handleToggle = () => {
    setShow(!show);
  };
  return (
    <Drawer isOpen={isOpen} onClose={onClose} placement="right">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>NavBar</DrawerHeader>

        <DrawerBody mr="30px">
          <VStack spacing={5} align="stretch" textAlign="center">
            <NextLink url="/playground">Home</NextLink>
            <ExtLink url="https://github.com/Daggy1234/dagpi">Github</ExtLink>

            <Link href="/dashboard">
              <Button
                variant="outline"
                borderColor="white"
                leftIcon={<MdDashboard />}
                colorScheme="blue"
                border="1px"
              >
                Dashboard
              </Button>
            </Link>
            {status === "loading" && (
              <Button border="1px" colorScheme="blue" isLoading>
                Loading..
              </Button>
            )}
            {!session ? (
              <Button
                border="1px"
                colorScheme="blue"
                onClick={(e) => {
                  e.preventDefault();
                  signIn("discord");
                }}
              >
                Login
              </Button>
            ) : (
              <>
                <Button colorScheme="blue" onClick={handleToggle}>
                  <Image
                    boxSize="2rem"
                    borderRadius="full"
                    src={session.user?.image?.toString()}
                    alt={session.user?.name?.toString()}
                    mr="60px"
                  />
                  Profile
                  {show ? <FaChevronUp /> : <FaChevronDown />}
                </Button>
                <Collapse in={show} animateOpacity>
                  <VStack spacing="30px">
                    <Box>User: {session.user?.name?.toString()}</Box>
                    <Box>Email: {session.user?.email?.toString()}</Box>
                  </VStack>
                  <Button
                    mt="50px"
                    colorScheme="pink"
                    variant="solid"
                    border="1px"
                    onClick={(e) => {
                      e.preventDefault();
                      signOut();
                    }}
                  >
                    Logout
                  </Button>
                </Collapse>
              </>
            )}
          </VStack>
        </DrawerBody>

        <DrawerFooter>
          <Button variant="outline" mr={3} onClick={onClose}>
            Close
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
