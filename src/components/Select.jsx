import React from 'react';
import { FormControl } from 'react-bootstrap';

export default ({ options, dependsOn, value, placeholder, onChange = () => {} }) => {
  const opts = (dependsOn ? options[dependsOn] : options);

  return (
    <FormControl componentClass="select" onChange={onChange}>
      {!value && !!opts && <option>{placeholder}</option>}
      {Array.isArray(opts) && opts.map((opt, index) => (
        <option value={opt.value} key={index}>{opt.label}</option>
      ))}
    </FormControl>
  );
};
