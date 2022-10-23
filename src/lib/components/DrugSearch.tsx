/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
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

const AUTOCOMPLETE_URL =
  "https://clinicaltables.nlm.nih.gov/api/rxterms/v3/search";

const MIN_DRUG_NAME_LENGTH = 3;

const DrugSearch = () => {
  const [currInput, setInput] = useState("");
  const [drugs, setDrugs] = useState(["no drugs found"]);

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
          setDrugs(drugNamesArray.slice(0, 10));
        })
        .catch(() => setDrugs([]));
    } else {
      setDrugs([]);
    }
  }, [currInput]);

  return (
    <Flex
      py={8}
      px={{ base: 8, md: 20 }}
      justify="center"
      align="center"
      w="full"
    >
      <FormControl>
        <FormLabel>Drug Search</FormLabel>
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
              >
                {drug}
              </AutoCompleteItem>
            ))}
          </AutoCompleteList>
        </AutoComplete>
        <FormHelperText>
          Choose a drug you use. If there are variations of the drug, choose the
          simplest one.
        </FormHelperText>
      </FormControl>
    </Flex>
  );
};

export default DrugSearch;
