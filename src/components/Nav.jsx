import React, { useState, useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";

import { AuthContext } from "../Context/AuthContext";
import SearchBar from "./SearchBar";

const Nav = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const { user, setUser, isAuthenticated, setIsAuthenticated } = useContext(
    AuthContext
  );
  const pages = isAuthenticated
    ? [{ name: "Products", link: "/products" }]
    : [{ name: "Register", link: "/register" }];
  const settings = isAuthenticated
    ? [
        { name: "Profile", link: "/profile" },
        { name: "Logout", link: null },
      ]
    : [];

  const onLogout = (e) => {
    setAnchorElUser(null);
    if (e.target.id == "Logout") {
      setIsAuthenticated(false);
      setUser(null);
      localStorage.removeItem("user");
    }
  };

  return (
    <AppBar position="fixed">
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{
            display: {
              md: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            },
          }}
        >
          <Box
            sx={{
              display: {
                md: "flex",
                justifyContent: "center",
                alignItems: "center",
              },
            }}
          >
            <ShoppingBagIcon
              sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
            />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Clarent
            </Typography>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center" component="a" href={page.link}>
                    {page.name}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <ShoppingBagIcon
            sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
          />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          ></Typography>
          {isAuthenticated ? <SearchBar /> : null}
          <Box
            sx={{
              display: {
                md: "flex",
                justifyContent: "center",
                alignItems: "center",
              },
            }}
          >
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page.name}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                  component="a"
                  href={page.link}
                >
                  {page.name}
                </Button>
              ))}
            </Box>

            {isAuthenticated ? (
              <Box sx={{ ml: 2 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt={`${user.firstname}`}
                      src="/static/images/avatar/2.jpg"
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <Typography
                    variant="h6"
                    noWrap
                    sx={{
                      mx: 2,
                      fontWeight: 100,
                      color: "inherit",
                      textDecoration: "none",
                    }}
                  >
                    Hi {user.firstname},
                  </Typography>
                  <hr />
                  {settings.map((setting) => (
                    <MenuItem
                      key={setting.name}
                      onClick={onLogout}
                      id={setting.name}
                      component="a"
                      href={setting.link}
                    >
                      {setting.name}
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            ) : (
              <Button color="inherit" component="a" href="/login">
                Login
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Nav;
