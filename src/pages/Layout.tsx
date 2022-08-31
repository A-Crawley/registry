import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router";
import { AppBar, Box, Button, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search"; 
import { styled } from "@mui/material/styles";

interface page {
    route: string,
    name: string,
    icon: any
};

const pages : page[] = [
    {
        route: '/',
        name: 'Home',
        icon: <HomeIcon />
    },
    {
        route: '/registry?id=918273918273',
        name: 'Test Registry',
        icon: <HomeIcon />
    },
    {
        route: '/search',
        name: 'Search Registries',
        icon: <SearchIcon />
    },
];

const CustomDiv = styled('div')(({ theme }) => ({
    [theme.breakpoints.down('md')]: {
        marginTop: '56px',
    },
    marginTop: '64px',
    overflow: 'auto',
    height: 'calc(100vh - 64px)'
}))

export default function Layout(): React.ReactElement {
  const navigate = useNavigate();
  const [ drawIsOpen, setDrawIsOpen ] = useState(false);

  const handlePageClick = (route: string) => {
    navigate(route);
    setDrawIsOpen(false);
  };

  const handleLoginClick = () => {
    navigate('/account');
  }

  const handleMenuClick = (open : boolean) => 
  (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setDrawIsOpen(open);
  }

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position={'fixed'}>
          <Toolbar>
            <IconButton
              size={"large"}
              edge={"start"}
              color={"inherit"}
              aria-label={"menu"}
              sx={{ mr: 2 }}
              onClick={handleMenuClick(true)}
              onKeyDown={handleMenuClick(true)}
            >
              <MenuIcon />
            </IconButton>
            <Typography 
                variant={'h6'}
                component={'div'}
                sx={{ cursor: 'pointer', userSelect: 'none' }}
                onClick={() => handlePageClick('/')}
            >
                Registry
            </Typography>
            <div style={{flexGrow: 1}}></div>
            <Button 
                color={"inherit"}
                onClick={handleLoginClick}
            >
              Login
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Drawer
        anchor={'left'}
        open={drawIsOpen}
        onClose={handleMenuClick(false)}
      >
        <List sx={{width: '250px'}}>

        {pages.map((page, index) => {
            return(
                <ListItem
                disablePadding
                key={index}
            >
                <ListItemButton
                    onClick={() => handlePageClick(page.route)}
                >
                    <ListItemIcon>
                        {page.icon}
                    </ListItemIcon>
                    <ListItemText>
                        {page.name}
                    </ListItemText>
                </ListItemButton>
            </ListItem>
            )
        })}

        
            
        </List>
      </Drawer>
      <CustomDiv>
        <Outlet />
      </CustomDiv>
    </>
  );
}
