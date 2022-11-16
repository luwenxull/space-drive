import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

const options = [
  'Show some love to MUI',
  'Show all notification content',
  'Hide sensitive notification content',
  'Hide all notification content',
];

export default function (props: {
  dirs: string[],
  onJump: (index: number) => void,
}) {
  const { dirs } = props
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (
    index: number,
  ) => {
    setAnchorEl(null);
    props.onJump(index)
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <List
        component="nav"
      >
        <ListItem
          button
          onClick={handleClickListItem}
        >
          <ListItemText
            primary={dirs.join('/')}
          />
        </ListItem>
      </List>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {[...dirs].reverse().map((option, index) => (
          <MenuItem
            key={index}
            onClick={() => handleMenuItemClick(index)}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
