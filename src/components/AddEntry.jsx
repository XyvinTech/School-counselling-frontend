import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, Stack } from "@mui/material";
import StyledSelectField from "../ui/StyledSelectField";
import { StyledButton } from "../ui/StyledButton";
import { StyledCalender } from "../ui/StyledCalender";
import StyledSwitch from "/src/ui/StyledSwitch.jsx";
import DropZone from "../ui/DropZone";
import { Controller, useForm } from "react-hook-form";
import { StyledMultilineTextField } from "../ui/StyledMultilineTextField ";
import { useLocation, useParams } from "react-router-dom";
import { useTimeStore } from "../store/counselor/TimeStore";
import { useCounselorStore } from "../store/admin/CounselorStore";
import { useSessionStore } from "../store/counselor/SessionStore";

export default function AddEntry() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const location = useLocation();
  const { id } = useParams();
  const { slots, timeSlot } = useTimeStore();
  const { counselors, allCounselors } = useCounselorStore();
  const { counsellorAddEntry } = useSessionStore();
  const { rowData } = location.state || {};
  const [isCloseCase, setIsCloseCase] = useState(false);
  const [isReferCase, setIsReferCase] = useState(false);
  const [counselor, setCounselor] = useState(rowData?.counsellor || "");
  const [day, setDay] = useState([]);
  const handleSwitchChange = (e, setter) => {
    setter(e.target.checked);
  };
  const handleDateChange = (formattedDate, dayOfWeek) => {
    setDay(dayOfWeek);
  };
  useEffect(() => {
    if (counselor != null && day != null) {
      let filter = {
        day: day,
      };
      timeSlot(counselor, filter);
    }
  }, [counselor, day, timeSlot]);
  useEffect(() => {
    let filter = {};

    allCounselors(filter);
  }, [allCounselors]);
  const handleCounselor = (selectedOption) => {
    setCounselor(selectedOption.value);
  };
  const options =
    counselors && Array.isArray(counselors)
      ? counselors.map((list) => ({
          value: list?.id,
          label: list?.name,
        }))
      : [];
  const option = [
    { value: "A", label: "A" },
    { value: "B", label: "B" },
    { value: "C", label: "C" },
  ];
  const timeOptions =
    slots?.times?.map((time) => ({
      value: time,
      label: time,
    })) || [];
  const onSubmit = async (data) => {
    const formData = {
      grade: data?.grade.value,
      details: data?.details,
      close: data?.close,

      session_id: rowData?.id,
      user_id: rowData?.user,
    };
    if (data?.referCase) {
      formData.refer = counselor;
      formData.remarks =data?. remarks;
    }
    if (!data?.close) {
      formData.date = data?.date;
      formData.time = data?.time.value + ":00";
    }
    await counsellorAddEntry(rowData.case_id, formData);
    reset();
    console.log("rowdata", formData);
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
                  name="details"
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
                          checked={field.value || isReferCase}
                          onChange={(e) => {
                            field.onChange(e.target.checked);
                            handleSwitchChange(e, setIsCloseCase);
                          }}
                          disabled={isReferCase}
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
                    name="referCase"
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
                              setIsCloseCase(true);
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
                      name="date"
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
                      name="time"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <>
                          <StyledSelectField {...field} options={timeOptions} />
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
                      name="refer"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <>
                          <StyledSelectField
                            options={options}
                            label="Referred To"
                            {...field}
                            onChange={(e) => {
                              field.onChange(e);
                              handleCounselor(e);
                            }}
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
                      name="date"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <>
                          <StyledCalender
                            label="Select Date from Calendar"
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
                      name="time"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <>
                          <StyledSelectField {...field} options={timeOptions} />
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
