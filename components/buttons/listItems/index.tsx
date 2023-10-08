import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { FC, ReactNode } from 'react';

export interface IListItem {
  icon: ReactNode;
  label: string;
  onClick?: () => void;
  href?: string;
}

export interface IListItems {
  items: IListItem[];
}

const ListItems: FC<IListItems> = ({ items }) => {
  return (
    <List>
      {items.map((item) => (
        <ListItem disablePadding key={item.label}>
          <ListItemButton onClick={item.onClick} href={item.href || ''}>
            <ListItemIcon sx={{ color: 'white' }}>{item.icon}</ListItemIcon>
            <ListItemText>
              <Typography variant='body1' sx={{ color: 'white' }}>
                {item.label}
              </Typography>
            </ListItemText>
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

export default ListItems;
