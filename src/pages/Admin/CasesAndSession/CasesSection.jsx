import { Box, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StyledTable from "../../../ui/StyledTable";

import { ReactComponent as FilterIcon } from "../../../assets/icons/FilterIcon.svg";
import StyledSearchbar from "../../../ui/StyledSearchbar";
import { useListStore } from "../../../store/listStore";
export default function CasesSection() {
  const navigate = useNavigate();
  const { fetchLists } = useListStore();
  const [search, setSearch] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);

  const handleOpenFilter = () => {
    setFilterOpen(true);
  };

  const handleCloseFilter = () => {
    setFilterOpen(false);
  };

  const handleView = (id) => {
    navigate(`/cases/case/${id}`);
  };
  const userColumns = [
    { title: "Case ID", field: "id", padding: "none" },

    { title: "Created on", field: "createdAt" },
    { title: "Student Name", field: "user_name" },
    { title: "Counselor Name", field: "counsellor_name" },
    { title: "Status", field: "status" },
  ];
  useEffect(() => {
    let filter = { type: "cases" };
    if (search) {
      filter.searchQuery = search;
    }
    fetchLists(filter);
  }, [fetchLists, search]);
  return (
    <>
      {" "}
      <Box padding={"30px"} bgcolor={"#FFFFFF"}>
        <Typography variant="h4" color={"#4A4647"}>
          Cases
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
          <StyledTable columns={userColumns} onView={handleView} />{" "}
        </>
      </Box>
    </>
  );
}
