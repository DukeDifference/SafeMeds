/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
} from "@chakra-ui/react";
import { DatePicker } from "chakra-ui-date-input";
import { useState } from "react";
import { RiBusWifiFill } from "react-icons/ri";

const OnboardingPage = () => {
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [pregnant, setPregnant] = useState("");
  const [alcoholic, setAlcoholic] = useState("");
  const [smoker, setSmoker] = useState("");

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
      <h1>Enter Information</h1>
      <FormControl>
        <FormLabel>Date of Birth</FormLabel>
        <DatePicker value={dob} onChange={setDob} />

        <FormLabel>Gender</FormLabel>
        <RadioGroup>
          <Radio value="1">Male</Radio>
          <Radio value="2">Female</Radio>
          <Radio value="3">Other/Prefer not to answer</Radio>
        </RadioGroup>

        <FormLabel>Pregnant</FormLabel>
        <RadioGroup>
          <Radio value="1">Yes</Radio>
          <Radio value="2">No</Radio>
        </RadioGroup>

        <FormLabel>Alcoholic</FormLabel>
        <RadioGroup>
          <Radio value="1">Yes</Radio>
          <Radio value="2">No</Radio>
        </RadioGroup>

        <FormLabel>Smoker</FormLabel>
        <RadioGroup>
          <Radio value="1">Yes</Radio>
          <Radio value="2">No</Radio>
        </RadioGroup>

        <Button mt={4} type="submit">
          Submit
        </Button>
      </FormControl>
    </Flex>
  );
};

export default OnboardingPage;
