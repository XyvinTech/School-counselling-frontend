import { createBrowserRouter } from "react-router-dom";
import DashboardPage from "../pages/Admin/DashboardPage";
import App from "../App";
import SessionSinglePage from "../pages/Admin/CasesAndSession/SessionSinglePage";
import AdminLayout from "../layout/AdminLayout";
import CasesSection from "../pages/Admin/CasesAndSession/CasesSection";
import { Counselor } from "../pages/Admin/UserManagement/Counselor/Counselor";
import CounselorSinglePage from "../pages/Admin/UserManagement/Counselor/CounselorSinglePage";
import StudentPage from "../pages/Admin/UserManagement/Student/StudentPage";
import StudentSinglePage from "../pages/Admin/UserManagement/Student/StudentSinglePage";
import SessionPage from "../pages/Admin/CasesAndSession/SessionPage";
import Notification from "../pages/Admin/Notification";
import Report from "../pages/Admin/Report";
import Settings from "../pages/Admin/Settings";
import Events from "../pages/Admin/Events/Events";
import EventsSinglepage from "../pages/Admin/Events/EventsSinglepage";
import StudentLayout from "../layout/StudentLayout";
import BookAppointment from "../pages/Student/BookAppointment";
import StudentSession from "../pages/Student/Session/StudentSession";
import StudentReport from "../pages/Student/Reports/StudentReport";
import StudentEvents from "../pages/Student/Events/StudentEvents";
import StudentSettings from "../pages/Student/StudentSettings";
import CounselorLayout from "../layout/CounselorLayout";
import UpcomingSession from "../pages/Counselor/UpcomingSession/UpcomingSession";
import CounselorSession from "../pages/Counselor/Session/CounselorSession";
import CounselorReport from "../pages/Counselor/Report/CounselorReport";
import CounselorEvent from "../pages/Counselor/Event/CounselorEvent";
import CounselorSettings from "../pages/Counselor/CounselorSettings";
import UpcomingSessionSinglePge from "../pages/Counselor/UpcomingSession/UpcomingSessionSinglePge";
import AddAvailability from "../pages/Counselor/AddAvailability/AddAvailability";
import LoginPage from "../pages/Login/Loginpage";
import RaiseIssuePage from "../pages/Login/RaiseIssue";
import CounsellorLoginPage from "../pages/Login/CounsellorLoginPage";
import StudentLoginPage from "../pages/Login/StudentLoginPage";
import RescheduleSession from "../pages/Student/Session/RescheduleSession";
import CaseSession from "../pages/Student/Session/CaseSession";
import SessionReport from "../pages/Student/Session/SessionReport";
import AddEntry from "../components/AddEntry";
import CasesSessionPage from "../pages/Counselor/Session/CasesSessionPage";
import SessionDetails from "../pages/Counselor/Session/SessionDetails";
const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/raiseissue",
    element: <RaiseIssuePage />,
  },
  {
    path: "/dashboard",
    element: (
      <AdminLayout>
        <DashboardPage />
      </AdminLayout>
    ),
  },
  {
    path: "/app",
    element: <App />,
  },
  {
    path: "/user/student",
    element: (
      <AdminLayout>
        <StudentPage />
      </AdminLayout>
    ),
  },
  {
    path: "/user/student/:id",
    element: (
      <AdminLayout>
        <StudentSinglePage />
      </AdminLayout>
    ),
  },
  {
    path: "/user/counselor",
    element: (
      <AdminLayout>
        <Counselor />
      </AdminLayout>
    ),
  },
  {
    path: "/user/counselor/:id",
    element: (
      <AdminLayout>
        <CounselorSinglePage />
      </AdminLayout>
    ),
  },
  {
    path: "/casesstudies",
    element: (
      <AdminLayout>
        <CasesSection />
      </AdminLayout>
    ),
  },
  {
    path: "/cases/case/:id",
    element: (
      <AdminLayout>
        <SessionPage />
      </AdminLayout>
    ),
  },
  {
    path: "/cases/session/:id",
    element: (
      <AdminLayout>
        <SessionSinglePage />
      </AdminLayout>
    ),
  },
  {
    path: "/events",
    element: (
      <AdminLayout>
        <Events />
      </AdminLayout>
    ),
  },
  {
    path: "/events/:id",
    element: (
      <AdminLayout>
        <EventsSinglepage />
      </AdminLayout>
    ),
  },
  {
    path: "/report",
    element: (
      <AdminLayout>
        <Report />
      </AdminLayout>
    ),
  },
  {
    path: "/notification",
    element: (
      <AdminLayout>
        <Notification />
      </AdminLayout>
    ),
  },
  {
    path: "/settings",
    element: (
      <AdminLayout>
        <Settings />
      </AdminLayout>
    ),
  },

  // Student Module Routing
  {
    path: "/student",
    element: <StudentLoginPage />,
  },
  {
    path: "/student/bookappoinment",
    element: (
      <StudentLayout>
        <BookAppointment />
      </StudentLayout>
    ),
  },
  {
    path: "/student/session",
    element: (
      <StudentLayout>
        <StudentSession />
      </StudentLayout>
    ),
  },
  {
    path: "/student/session/case/:id",
    element: (
      <StudentLayout>
        <CaseSession />
      </StudentLayout>
    ),
  },
  {
    path: "/student/session/report/:id",
    element: (
      <StudentLayout>
        <SessionReport />
      </StudentLayout>
    ),
  },
  {
    path: "/student/session/reschedule/:id",
    element: (
      <StudentLayout>
        <RescheduleSession />
      </StudentLayout>
    ),
  },
  {
    path: "/student/reports",
    element: (
      <StudentLayout>
        <StudentReport />
      </StudentLayout>
    ),
  },
  {
    path: "/student/events",
    element: (
      <StudentLayout>
        <StudentEvents />
      </StudentLayout>
    ),
  },
  {
    path: "/student/settings",
    element: (
      <StudentLayout>
        <StudentSettings />
      </StudentLayout>
    ),
  },
  // counselor Module Routing
  {
    path: "/counselor",
    element: <CounsellorLoginPage />,
  },
  {
    path: "/counselor/upcomminSession",
    element: (
      <CounselorLayout>
        <UpcomingSession />
      </CounselorLayout>
    ),
  },
  {
    path: "/counselor/upcomminSession/:id",
    element: (
      <CounselorLayout>
        <UpcomingSessionSinglePge />
      </CounselorLayout>
    ),
  },
  {
    path: "/counselor/addavailability",
    element: (
      <CounselorLayout>
        <AddAvailability />
      </CounselorLayout>
    ),
  },
  {
    path: "/counselor/session",
    element: (
      <CounselorLayout>
        <CounselorSession />
      </CounselorLayout>
    ),
  },

  {
    path: "/counselor/session/addentry/:id",
    element: (
      <CounselorLayout>
        <AddEntry />
      </CounselorLayout>
    ),
  },
  {
    path: "/counselor/session/case/:id",
    element: (
      <CounselorLayout>
        <CasesSessionPage />
      </CounselorLayout>
    ),
  },
  {
    path: "/counselor/session/report/:id",
    element: (
      <CounselorLayout>
        <SessionDetails />
      </CounselorLayout>
    ),
  },
  {
    path: "/counselor/report",
    element: (
      <CounselorLayout>
        <CounselorReport />
      </CounselorLayout>
    ),
  },
  {
    path: "/counselor/event",
    element: (
      <CounselorLayout>
        <CounselorEvent />
      </CounselorLayout>
    ),
  },
  {
    path: "/counselor/event/:id",
    element: (
      <CounselorLayout>
        <EventsSinglepage />
      </CounselorLayout>
    ),
  },
  {
    path: "/counselor/setting",
    element: (
      <CounselorLayout>
        <CounselorSettings />
      </CounselorLayout>
    ),
  },
]);

export default router;
