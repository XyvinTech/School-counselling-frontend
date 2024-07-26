import React, { useEffect, useState } from "react";
import { Typography, Dialog, DialogContent, Stack } from "@mui/material";
import { StyledButton } from "../ui/StyledButton";
import { useForm } from "react-hook-form";
import { useSessionStore } from "../store/counselor/SessionStore";

const CancelSession = ({ open, onClose, rowId }) => {
  const { handleSubmit } = useForm();
  const { cancelSessionByCounselor } = useSessionStore();
  const onSubmit = async () => {
    await cancelSessionByCounselor(rowId);
    onClose();
  };

  const handleClear = () => {
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { borderRadius: "21px" },
      }}
    >
      {" "}
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent sx={{ height: "auto", width: "380px", padding: 0 }}>
          <Stack
            direction={"row"}
            spacing={2}
            paddingTop={4}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Typography variant="h6" color={"#333333"}>
              Are you sure Cancel Session
            </Typography>
          </Stack>
        </DialogContent>
        <Stack direction={"row"} spacing={2} padding={4}>
          <StyledButton
            variant="secondary"
            name="Cancel"
            onClick={handleClear}
          />
          <StyledButton variant="primary" name="Sure" type="submit" />
        </Stack>{" "}
      </form>
    </Dialog>
  );
};

export default CancelSession;
