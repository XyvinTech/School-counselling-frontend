import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, Stack } from "@mui/material";
import StyledSelectField from "../ui/StyledSelectField";
import { StyledButton } from "../ui/StyledButton";
import { StyledCalender } from "../ui/StyledCalender";
import StyledSwitch from "/src/ui/StyledSwitch.jsx";
import DropZone from "../ui/DropZone";
import { Controller, useForm } from "react-hook-form";
import { StyledMultilineTextField } from "../ui/StyledMultilineTextField ";
import { useLocation } from "react-router-dom";
import { useTimeStore } from "../store/counselor/TimeStore";

export default function AddEntry() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const location = useLocation();
  const { slots, timeSlot } = useTimeStore();
  const { rowData } = location.state || {};
  const [isCloseCase, setIsCloseCase] = useState(false);
  const [isReferCase, setIsReferCase] = useState(false);
  const [day, setDay] = useState([]);
  const handleSwitchChange = (e, setter) => {
    setter(e.target.checked);
  };
  const handleDateChange = (formattedDate, dayOfWeek) => {
    setDay(dayOfWeek);
  };
  useEffect(() => {
    if (rowData?.counsellor != null && day != null) {
      let filter = {
        day: day,
      };
      timeSlot(rowData?.counsellor, filter);
    }
  }, [rowData?.counsellor, day, timeSlot]);
  const option = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ];
  const timeOptions =
  slots?.times?.map((time) => ({
    value: time,
    label: time,
  })) || [];
  const onSubmit = (data) => {
    console.log("Form data:", data);
  };

  return (
    <>
      <Box padding={"30px"} bgcolor={"#FFFFFF"}>
        <Typography variant="h4" color={"#4A4647"}>
          Session No / Add Entry
        </Typography>
      </Box>
      <Box padding="30px" marginBottom={4}>
        <Box
          bgcolor={"white"}
          padding={3}
          width={"804px"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <Typography
                  sx={{ marginBottom: 1 }}
                  variant="h6"
                  fontWeight={500}
                  color={"#333333"}
                >
                  Grade
                </Typography>
                <Controller
                  name="grade"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Grade is required" }}
                  render={({ field }) => (
                    <>
                      <StyledSelectField
                        options={option}
                        label="Grade"
                        {...field}
                      />
                      {errors.grade && (
                        <span style={{ color: "red" }}>
                          {errors.grade.message}
                        </span>
                      )}
                    </>
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography
                  sx={{ marginBottom: 1 }}
                  variant="h6"
                  fontWeight={500}
                  color={"#333333"}
                >
                  Case Details
                </Typography>
                <Controller
                  name="caseDetails"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Case details are required" }}
                  render={({ field }) => (
                    <>
                      <StyledMultilineTextField
                        label="Add Description in less than 500 words"
                        rows={4}
                        {...field}
                      />
                      {errors.caseDetails && (
                        <span style={{ color: "red" }}>
                          {errors.caseDetails.message}
                        </span>
                      )}
                    </>
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <Stack direction={"row"} justifyContent={"space-between"}>
                  <Typography
                    sx={{ marginBottom: 1 }}
                    variant="h6"
                    fontWeight={500}
                    color={"#333333"}
                  >
                    Close Case
                  </Typography>
                  <Controller
                    name="close"
                    control={control}
                    defaultValue={false}
                    render={({ field }) => (
                      <>
                        <StyledSwitch
                          checked={field.value || isReferCase} // Ensure switch is true if isReferCase is true
                          onChange={(e) => {
                            field.onChange(e.target.checked);
                            handleSwitchChange(e, setIsCloseCase);
                          }}
                          disabled={isReferCase} // Disable switch if isReferCase is true
                        />{" "}
                      </>
                    )}
                  />
                </Stack>
              </Grid>
              <Grid item xs={6}>
                <Stack direction={"row"} justifyContent={"space-between"}>
                  <Typography
                    sx={{ marginBottom: 1 }}
                    variant="h6"
                    fontWeight={500}
                    color={"#333333"}
                  >
                    Refer Case
                  </Typography>
                  <Controller
                    name="refer"
                    control={control}
                    defaultValue={false}
                    render={({ field }) => (
                      <>
                        <StyledSwitch
                          checked={field.value}
                          onChange={(e) => {
                            field.onChange(e.target.checked);
                            handleSwitchChange(e, setIsReferCase);
                            if (e.target.checked) {
                              setIsCloseCase(true); // Set isCloseCase to true if isReferCase is true
                            }
                          }}
                        />{" "}
                      </>
                    )}
                  />
                </Stack>
              </Grid>

              {!isCloseCase && (
                <>
                  <Grid item xs={6}>
                    <Typography
                      sx={{ marginBottom: 1 }}
                      variant="h6"
                      fontWeight={500}
                      color={"#333333"}
                    >
                      Date of Next Appointment
                    </Typography>
                    <Controller
                      name="appointmentDate"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <>
                          <StyledCalender
                            label="Select Date from Calender"
                            {...field}
                            onChange={(formattedDate, dayOfWeek) => {
                              field.onChange(formattedDate);
                              handleDateChange(formattedDate, dayOfWeek);
                            }}
                          />
                        </>
                      )}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Typography
                      sx={{ marginBottom: 1 }}
                      variant="h6"
                      fontWeight={500}
                      color={"#333333"}
                    >
                      Time
                    </Typography>
                    <Controller
                      name="session_time"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <>
                          <StyledSelectField {...field}options={timeOptions} />
                        </>
                      )}
                    />
                  </Grid>
                </>
              )}

              {isReferCase && (
                <>
                  <Grid item xs={12}>
                    <Typography
                      sx={{ marginBottom: 1 }}
                      variant="h6"
                      fontWeight={500}
                      color={"#333333"}
                    >
                      Referred to
                    </Typography>
                    <Controller
                      name="referredTo"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <>
                          <StyledSelectField
                            options={option}
                            label="Referred To"
                            {...field}
                          />
                        </>
                      )}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography
                      sx={{ marginBottom: 1 }}
                      variant="h6"
                      fontWeight={500}
                      color={"#333333"}
                    >
                      Remarks
                    </Typography>
                    <Controller
                      name="remarks"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <>
                          <StyledMultilineTextField
                            label="Add Description in less than 500 words"
                            rows={4}
                            {...field}
                          />
                        </>
                      )}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Typography
                      sx={{ marginBottom: 1 }}
                      variant="h6"
                      fontWeight={500}
                      color={"#333333"}
                    >
                      Date of Next Appointment
                    </Typography>
                    <Controller
                      name="appointmentDate"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <>
                          <StyledCalender
                            label="Select Date from Calendar"
                            {...field}
                          />
                        </>
                      )}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Typography
                      sx={{ marginBottom: 1 }}
                      variant="h6"
                      fontWeight={500}
                      color={"#333333"}
                    >
                      Time
                    </Typography>
                    <Controller
                      name="session_time"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <>
                          <StyledSelectField {...field} />
                        </>
                      )}
                    />
                  </Grid>
                </>
              )}

              <Grid item xs={12}>
                <Typography
                  sx={{ marginBottom: 1 }}
                  variant="h6"
                  fontWeight={500}
                  color={"#333333"}
                >
                  Upload Relevant Docs
                </Typography>
                {/* <Controller
                  name="documents"
                  control={control}
                  defaultValue={[]}
                  // rules={{ required: "At least one document is required" }}
                  render={({ field: { onChange, value } }) => (
                    <>
                      <DropZone
                        onDrop={(acceptedFiles) => {
                          onChange(acceptedFiles);
                        }}
                      />
                      {errors.documents && (
                        <span style={{ color: "red" }}>
                          {errors.documents.message}
                        </span>
                      )}
                      {value && value.length > 0 && (
                        <div>
                          <h4>Uploaded files:</h4>
                          <ul>
                            {value.map((file, index) => (
                              <li key={index}>{file.name}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </>
                  )}
                /> */}
              </Grid>

              <Grid item xs={6}></Grid>
              <Grid item xs={6}></Grid>
              <Grid item xs={6}>
                <Stack direction={"row"} spacing={2}>
                  <StyledButton
                    name="Cancel"
                    variant="secondary"
                    style={{ width: "auto" }}
                  >
                    Cancel
                  </StyledButton>
                  <StyledButton
                    name="Save"
                    variant="primary"
                    type="submit"
                    style={{ width: "auto" }}
                  >
                    Save
                  </StyledButton>
                </Stack>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Box>
    </>
  );
}
