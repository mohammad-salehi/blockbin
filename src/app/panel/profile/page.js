'use client'
import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import UserList from '@/components/Profile/UserList/UserList';
import AddUser from '@/components/Profile/AddUser/AddUser';
import SavedLabel from '@/components/Profile/SavedLabel/SavedLabel';
import SavedGraph from '@/components/Profile/SavedGraph/SavedGrapg';
import Setting from '@/components/Profile/Setting/Setting';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box className="sm:p-3 mt-4 sm:mt-0">{children}</Box>}
    </div>
  );
}

const Page = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }} className='p-0'>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          textColor="inherit"
          variant="scrollable"
          scrollButtons="auto"
          className="p-0"
          sx={{
            '& .MuiTabs-scroller': {
              overflowX: 'auto',
            },
            '& .MuiTabs-scroller::-webkit-scrollbar': { display: 'none' },
            '& .MuiTabs-flexContainer': {
              gap: 1,
            },

            '& .MuiTab-root': {
              color: 'var(--color-textColor)',
              minWidth: 'max-content',
              whiteSpace: 'nowrap',
            },
            '& .MuiTab-root.Mui-selected': {
              color: 'var(--color-primary)',
            },
            '& .MuiTabs-indicator': {
              backgroundColor: 'var(--color-primary)',
            },
          }}
        >
          <Tab label="لیست کاربران" className="p-0" />
          <Tab label="افزودن کاربر" />
          <Tab label="برچسب‌های ذخیره شده" />
          <Tab label="گراف‌های ذخیره شده" />
          <Tab label="تنظیمات" />
        </Tabs>

      </Box>
      <CustomTabPanel value={value} index={0} className='p-0'>
        <UserList />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <AddUser />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <SavedLabel />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <SavedGraph />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={4}>
        <Setting />
      </CustomTabPanel>
    </Box>
  );
};

export default Page;
