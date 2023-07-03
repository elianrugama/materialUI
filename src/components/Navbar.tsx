import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';


import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import Tabla from './Tabla';


import { BrowserRouter as Router, Link, Routes, Route } from 'react-router-dom';
import Tabss from './Tabss';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function Navbar() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Router>
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h5" noWrap component="div">
            Ecommerce
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
            <Link to = "/inventario" style={{ textDecoration: 'none', color:"inherit" }}>
            <ListItem disablePadding >
                <ListItemButton>
                    <ListItemIcon>
                        <AddShoppingCartIcon />
                    </ListItemIcon>
                    <ListItemText primary="Inventario" />
                </ListItemButton>
            </ListItem>
            </Link>

            <Link to = "/facturacion" style={{ textDecoration: 'none', color:"inherit" }}>
            <ListItem disablePadding>
                <ListItemButton>
                    <ListItemIcon>
                        <FactCheckIcon />
                    </ListItemIcon>
                    <ListItemText primary="Facturacion" color="inherit" />
                </ListItemButton>
            </ListItem>
            </Link>
            <Link to = "/clientes" style={{ textDecoration: 'none', color:"inherit" }}>
            <ListItem disablePadding>
                <ListItemButton>
                    <ListItemIcon>
                        <PersonAddIcon />
                    </ListItemIcon>
                    <ListItemText primary="clientes" />
                </ListItemButton>
            </ListItem>
            </Link>



          
        </List>
        <Divider />
        <List>
        <Link to = "/cuentas" style={{ textDecoration: 'none', color:"inherit" }}>
            <ListItem disablePadding>
                <ListItemButton>
                    <ListItemIcon>
                        <AccountBalanceIcon />
                    </ListItemIcon>
                    <ListItemText primary="cuentas"/>
                </ListItemButton>
            </ListItem>
            </Link>

        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <Tabss />
        <br />
        <Routes>
      <Route path="/" element={<h1>Home</h1>} />
      <Route path="/about" element={<h1>About</h1>} />
      <Route path="/inventario" element={<Tabla/>} />
    </Routes>
      </Main>
    </Box>
    </Router>
  );
}