import { List } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemText } from '@material-ui/core';
import firebase from '../config/firebase';

function Repositories() {
  useEffect(() => {}, []);

  return (
    <List>
      <ListItem>
        <ListItemText>Some Repo</ListItemText>
      </ListItem>

      <ListItem>
        <ListItemText>Some Repo</ListItemText>
      </ListItem>

      <ListItem>
        <ListItemText>Some Repo</ListItemText>
      </ListItem>
    </List>
  );
}

export default Repositiories;
