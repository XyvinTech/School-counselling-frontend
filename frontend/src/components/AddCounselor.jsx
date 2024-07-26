import { Box, Divider, Grid, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import StyledInput from "../ui/StyledInput";
import StyledSelectField from "../ui/StyledSelectField";
import { StyledEventUpload } from "../ui/StyledEventUpload";
import { StyledMultilineTextField } from "../ui/StyledMultilineTextField ";
import StyledSwitch from "../ui/StyledSwitch";
import { StyledButton } from "../ui/StyledButton";
import { Controller, useForm } from "react-hook-form";
import { useCounselorStore } from "../store/admin/CounselorStore";
const AddCounselor = ({ onChange }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [isChecked, setIsChecked] = useState(false);
  const { addCounselors } = useCounselorStore();
  const handleSwitchChange = (e) => {
    setIsChecked(e.target.checked);
  };

  const onSubmit = async (data) => {
    const formData = {
      name: data?.name,
      designation: data?.designation,
      email: data?.email,
      experience: data?.experience,
      mobile: data?.mobile,
      password: "password123",
      // status: data.status,
      userType: "counsellor",
      counsellorType: "career",
    };

    

    await addCounselors(formData);
    onChange();
    reset()

  };
  return (
    <Box bgcolor={"white"} padding={3} width={"804px"}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={4}>
          <Grid item md={6}>
            <Typography
              sx={{ marginBottom: 1 }}
              variant="h6"
              fontWeight={500}
              color={"#333333"}
            >
              Name
            </Typography>{" "}
            <Controller
              name="name"
              control={control}
              defaultValue=""
              rules={{ required: "Name is required" }}
              render={({ field }) => (
                <>
                  <StyledInput placeholder="Enter Full Name" {...field} />{" "}
                  {errors.name && (
                    <span style={{ color: "red" }}>{errors.name.message}</span>
                  )}{" "}
                </>
              )}
            />
          </Grid>
          <Grid item md={6}>
            <Typography
              sx={{ marginBottom: 1 }}
              variant="h6"
              fontWeight={500}
              color={"#333333"}
            >
              Designation
            </Typography>
            <Controller
              name="designation"
              control={control}
              defaultValue=""
              rules={{ required: "Designation is required" }}
              render={({ field }) => (
                <>
                  <StyledInput placeholder="Designation" {...field} />{" "}
                  {errors.designation && (
                    <span style={{ color: "red" }}>
                      {errors.designation.message}
                    </span>
                  )}{" "}
                </>
              )}
            />
          </Grid>
          <Grid item md={6}>
            <Typography
              sx={{ marginBottom: 1 }}
              variant="h6"
              fontWeight={500}
              color={"#333333"}
            >
              Email
            </Typography>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              rules={{ required: "Email is required" }}
              render={({ field }) => (
                <>
                  <StyledInput placeholder="Email" {...field} />
                  {errors.email && (
                    <span style={{ color: "red" }}>{errors.email.message}</span>
                  )}{" "}
                </>
              )}
            />
          </Grid>{" "}
          <Grid item md={6}>
            <Typography
              sx={{ marginBottom: 1 }}
              variant="h6"
              fontWeight={500}
              color={"#333333"}
            >
              Experience Level
            </Typography>
            <Controller
              name="experience"
              control={control}
              defaultValue=""
              rules={{ required: " Experience is required" }}
              render={({ field }) => (
                <>
                  <StyledInput {...field} placeholder={"Experience"} />{" "}
                  {errors.experience && (
                    <span style={{ color: "red" }}>
                      {errors.experience.message}
                    </span>
                  )}{" "}
                </>
              )}
            />
          </Grid>{" "}
          <Grid item md={6}>
            <Typography
              sx={{ marginBottom: 1 }}
              variant="h6"
              fontWeight={500}
              color={"#333333"}
            >
              Contact Number
            </Typography>
            <Controller
              name="mobile"
              control={control}
              defaultValue=""
              rules={{ required: "Contact is required" }}
              render={({ field }) => (
                <>
                  <StyledInput placeholder="Conatct Number" {...field} />{" "}
                  {errors.mobile && (
                    <span style={{ color: "red" }}>
                      {errors.mobile.message}
                    </span>
                  )}{" "}
                </>
              )}
            />
          </Grid>
          {/* <Grid item md={6}>
            <Typography
              sx={{ marginBottom: 1 }}
              variant="h6"
              fontWeight={500}
              color={"#333333"}
            >
              Upload Image
            </Typography>{" "}
            <Controller
              name="image"
              control={control}
              defaultValue=""
              rules={{ required: "Image is required" }}
              render={({ field: { onChange } }) => (
                <>
                  <StyledEventUpload
                    placeholder={"Upload your image here"}
                    onChange={onChange}
                  />
                  {errors.image && (
                    <span style={{ color: "red" }}>{errors.image.message}</span>
                  )}
                </>
              )}
            />
          </Grid> */}
          {/* <Grid item md={6}>
            <Typography
              sx={{ marginBottom: 1 }}
              variant="h6"
              fontWeight={500}
              color={"#333333"}
            >
              Add Description
            </Typography>
            <Controller
              name="description"
              control={control}
              defaultValue=""
              rules={{ required: "Description is required" }}
              render={({ field }) => (
                <>
                  <StyledMultilineTextField
                    {...field}
                    rows={8}
                    placeholder={"Add Description in less than 500 words"}
                  />{" "}
                  {errors.description && (
                    <span style={{ color: "red" }}>
                      {errors.description.message}
                    </span>
                  )}{" "}
                </>
              )}
            />
          </Grid> */}
          <Grid item md={6}>
            <Stack direction={"row"} justifyContent={"space-between"}>
              <Typography
                sx={{ marginBottom: 1 }}
                variant="h6"
                fontWeight={500}
                color={"#333333"}
              >
                Activate
              </Typography>
              <Controller
                name="status"
                control={control}
                defaultValue={false}
                rules={{ required: "Activate is required" }}
                render={({ field }) => (
                  <>
                    <StyledSwitch
                      checked={field.value}
                      onChange={(e) => {
                        field.onChange(e.target.checked);
                        handleSwitchChange(e);
                      }}
                    />{" "}
                    {errors.status && (
                      <span style={{ color: "red" }}>
                        {errors.status.message}
                      </span>
                    )}{" "}
                  </>
                )}
              />
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item md={6}></Grid>
          <Grid item md={6}>
            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              spacing={2}
            >
              <StyledButton variant="secondary" name={"cancel"} />
              <StyledButton variant="primary" name={"save"} type="submit" />
            </Stack>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default AddCounselor;
