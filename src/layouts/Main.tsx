import * as React from 'react';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import { Avatar } from '@mui/material';
import type { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import MuiAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import MuiDrawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { styled, useTheme } from '@mui/material/styles';
import type { CSSObject, Theme } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import { useSelector } from 'react-redux';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import MusicPlayerSlider from 'src/components/ui/MusicPlayerSlider';
import SwitchTheme from 'src/components/ui/SwitchTheme';
import {
  LABEL_PATH,
  NAB_ROUTER_PRIVATE,
  NAB_ROUTER_PUBLIC,
} from 'src/routers/routers';
import type { RootState } from 'src/store/configureStore';
import { TYPE_REDUCER } from 'src/store/configureStore';
import type { UserType } from 'src/store/UserSlice';



const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: 0,
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const useStyles = makeStyles(() => {
  return {
    topBar: {
      display: 'flex',
      flexDirection: 'row !important',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  };
});

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

export default function MiniDrawer() {
  const theme = useTheme();

  const [open, setOpen] = React.useState(false);

  const location = useLocation();

  const navigate = useNavigate();

  const classes = useStyles();

  const currentUser = useSelector(
    (state: RootState) => state[TYPE_REDUCER.USER] as UserType,
  );

  // check user whether logged yed or no before render list route
  const routers = React.useMemo(() => {
    return currentUser.isLogin ? NAB_ROUTER_PRIVATE : NAB_ROUTER_PUBLIC;
  }, [currentUser.isLogin]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  /**
   * function control navigate page
   * @param path
   * @returns
   */
  const handleNavigation = (path: string) => () => {
    navigate(path);
  };

  /**
   * display avatar when user logged
   * @returns
   */
  const renderAvatar = () => {
    const {
      isLogin,
      userInfo: { picture, name },
    } = currentUser || {};

    // display null when user not logged
    if (!isLogin) return '';

    return (
      <Typography component="div" padding={2}>
        <Avatar alt={name || ''} src={picture} />
      </Typography>
    );
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" open={open} className={classes.topBar}>
        <Toolbar>
          {/* icon to open or close menu */}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>

          {/* display current page */}
          <Typography variant="h6" noWrap component="div">
            {LABEL_PATH[location.pathname]}
          </Typography>
        </Toolbar>

        <SwitchTheme />

        {renderAvatar()}
      </AppBar>

      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />

        <List>
          {routers.map((path, index) => (
            <ListItem key={path} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
                onClick={handleNavigation(path)}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText
                  primary={LABEL_PATH[path]}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Outlet />
        <MusicPlayerSlider />
      </Box>
    </Box>
  );
}
