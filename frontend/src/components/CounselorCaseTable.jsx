import React, { useEffect, useState } from "react";
import StyledTable from "../ui/StyledTable";
import { useListStore } from "../store/listStore";

const CounselorCaseTable = ({ id }) => {
  const { fetchCounselorCase } = useListStore();
  const Cases = [
    { title: "Case ID", field: "id", padding: "none" },
    { title: "Created on", field: "case_date" },
    { title: "Student Name ", field: "student_name" },
    { title: "Status", field: "status" },
  ];

  useEffect(() => {
    if (id) {
        fetchCounselorCase(id)
    }
  }, [id, fetchCounselorCase]);
  return <StyledTable columns={Cases}  />;
};

export default CounselorCaseTable;
