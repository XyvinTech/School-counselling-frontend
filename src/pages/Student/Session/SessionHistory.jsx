import { Box, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { StyledButton } from "../../../ui/StyledButton";
import StyledSearchbar from "../../../ui/StyledSearchbar";
import { ReactComponent as FilterIcon } from "../../../assets/icons/FilterIcon.svg";
import StyledTable from "../../../ui/StyledTable";
import { useListStore } from "../../../store/listStore";
import { useNavigate } from "react-router-dom";
import CancelUserSession from "../../../components/CancelSession";
const SessionHistory = () => {
  const navigate = useNavigate();
  const { lists, userSession } = useListStore();
  const [selectedTab, setSelectedTab] = useState("all");
  const [selectedRows, setSelectedRows] = useState([]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState(null);
  const [isChange, setIsChange] = useState(false);
  const [cancelOpen, setCancelOpen] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const handleOpenFilter = () => {
    setFilterOpen(true);
  };
  const handleCancel = (rowData) => {
    setSelectedRowId(rowData.id);

    setCancelOpen(true);
    setIsChange(!isChange);
  };
  const handleCloseCancel = () => {
    setCancelOpen(false);
    setSelectedRowId(null);
    setIsChange(!isChange);
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

  const handleReschedule = (rowData) => {
    // console.log("View item:", id);
    navigate(`/student/session/reschedule/${rowData.id}`, {
      state: { rowData },
    });
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
    if (search) {
      filter.searchQuery = search;
    }
    if (status) {
      filter.status = status;
    }
    userSession(filter);
  }, [isChange, userSession,search,status]);
  // console.log(lists);
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
        </Stack>{" "}
        <Stack direction={"row"} spacing={2}>
        <StyledSearchbar
            placeholder={"Search Counselor Name"}
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
          onSelectionChange={handleSelectionChange}
          onCancel={handleCancel}
          menu
          reschedule
          onReschedule={handleReschedule}
        />{" "}
        <CancelUserSession
          open={cancelOpen}
          onClose={handleCloseCancel}
          rowId={selectedRowId}
        />
      </Box>
    </>
  );
};

export default SessionHistory;
