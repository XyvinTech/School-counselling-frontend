import { Box, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { StyledButton } from "../../../ui/StyledButton";
import StyledSearchbar from "../../../ui/StyledSearchbar";
import { ReactComponent as FilterIcon } from "../../../assets/icons/FilterIcon.svg";
import StyledTable from "../../../ui/StyledTable";
import { useListStore } from "../../../store/listStore";
import { useNavigate } from "react-router-dom";
const SessionHistory = () => {
  const navigate = useNavigate();
  const { lists, userSession } = useListStore();
  const [selectedTab, setSelectedTab] = useState("all");
  const [selectedRows, setSelectedRows] = useState([]);
  const [filterOpen, setFilterOpen] = useState(false);

  const handleOpenFilter = () => {
    setFilterOpen(true);
  };

  const handleCloseFilter = () => {
    setFilterOpen(false);
  };
  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  const handleSelectionChange = (newSelectedIds) => {
    setSelectedRows(newSelectedIds);
    console.log("Selected items:", newSelectedIds);
  };

  const handleView = (id) => {
    console.log("View item:", id);
  };
  const handleReschedule = (rowData) => {
    // console.log("View item:", id);
    navigate(`/student/session/reschedule/${rowData.id}`, { state: { rowData } });
  };

  const userColumns = [
    { title: "Session No", field: "id" },
    { title: "Councellor Name", field: "counsellor_name" },
    { title: "Type of Counselling", field: "type" },
    { title: "Session Date", field: "session_date" },
    { title: "Session Time", field: "session_time" },
    { title: "Status", field: "status" },
  ];
  useEffect(() => {
    let filter = { type: "sessions" };

    userSession(filter);
  }, [userSession]);
  // console.log(lists);
  return (
    <>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        //  padding={2}
      >
        <Stack direction={"row"} spacing={2}>
          <StyledButton
            name="All Sessions"
            variant={selectedTab === "all" ? "primary" : "secondary"}
            onClick={() => handleTabChange("all")}
          />
          <StyledButton
            name="Completed"
            variant={selectedTab === "completed" ? "primary" : "secondary"}
            onClick={() => handleTabChange("completed")}
          />
          <StyledButton
            name="Cancelled"
            variant={selectedTab === "cancel" ? "primary" : "secondary"}
            onClick={() => handleTabChange("cancel")}
          />
          <StyledButton
            name="Rescheduled"
            variant={selectedTab === "reshedule" ? "primary" : "secondary"}
            onClick={() => handleTabChange("reschedule")}
          />
        </Stack>{" "}
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
      <Box padding="30px" marginBottom={4}>
        <StyledTable
          columns={userColumns}
          onSelectionChange={handleSelectionChange}
          onView={handleView}
          menu
          reschedule
          onReschedule={handleReschedule}
        />
      </Box>
    </>
  );
};

export default SessionHistory;
