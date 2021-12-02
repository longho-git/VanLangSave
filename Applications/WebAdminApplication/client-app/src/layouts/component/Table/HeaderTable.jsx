import React, { useState } from 'react';
function HeaderTable({ headers, onSorting }) {
  const [sortingField, setSortingField] = useState('');
  const [sortingOrder, setSortingOrder] = useState('asc');

  const onSortingChange = (field) => {
    const order =
      field === sortingField && sortingOrder === 'asc' ? 'desc' : 'asc';

    setSortingField(field);
    setSortingOrder(order);
    onSorting(field, order);
  };
  return (
    <thead className="thead-light">
      <tr>
        {headers.map(({ name, field, sortable }) =>
          field ? (
            <th
              key={name}
              onClick={() => (sortable ? onSortingChange(field) : null)}
              data-sort={field}
              className={sortable ? 'sort' : ''}
            >
              {name}
            </th>
          ) : (
            <th
              key={name}
              onClick={() => (sortable ? onSortingChange(field) : null)}
            >
              {name}
            </th>
          ),
        )}
      </tr>
    </thead>
  );
}

HeaderTable.propTypes = {};

export default HeaderTable;
