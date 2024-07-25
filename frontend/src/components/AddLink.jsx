import React from "react";
import { Typography, Dialog, DialogContent, Stack } from "@mui/material";
import { StyledButton } from "../ui/StyledButton";
import StyledSelectField from "../ui/StyledSelectField";
import StyledInput from "../ui/StyledInput";
import { Controller, useForm } from "react-hook-form";
import { useSessionStore } from "../store/counselor/SessionStore";

const AddLink = ({ open, onClose, rowId }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { acceptSessions } = useSessionStore();
  const option = [
    { value: "zoom", label: "zoom" },
    { value: "gmeet", label: "gmeet" },
  ];

  const onSubmit = async (data) => {
    const formData = {
      platform: data?.platform.value,
      link: data?.link,
    };
    await acceptSessions(rowId, formData);
    // You can perform additional actions here, such as making an API call
    // After the form is successfully submitted, you can close the dialog
    onClose();
  };

  const handleClear = () => {
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      {" "}
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Stack spacing={2} paddingTop={2}>
            <Typography variant="h6" color={"#333333"}>
              Platform
            </Typography>
            <Controller
              name="platform"
              control={control}
              defaultValue=""
              rules={{ required: "Platform is required" }}
              render={({ field }) => (
                <>
                  <StyledSelectField
                    options={option}
                    label="Select Platform"
                    {...field}
                  />
                  {errors.platform && (
                    <span style={{ color: "red" }}>
                      {errors.platform.message}
                    </span>
                  )}
                </>
              )}
            />
            <Typography variant="h6" color={"#333333"}>
              Add Link
            </Typography>
            <Controller
              name="link"
              control={control}
              defaultValue=""
              rules={{ required: "Link is required" }}
              render={({ field }) => (
                <>
                  <StyledInput placeholder={"Add Link"} {...field} />
                  {errors.link && (
                    <span style={{ color: "red" }}>{errors.link.message}</span>
                  )}
                </>
              )}
            />
          </Stack>
        </DialogContent>
        <Stack direction={"row"} spacing={2} padding={4}>
          <StyledButton
            variant="secondary"
            name="Cancel"
            onClick={handleClear}
          />
          <StyledButton variant="primary" name="Save" type="submit" />
        </Stack>{" "}
      </form>
    </Dialog>
  );
};

export default AddLink;
