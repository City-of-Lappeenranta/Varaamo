import React, { PropTypes } from 'react';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import Select from 'react-select';

import { injectT } from 'i18n';

function SelectControl({ id, isLoading, label, onConfirm, options, value }) {
  return (
    <div className="app-SelectControl">
      <FormGroup controlId={id}>
        {!isLoading && <Select
          clearable
          name={id}
          onChange={option => onConfirm(option ? option.value : '')}
          options={options}
          placeholder={label}
          searchable
          value={value || ''}
        />}
      </FormGroup>
    </div>
  );
}

SelectControl.propTypes = {
  id: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
  value: PropTypes.string,
};

export default injectT(SelectControl);
