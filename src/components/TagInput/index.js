import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TextField, FormGroup } from '@mui/material';
import { Chip, ItemsWrapper, Wrapper } from './styled';

const KEY_ENTER = 13;

/**
 * This component renders a input that allows to create multiple tags.
 * @author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 */
const TagInput = (props) => {
  const { error, helperText, label, name, onChange, placeholder = 'Add tags', value = [] } = props;
  const [addedItems, setItem] = useState(value);
  const [tagName, setTagName] = useState('');

  // This function handles the onChange event which returns the added items.
  const handleOnChange = (items) => {
    if (onChange) {
      onChange({
        target: {
          name,
          value: items
        }
      });
    }
  };

  // This function handles the item remove from the list.
  const onRemove = (tag) => {
    const newItems = addedItems.filter((item) => item !== tag);
    setItem(newItems);
    handleOnChange(newItems);
  };

  // This function handles the item add action.
  const onAdd = () => {
    if (!addedItems.includes(tagName) && !tagName) {
      const newItems = [...addedItems, tagName];
      setItem(newItems);
      setTagName('');
      handleOnChange(newItems);
    }
  };

  // This function handles the key pressed on input.
  const handleKey = (event) => {
    const { keyCode } = event;
    if (keyCode === KEY_ENTER) {
      event.preventDefault();
      onAdd();
    }
  };

  return (
    <Wrapper>
      <FormGroup>
        <TextField
          variant="outlined"
          margin="dense"
          autoComplete="off"
          error={error}
          helperText={helperText}
          value={tagName}
          onChange={({ target }) => setTagName(target.value)}
          onKeyDown={handleKey}
          label={label}
          placeholder={placeholder}
        />
      </FormGroup>
      <ItemsWrapper>
        {addedItems.map((item, key) => {
          const itemKey = `${item}-${key}`;
          return <Chip key={itemKey} label={item} onDelete={() => onRemove(item)} />;
        })}
      </ItemsWrapper>
    </Wrapper>
  );
};

TagInput.propTypes = {
  error: PropTypes.bool,
  helperText: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.array])
};

export default TagInput;
