import { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';

// ----------------------------------------------------------------------

function TabsComponent({ config, selected }) {
  const [value, setValue] = useState(String(selected));

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <TabContext value={value}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <TabList onChange={handleChange}>
          {config.map((tab, index) => (
            <Tab key={`tab${index}`} label={tab.label} value={String(index + 1)} />
          ))}
        </TabList>
      </Box>
      {config.map((panel, index) => (
        <TabPanel key={String(index + 1)} value={String(index + 1)}>
          {panel.component}
        </TabPanel>
      ))}
    </TabContext>
  );
}

TabsComponent.defaultProps = {
  selected: 1
};

TabsComponent.propTypes = {
  config: PropTypes.oneOfType([PropTypes.array]),
  // config: PropTypes.oneOfType([PropTypes.array]).isRequired,
  selected: PropTypes.number
};

export default TabsComponent;
