import { createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=STIX+Two+Text&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100..900&display=swap');
`;

const theme = createTheme({
  palette: {},
  typography: {
    fontFamily: "'Inter'",
    h1: {
      fontFamily: "'STIX Two Text'",
      fontSize: "43px",
      fontWeight: 600,
    },
    h2: {
      fontFamily: "'Roboto'",
      fontSize: "40px",
      fontWeight: 600,
    },
    h3: {
      fontFamily: "Roboto",
      fontSize: "20px",
      fontWeight: 600,
    },
    h4: {
      fontSize: "18px",
      fontWeight: 600,
    },
    h5: {
      fontSize: "16px",
      fontWeight: 500,
    },
    h6: {
      fontFamily: "Roboto",
      fontSize: "14px",
      fontWeight: 400,
    },
    h7: {
      fontSize: "12px",
      fontWeight: 400,
    },
    h8: {
      fontSize: "14px",
      fontWeight: 400,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        ${globalStyles}
      `,
    },
  },
});

export default theme;
