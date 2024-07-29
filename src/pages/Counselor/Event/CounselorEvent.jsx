import { Box, Grid, Stack, Tab, Tabs, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import StyledTable from "../../../ui/StyledTable";
import { useNavigate } from "react-router-dom";
import AddEvent from "../../../components/AddEvent";
import { ReactComponent as FilterIcon } from "../../../assets/icons/FilterIcon.svg";
import StyledSearchbar from "../../../ui/StyledSearchbar";
import { useListStore } from "../../../store/listStore";

const CounselorEvent = () => {
    const [selectedTab, setSelectedTab] = useState(0);
    const [filterOpen, setFilterOpen] = useState(false);
    const { lists, fetchLists } = useListStore();
    const [search, setSearch] = useState("");
    const [isChange, setIsChange] = useState(false);
    const navigate=useNavigate();
    const handleOpenFilter = () => {
      setFilterOpen(true);
    };
  
    const handleCloseFilter = () => {
      setFilterOpen(false);
    };

  
    const handleChange = (event, newValue) => {
      setSelectedTab(newValue);
    };
    const handleIsChange = () => {
      setIsChange(!isChange);
    };
    const userColumns = [
      { title: "Event Date", field: "date", padding: "none" },
    
      { title: "Time", field: "time" },
      { title: "Event Name", field: "title" },
      // { title: "Designation", field: "designation" },
      // { title: "Experience Level", field: "experience" },
      // { title: "Status", field: "status" },
    ];
    useEffect(() => {
      let filter = { type: "events" };
      if (search) {
        filter.searchQuery = search;
      }
      fetchLists(filter);
    }, [isChange, fetchLists,search]);
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
        <Tab label="Events" />
        <Tab label="Add Event" />
      </Tabs>
      <Box padding="30px" marginBottom={4}>
        {selectedTab === 0 && (
          <>
            <Stack
              direction={"row"}
              justifyContent={"end"}
              paddingBottom={3}
              alignItems={"center"}
            >
              <Stack direction={"row"} spacing={2}>
              <StyledSearchbar
            placeholder={"Search Event Name"}
            onchange={(e) => setSearch(e.target.value)}
          />
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
             
            />{" "}
          </>
        )}
        {selectedTab === 1 && (
          <Grid container spacing={2}>
            <Grid item xs={9}>
              {" "}
              <AddEvent onChange={handleIsChange}  />
            </Grid>{" "}
          </Grid>
        )}
      </Box>
    </>
  );
};

export default CounselorEvent;
