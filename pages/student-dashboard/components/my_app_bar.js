import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { Box } from "@material-ui/core";

/**
 *
 * @createdBy Aurosmruti Das
 * @email aurosmruti.das@gmail.com
 * @description my_app_bar.js
 * @createdOn 14/06/21 2:11 AM
 */

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    fontWeight: "700",
    fontSize: 16,
    cursor: "pointer",
    userSelect: "none",
  },
}));

export default function MyAppBar({ currentIndex, onChanged }) {
  const classes = useStyles();

  return (
    <Box position="static" elevation={0.6} component={AppBar} paddingTop={0.5}>
      <Toolbar className={classes.appBar}>
        <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Box m={0.1} />
          <Box
            component={Typography}
            fvariant="h6"
            className={classes.title}
            borderBottom={currentIndex === 0
                ? 3 : 0}
            borderColor={currentIndex === 0 ? "#ffffff" : "#F03D5F"}
            px={1}
            py={0.3}
            onClick={() => onChanged(0)}
          >
            Explore
          </Box>
          <Box m={2} />
          <Box
            component={Typography}
            fvariant="h6"
            className={classes.title}
            borderBottom={currentIndex === 1 ? 3 : 0}
            borderColor={currentIndex === 1 ? "#ffffff" : "#F03D5F"}
            px={1}
            py={0.3}
            onClick={() => onChanged(1)}
          >
            Exams
          </Box>
          <Box m={2} />
          <Box
            component={Typography}
            fvariant="h6"
            className={classes.title}
            borderBottom={currentIndex === 2 ? 3 : 0}
            px={1}
            py={0.3}
            borderColor={currentIndex === 2 ? "#ffffff" : "#F03D5F"}
            onClick={() => onChanged(2)}
          >
            Results
          </Box>
        </Box>
        <Button color="inherit" className={classes.title}>
          Logout
        </Button>
      </Toolbar>
    </Box>
  );
}
