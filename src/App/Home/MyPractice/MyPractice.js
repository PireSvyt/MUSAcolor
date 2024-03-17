import React, {useState} from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { Box, Tabs, Tab, Typography,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText 
} from '@mui/material'
import PropTypes from 'prop-types';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import CategoryIcon from '@mui/icons-material/Category';

import { random_id } from '../../services/toolkit.js'
import appStore from '../../store.js'

// Components
import MyPatients from './MyPatients/MyPatients.js'
import MyExercises from './MyExercises/MyExercises.js'
//import MyNotes from "./MyNotes/MyNotes.js";
function CustomTabPanel(props) {
  const { children, selectedTab, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={selectedTab !== index}
      id={`simple-tabpanel-${index}`}
      {...other}
    >
      {selectedTab === index && (
        <Typography>{children}</Typography>
      )}
    </div>
  );
}
CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  selectedTab: PropTypes.number.isRequired,
};
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function MyPractice() {
  if (process.env.REACT_APP_DEBUG === 'TRUE') {
    console.log('MyPractice')
  }
  // i18n
  const { t } = useTranslation()

  const [menuOpen, setMenuOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const [selectedTab, SetSelectedTab] = useState(0)
  const handleChange = (event, newValue) => {
    SetSelectedTab(newValue);
  };

  let changes = {
    openMenu: (event) => {
      setAnchorEl(event.currentTarget)
      setMenuOpen(true)
    },
    closeMenu: () => {
      setMenuOpen(false)
    },
    newpatient: () => {      
      setMenuOpen(false)
      appStore.dispatch({
        type: 'patientModalSlice/new',
      })
    },    
    newexercise: () => {
      setMenuOpen(false)
      appStore.dispatch({
        type: 'exerciseModalSlice/new',
      })
    },
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Box 
        sx={{ 
          borderBottom: 1, 
          borderColor: 'divider',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%'
        }}
      >
        <Tabs value={selectedTab} onChange={handleChange} aria-label="basic tabs example">
          <Tab label={t('home.label.mypatients')} {...a11yProps(0)} />
          <Tab label={t('home.label.myexercises')} {...a11yProps(1)} />
        </Tabs>
        <Box>            
            <IconButton
              data-testid="component-my practice-menu-new"
              sx={{ pr: 2 }}
              onClick={changes.openMenu}
              color='primary'
            >
              <AddCircleIcon />
            </IconButton>
            <Menu
              open={menuOpen}
              onClose={changes.closeMenu}
              anchorEl={anchorEl}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem
                key={random_id()}
                onClick={changes.newpatient}
                data-testid={"component-my practice-menuitem-new patient"}
              >
                <ListItemIcon>
                  <AccountBoxIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>{t('generic.button.newpatient')}</ListItemText>                
              </MenuItem>
              <MenuItem
                key={random_id()}
                onClick={changes.newexercise}
                data-testid={"component-my practice-menuitem-new exercise"}
              >
                <ListItemIcon>
                  <CategoryIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>{t('generic.button.newexercise')}</ListItemText>                
              </MenuItem>
            </Menu>
          </Box>
      </Box>
      <Box 
      >
      <CustomTabPanel selectedTab={selectedTab} index={0}>
        <MyPatients />
      </CustomTabPanel>
      <CustomTabPanel selectedTab={selectedTab} index={1}>
        <MyExercises/>
      </CustomTabPanel>
    </Box>
    </Box>
  )
}
