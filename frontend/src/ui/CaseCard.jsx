import React from "react";
import { Stack, Typography, Grid, Divider, Box } from "@mui/material";

const CaseCard = ({ data }) => {
  return (
    <Stack bgcolor={"white"}   borderRadius={"16px"}>
      <Stack direction="row" justifyContent="space-between" padding={2}>
        <Stack justifyContent="space-between">
          <Typography variant="h6" color={'#828282'}>Case ID</Typography>
          <Typography variant="h4" color={'#4F4F4F'}> {data?.case_id}</Typography>
        </Stack>
        <Stack justifyContent="space-between">
        <Typography variant="h6" color={'#828282'}>Session No</Typography>
          <Typography variant="h5"  color={'#4F4F4F'}>{data?.id}</Typography>
        </Stack>
      </Stack>
      <Divider />
      <Stack direction="row" justifyContent="space-between" padding={2}>
        <Typography variant="h6" color={'#828282'}>Grade</Typography>
        <Typography variant="h6" color={'#23262F'}>{data?.grade}</Typography>
      </Stack>
      <Stack
        direction="row"
        justifyContent="space-between"
        bgcolor={"#F0F8FF"}
        padding={2}
      >
         <Typography variant="h6" color={'#828282'}>Appointment Date</Typography>
        <Typography variant="h6" color={'#23262F'}>{data?.session_date} {data?.session_time}</Typography>
      </Stack>
      <Stack direction="row" justifyContent="space-between" padding={2}>
      <Typography variant="h6" color={'#828282'}>Type of counselling</Typography>
        <Typography variant="h6" color={'#23262F'}>{data?.type}</Typography>
      </Stack>{" "}
      <Stack
        direction="row"
        justifyContent={"space-between"}
        bgcolor={"#F0F8FF"}
        padding={2}
      >
        <Typography variant="h6" color={'#828282'} sx={{ width: "50%" }}>Reason for Counselling/Referral</Typography>
        <Typography variant="h6" color={'#23262F'}sx={{ width: "50%" }} textAlign={"end"}>
        {data?.description}
        </Typography>
      </Stack>
      <Stack direction="row" justifyContent="space-between" padding={2}>
        <Typography variant="h6" color={'#828282'}>Referred By</Typography>
        <Typography variant="h6" color={'#23262F'}>Dr Sunil Robert</Typography>
      </Stack>
      <Stack
        direction="row"
        justifyContent="space-between"
        bgcolor={"#F0F8FF"}
        padding={2}
      >
        <Typography variant="h6" color={'#828282'} sx={{ width: "50%" }}>Referee’s Remark</Typography>
        <Typography variant="h6" color={'#23262F'} sx={{ width: "50%" }}>
          Lorem ipsum dolor sit amet consectetur. Ut eu sapien nullam nulla
          turpis laoreet suspendisse eu. Tincidunt quisque sed aliquam risus
          nunc odio laoreet.
        </Typography>
      </Stack>
      <Stack direction="row" justifyContent="space-between" padding={2}>
        <Typography variant="h6" color={'#828282'}>Session status</Typography>
        <Typography variant="h6" color={'#23262F'}> {data?.status}</Typography>
      </Stack>
      <Stack
        direction="row"
        justifyContent="space-between"
        bgcolor={"#F0F8FF"}
        padding={2}
      >
        <Typography variant="h6" color={'#828282'}>Date of next session</Typography>
        <Typography variant="h6" color={'#23262F'}></Typography>
      </Stack>
      <Stack direction="row" justifyContent="space-between" padding={2}>
        <Typography variant="h6" color={'#828282'}>Relevant Documents</Typography>
        {/* <Typography>Nov 16, 2024 7:09:36 AM</Typography> */}
      </Stack>
    </Stack>
  );
};

export default CaseCard;
