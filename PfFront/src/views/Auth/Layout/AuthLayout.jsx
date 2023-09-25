// import { Link as RouterLink } from "react-router-dom";
import { Grid, Typography,  } from "@mui/material";
// import { ArrowBack } from "@mui/icons-material";

import style from "./AuthLayout.module.css";

const AuthLayout = ({ children, title = "" }) => {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ padding: 4,  }}
    >
      {/* <Grid item sx={{ position: "absolute", top: 0, left: 0, mt: 5, ml: 5 }} >
        <Link component={RouterLink} color="#fff" to="/">
          <ArrowBack />
        </Link>
      </Grid> */}

      <Grid
        item
        className={style.box}
        xs={3}
        sx={{
          width: { sm: 450, md: 600 },
          backgroundColor: "#fff",
          padding: 3,
          borderRadius: 2,
        }}
      >
        <Typography variant="h5" sx={{ mb: 1 }}>
          {title}
        </Typography>
        {children}
      </Grid>
    </Grid>
  );
};

export default AuthLayout;
