import { Button, Flex, Box } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useFormik } from "formik";
import FormSelect from "../../components/formComponents/FormSelect";
import { FuncProps, IInterViewSettings } from "../../interface/forms";
import {
  interviewDurationOptions,
  interviewLanguageOptions,
  interviewModeOptions,
} from "./constants";
import { useData } from "./DataProvider";

const InterviewDetailsForm: React.FC<FuncProps> = ({ onPrev }) => {
  const data = useData();
  const { state, setState } = data || { state: null, setState: () => {} };

  const formik = useFormik<IInterViewSettings>({
    enableReinitialize: true,
    initialValues: {
      interviewMode: state?.interviewSettings?.interviewMode || "",
      interviewDuration: state?.interviewSettings?.interviewDuration || "",
      interviewLanguage: state?.interviewSettings?.interviewLanguage || "",
    },
    onSubmit: (values) => {
      setState((prev) => ({
        ...prev,
        interviewSettings: values,
      }));
      alert("Form successfully submitted");  
      //Call api here and Reset the data ,Sorry I don't have time to clear to it 
    },
  });

  useEffect(() => {
    if (state) {
      setState((prev) => ({
        ...prev,
        interviewSettings: formik.values,
      }));
    }
  }, [formik.values, setState, state]);

  return (
    <Box width="100%" as="form" onSubmit={formik.handleSubmit}>
      <Box width="100%">
        <FormSelect
          label="Interview Mode"
          placeholder="Select interview mode"
          name="interviewMode"
          options={interviewModeOptions}
          onChange={formik.setFieldValue}
          onBlur={formik.setFieldTouched}
          value={formik.values?.interviewMode}
          error={formik.errors?.interviewMode}
          touched={formik.touched?.interviewMode}
        />
        <FormSelect
          label="Interview Duration"
          placeholder="Select interview duration"
          name="interviewDuration"
          options={interviewDurationOptions}
          onChange={formik.setFieldValue}
          onBlur={formik.setFieldTouched}
          value={formik.values?.interviewDuration}
          error={formik.errors?.interviewDuration}
          touched={formik.touched?.interviewDuration}
        />
        <FormSelect
          label="Interview Language"
          name="interviewLanguage"
          placeholder="Select interview language"
          options={interviewLanguageOptions}
          onChange={formik.setFieldValue}
          onBlur={formik.setFieldTouched}
          error={formik.errors.interviewLanguage}
          touched={formik.touched.interviewLanguage}
          value={formik.values.interviewLanguage}
        />
        <Flex w="100%" justify="flex-end" mt="4rem" gap="20px">
          <Button onClick={onPrev} colorScheme="gray" type="button">
            Previous
          </Button>
          <Button colorScheme="red" type="submit">
            Submit
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default InterviewDetailsForm;
