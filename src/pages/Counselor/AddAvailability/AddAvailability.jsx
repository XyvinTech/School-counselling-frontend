import React, { useState } from "react";
import {
  Box,
  Typography,
  Checkbox,
  IconButton,
  TextField,
  Grid,
  Button,
} from "@mui/material";
import AddTime from "../../../components/AddTime";

const AddAvailability = () => {
  return (
    <>
      <Box padding={"30px"} bgcolor={"#FFFFFF"}>
        <Typography variant="h4" color={"#4A4647"}>
          Availability
        </Typography>
      </Box>
      <Box padding="30px"paddingBottom={2} >
        <Typography variant="h4" color={"#4A4647"}>
          Weekly hours
        </Typography>
      </Box>{" "}
      <Box padding="30px" paddingTop={0} marginBottom={4}>
        <Grid container >
          <Grid item md={6} >
            <AddTime />
          </Grid>
        </Grid>{" "}
      </Box>
    </>
  );
};

export default AddAvailability;
