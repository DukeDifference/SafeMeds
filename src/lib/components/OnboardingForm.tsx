/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
/* eslint-disable react/jsx-no-bind */
import {
  Button,
  Flex,
  Radio,
  RadioGroup,
  FormLabel,
  Stack,
  useToast,
  FormErrorMessage,
  FormControl,
  Input,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";

type ValidationPostProcess = {
  sex: string;
  pregnant: boolean;
  alcohol: boolean;
  tobacco: boolean;
  caffiene: boolean;
  dob: Date;
};

const validation = Yup.object().shape({
  sex: Yup.string().oneOf(["M", "F", "O"]).required(),
  pregnant: Yup.boolean().required(),
  alcohol: Yup.boolean().required(),
  tobacco: Yup.boolean().required(),
  caffiene: Yup.boolean().required(),
  dob: Yup.date().required(),
});

const OnboardingForm = () => {
  const [formState, setFormState] = useState(0);
  const [submitting, SetSubmitting] = useState(false);
  const toast = useToast();

  const handleNextPage = () => {
    if (formState < 5) {
      setFormState(formState + 1);
    } else {
      SetSubmitting(true);
      console.log("sex ur mom");
    }
  };

  const handlePreviousPage = () => {
    if (formState > 0) setFormState(formState - 1);
  };

  function renderForm() {
    return (
      <Formik
        initialValues={{
          sex: "O",
          pregnant: false,
          alcohol: false,
          tobacco: false,
          caffiene: false,
          dob: new Date(),
        }}
        onSubmit={async (values: any, actions: any) => {
          const val: ValidationPostProcess = {
            sex: values.sex,
            pregnant: values.pregnant === "true",
            alcohol: values.alcohol === "true",
            tobacco: values.tobacco === "true",
            caffiene: values.caffiene === "true",
            dob: values.dob,
          };
          const res = await fetch("/api/postForm", {
            method: "POST",
            body: JSON.stringify(val),
          });
          const js = await res.json();
          SetSubmitting(false);
          actions.resetForm();
          if (js.status) {
            toast({
              title: "You've Signed up!",
              description: `Redirecting you to our homepage!`,
              status: "success",
              duration: 9000,
              isClosable: true,
            });
          } else {
            toast({
              title: "Error inserting User",
              description: "Not supposed to happen. Contact develpers",
              status: "error",
              duration: 9000,
              isClosable: true,
            });
          }
        }}
        validationSchema={validation}
      >
        {(props) => (
          <Form>
            {formState === 0 && (
              <Field name="sex">
                {({ field, form }: { field: any; form: any }) => {
                  const { onChange, ...rest } = field;
                  return (
                    <FormControl
                      isInvalid={form.errors.sex && form.touched.sex}
                    >
                      <FormLabel htmlFor="sex">Select your Sex?</FormLabel>
                      <RadioGroup {...rest} id="sex" {...props}>
                        <Stack direction="column">
                          <Radio onChange={onChange} {...field} value="M">
                            Male
                          </Radio>
                          <Radio onChange={onChange} {...field} value="F">
                            Female
                          </Radio>
                          <Radio onChange={onChange} {...field} value="O">
                            Other/Prefer not to answer
                          </Radio>
                        </Stack>
                      </RadioGroup>
                      <FormErrorMessage>{form.errors.user}</FormErrorMessage>
                    </FormControl>
                  );
                }}
              </Field>
            )}
            {formState === 1 && (
              <Field name="pregnant">
                {({ field, form }: { field: any; form: any }) => {
                  const { onChange, ...rest } = field;
                  return (
                    <FormControl
                      isInvalid={form.errors.pregnant && form.touched.pregnant}
                    >
                      <FormLabel htmlFor="pregnant">
                        Are you Pregnant?
                      </FormLabel>
                      <RadioGroup id="pregnant" {...rest} {...props}>
                        <Stack direction="column">
                          <Radio onChange={onChange} {...field} value="true">
                            Yes
                          </Radio>
                          <Radio onChange={onChange} {...field} value="false">
                            No
                          </Radio>
                        </Stack>
                      </RadioGroup>
                      <FormErrorMessage>
                        {form.errors.pregnant}
                      </FormErrorMessage>
                    </FormControl>
                  );
                }}
              </Field>
            )}
            {formState === 2 && (
              <Field name="alcohol">
                {({ field, form }: { field: any; form: any }) => (
                  <FormControl
                    isInvalid={form.errors.alcohol && form.touched.alcohol}
                  >
                    <FormLabel htmlFor="alcohol">
                      Do you consume Alcohol?
                    </FormLabel>
                    <RadioGroup {...field} id="alcohol" {...props}>
                      <Stack direction="column">
                        <Radio {...field} value="true">
                          Yes
                        </Radio>
                        <Radio {...field} value="false">
                          No
                        </Radio>
                      </Stack>
                    </RadioGroup>
                    <FormErrorMessage>{form.errors.alcohol}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
            )}
            {formState === 3 && (
              <Field name="tobacco">
                {({ field, form }: { field: any; form: any }) => (
                  <FormControl
                    isInvalid={form.errors.tobacco && form.touched.tobacco}
                  >
                    <FormLabel htmlFor="tobacco">
                      Do you smoke/consume tobacco?
                    </FormLabel>
                    <RadioGroup {...field} id="tobacco" {...props}>
                      <Stack direction="column">
                        <Radio {...field} value="true">
                          Yes
                        </Radio>
                        <Radio {...field} value="false">
                          No
                        </Radio>
                      </Stack>
                    </RadioGroup>
                    <FormErrorMessage>{form.errors.tobacco}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
            )}
            {formState === 4 && (
              <Field name="caffiene">
                {({ field, form }: { field: any; form: any }) => (
                  <FormControl
                    isInvalid={form.errors.caffiene && form.touched.caffiene}
                  >
                    <FormLabel htmlFor="caffiene">
                      Do you consume Caffiene?
                    </FormLabel>
                    <RadioGroup {...field} id="caffiene" {...props}>
                      <Stack direction="column">
                        <Radio {...field} value="true">
                          Yes
                        </Radio>
                        <Radio {...field} value="false">
                          No
                        </Radio>
                      </Stack>
                    </RadioGroup>
                    <FormErrorMessage>{form.errors.caffiene}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
            )}
            {formState === 5 && (
              <>
                <Field name="dob">
                  {({ field, form }: { field: any; form: any }) => (
                    <FormControl
                      isInvalid={form.errors.dob && form.touched.dob}
                    >
                      <FormLabel htmlFor="dob">Date of Birth?</FormLabel>
                      <Input {...field} id="dob" type="date" />
                      <FormErrorMessage>{form.errors.dob}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Button
                  isLoading={submitting}
                  size="lg"
                  colorScheme="blue"
                  type="submit"
                >
                  Submit
                </Button>
              </>
            )}
          </Form>
        )}
      </Formik>
    );
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
          <Button size="lg" colorScheme="blue" onClick={handlePreviousPage}>
            Previous
          </Button>
        ) : null}
        {formState !== 5 && (
          <Button size="lg" colorScheme="blue" onClick={handleNextPage}>
            {formState === 5 ? <>Submit</> : <>Next</>}
          </Button>
        )}
      </Flex>
    </Flex>
  );
};

export default OnboardingForm;
