import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import styled from "styled-components";
import { UPDATEBUG } from "../Redux/BugDataSlice";

interface ModalContentPopUpProps {
  selectedCardDetail: any;
  closeModelPopUp: () => void;
}

const ModalContentPopUp: React.FC<ModalContentPopUpProps> = ({
  selectedCardDetail,
  closeModelPopUp,
}) => {
  const dispatch = useDispatch();
  console.log(selectedCardDetail.bugId);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: any) => {
    console.log(data, "datadata");

    dispatch(
      UPDATEBUG({
        ...data,
        status: data.status.value,
        bugId: selectedCardDetail.bugId,
      })
    );
    closeModelPopUp();
  };

  const reporterOptions = [
    { value: "alice", label: "Alice Johnson" },
    { value: "bob", label: "Bob Smith" },
    { value: "charlie", label: "Charlie Brown" },
    { value: "diana", label: "Diana Prince" },
    { value: "edward", label: "Edward Elric" },
    { value: "fiona", label: "Fiona Gallagher" },
    { value: "george", label: "George Clooney" },
  ];

  const labelOptions = [
    { value: "none", label: "None" },
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ];

  const assigneeOptions = [
    { value: "John", label: "John Doe" },
    { value: "Mary", label: "Mary Jane" },
    { value: "Sam", label: "Sam Miller" },
    { value: "Tom", label: "Tom Anderson" },
    { value: "Alice", label: "Alice Cooper" },
    { value: "Bob", label: "Bob Harris" },
    { value: "Kate", label: "Kate Smith" },
  ];

  const statusTypes = [
    { value: "open", label: "Open" },
    { value: "inProgress", label: "In Progress" },
    { value: "resolved", label: "Resolved" },
    { value: "closed", label: "Closed" },
  ];

  return (
    <ModalContent onClick={(e) => e.stopPropagation()}>
      <div className="modal-header">
        <h3 className="modal-title">Bug ID: {selectedCardDetail.bugId}</h3>
        <img onClick={closeModelPopUp} src="/icons/close.png" alt="Close Icon" className="close-icon" />
      </div>

      <p className="summary">{selectedCardDetail?.summary}</p>
      <p className="description">{selectedCardDetail?.description}</p>
      <p className="issue-type">{selectedCardDetail?.issueType.value}</p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <label>Assignee</label>
          <Controller
            name="assignees"
            control={control}
            defaultValue={selectedCardDetail?.assignees}
            rules={{ required: "At least one assignee is required" }}
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <>
                <Select
                  options={assigneeOptions}
                  onChange={onChange}
                  onBlur={onBlur}
                  maxMenuHeight={200}
                  value={value}
                  ref={ref}
                  className={`select-field ${errors.assignees ? "error" : ""}`}
                  placeholder="Select assignee"
                />
                {errors.assignees && (
                  <ErrorMessage>
                    {typeof errors.assignees.message === "string"
                      ? errors.assignees.message
                      : "Error"}
                  </ErrorMessage>
                )}
              </>
            )}
          />
        </FormGroup>

        <FormGroup>
          <label>Reporter</label>
          <Controller
            name="reporters"
            control={control}
            defaultValue={selectedCardDetail?.reporters}
            rules={{ required: "At least one reporter is required" }}
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <>
                <Select
                  options={reporterOptions}
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  ref={ref}
                  className={`select-field ${errors.reporters ? "error" : ""}`}
                  placeholder="Select a reporter"
                />
                {errors.reporters && (
                  <ErrorMessage>
                    {typeof errors.reporters.message === "string"
                      ? errors.reporters.message
                      : "Error"}
                  </ErrorMessage>
                )}
              </>
            )}
          />
        </FormGroup>

        <FormGroup>
          <label>Label</label>
          <Controller
            name="label"
            control={control}
            defaultValue={selectedCardDetail?.label}
            rules={{ required: "At least one option is required" }}
            render={({ field }) => (
              <>
                <CreatableSelect
                  {...field}
                  options={labelOptions}
                  isClearable={false}
                  isMulti={true}
                  placeholder="Select or type to create new..."
                  className={`select-field ${errors.label ? "error" : ""}`}
                />
                {errors.label && (
                  <ErrorMessage>
                    {typeof errors.label.message === "string"
                      ? errors.label.message
                      : "Error"}
                  </ErrorMessage>
                )}
              </>
            )}
          />
        </FormGroup>

        <FormGroup>
          <label>Status</label>
          <Controller
            defaultValue={{
              value: selectedCardDetail?.status,
              label: selectedCardDetail?.status,
            }}
            name={"status"}
            control={control}
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <Select value={value} onChange={onChange} options={statusTypes} />
            )}
          />
        </FormGroup>

        <SubmitButton type="submit">Submit</SubmitButton>
      </form>
    </ModalContent>
  );
};

const ModalContent = styled.div`
  background: #ffffff;
  padding: 20px;
  border-radius: 8px;
  max-width: 500px;
  width: 90%;
  text-align: left;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);

  h3 {
    color: #ff6f20; /* KTM orange color */
    margin-top: 0;
  }

  .modal-header {
    display: flex;
    justify-content: center; 
    align-items: center;
    position: relative; 
  }
  
  .modal-title{
    margin:0
  }

  .close-icon {
    height: 10px;
    width: 10px;
    cursor: pointer;
    position: absolute;
    right: 10px; 
  }

  p {
    margin: 0 0 10px;
    color: #333;
  }

  .summary {
    font-size: 1.2em;
    font-weight: bold;
  }

  .description {
    color: #666;
  }

  .issue-type {
    color: #007bff;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 15px;

  label {
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
    color: #333;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 0.875em;
`;

const SubmitButton = styled.button`
  margin-top: 15px;
  padding: 10px 20px;
  background-color: #ff6f20; /* KTM orange color */
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #e65c0d; /* Darker orange */
  }
`;

export default ModalContentPopUp;
