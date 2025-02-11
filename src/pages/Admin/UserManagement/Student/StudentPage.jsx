import { Box, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import StyledTable from "../../../../ui/StyledTable";
import { useNavigate } from "react-router-dom";

import { ReactComponent as FilterIcon } from "../../../../assets/icons/FilterIcon.svg";
import StyledSearchbar from "../../../../ui/StyledSearchbar";
import { useListStore } from "../../../../store/listStore";
const StudentPage = () => {
  const navigate = useNavigate();
  const [selectedRows, setSelectedRows] = useState([]);
  const [search, setSearch] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const { lists, fetchLists } = useListStore();
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
    navigate(`/user/student/${id}`);
  };
  const userColumns = [
    { title: "Student ID", field: "id", padding: "none" },

    { title: "Student Name", field: "name" },

    { title: "Designation", field: "designation" },
    { title: "Email Id  ", field: "email" },
    { title: "Contact info", field: "mobile" },
    // { title: "Parent Name", field: "ParentName" },
    { title: "Parent Contact", field: "parentcontact" },
  ];
  useEffect(() => {
    let filter = { type: "students" };
    if (search) {
      filter.searchQuery = search;
    }
    fetchLists(filter);
  }, [fetchLists,search]);
  return (
    <>
      <Box padding={"30px"} bgcolor={"#FFFFFF"}>
        <Typography variant="h4" color={"#4A4647"}>
          Student list
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
                placeholder={"Search Student Name"}
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
            onSelectionChange={handleSelectionChange}
            onView={handleView}
          />{" "}
        </>
      </Box>
    </>
  );
};

export default StudentPage;
