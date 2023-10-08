import { AppBar, Box, Divider, Drawer, IconButton, Paper, Toolbar } from '@mui/material';
import { FC, ReactNode, useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Logout, Menu, Movie, MovieFilter } from '@mui/icons-material';
import { grey } from '@mui/material/colors';
import Image from 'next/image';
import ListItems from '../../buttons/listItems';
import axios from 'axios';
import { CONSTANTS } from '../../../constants';
import { tokenRemoveAll } from '../../../utils/localstorage';

export interface ISidebar {
  children: ReactNode;
}

const Sidebar: FC<ISidebar> = ({ children }) => {
  const { t } = useTranslation();
  const drawerWidth = useMemo(() => 280, []);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = useCallback(async () => {
    await axios.post(CONSTANTS.api.auth + '/signout');

    tokenRemoveAll();

    window.location.href = CONSTANTS.redirection.signIn;
  }, []);

  const renderDrawer = useMemo(() => {
    return (
      <div>
        <Toolbar>
          <Box sx={{ width: '150px', height: '30px', position: 'relative', display: { sm: 'block', xs: 'none' } }}>
            <Image
              src='/static/assets/brand/green_moons_logo.png'
              alt='Greemoons Logo'
              fill
              style={{ objectFit: 'contain' }}
            />
          </Box>
        </Toolbar>
        <Divider sx={{ borderColor: grey[800] }} />
        <ListItems
          items={[
            {
              label: 'Movies Finder',
              icon: <Movie />,
            },
            {
              label: 'My Favorite Movies',
              icon: <MovieFilter />,
            },
          ]}
        />
        <Divider sx={{ borderColor: grey[800] }} />
        <ListItems
          items={[
            {
              label: t('components.sidebar.logout'),
              icon: <Logout />,
              onClick: handleLogout,
            },
          ]}
        />
      </div>
    );
  }, []);

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position='fixed'
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          display: { sm: 'none' },
          boxShadow: 'none',
          background: 'transparent',
          padding: '0px 16px',
          backgroundColor: '#F1FAF8',
        }}>
        <Toolbar>
          <IconButton
            aria-label='open drawer'
            edge='start'
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}>
            <Menu />
          </IconButton>
          <Box sx={{ width: '150px', height: '30px', position: 'relative' }}>
            <Image
              src='/static/assets/brand/green_moons_logo.png'
              alt='Greemoons Logo'
              fill
              style={{ objectFit: 'contain' }}
            />
          </Box>
        </Toolbar>
      </AppBar>
      <Box component='nav' sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }} aria-label='mailbox folders'>
        <Drawer
          variant='temporary'
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}>
          <Paper
            sx={{
              backgroundColor: grey[900],
              borderRadius: 0,
              boxShadow: 'none',
              height: '100%',
            }}>
            {renderDrawer}
          </Paper>
        </Drawer>
        <Drawer
          variant='permanent'
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open>
          <Paper
            sx={{
              backgroundColor: grey[900],
              borderRadius: 0,
              boxShadow: 'none',
              height: '100%',
            }}>
            {renderDrawer}
          </Paper>
        </Drawer>
      </Box>
      <Box component='main' sx={{ flexGrow: 1, width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
        <Toolbar sx={{ display: { sm: 'none', xs: 'block' } }} />
        {children}
      </Box>
    </Box>
  );
};

export default Sidebar;
