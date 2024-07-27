import { Box, Grid, Stack, Tab, Tabs, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import StyledSearchbar from "../../../ui/StyledSearchbar";
import { ReactComponent as FilterIcon } from "../../../assets/icons/FilterIcon.svg";
import StyledTable from "../../../ui/StyledTable";
import { useNavigate } from "react-router-dom";
import SessionHistory from "./SessionHistory";
import RescheduleSession from "./RescheduleSession";
import { useListStore } from "../../../store/listStore";
import StudentCaseTable from "../../../components/StudentCaseTable";
const StudentSession = () => {
  const navigate = useNavigate();
  const { lists, userSession } = useListStore();
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedRows, setSelectedRows] = useState([]);
  
  const [viewingId, setViewingId] = useState(null);
  

 

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };
 
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
        {selectedTab === 0 &&  <StudentCaseTable />}{" "}
      
        {selectedTab === 1 && <SessionHistory />}
      </Box>
    </>
  );
};

export default StudentSession;
