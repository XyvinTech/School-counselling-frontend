import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, Stack } from "@mui/material";
import { StyledTime } from "../../../ui/StyledTime";
import StyledSelectField from "../../../ui/StyledSelectField";
import { StyledButton } from "../../../ui/StyledButton";
import { StyledMultilineTextField } from "../../../ui/StyledMultilineTextField ";

import StyledSwitch from "/src/ui/StyledSwitch.jsx";
import { StyledCalender } from "../../../ui/StyledCalender";
import { Controller, useForm } from "react-hook-form";
import { useLocation, useParams } from "react-router-dom";
import { useTimeStore } from "../../../store/counselor/TimeStore";
import { useSessionStore } from "../../../store/counselor/SessionStore";
export default function RescheduleSession() {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { id } = useParams();
  const location = useLocation();
  const { rowData } = location.state || {};
  const { slots, fetchSlot } = useTimeStore();
  const { updateSession } = useSessionStore();
  const [day, setDay] = useState([]);
  const [isChecked, setIsChecked] = useState(false);

  const handleSwitchChange = (e) => {
    setIsChecked(e.target.checked);
  };
  const option = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ];
  const handleDateChange = (formattedDate, dayOfWeek) => {
    setDay(dayOfWeek);
  };
  useEffect(() => {
    if (rowData.counsellor != null && day != null) {
      let filter = {
        day: day,
      };
      fetchSlot(rowData.counsellor, filter);
    }
  }, [rowData.counsellor, day, fetchSlot]);
  const timeOptions =
    slots?.times?.map((time) => ({
      value: time,
      label: time,
    })) || [];
  const onSubmit = async (data) => {
    const formData = {
      session_date: data?.session_date,
      session_time: data?.session_time.value + ":00",
    };
    await updateSession(id,formData);
  };
  // console.log("Form data:", rowData.counsellor);
  return (
    <>
      <Box padding="30px">
        <Typography variant="h4" color={"#4A4647"} sx={{ marginBottom: 4 }}>
          Upcoming Sessions / Reschedule ‘Personal Story’
        </Typography>
      </Box>
      <Box paddingTop="0px" paddingLeft={"30px"} marginBottom={4}>
        {" "}
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
                  Date
                </Typography>
                <Controller
                  name="session_date"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Date is required" }}
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
                      {errors.session_date && (
                        <span style={{ color: "red" }}>
                          {errors.session_date.message}
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
                  Time
                </Typography>
                <Controller
                  name="session_time"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Time is required" }}
                  render={({ field }) => (
                    <>
                      <StyledSelectField options={timeOptions} {...field} />
                      {errors.session_time && (
                        <span style={{ color: "red" }}>
                          {errors.session_time.message}
                        </span>
                      )}
                    </>
                  )}
                />
              </Grid>{" "}
              {/* <Grid item xs={12}>
            <Typography
              sx={{ marginBottom: 1 }}
              variant="h6"
              fontWeight={500}
              color={"#333333"}
            >
              Choose Counselor
            </Typography>
            <Controller
              name="counselor"
              control={control}
              defaultValue=""
              rules={{ required: " Counselor is required" }}
              render={({ field }) => (
                <>
                  <StyledSelectField {...field} options={option} />{" "}
                  {errors.counselor && (
                    <span style={{ color: "red" }}>
                      {errors.counselor.message}
                    </span>
                  )}{" "}
                </>
              )}
            />
          </Grid> */}
              {/* <Grid item xs={12}>
            <Typography
              sx={{ marginBottom: 1 }}
              variant="h6"
              fontWeight={500}
              color={"#333333"}
            >
              Virtual Platform
            </Typography>
            <Controller
              name="platform"
              control={control}
              defaultValue=""
              rules={{ required: "Platform is required" }}
              render={({ field }) => (
                <>
                  <StyledSelectField {...field} options={option} />{" "}
                  {errors.platform && (
                    <span style={{ color: "red" }}>
                      {errors.platform.message}
                    </span>
                  )}{" "}
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
              Reason for rescheduling
            </Typography>
            <Controller
              name="reason"
              control={control}
              defaultValue=""
              rules={{ required: "Reason is required" }}
              render={({ field }) => (
                <>
                  <StyledMultilineTextField
                    label="Add Description in less than 500 words"
                    {...field}
                    rows={4}
                  />{" "}
                  {errors.reason && (
                    <span style={{ color: "red" }}>
                      {errors.reason.message}
                    </span>
                  )}{" "}
                </>
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Stack direction={"row"} justifyContent={"space-between"}>
              <Typography
                sx={{ marginBottom: 1 }}
                variant="h6"
                fontWeight={500}
                color={"#333333"}
              >
                Confirm Reschedule
              </Typography>
              <Controller
                name="activate"
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
                    {errors.activate && (
                      <span style={{ color: "red" }}>
                        {errors.activate.message}
                      </span>
                    )}{" "}
                  </>
                )}
              />
            </Stack>
          </Grid> */}
              <Grid item xs={6}></Grid> <Grid item xs={6}></Grid>
              <Grid item xs={6}>
                {" "}
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
                    style={{ width: "auto" }}
                  >
                    Save
                  </StyledButton>
                </Stack>
              </Grid>
            </Grid>
          </form>
        </Box>{" "}
      </Box>{" "}
    </>
  );
}
