import { ChangeEvent, useState, useContext } from 'react';
import { Box, Button, TextField } from '@mui/material';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { EntriesContext } from '../../context/entries';
import { UIContext } from '../../context/ui/UIContext';

export const NewEntry = () => {
  // const [isAdding, setIsAdding] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [touched, setTouched] = useState(false);

  const { addNewEntry } = useContext(EntriesContext);
  const { isAddingEntry, setIsAddingEntry } = useContext(UIContext);

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  };

  const onSave = () => {
    if (!inputValue.length) return;

    addNewEntry(inputValue);
    setIsAddingEntry(false);
    setTouched(false);
    setInputValue('');
  }

  return (
    <Box sx={{
      marginBottom: 2,
      paddingX: 2
    }}>
    {
      isAddingEntry ? (
      <>
        <TextField
          fullWidth
          sx={{
            marginTop: 2,
            marginBottom: 1
          }}
          placeholder='Nueva entrada'
          autoFocus
          multiline
          label='Nueva entrada'
          helperText={ !inputValue.length && touched && 'Ingrese un valor' }
          error={ !inputValue.length && touched }
          value={inputValue}
          onChange={ onInputChange }
          onBlur={ () => setTouched(true) }
        />
        <Box display='flex' justifyContent='space-between'>
          <Button
            variant='text'
            color='error'
            onClick={() => {
              setIsAddingEntry(false)
              setInputValue('')
              setTouched(false)
            }}
          >
            Cancelar
          </Button>
          <Button
            variant='outlined'
            color='secondary'
            endIcon={<SaveOutlinedIcon />}
            disabled={!inputValue.length}
            onClick={onSave}
          >
            Guardar
          </Button>
        </Box>
        </>
      )
        :
      (
        <Button
          startIcon={<AddCircleOutlineOutlinedIcon />}
          fullWidth
          variant='outlined'
          onClick={() => setIsAddingEntry(true)}
          >
            Agregar tarea
        </Button>
      )
    }
    </Box>
  )
};
