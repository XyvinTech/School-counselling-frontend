import { Box, Grid, Stack, Tab, Tabs, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import StyledSearchbar from "../../../ui/StyledSearchbar";
import { ReactComponent as FilterIcon } from "../../../assets/icons/FilterIcon.svg";
import StyledTable from "../../../ui/StyledTable";
import { useNavigate } from "react-router-dom";
import SessionHistory from "./SessionHistory";
import RescheduleSession from "./RescheduleSession";
import { useListStore } from "../../../store/listStore";
const StudentSession = () => {
  const navigate = useNavigate();
  const { lists, userSession } = useListStore();
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedRows, setSelectedRows] = useState([]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [viewingId, setViewingId] = useState(null);
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
    navigate(`/student/session/case/${id}`);
  };

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };
  const userColumns = [
    { title: "Case ID", field: "id" },
    { title: "Councellor Name", field: "counsellor_name" },
    { title: "Type of Counselling", field: "type" },
    { title: "Created on", field: "createdAt" },
    { title: "Status", field: "status" },
  ];
  useEffect(() => {
    let filter = { type: "cases" };

    userSession(filter);
  }, [userSession]);
  // console.log(lists);
  return (
    <>
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
        <Tab label="Cases" />
        <Tab label="Session History" />
      </Tabs>{" "}
      <Box padding="30px" marginBottom={4}>
        {selectedTab === 0 && !viewingId && (
          <>
            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              paddingBottom={3}
              alignItems={"center"}
            >
              {" "}
              <Typography variant="h4" color={"#4A4647"}>
                Cases
              </Typography>
              <Stack direction={"row"} spacing={2}>
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
              </Stack>
            </Stack>
            <StyledTable
              columns={userColumns}
              onSelectionChange={handleSelectionChange}
              onView={handleView}
            />
          </>
        )}{" "}
        {selectedTab === 0 && (
          <>
            <Grid container spacing={2}>
              <Grid item xs={6}></Grid>{" "}
            </Grid>
          </>
        )}
        {selectedTab === 1 && <SessionHistory />}
      </Box>
    </>
  );
};

export default StudentSession;
