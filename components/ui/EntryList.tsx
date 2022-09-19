import React, { DragEvent, FC, useMemo } from 'react';
import { List, Paper } from '@mui/material';
import { EntryCard } from './EntryCard';
import { EntryStatus } from '../../interfaces';
import { useContext } from 'react';
import { EntriesContext } from '../../context/entries';
import { UIContext } from '../../context/ui';
import styles from './EntryList.module.css';

interface Props {
  status: EntryStatus
}

export const EntryList: FC <Props> = ({status}) => {

  const { entries, updateEntry } = useContext(EntriesContext);

  const { isDragging, endDragging } = useContext(UIContext);

  const entriesByStatus = useMemo(() => {
      return entries.filter((entry) => entry.status === status)
    }, [entries]);

    const onDropEntry = ( event: DragEvent<HTMLDivElement> ) => {
      const id = event.dataTransfer.getData('text');
      const entry = entries.find((entry) => entry._id === id)!;
      entry.status = status;
      updateEntry(entry);
      endDragging();
    }

    const allowDrop = ( event: DragEvent<HTMLDivElement>) => {
      event.preventDefault();
    }

  return (
    <div
      onDrop={ onDropEntry }
      onDragOver={allowDrop}
      className={ isDragging ? styles.dragging : '' }
    >
      <Paper sx={{
        height: 'calc(100vh - 180px)',
        overflow: 'auto',
        backgroundColor: 'transparent',
        '&::-webkit-scrollbar': { width: '3px', backgroundColor: '#454545' },
        '&::-webkit-scrollbar-thumb': { backgroundColor: '#ffff', border: '7px none #ffff', borderRadius: '5px' },
        padding: '1px 5px'
      }}>
        <List sx={{ opacity: isDragging ? 0.2 : 1, transition: 'all .3s' }}>
          {
            entriesByStatus.map((entry) => (
              <EntryCard key={entry._id} entry={entry} />
            ))
          }
        </List>
      </Paper>
    </div>
  )
}
