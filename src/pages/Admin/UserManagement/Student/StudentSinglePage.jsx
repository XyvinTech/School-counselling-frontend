import { Box, Grid, Stack, Tab, Tabs, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import UserCard from "../../../../ui/UserCard";
import StyledTable from "../../../../ui/StyledTable";
import { userColumns, userData } from "../../../../assets/json/TableData";
import imag from "../../../../assets/images/staff.png";
import { ReactComponent as FilterIcon } from "../../../../assets/icons/FilterIcon.svg";
import StyledSearchbar from "../../../../ui/StyledSearchbar";
import { useParams } from "react-router-dom";
import { useListStore } from "../../../../store/listStore";
import { useCounselorStore } from "../../../../store/admin/CounselorStore";
import ParentCard from "../../../../ui/ParentCard";
const StudentSinglePage = () => {
  const { id } = useParams();
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedRows, setSelectedRows] = useState([]);
  const [filterOpen, setFilterOpen] = useState(false);
  const { lists, fetchSession } = useListStore();
  const { counselor, fetchUser } = useCounselorStore();
  const handleOpenFilter = () => {
    setFilterOpen(true);
  };

  const handleCloseFilter = () => {
    setFilterOpen(false);
  };
  const handleSelectionChange = (newSelectedIds) => {
    setSelectedRows(newSelectedIds);
    console.log("Selected items:", newSelectedIds);
  };

  const handleView = (id) => {
    console.log("View item:", id);
  };
  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };
  const data = {
    id: "STD920282",
    name: "John Doe",
    title: "XI A",
    phone: "+1234567890",
    email: "john.doe@example.com",
    img: imag,
  };
  const user = {
    name: "John Doe",
    title: "XI A",
    phone: "+1234567890",
    email: "john.doe@example.com",
  };
  useEffect(() => {
    if (id) {
      fetchSession(id);
    }
  }, [id, fetchSession]);
  useEffect(() => {
    if (id) {
      fetchUser(id);
    }
  }, [id, fetchUser]);
  const sessions = [
    { title: "Session Date", field: "session_date" },
    { title: "Session Time", field: "session_time" },
    { title: "Session Name", field: "name" },
    { title: "Counselor Name", field: "counsellor_name" },
    { title: "Counseling Type", field: "counsellor_type" },
  ];
  return (
    <>
      <Box padding={"30px"} bgcolor={"#FFFFFF"}>
        <Typography variant="h4" color={"#4A4647"}>
          Student List / {counselor.name}
        </Typography>
      </Box>{" "}
      <Grid container spacing={4} padding={4}>
        <Grid item md={5} spacing={2} xs={12}>
          <UserCard user={counselor} />
        </Grid>
        <Grid item md={4} spacing={2} xs={12}>
          <ParentCard user={counselor} />
        </Grid>
      </Grid>
      <Tabs
        value={selectedTab}
        onChange={handleChange}
        aria-label="tabs"
        TabIndicatorProps={{
          style: {
            backgroundColor: "#0072BC",
            height: 4,
            borderRadius: "4px",
          },
        }}
        sx={{
          bgcolor: "white",
          paddingTop: "34px",
          "& .MuiTabs-indicator": {
            backgroundColor: "#0072BC",
          },
          "& .MuiTab-root": {
            textTransform: "none",
            fontWeight: 600,
          },
          "& .Mui-selected": {
            color: "#0072BC",
          },
        }}
      >
        <Tab label="Counselling Sessions" />
        <Tab label="Reports" />
      </Tabs>
      <Box padding="30px" marginBottom={4}>
        <>
          <Stack
            direction={"row"}
            justifyContent={"end"}
            paddingBottom={3}
            alignItems={"center"}
          >
            {/* <Stack direction={"row"} spacing={2}>
              <StyledSearchbar />
              <Box
                bgcolor={"#FFFFFF"}
                borderRadius={"50%"}
                width={"48px"}
                height={"48px"}
                display="flex"
                alignItems="center"
                justifyContent="center"
                border="1px solid rgba(0, 0, 0, 0.12)"
                onClick={handleOpenFilter}
                style={{ cursor: "pointer" }}
              >
                <FilterIcon />
              </Box>
            </Stack> */}
          </Stack>

          {selectedTab === 0 && <StyledTable columns={sessions} />}
          {selectedTab === 1 && <Typography>Not Found</Typography>}
          {selectedTab === 2 && <Typography>Not Found</Typography>}
        </>{" "}
      </Box>
    </>
  );
};

export default StudentSinglePage;
