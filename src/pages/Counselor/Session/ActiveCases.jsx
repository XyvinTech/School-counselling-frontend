import { Box, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { StyledButton } from "../../../ui/StyledButton";
import StyledSearchbar from "../../../ui/StyledSearchbar";
import { ReactComponent as FilterIcon } from "../../../assets/icons/FilterIcon.svg";
import StyledTable from "../../../ui/StyledTable";
import { useListStore } from "../../../store/listStore";
import { useNavigate } from "react-router-dom";

const ActiveCases = () => {
  const navigate = useNavigate();
  const { lists, counselorSessions } = useListStore();
  const [selectedRows, setSelectedRows] = useState([]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [search, setSearch] = useState("");
  const handleOpenFilter = () => {
    setFilterOpen(true);
  };

  const handleSelectionChange = (newSelectedIds) => {
    setSelectedRows(newSelectedIds);
    console.log("Selected items:", newSelectedIds);
  };

  const handleView = (id) => {
    console.log("View item:", id);
    navigate(`/counselor/session/case/${id}`);
  };

  const userColumns = [
    { title: "Case ID", field: "id" },
    { title: "Session No", field: "session_ids" },
    { title: "Student Name", field: "user_name" },
    { title: "Type of Counselling", field: "type" },
    { title: "Session Time", field: "session_time" },
    { title: "Status", field: "status" },
  ];
  useEffect(() => {
    let filter = { type: "cases" };
    if (search) {
      filter.searchQuery = search;
    }
    counselorSessions(filter);
  }, [counselorSessions,search]);
  return (
    <>
      <Stack direction={"row"} justifyContent={"end"}>
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
      <Box padding="30px" marginBottom={4}>
        <StyledTable
          columns={userColumns}
          // data={activeSessionData}
          onSelectionChange={handleSelectionChange}
          onView={handleView}
        />
      </Box>
    </>
  );
};

export default ActiveCases;
