/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable sonarjs/cognitive-complexity */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable react/destructuring-assignment */
// @ts-nocheck
import {
  Box,
  Heading,
  Text,
  Flex,
  Icon,
  Stack,
  Link,
  UnorderedList,
  ListItem,
  HStack,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { GiPlainCircle } from "react-icons/gi";
import { MdSmokeFree, MdLocalCafe, MdNoDrinks } from "react-icons/md";

import getInteractionsFromRxcuiList from "lib/utils/getInteractionsFromRxcuiList";

type minConcept = {
  rxcui: string;
  name: string;
  tty: string;
};

type sourceConceptItem = {
  id: string;
  name: string;
  url: string;
};

type interactionPair = {
  description: string;
  severity: string;
  interactionConcept: interactionConcept[];
};

type interactionConcept = {
  minConceptItem: minConcept;
  sourceConceptItem: sourceConceptItem;
};

type InteractionElementProps = {
  props: InteractionElementPropsSub;
};

type InteractionElementPropsSub = {
  comment: string;
  minConcept: minConcept[];
  interactionPair: interactionPair[];
};

const InteractionElement = (props: InteractionElementProps) => {
  return (
    <Box my={4} border="#D2D7DF 3px solid" rounded="md" px={2} py={4}>
      <Heading size="lg">
        {props.props.interactionPair[0].interactionConcept
          .map((e: interactionConcept) => e.sourceConceptItem.name)
          .join(" and ")}
      </Heading>
      <Text my={2}>{props.props.interactionPair[0].description}</Text>
      <Text my={2}>{props.props.comment}</Text>
      <Text my={2}>
        <HStack>
          {props.props.interactionPair[0].interactionConcept.map(
            (e: interactionConcept) => (
              <>
                <Link color="blue.500" href={e.sourceConceptItem.url}>
                  {e.sourceConceptItem.name}
                </Link>
                <Icon ml={3} as={GiPlainCircle} />
              </>
            )
          )}
        </HStack>
      </Text>
    </Box>
  );
};

const Page = () => {
  const { data: session, status } = useSession();
  const loading = status === "loading";
  const [content, setContent] = useState();
  const [drugContent, setDrugContent] = useState();
  const [interactionData, SetInteractionData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      if (session && session.user) {
        const res = await fetch(`/api/getUser/${session.user.email}`);
        const json = await res.json();
        if (json.status) {
          setContent(json.data);
          const drugdata = await fetch(`/api/getUserDrugs/${json.data.id}`);
          const drugjson = await drugdata.json();
          if (drugjson.status) {
            setDrugContent(drugjson.data);
            const dataMap = drugjson.data.map((e: any) => e.rxcui);
            if (json.data.consumesAlcohol) {
              dataMap.push("448");
            }
            if (json.data.consumesNicotine) {
              dataMap.push("7407");
            }
            if (json.data.consumesCaffeine) {
              dataMap.push("1886");
            }

            SetInteractionData(await getInteractionsFromRxcuiList(dataMap));
          }
        }
      }
    };
    fetchData();
  }, [session]);

  if (loading) return null;

  if (!session) {
    return <Heading my={10}>Please Login First</Heading>;
  }

  return (
    <Flex my={10} mx={10} direction={{ base: "column", md: "row" }}>
      <Flex direction="column">
        <Flex direction="column">
          {drugContent && (
            <Box p={10} border="black solid 2px" rounded="lg">
              <Heading my={5}>Added Drugs</Heading>
              <UnorderedList>
                {drugContent.map((e) => (
                  <ListItem>{e.name}</ListItem>
                ))}
              </UnorderedList>
            </Box>
          )}
        </Flex>
        <Flex my={3} direction="column">
          {content && (
            <Box p={10} border="black solid 2px" rounded="lg">
              <Heading my={5}>User Profile</Heading>
              <Stack spacing={3}>
                <Text>
                  <strong>Id:</strong> {content.id}
                </Text>
                <Text>
                  <strong>Name:</strong> {content.firstName}
                </Text>
                <Text>
                  <strong>Age:</strong>{" "}
                  {(
                    (new Date() - new Date(content.dateOfBirth)) /
                    31536000000
                  ).toFixed(2)}{" "}
                  years
                </Text>
                <Text>
                  <strong>Email:</strong> {content.email}
                </Text>
                <Text>
                  <span>
                    <strong>
                      <Icon mr={3} as={MdSmokeFree} />
                    </strong>
                    {content.consumesNicotine ? "No" : "Yes"}
                  </span>
                </Text>
                <Text>
                  <span>
                    <strong>
                      <Icon mr={3} as={MdNoDrinks} />
                    </strong>
                    {content.consumesAlcohol ? "No" : "Yes"}
                  </span>
                </Text>
                <Text>
                  <span>
                    <strong>
                      <Icon mr={3} as={MdLocalCafe} />
                    </strong>
                    {content.consumesCaffeine ? "Yes" : "No"}
                  </span>
                </Text>
              </Stack>
            </Box>
          )}
        </Flex>
      </Flex>
      {interactionData && (
        <Flex
          mx={3}
          p={10}
          border="black solid 2px"
          rounded="lg"
          w="100%"
          direction="column"
        >
          <Heading>Drug Interactions</Heading>
          {interactionData && (
            <Box>
              {interactionData[0].fullInteractionType.map(
                (elm: InteractionElementProps) => (
                  <InteractionElement props={elm} />
                )
              )}
            </Box>
          )}
        </Flex>
      )}
    </Flex>
  );
};

export default Page;
