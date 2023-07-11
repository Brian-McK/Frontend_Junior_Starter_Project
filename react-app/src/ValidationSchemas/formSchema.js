import * as yup from 'yup';
import dayjs from 'dayjs';

export const validationSchemaEmployeeForms = yup.object({
    firstName: yup
      .string("Enter first name")
      .required("First name is required")
      .min(2, "First name should be at least 2 characters")
      .max(35, " First name should not exceed 35 characters")
      .matches(
        /^[a-zA-Z]+$/,
        "First name should only contain alphabetic characters"
      ),
    lastName: yup
      .string("Enter last name")
      .required("Last name is required")
      .min(2, "Last name should be at least 2 characters")
      .max(35, " Last name should not exceed 35 characters")
      .matches(
        /^[a-zA-Z]+$/,
        "Last name should only contain alphabetic characters"
      ),
    dob: yup
      .date()
      .nonNullable("Date of birth cant be empty")
      .typeError("Invalid Date")
      .test("is-at-least-18", "Must be at least 18 years old", (value) => {
        const currentDate = dayjs();
        const eighteenYearsAgo = currentDate.subtract(18, "year");
        return dayjs(value).isBefore(eighteenYearsAgo);
      }),
    email: yup.string().required("Email is required").email(),
    isActive: yup.boolean().required(),
  });