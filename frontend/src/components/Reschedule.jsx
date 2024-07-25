import React, { useEffect, useState } from "react";
import { Typography, Dialog, DialogContent, Stack } from "@mui/material";
import { StyledButton } from "../ui/StyledButton";
import StyledSelectField from "../ui/StyledSelectField";
import StyledInput from "../ui/StyledInput";
import { Controller, useForm } from "react-hook-form";
import { useSessionStore } from "../store/counselor/SessionStore";
import { StyledCalender } from "../ui/StyledCalender";
import { useTimeStore } from "../store/counselor/TimeStore";

const Reschedule = ({ open, onClose, rowId,counselor }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [day, setDay] = useState([]);
  const { rescheduleSession } = useSessionStore();
  const { slots, timeSlot } = useTimeStore();
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
  const timeOptions =
  slots?.times?.map((time) => ({
    value: time,
    label: time,
  })) || [];
  const onSubmit = async(data) => {
    const formData = {
        session_date: data?.session_date,
        session_time: data?.session_time.value + ":00",
      };
      await rescheduleSession(rowId,formData);
   
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
          <Stack spacing={2} paddingTop={2}marginBottom={10}>
            <Typography variant="h6" color={"#333333"}>
              Date
            </Typography>
            <Controller
              name="session_date"
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
            <Typography variant="h6" color={"#333333"}>
              Time
            </Typography>
            <Controller
              name="session_time"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <>
                  <StyledSelectField {...field} options={timeOptions}/>
                </>
              )}
            />
          </Stack>
        </DialogContent>
        <Stack direction={"row"} spacing={2} padding={4} >
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

export default Reschedule;
