import { Box, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import StyledSearchbar from "../../../ui/StyledSearchbar";
import { ReactComponent as FilterIcon } from "../../../assets/icons/FilterIcon.svg";
import StyledTable from "../../../ui/StyledTable";
import { useListStore } from "../../../store/listStore";

const StudentEvents = () => {
  const [filterOpen, setFilterOpen] = useState(false);
  const [search, setSearch] = useState("");
  const handleOpenFilter = () => {
    setFilterOpen(true);
  };

  const handleCloseFilter = () => {
    setFilterOpen(false);
  };
  const { lists, fetchLists } = useListStore();
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
  }, [fetchLists, search]);
  return (
    <>
      <Box padding={"30px"} bgcolor={"#FFFFFF"}>
        <Typography variant="h4" color={"#4A4647"}>
          Events / Events list
        </Typography>
      </Box>
      <Box padding="30px" marginBottom={4}>
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
          </Stack>{" "}
          <StyledTable columns={userColumns} />{" "}
        </>
      </Box>
    </>
  );
};

export default StudentEvents;
