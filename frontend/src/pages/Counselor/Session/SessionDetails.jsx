import { Box, Grid, Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
import UserCard from "../../../ui/UserCard";
import imag from "../../../assets/images/staff.png";
import CaseCard from "../../../ui/CaseCard";
import { useParams } from "react-router-dom";
import { useSessionStore } from "../../../store/counselor/SessionStore";
import CounselorCard from "../../../ui/CounselorCard";
import CaseDetails from "../../../ui/CaseDetails";
import StudentCard from "../../../ui/StudentCard";
const SessionDetails = () => {
  const { id } = useParams();
  const { sessions,counsellorReport } = useSessionStore();
  const data = {
    id: "STD920282",
    name: "John Doe",
    title: "XI A",
    phone: "+1234567890",
    email: "john.doe@example.com",
    img: imag,
  };

  const counselorData = {
    name: "Prabodhan Fitzgerald",
    title: "Designation",
    phone: "9865432123",
    email: "Prabfitz@gmail.com",
    img: imag,
  };
  useEffect(() => {
    if (id) {
      counsellorReport(id);
    }
  }, [id, counsellorReport]);
  console.log("sessions", sessions);

  return (
    <>
      <Box padding={"30px"} bgcolor={"#FFFFFF"}>
        <Typography variant="h4" color={"#4A4647"}>
          Cases / Case ID / Session No
        </Typography>
      </Box>
      <Grid container spacing={6} padding={4}>
        <Grid item md={5}>
          <Stack marginBottom={4}>
            {" "}
            <Box marginBottom={4}>
              <Typography variant="h6" fontWeight="900" color={"#828282"}>
                Student
              </Typography>
            </Box>
            <StudentCard user={sessions} />
            <Box marginBottom={4} marginTop={4}>
              <Typography variant="h6" fontWeight="900" color={"#828282"}>
                Case Details
              </Typography>
            </Box>
            <CaseDetails />
          </Stack>
        </Grid>
        <Grid item md={6}>
          <CaseCard data={sessions} />
        </Grid>
        <Grid item md={4}></Grid>
      </Grid>
    </>
  );
};

export default SessionDetails;
