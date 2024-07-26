import React, { useEffect, useState } from "react";
import StyledTable from "../ui/StyledTable";
import { useListStore } from "../store/listStore";

const CounsellingSessionTable = ({ id }) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const {  fetchCounselorSession } = useListStore();
  const sessions = [
    { title: "Session No’", field: "id", padding: "none" },

    { title: "Student Name", field: "student_name" },
    { title: "Type ", field: "counsellor_type" },
    { title: "Date", field: "session_date" },
    { title: "Time", field: "session_time" },
    { title: "Grade", field: "grade" },
    { title: "Status", field: "status" },
  ];
  const handleSelectionChange = (newSelectedIds) => {
    setSelectedRows(newSelectedIds);
    console.log("Selected items:", newSelectedIds);
  };
  useEffect(() => {
    if (id) {
      fetchCounselorSession(id);
    }
  }, [id, fetchCounselorSession]);
  return (
    <StyledTable columns={sessions} onSelectionChange={handleSelectionChange} />
  );
};

export default CounsellingSessionTable;
