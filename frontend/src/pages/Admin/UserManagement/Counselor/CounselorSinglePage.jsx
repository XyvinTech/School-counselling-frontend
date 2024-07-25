import { Box, Grid, Tab, Tabs, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import UserCard from "../../../../ui/UserCard";
import StyledTable from "../../../../ui/StyledTable";
import CounsellingTypeCard from "../../../../ui/CouncellingCard";
import DescriptionCard from "../../../../ui/DescriptionCard";
import Review from "../../../../components/Review";
import { useCounselorStore } from "../../../../store/admin/CounselorStore";
import { useParams } from "react-router-dom";
import { useListStore } from "../../../../store/listStore";
const CounselorSinglePage = () => {
  const { id } = useParams();
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedRows, setSelectedRows] = useState([]);
  const { counselor, fetchUser } = useCounselorStore();
  const { fetchCounselorSession, fetchCounselorCase } = useListStore();

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
  const sessions = [
    { title: "Session No’", field: "Session No’", padding: "none" },

    { title: "Student Name", field: "Student Name" },
    { title: "Type ", field: "Type " },
    { title: "Date & Time", field: "Date & Time" },
    { title: "Grade", field: "Grade" },
    { title: "Status", field: "status" },
  ];
  const Cases = [
    { title: "Case ID", field: "Case ID", padding: "none" },
    { title: "Created on", field: "Created on" },
    { title: "Student Name ", field: "Student Name" },
    { title: "Counselor Name", field: "Counselor Name" },
    { title: "Status", field: "status" },
  ];
  const Reports = [
    { title: "Certificate name", field: "Certificate name", padding: "none" },
    { title: "Recieved on ", field: "Recieved on " },
    { title: "By whom ", field: "By whom" },
  ];
  useEffect(() => {
    if (id) {
      fetchUser(id);
      fetchCounselorSession(id);
      fetchCounselorCase(id);
    }
  }, [id, fetchUser, fetchCounselorSession, fetchCounselorCase]);

  return (
    <>
      <Box padding={"30px"} bgcolor={"#FFFFFF"}>
        <Typography variant="h4" color={"#4A4647"}>
          Counselor / {counselor?.name}
        </Typography>
      </Box>{" "}
      <Grid container spacing={4} padding={4}>
        <Grid item md={4} spacing={2} xs={12}>
          <UserCard user={counselor}  />
        </Grid>
        <Grid item md={4} spacing={2} xs={12}>
          <CounsellingTypeCard user={counselor} />
        </Grid>
        <Grid item md={4} spacing={2} xs={12}>
          <DescriptionCard />
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
            fontSize: "16px",
            fontWeight: 600,
          },
          "& .Mui-selected": {
            color: "#0072BC",
          },
        }}
      >
        <Tab label="Counselling Sessions" />
        <Tab label="Reports" />
        <Tab label="Cases" />
        <Tab label="Reviews" />
      </Tabs>
      <Box padding="30px" marginBottom={4}>
        {selectedTab === 0 && (
          <StyledTable
            columns={sessions}
            onSelectionChange={handleSelectionChange}
            onView={handleView}
          />
        )}
        {selectedTab === 1 && (
          <Typography>
            {" "}
            <StyledTable
              columns={Reports}
              onSelectionChange={handleSelectionChange}
              onView={handleView}
            />
          </Typography>
        )}
        {selectedTab === 2 && (
          <Typography>
            {" "}
            <StyledTable
              columns={Cases}
              onSelectionChange={handleSelectionChange}
              onView={handleView}
            />
          </Typography>
        )}
        {selectedTab === 3 && (
          <Typography>
            <Review />
          </Typography>
        )}
      </Box>
    </>
  );
};

export default CounselorSinglePage;
