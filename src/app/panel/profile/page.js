'use client'
import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import UserList from '@/components/Profile/UserList/UserList';
import AddUser from '@/components/Profile/AddUser/AddUser';
import SavedLabel from '@/components/Profile/SavedLabel/SavedLabel';
import SavedGraph from '@/components/Profile/SavedGraph/SavedGrapg';

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
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const Page = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          textColor="inherit"
          sx={{
            // رنگ تب‌های معمولی
            '& .MuiTab-root': {
              color: 'var(--color-textColor)',
            },
            // فقط تب انتخاب‌شده
            '& .MuiTab-root.Mui-selected': {
              color: 'var(--color-primary)',      // متن تب انتخاب‌شده
            },
            // رنگ indicator (خط زیر تب)
            '& .MuiTabs-indicator': {
              backgroundColor: 'var(--color-primary)',
            },
          }}
        >
          <Tab label="لیست کاربران" />
          <Tab label="افزودن کاربر" />
          <Tab label="برچسب‌های ذخیره شده" />
          <Tab label="گراف‌های ذخیره شده" />
          <Tab label="تنظیمات" />
        </Tabs>
      </Box>

      <CustomTabPanel value={value} index={0}>
        <UserList/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <AddUser/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <SavedLabel/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <SavedGraph/>
      </CustomTabPanel>
    </Box>
  );
};

export default Page;
