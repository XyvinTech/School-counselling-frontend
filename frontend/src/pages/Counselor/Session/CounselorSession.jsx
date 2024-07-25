import { Box, Stack, Tab, Tabs } from "@mui/material";
import React, { useEffect, useState } from "react";
import CounsellorCases from "./CounsellorCases";
import ActiveCases from "./ActiveCases";

const CounselorSession = () => {
  const [selectedTab, setSelectedTab] = useState(0);


  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };
 
  return (
    <>
      {" "}
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
        <Tab label="Sessions" />
        <Tab label="Active Cases" />
      </Tabs>
      <Box padding="30px" marginBottom={4}>
        {" "}
        {selectedTab === 0 && <CounsellorCases />}
        {selectedTab === 1 && <ActiveCases />}{" "}
      </Box>
    </>
  );
};

export default CounselorSession;
