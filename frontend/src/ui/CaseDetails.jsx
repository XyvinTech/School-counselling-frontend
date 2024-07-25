import React from "react";
import { Stack, Box, Typography, Grid } from "@mui/material";

export default function CaseDetails({ case_details }) {
  return (
    <Grid
      container
      spacing={2}
      bgcolor={"white"}
      borderRadius={"12px"}
      padding={"10px"}
      height={"160px"}
      justifyContent={"flex-start"}
      alignItems={"center"}
    >
      <Typography variant="h7" color={"#2C2829"}>
        {case_details}
      </Typography>
    </Grid>
  );
}
