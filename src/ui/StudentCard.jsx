import React from "react";
import { Grid, Stack, Typography } from "@mui/material";
import { ReactComponent as EmailIcon } from "../assets/icons/EmailIcon.svg";
import { ReactComponent as PhoneIcon } from "../assets/icons/PhoneIcon.svg";
import image from "../assets/images/staff.png";
const  StudentCard = ({ user }) => {
  return (
    <Grid
      container
      spacing={2}
      bgcolor={"white"}
      borderRadius={"12px"}
      padding={"10px"}
      minHeight={"180px"}
    >
      <Grid item md={4} xs={6} justifyContent={"center"} alignItems={"center"}>
        <img
          src={image}
          alt="img"
          width={"118px"}
          height={"118px"}
          style={{ borderRadius: "12px" }}
        />
      </Grid>
      <Grid item md={8} xs={6}>
        <Stack spacing={1}>
        <Typography variant="h8" color={"rgba(44, 40, 41, 0.6)"}>
              {user?.user}
            </Typography>
          <Typography variant="h5" color={"#4A4647"}>
            {user?.user_name}
          </Typography>
          <Typography variant="h6" color={"#4A4647"}>
            {user?.type}
          </Typography>
          <Stack direction="row" alignItems="center" spacing={1}>
            <PhoneIcon />
            <Typography variant="h6" color={"#2C2829"}>
              {user?.user_mobile}
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={1}>
            <EmailIcon />
            <Typography variant="h6" color={"#2C2829"}>
              {user?.user_email}
            </Typography>
          </Stack>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default StudentCard;
