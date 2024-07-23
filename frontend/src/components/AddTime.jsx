import React, { useState } from "react";
import { Box, Typography, Checkbox, IconButton, Grid } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { StyledTime } from "../ui/StyledTime";
import { StyledButton } from "../ui/StyledButton";
import { ReactComponent as AddIcon } from "../assets/icons/AddIcon.svg";
import { ReactComponent as CopyIcon } from "../assets/icons/CopyIcon.svg";
import { ReactComponent as CloseIcon } from "../assets/icons/CloseIcon.svg";
const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const AddTime = () => {
  const { control, handleSubmit, reset } = useForm();
  const [availability, setAvailability] = useState(
    daysOfWeek.reduce((acc, day) => {
      acc[day] = [];
      return acc;
    }, {})
  );

  const handleAddClick = (day) => {
    setAvailability((prev) => ({
      ...prev,
      [day]: [...prev[day], { from: "", to: "" }],
    }));
  };

  const handleRemoveClick = (day, index) => {
    setAvailability((prev) => ({
      ...prev,
      [day]: prev[day].filter((_, i) => i !== index),
    }));
  };

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container bgcolor={"white"}>
        {daysOfWeek.map((day) => (
          <Grid
            container
            key={day}
            padding="10px"
            bgcolor={"#fff"}
            marginBottom="10px"
          >
            <>
              <Grid item xs={4} display="flex" alignItems="center">
                <Checkbox />
                <Typography
                  variant="h6"
                  fontWeight={800}
                  textTransform="uppercase"
                  color={"rgba(0, 0, 0, 0.87)"}
                >
                  {day}
                </Typography>
              </Grid>
              {availability[day].length === 0 ? (
                <Grid item xs={4}>
                  <Typography variant="h6" color="rgba(0, 0, 0, 0.54)">
                    Unavailable
                  </Typography>
                </Grid>
              ) : (
                <Grid item xs={4}></Grid>
              )}
              <Grid item xs={4} display={"flex"} justifyContent="flex-end">
                <IconButton onClick={() => handleAddClick(day)}>
                  <AddIcon />
                </IconButton>
                <IconButton>
                  <CopyIcon />
                </IconButton>
              </Grid>
            </>
            {availability[day].map((timeRange, index) => (
              <Grid
                container
                item
                key={index}
                alignItems="center"
                padding="15px"
                spacing={2}
                marginBottom="10px"
              >
                <Grid item xs={3}></Grid>
                <Grid item xs={3}>
                  <Controller
                    name={`${day}[${index}].from`}
                    control={control}
                    defaultValue={timeRange.from}
                    render={({ field }) => (
                      <StyledTime label="From" {...field} />
                    )}
                  />
                </Grid>
                <Grid item xs={3}>
                  <Controller
                    name={`${day}[${index}].to`}
                    control={control}
                    defaultValue={timeRange.to}
                    render={({ field }) => <StyledTime label="To" {...field} />}
                  />
                </Grid>
                <Grid item xs={2} display="flex">
                  <IconButton onClick={() => handleRemoveClick(day, index)}>
                    <CloseIcon />
                  </IconButton>
                </Grid>
              </Grid>
            ))}
          </Grid>
        ))}
      </Grid>
      <Box
        display="flex"
        justifyContent="flex-end"
        padding="10px"
        bgcolor={"white"}
      >
        <StyledButton variant="primary" type="submit" name="Save" />
      </Box>
    </form>
  );
};

export default AddTime;
