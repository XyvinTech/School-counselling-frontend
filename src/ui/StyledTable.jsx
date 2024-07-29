import React, { useState } from "react";
import styled from "styled-components";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {
  Box,
  Divider,
  Stack,
  TablePagination,
  IconButton,
  Checkbox,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { ReactComponent as ViewIcon } from "../assets/icons/ViewIcon.svg";
import { ReactComponent as LeftIcon } from "../assets/icons/LeftIcon.svg";
import { ReactComponent as RightIcon } from "../assets/icons/RightIcon.svg";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useListStore } from "../store/listStore";
import { useNavigate } from "react-router-dom";
import moment from "moment-timezone";
const StyledTableCell = styled(TableCell)`
  &.${tableCellClasses.head} {
    background-color: #fff;
    color: rgba(0, 0, 0, 0.87);
    font-size: 14px;
    padding: 16px;
    text-align: center;
    font-weight: 600;
  }
  &.${tableCellClasses.body} {
    font-size: 14px;
    background-color: #fff;
    padding: 16px;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.87);
    text-align: center;
  }
`;

const StyledTableRow = styled(TableRow)`
  &:last-child td,
  &:last-child th {
    border: 0;
  }
  cursor: ${({ showEdit }) => (showEdit ? "pointer" : "default")};
  &:hover {
    background-color: ${({ showEdit }) => (showEdit ? "#f0f0f0" : "inherit")};
  }
`;
const formatDate = (dateString, format = "MMM DD, YYYY hh:mm A") => {
  return moment.tz(dateString, "Asia/Muscat").format(format);
};
const StyledTable = ({
  columns,
  onSelectionChange,
  onView,
  onDelete,
  onAdd,
  dashboard,
  menu,
  counselor,
  onReschedule,
  reschedule,
  onEntry,
  onCancel,
}) => {
  const navigate = useNavigate();
  const [selectedIds, setSelectedIds] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [rowId, setRowId] = useState(null);
  const [rowData, setRowData] = useState(null);

  const { lists } = useListStore();

  const handleSelectAllClick = (event) => {
    const isChecked = event.target.checked;
    const newSelectedIds = isChecked ? lists.map((row) => row.id) : [];
    setSelectedIds(newSelectedIds);
    onSelectionChange(newSelectedIds);
  };

  const handleRowCheckboxChange = (event, id) => {
    const isChecked = event.target.checked;
    const newSelectedIds = isChecked
      ? [...selectedIds, id]
      : selectedIds.filter((selectedId) => selectedId !== id);
    setSelectedIds(newSelectedIds);
    onSelectionChange(newSelectedIds);
  };

  const handleMenuOpen = (event, row) => {
    setAnchorEl(event.currentTarget);
    setRowId(row.id);
    setRowData(row);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setRowId(null);
    setRowData(null);
  };

  const handleView = () => {
    onView(rowId);
    handleMenuClose();
  };

  const handleDelete = () => {
    onDelete(rowId);
    setSelectedIds([]);
    handleMenuClose();
  };

  const handleReschedule = () => {
    if (rowData) {
      onReschedule(rowData);
    }
    handleMenuClose();
  };
  const handleAddLink = () => {
    if (rowData) {
      onAdd(rowData);
    }
    handleMenuClose();
  };
  const handleCancel = () => {
    if (rowData) {
      onCancel(rowData);
    }
    handleMenuClose();
  };
  const handleAddEntry = () => {
    if (rowData) {
      onEntry(rowData);
    }
    handleMenuClose();
  };
  const handleRowClick = (id) => {
    onView(id);
  };

  const isSelected = (id) => selectedIds.includes(id);

  const getStatusVariant = (status) => {
    if (typeof status === "boolean") {
      return status ? "#2E7D32" : "#BFBABA";
    }
    switch (status) {
      case "active":
        return "#2E7D32";
      case "inactive":
        return "green";
      case "send":
        return "#2E7D32";
      case "pending":
        return "#BFBABA";
      case "upcoming":
        return "#0072BC";
      case "ongoing":
        return "green";
      case "closed":
        return "#938F8F";
      case "completed":
        return "#2E7D32";
      case "live":
        return "red";
      case "Recording Available":
        return "green";
      case "published":
        return "green";
      case "accepted":
        return "green";
      case "cancelled":
        return "red";
      case "draft":
        return "#BFBABA";
      default:
        return "default";
    }
  };

  return (
    <Box bgcolor={"white"} borderRadius={"16px"}>
      <TableContainer sx={{ border: "none" }}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell padding="checkbox">
                <Checkbox
                  checked={
                    lists.length > 0 && selectedIds.length === lists.length
                  }
                  onChange={handleSelectAllClick}
                />
              </StyledTableCell>
              {columns.map((column) => (
                <StyledTableCell
                  key={column.field}
                  padding={column.padding || "normal"}
                >
                  {column.title}
                </StyledTableCell>
              ))}
              <StyledTableCell padding="normal"></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {lists.length === 0 ? (
              <StyledTableRow>
                <StyledTableCell colSpan={columns.length + 2}>
                  <Typography variant="h6" textAlign="center">
                    No data
                  </Typography>
                </StyledTableCell>
              </StyledTableRow>
            ) : (
              lists?.map((row) => (
                <StyledTableRow
                  role="checkbox"
                  key={row.id}
                  selected={isSelected(row.id)}
                >
                  <StyledTableCell padding="checkbox">
                    <Checkbox
                      checked={isSelected(row.id)}
                      onChange={(event) =>
                        handleRowCheckboxChange(event, row.id)
                      }
                    />
                  </StyledTableCell>
                  {columns.map((column) => (
                    <StyledTableCell
                      key={column.field}
                      padding={column.padding || "normal"}
                      sx={{ cursor: "pointer" }}
                      onClick={() => handleRowClick(row.id)}
                    >
                      {column.field === "status" ? (
                        <Box
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                        >
                          <span
                            style={{
                              backgroundColor: getStatusVariant(
                                row[column.field]
                              ),
                              padding: "3px 8px",
                              borderRadius: "100px",
                              color: "#fff",
                            }}
                          >
                            {typeof row[column.field] === "boolean"
                              ? row[column.field]
                                ? "active"
                                : "inactive"
                              : row[column.field]}
                          </span>
                        </Box>
                      ) : ["createdAt", "updatedAt", ].includes(
                        column.field
                      ) ? (
                      formatDate(row[column.field])
                    )  : (
                        row[column.field]
                      )}
                    </StyledTableCell>
                  ))}

                  <StyledTableCell padding="normal">
                    <Box display="flex" alignItems="center">
                      <IconButton
                        aria-controls="simple-view"
                        aria-haspopup="true"
                        onClick={() => handleRowClick(row.id)}
                      >
                        <ViewIcon />
                      </IconButton>
                      {menu && (
                        <IconButton
                          aria-controls="simple-menu"
                          aria-haspopup="true"
                          onClick={(event) => handleMenuOpen(event, row)}
                        >
                          <MoreVertIcon />
                        </IconButton>
                      )}
                      <Menu
                        id="row-menu"
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl) && rowId === row.id}
                        onClose={handleMenuClose}
                      >
                        {counselor ? (
                          <>
                            <MenuItem onClick={handleReschedule}>
                              Reschedule
                            </MenuItem>
                            <MenuItem onClick={handleAddLink}>
                              Add Link
                            </MenuItem>
                            <MenuItem onClick={handleAddEntry}>
                              Add Session Entry
                            </MenuItem>
                            <MenuItem onClick={handleCancel}>Cancel</MenuItem>
                          </>
                        ) : reschedule ? (
                          <MenuItem onClick={handleReschedule}>
                            Reschedule
                          </MenuItem>
                        ) : (
                          <>
                            <MenuItem onClick={handleView}>View</MenuItem>
                            <MenuItem onClick={handleDelete}>Delete</MenuItem>
                          </>
                        )}
                      </Menu>
                    </Box>
                  </StyledTableCell>
                </StyledTableRow>
              ))
            )}
          </TableBody>
        </Table>
        <Divider />
        {!dashboard && (
          <Stack
            padding={2}
            component="div"
            direction={"row"}
            justifyContent={
              selectedIds.length > 0 ? "space-between" : "flex-end"
            }
            alignItems="center"
          >
            <Stack direction="row" alignItems="center"></Stack>

            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Box display="flex" alignItems="center">
                <TablePagination
                  component="div"
                  ActionsComponent={({ onPageChange }) => (
                    <Stack
                      direction="row"
                      spacing={1}
                      alignItems="center"
                      marginLeft={2}
                    >
                      <LeftIcon />
                      <RightIcon />
                    </Stack>
                  )}
                />
              </Box>
            </Stack>
          </Stack>
        )}
      </TableContainer>
    </Box>
  );
};

export default StyledTable;
