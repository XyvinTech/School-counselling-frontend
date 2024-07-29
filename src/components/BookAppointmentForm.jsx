import { Box, Grid, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import StyledSelectField from "../ui/StyledSelectField";
import { StyledCalender } from "../ui/StyledCalender";
import { StyledTime } from "../ui/StyledTime";
import { StyledMultilineTextField } from "../ui/StyledMultilineTextField ";
import StyledSwitch from "../ui/StyledSwitch";
import { StyledButton } from "../ui/StyledButton";
import { Controller, useForm } from "react-hook-form";
import StyledInput from "../ui/StyledInput";
import { useCounselorStore } from "../store/admin/CounselorStore";
import { useTimeStore } from "../store/counselor/TimeStore";
import { useSessionStore } from "../store/counselor/SessionStore";

export default function AddMeeting() {
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { counselors, fetchCounselors } = useCounselorStore();
  const { addSessions } = useSessionStore();
  const { slots, fetchSlot } = useTimeStore();
  const [type, setType] = useState([]);
  const [day, setDay] = useState();
  const [date, setDate] = useState();
  const [id, setId] = useState();
  useEffect(() => {
    let filter = {};
    if (type) {
      filter.counsellorType = type;
    }

    fetchCounselors(filter);
  }, [fetchCounselors, type]);
  useEffect(() => {
    if (id && day) {
      const filter = { day, date };
      fetchSlot(id, filter);
    }
  }, [id, day, date]);

  const handleDateChange = (formattedDate, dayOfWeek) => {
    setDate(formattedDate);
    setDay(dayOfWeek);
  };
  const handleTypeChange = (selectedOption) => {
    setType(selectedOption.value);
  };
  const handleCounselorChange = (selectedOption) => {
    setId(selectedOption.value);
  };

  const options =
    counselors && Array.isArray(counselors)
      ? counselors.map((list) => ({
          value: list?.id,
          label: list?.name,
        }))
      : [];

  const timeOptions =
    slots?.map((time) => ({
      value: time,
      label: time,
    })) || [];
  const Counselor = [
    { value: "career", label: "Career" },
    { value: "behavioral", label: "Behavioral" },
  ];
  const onSubmit = async (data) => {
    const formData = {
      name: data?.name,
      type: data?.type.value,
      counsellor: data?.counsellor.value,
      session_date: data?.session_date,
      session_time: data?.session_time.value + ":00",
      description: data.description,
    };
    console.log("Form data:", formData);
    await addSessions(formData);
    reset();
  };
  console.log(slots)
  return (
    <Box sx={{ padding: 3 }} bgcolor={"white"} borderRadius={"4px"}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Typography
              sx={{ marginBottom: 1 }}
              variant="h6"
              fontWeight={500}
              color={"#333333"}
            >
              Add Meeting Name
            </Typography>
            <Controller
              name="name"
              control={control}
              defaultValue=""
              rules={{ required: "Name is required" }}
              render={({ field }) => (
                <>
                  <StyledInput placeholder={"Name"} {...field} />
                  {errors.name && (
                    <span style={{ color: "red" }}>{errors.name.message}</span>
                  )}
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
              Select Counselling Type
            </Typography>
            <Controller
              name="type"
              control={control}
              defaultValue=""
              rules={{ required: "Counselling type is required" }}
              render={({ field }) => (
                <>
                  <StyledSelectField
                    options={Counselor}
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      handleTypeChange(e);
                    }}
                  />
                  {errors.type && (
                    <span style={{ color: "red" }}>{errors.type.message}</span>
                  )}
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
              Choose Counsellor
            </Typography>
            <Controller
              name="counsellor"
              control={control}
              defaultValue=""
              rules={{ required: "Counsellor is required" }}
              render={({ field }) => (
                <>
                  <StyledSelectField
                    options={options}
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      handleCounselorChange(e);
                    }}
                  />
                  {errors.counsellor && (
                    <span style={{ color: "red" }}>
                      {errors.counsellor.message}
                    </span>
                  )}
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
          </Grid>

          {/* <Grid item xs={6}>
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
                  <StyledSelectField options={selectOptions} {...field} />
                  {errors.platform && (
                    <span style={{ color: "red" }}>{errors.platform.message}</span>
                  )}
                </>
              )}
            />
          </Grid> */}
          <Grid item xs={6}>
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
                    label="Add Description in less than 500 words"
                    {...field}
                  />
                  {errors.description && (
                    <span style={{ color: "red" }}>
                      {errors.description.message}
                    </span>
                  )}
                </>
              )}
            />
          </Grid>
          {/* <Grid item xs={6}>
            <Stack direction={"row"} justifyContent={"space-between"}>
              <Typography
                sx={{ marginBottom: 1 }}
                variant="h6"
                fontWeight={500}
                color={"#333333"}
              >
                Send Notifications
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
  );
}
