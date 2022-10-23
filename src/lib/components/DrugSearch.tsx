/* eslint-disable no-console */
import {
  Button,
  Flex,
  FormControl,
  FormHelperText,
  Box,
  useToast,
  Heading,
  Spacer,
  Stack,
  HStack,
} from "@chakra-ui/react";
import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
} from "@choc-ui/chakra-autocomplete";
import axios from "axios";
import type { SetStateAction } from "react";
import { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";

type ReturnDrug = {
  name: string;
  drug: string;
  data: string;
};

const AUTOCOMPLETE_URL =
  "https://clinicaltables.nlm.nih.gov/api/rxterms/v3/search";

const MIN_DRUG_NAME_LENGTH = 3;

const DrugSearch = () => {
  const [currInput, setInput] = useState("");
  const [drugs, setDrugs] = useState(["no drugs found"]);
  const [submitting, SetSubmitting] = useState(false);
  const [submittingAdd, SetSubmittingAdd] = useState(false);
  const [returnData, SetReturnData] = useState<ReturnDrug | null>(null);
  const toast = useToast();

  useEffect(() => {
    if (currInput.length >= MIN_DRUG_NAME_LENGTH) {
      axios
        .get(`${AUTOCOMPLETE_URL}/?terms=${currInput}&maxList=10`)
        .then((response) => {
          const drugNames = new Set<string>(
            response.data[1].map((e: string) =>
              e.slice(0, e.indexOf("(") - 1).toLowerCase()
            )
          );

          const drugNamesArray: string[] = Array.from(drugNames);
          drugNamesArray.sort();
          setDrugs([currInput].concat(drugNamesArray.slice(0, 9)));
        })
        .catch(() => setDrugs([currInput]));
    } else {
      setDrugs([currInput]);
    }
  }, [currInput]);

  return (
    <Box>
      <Flex
        py={8}
        px={{ base: 8, md: 20 }}
        justify="center"
        align="center"
        w="full"
      >
        <FormControl>
          <Heading>Drug Search</Heading>
          <HStack>
            <AutoComplete rollNavigation>
              <AutoCompleteInput
                variant="filled"
                placeholder="Drug name..."
                onChange={(event: {
                  target: { value: SetStateAction<string> };
                }) => {
                  setInput(event.target.value);
                }}
              />
              <AutoCompleteList mt={2} py={2}>
                {drugs.map((drug, drug_index) => (
                  <AutoCompleteItem
                    // eslint-disable-next-line react/no-array-index-key
                    key={`option-${drug_index}`}
                    value={drug}
                    textTransform="capitalize"
                    onClick={() => {
                      setInput(drug);
                    }}
                  >
                    {drug}
                  </AutoCompleteItem>
                ))}
              </AutoCompleteList>
            </AutoComplete>
            <Button
              type="submit"
              isLoading={submitting}
              colorScheme="blue"
              onClick={async () => {
                SetSubmitting(true);
                const resp = await fetch("/api/drugs/getRXCUIFromDrugName", {
                  method: "POST",
                  body: JSON.stringify({
                    name: currInput,
                  }),
                });
                const js = await resp.json();
                console.log(js);
                SetReturnData(js);
                if (js.success) {
                  toast({
                    title: "Got Drug ID!",
                    description: `Got ${js.data}`,
                    status: "success",
                    duration: 9000,
                    isClosable: true,
                  });
                } else {
                  toast({
                    title: "Unable to Find Drug",
                    description: "no results",
                    status: "error",
                    duration: 9000,
                    isClosable: true,
                  });
                }
                SetSubmitting(false);
              }}
            >
              Search
            </Button>
          </HStack>
          <FormHelperText>
            Choose a drug you use. If there are variations of the drug, choose
            the simplest one.
          </FormHelperText>
        </FormControl>
      </Flex>
      {returnData !== null && (
        <Flex outline="black 2px solid" p={10}>
          <Stack>
            <Heading>{returnData.name}</Heading>
          </Stack>
          <Spacer />
          <Button
            isLoading={submittingAdd}
            onClick={async () => {
              SetSubmittingAdd(true);
              const r = await fetch("/api/drugs/postUserDrug", {
                method: "POST",
                body: JSON.stringify({
                  drug_id: returnData.drug,
                  ooga: "booga",
                }),
              });
              const js = await r.json();
              if (js.status) {
                toast({
                  title: "Added the drug to your collection!",
                  description: `Head to the dashboard!`,
                  status: "success",
                  duration: 9000,
                  isClosable: true,
                });
              } else {
                toast({
                  title: "Error adding drug",
                  description: "Not supposed to happen. Contact developers",
                  status: "error",
                  duration: 9000,
                  isClosable: true,
                });
              }
              SetSubmittingAdd(false);
            }}
            colorScheme="blue"
            size="lg"
            leftIcon={<AiOutlinePlus />}
          />
        </Flex>
      )}
    </Box>
  );
};

export default DrugSearch;
