import { Button, Flex, Box } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import FormInput from "../../components/formComponents/FormInput";
import FormSelect from "../../components/formComponents/FormSelect";
import { FuncProps, IRequisitionDetails } from "../../interface/forms";
import { genderOptions, urgencyOptions } from "./constants";
import { useData } from "./DataProvider";

const RequisitionDetailsForm: React.FC<FuncProps> = ({ onNext }) => {
  const data = useData();
  const { state, setState } = data || { state: null, setState: () => {} };

  const formik = useFormik<IRequisitionDetails>({
    enableReinitialize: true, 
    initialValues: {
      requisitionTitle: state?.requisitionDetails?.requisitionTitle || "",
      noOfOpenings: state?.requisitionDetails?.noOfOpenings || 0,
      urgency: state?.requisitionDetails?.urgency || "",
      gender: state?.requisitionDetails?.gender || "",
    },
    validationSchema: Yup.object().shape({
      requisitionTitle: Yup.string().required("Requisition title is required"),
      noOfOpenings: Yup.number()
        .typeError("Enter a valid number")
        .required("Number of openings is required")
        .positive("Enter a valid number")
        .min(1, "Enter a valid number"),
      urgency: Yup.string().required("Urgency is required"),
      gender: Yup.string().required("Gender is required"),
    }),
    onSubmit: (values) => {
      setState((prev) => ({
        ...prev,
        requisitionDetails: values,
      }));
      onNext(); 
    },
  });

  useEffect(() => {
    if (state) {
      setState((prev) => ({
        ...prev,
        requisitionDetails: formik.values,
      }));
    }
  }, [formik.values, setState, state]);

  return (
    <Box width="100%" as="form" onSubmit={formik.handleSubmit}>
      <Box width="100%">
        <FormInput
          label="Requisition Title"
          placeholder="Enter requisition title"
          name="requisitionTitle"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values?.requisitionTitle}
          error={formik.errors?.requisitionTitle}
          touched={formik.touched?.requisitionTitle}
        />
        <FormInput
          label="Number of openings"
          placeholder="Enter number of openings"
          name="noOfOpenings"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values?.noOfOpenings}
          error={formik.errors?.noOfOpenings}
          touched={formik.touched?.noOfOpenings}
        />
        <FormSelect
          label="Gender"
          name="gender"
          placeholder="Select gender"
          options={genderOptions}
          onChange={formik.setFieldValue}
          onBlur={formik.setFieldTouched}
          error={formik.errors.gender}
          touched={formik.touched.gender}
          value={formik.values.gender}
        />
        <FormSelect
          label="Urgency"
          name="urgency"
          placeholder="Select urgency"
          options={urgencyOptions}
          onChange={formik.setFieldValue}
          onBlur={formik.setFieldTouched}
          error={formik.errors.urgency}
          touched={formik.touched.urgency}
          value={formik.values.urgency}
        />
        <Flex w="100%" justify="flex-end" mt="4rem">
          <Button colorScheme="red" type="submit">
            Next
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default RequisitionDetailsForm;
