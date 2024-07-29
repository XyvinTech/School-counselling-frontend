import { Box, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import StyledTable from "../../../ui/StyledTable";
import { useNavigate, useParams } from "react-router-dom";
import StyledSearchbar from "../../../ui/StyledSearchbar";
import { ReactComponent as FilterIcon } from "../../../assets/icons/FilterIcon.svg";
import { useListStore } from "../../../store/listStore";
const CaseSession = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const {  fetchUserSession } = useListStore();
  const [selectedRows, setSelectedRows] = useState([]);
  const [filterOpen, setFilterOpen] = useState(false);

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

  const handleView = (sid) => {
    console.log("View item:", id);
    navigate(`/student/session/report/${sid}`);
  };
  const userColumns = [
    { title: "Session No", field: "id", padding: "none" },
    { title: "Counselor Name", field: "counsellor" },
    { title: "Type of Counselling", field: "type" },
    { title: "Created on", field: "createdAt" },
    { title: "Status", field: "status" },
  ];
  useEffect(() => {
    if (id) {
      fetchUserSession(id);
    }
  }, [id, fetchUserSession]);
//   console.log("sessions", sessions);
  return (
    <>
      <Box padding={"30px"} bgcolor={"#FFFFFF"}>
        <Typography variant="h4" color={"#4A4647"}>
          Cases / {id}
        </Typography>
      </Box>
      <Box padding="30px" marginBottom={4}>
        <>
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            paddingBottom={3}
            alignItems={"center"}
          >
            <Typography variant="h4" color={"#4A4647"}>
              Session List
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
          </Stack>{" "}
          <StyledTable
            columns={userColumns}
            // data={userData}
            onSelectionChange={handleSelectionChange}
            onView={handleView}
          />{" "}
        </>
      </Box>
    </>
  );
};

export default CaseSession;
