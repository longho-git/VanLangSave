import React, { useState } from 'react';
import { Input } from 'reactstrap';

function SearchTable({ onSearch, placeholder }) {
  const [search, setSearch] = useState('');

  const onInputChange = (value) => {
    setSearch(value);
    onSearch(value);
  };
  return (
    <>
      <div
        id="datatable-basic_filter"
        className="dataTables_filter px-2 py-2 bg-secondary d-flex"
      >
        <Input
          type="text"
          placeholder={placeholder}
          value={search}
          style={{ backgroundColor: 'inherit' }}
          className="form-control form-control-sm"
          onChange={(e) => onInputChange(e.target.value)}
        />
      </div>
    </>
  );
}

SearchTable.propTypes = {};

export default SearchTable;
