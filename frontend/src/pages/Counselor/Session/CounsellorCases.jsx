import { Box, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { StyledButton } from "../../../ui/StyledButton";
import StyledSearchbar from "../../../ui/StyledSearchbar";
import { ReactComponent as FilterIcon } from "../../../assets/icons/FilterIcon.svg";
import StyledTable from "../../../ui/StyledTable";
import { useListStore } from "../../../store/listStore";
import { useNavigate } from "react-router-dom";
import AddLink from "../../../components/AddLink";
import Reschedule from "../../../components/Reschedule";

const CounsellorCases = () => {
  const navigate = useNavigate();
  const { lists, counselorSessions } = useListStore();
  const [selectedTab, setSelectedTab] = useState("all");
  const [selectedRows, setSelectedRows] = useState([]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [addLinkOpen, setAddLinkOpen] = useState(false);
  const [rescheduleOpen, setRescheduleOpen] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [counselor, setCounselor] = useState(null);
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

  const handleAddLink = (rowData) => {
    console.log("View item:", rowData);
    setSelectedRowId(rowData.id);
    setAddLinkOpen(true);
  };
  const handleAddEntry = (rowData) => {
    navigate("/counselor/session/addentry", { state: { rowData } });
  };
  const handleReschedule = (rowData) => {
    console.log("View item:", rowData);
    setSelectedRowId(rowData.id);
    setCounselor(rowData.counsellor);
    setRescheduleOpen(true);
  };
  const handleCloseReschedule = () => {
    setRescheduleOpen(false);
    setSelectedRowId(null);
    setCounselor(null);
  };
  const handleCloseLink = () => {
    setAddLinkOpen(false);
    setSelectedRowId(null);
  };

  const userColumns = [
    { title: "Case ID", field: "case_id" },
    { title: "Session No", field: "id" },
    { title: "Student Name", field: "user_name" },
    { title: "Type of Counselling", field: "type" },
    { title: "Session Time", field: "session_time" },
    { title: "Status", field: "status" },
  ];

  useEffect(() => {
    let filter = { type: "sessions" };
    counselorSessions(filter);
  }, [counselorSessions]);

  return (
    <>
      <Stack direction={"row"} justifyContent={"space-between"}>
        <Stack direction={"row"} spacing={2} width={"50%"}>
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
            variant={selectedTab === "reschedule" ? "primary" : "secondary"}
            onClick={() => handleTabChange("reschedule")}
          />
        </Stack>
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
          counselor
          onEntry={handleAddEntry}
          onReschedule={handleReschedule}
          onAdd={handleAddLink}
        />
      </Box>
      <Reschedule
        open={rescheduleOpen}
        onClose={handleCloseReschedule}
        rowId={selectedRowId}
        counselor={counselor}
      />
      <AddLink
        open={addLinkOpen}
        onClose={handleCloseLink}
        rowId={selectedRowId}
      />
    </>
  );
};

export default CounsellorCases;
