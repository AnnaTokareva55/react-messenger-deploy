import React from "react";
import PropTypes from "prop-types";
import "./Header.css";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { Link } from "react-router-dom";
import { PushButton } from "../PushButton/PushButton";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

// Компонент шапки приложения.
export const Header = ({ title, userName, showMenu }) => {
  const classes = useStyles();

  /**
   * Обработка события клика по иконке меню.
   */
  const handleClick = () => showMenu();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={handleClick}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {title}
          </Typography>
          <Button>
            <PushButton />
          </Button>
          <Button color="inherit">
            <Link to="/profile" className="profileLink">
              {userName}
            </Link>
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  showMenu: PropTypes.func.isRequired
};
