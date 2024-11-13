import React from 'react';
import { Modal, Form, Input, DatePicker, Button } from 'antd';
import { Formik, Field, Form as FormikForm, ErrorMessage } from 'formik';
import * as Yup from 'yup';

interface CustomModalProps {
  isVisible: boolean;
  content: string | null;
  onClose: () => void;
}

const CustomModal: React.FC<CustomModalProps> = ({ isVisible, content, onClose }) => {
  const validationSchema = Yup.object({
    name: Yup.string().required('This field is required'),
    scenario: Yup.string().required('This field is required'),
    startDate: Yup.date().required('Start date is required'),
    endDate: Yup.date()
      .min(Yup.ref('startDate'), 'End date must be later than start date')
      .required('End date is required'),
  });

  return (
    <Modal
      title="New Report"
      open={isVisible}
      onCancel={onClose}
      footer={null}
    >
      <Formik
        initialValues={{
          name: '',
          scenario: '',
          startDate: null,
          endDate: null,
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          console.log('Form values:', values);
          resetForm();
          onClose(); 
        }}
      >
        {({ setFieldValue, touched, errors }) => (
          <FormikForm>
            <div className="mb-4">
              <Field
                name="name"
                as={Input}
                placeholder="Report name"
                className={`w-full rounded-full ${touched.name && errors.name ? 'border-red-500' : ''}`}
              />
              <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
            </div>
            <div className="mb-4">
              <Field
                name="scenario"
                as={Input}
                placeholder="Simulation Scenario"
                className={`w-full rounded-full ${touched.scenario && errors.scenario ? 'border-red-500' : ''}`}
              />
              <ErrorMessage name="scenario" component="div" className="text-red-500 text-sm mt-1" />
            </div>
            <div className="mb-4">
              <label htmlFor="startDate" className="block mb-2 font-semibold">
                Select range date:
              </label>
              <Field name="startDate">
                {({ field, form }: any) => (
                  <DatePicker
                    {...field}
                    onChange={(date, dateString) => setFieldValue('startDate', date)}
                    format="YYYY-MM-DD"
                    className={`w-full rounded-full ${form.touched.startDate && form.errors.startDate ? 'border-red-500' : ''}`}
                  />
                )}
              </Field>
              <ErrorMessage name="startDate" component="div" className="text-red-500 text-sm mt-1" />
            </div>
            <div className="mb-4">
              <Field name="endDate">
                {({ field, form }: any) => (
                  <DatePicker
                    {...field}
                    onChange={(date, dateString) => setFieldValue('endDate', date)}
                    format="YYYY-MM-DD"
                    className={`w-full rounded-full ${form.touched.endDate && form.errors.endDate ? 'border-red-500' : ''}`}
                  />
                )}
              </Field>
              <ErrorMessage name="endDate" component="div" className="text-red-500 text-sm mt-1" />
            </div>
            <div className="mt-4">
              <Button type="primary" htmlType="submit" className="w-full">
                Generate
              </Button>
            </div>
          </FormikForm>
        )}
      </Formik>
    </Modal>
  );
};

export default CustomModal;
