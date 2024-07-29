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
import CancelSession from "../../../components/CancelSession";

const CounsellorCases = () => {
  const navigate = useNavigate();
  const { counselorSessions } = useListStore();
  const [selectedTab, setSelectedTab] = useState("all");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const [addLinkOpen, setAddLinkOpen] = useState(false);
  const [isChange, setIsChange] = useState(false);
  const [rescheduleOpen, setRescheduleOpen] = useState(false);
  const [cancelOpen, setCancelOpen] = useState(false);
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

  const handleView = (id) => {
    console.log("View item:", id);
  };

  const handleAddLink = (rowData) => {
    console.log("View item:", rowData);
    setSelectedRowId(rowData.id);
    setAddLinkOpen(true);
  };
  const handleAddEntry = (rowData) => {
    navigate(`/counselor/session/addentry/${rowData.id}`, {
      state: { rowData },
    });
  };
  // setIsChange(!isChange);
  const handleReschedule = (rowData) => {
    console.log("View item:", rowData);
    setSelectedRowId(rowData.id);
    setCounselor(rowData.counsellor);
    setRescheduleOpen(true);
  };
  const handleCancel = (rowData) => {
    setSelectedRowId(rowData.id);

    setCancelOpen(true);
    setIsChange(!isChange);
  };
  const handleCloseReschedule = () => {
    setRescheduleOpen(false);
    setSelectedRowId(null);
    setCounselor(null);
    setIsChange(!isChange);
  };
  const handleCloseLink = () => {
    setAddLinkOpen(false);
    setSelectedRowId(null);
    setIsChange(!isChange);
  };
  const handleCloseCancel = () => {
    setCancelOpen(false);
    setSelectedRowId(null);
    setIsChange(!isChange);
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
    if (search) {
      filter.searchQuery = search;
    }
    if (status) {
      filter.status = status;
    }
    counselorSessions(filter);
  }, [isChange, counselorSessions, search, status]);

  return (
    <>
      <Stack direction={"row"} justifyContent={"space-between"}>
        <Stack direction={"row"} spacing={2} width={"40%"}>
          <StyledButton
            name="All Sessions"
            variant={status === null ? "primary" : "secondary"}
            onClick={() => setStatus(null)}
          />
          <StyledButton
            name="Completed"
            variant={status === "completed" ? "primary" : "secondary"}
            onClick={() => setStatus("completed")}
          />
          <StyledButton
            name="Cancelled"
            variant={status === "cancelled" ? "primary" : "secondary"}
            onClick={() => setStatus("cancelled")}
          />
        </Stack>
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
          onView={handleView}
          menu
          counselor
          onEntry={handleAddEntry}
          onReschedule={handleReschedule}
          onAdd={handleAddLink}
          onCancel={handleCancel}
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
      <CancelSession
        open={cancelOpen}
        onClose={handleCloseCancel}
        rowId={selectedRowId}
      />
    </>
  );
};

export default CounsellorCases;
