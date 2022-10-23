/* eslint-disable react/jsx-no-bind */
import { Button, Flex, Radio, RadioGroup, Stack } from "@chakra-ui/react";
import { useState } from "react";

const OnboardingForm = () => {
  const [formState, setFormState] = useState(0);
  const [gender, setGender] = useState("");
  const [pregnant, setPregnant] = useState(false);
  const [alcohol, setAlcohol] = useState(false);
  const [tobacco, setTobacco] = useState(false);
  const [dob, setDob] = useState(new Date());

  const postUserData = async () => {
    // post user data to database
  };

  const handleNextPage = () => {
    if (formState < 4) {
      if (gender !== "") setFormState(formState + 1);
    } else postUserData();
  };

  const handlePreviousPage = () => {
    if (formState > 0) setFormState(formState - 1);
  };

  function progressBar() {
    return <h1>{formState + 1}/5</h1>;
  }

  function renderForm() {
    switch (formState) {
      case 0:
        return (
          <>
            <h1>Gender?</h1>
            <RadioGroup onChange={setGender} value={gender}>
              <Stack direction="row">
                <Radio value="M">Male</Radio>
                <Radio value="F">Female</Radio>
                <Radio value="O">Other/Prefer not to answer</Radio>
              </Stack>
            </RadioGroup>
          </>
        );
      case 1:
        return (
          <>
            <h1>Pregnant?</h1>
            <RadioGroup
              onChange={(event) => setPregnant(event === "1")}
              value={pregnant ? "1" : "2"}
            >
              <Stack direction="row">
                <Radio value="1">Yes</Radio>
                <Radio value="2">No</Radio>
              </Stack>
            </RadioGroup>
          </>
        );
      case 2:
        return (
          <>
            <h1>Alcohol?</h1>
            <RadioGroup
              onChange={(event) => setAlcohol(event === "1")}
              value={alcohol ? "1" : "2"}
            >
              <Stack direction="row">
                <Radio value="1">Yes</Radio>
                <Radio value="2">No</Radio>
              </Stack>
            </RadioGroup>
          </>
        );
      case 3:
        return (
          <>
            <h1>Tobacco?</h1>
            <RadioGroup
              onChange={(event) => setTobacco(event === "1")}
              value={tobacco ? "1" : "2"}
            >
              <Stack direction="row">
                <Radio value="1">Yes</Radio>
                <Radio value="2">No</Radio>
              </Stack>
            </RadioGroup>
          </>
        );
      case 4:
        return (
          <>
            <h1>Date of Birth?</h1>
            <input
              type="date"
              value={new Date(dob).toISOString().split("T")[0]}
              onChange={(e) => setDob(new Date(e.target.value))}
            />
          </>
        );
      default:
        return null;
    }
  }

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
      {renderForm()}

      <Flex
        direction="row"
        alignItems="center"
        justifyContent="center"
        gap={4}
        w="full"
      >
        {formState > 0 ? (
          <Button onClick={handlePreviousPage}>Previous</Button>
        ) : null}

        <Button onClick={handleNextPage}>
          {formState === 4 ? <>Submit</> : <>Next</>}
        </Button>
      </Flex>

      {progressBar()}
    </Flex>
  );
};

export default OnboardingForm;
