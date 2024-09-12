import { Button, Flex, Box } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import FormInput from "../../components/formComponents/FormInput";
import { FuncProps, IJobDetails } from "../../interface/forms";
import { useData } from "./DataProvider";

const JobDetailsForm: React.FC<FuncProps> = ({ onNext, onPrev }) => {
  const data = useData();
  const { state, setState } = data || { state: null, setState: () => {} };

  const formik = useFormik<IJobDetails>({
    enableReinitialize: true, 
    initialValues: {
      jobTitle: state?.jobDetails?.jobTitle || "",
      jobDetails: state?.jobDetails?.jobDetails || "",
      jobLocation: state?.jobDetails?.jobLocation || "",
    },
    validationSchema: Yup.object().shape({
      jobTitle: Yup.string().required("Job Title is required"),
      jobDetails: Yup.string().required("Job Details are required"),
      jobLocation: Yup.string().required("Job Location is required"),
    }),
    onSubmit: (values) => {
      setState((prev) => ({
        ...prev,
        jobDetails: values,
      }));
      onNext();
    },
  });

  useEffect(() => {
    if (state) {
      setState((prev) => ({
        ...prev,
        jobDetails: formik.values,
      }));
    }
  }, [formik.values, setState, state]);

  return (
    <Box width="100%" as="form" onSubmit={formik.handleSubmit}>
      <Box width="100%">
        <FormInput
          label="Job Title"
          placeholder="Enter job title"
          name="jobTitle"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.jobTitle}
          error={formik.errors.jobTitle}
          touched={formik.touched.jobTitle}
        />
        <FormInput
          label="Job Details"
          placeholder="Enter job details"
          name="jobDetails"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.jobDetails}
          error={formik.errors.jobDetails}
          touched={formik.touched.jobDetails}
        />
        <FormInput
          label="Job Location"
          name="jobLocation"
          placeholder="Enter job location"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.jobLocation}
          error={formik.errors.jobLocation}
          touched={formik.touched.jobLocation}
        />
        <Flex w="100%" justify="flex-end" mt="4rem" gap="20px">
          <Button onClick={onPrev} colorScheme="gray" type="button">
            Previous
          </Button>
          <Button colorScheme="red" type="submit">
            Next
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default JobDetailsForm;
