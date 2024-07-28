import React, { useEffect, useState } from "react";
import { useListStore } from "../store/listStore";

import { ReactComponent as FilterIcon } from "../assets/icons/FilterIcon.svg";
import { useNavigate } from "react-router-dom";
import { Box, Stack, Typography } from "@mui/material";
import StyledSearchbar from "../ui/StyledSearchbar";
import StyledTable from "../ui/StyledTable";
const StudentCaseTable = () => {
  const navigate = useNavigate();
  const { lists, userSession } = useListStore();
  const [filterOpen, setFilterOpen] = useState(false);
  const handleOpenFilter = () => {
    setFilterOpen(true);
  };

  const handleCloseFilter = () => {
    setFilterOpen(false);
  };
  const handleView = (id) => {
    console.log("View item:", id);
    navigate(`/student/session/case/${id}`);
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
  return (
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
        onView={handleView}
      />
    </>
  );
};

export default StudentCaseTable;
