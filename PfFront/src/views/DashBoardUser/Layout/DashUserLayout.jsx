import { Grid, Typography } from "@mui/material";

import style from "./DashUserLayout.module.css";

const DashUserLayout = ({ children, title = "" }) => {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ padding: 4 }}
    >
      <Grid
        item
        className={style.box}
        xs={3}
        sx={{
          width: { sm: 450, md: 660 },
          backgroundColor: "#fff",
          padding: 3,
          borderRadius: 2,
        }}
      >
        <Typography variant="h5" sx={{ mb: 3 }}>
          {title}
        </Typography>
        {children}
      </Grid>
    </Grid>
  );
};

export default DashUserLayout;
