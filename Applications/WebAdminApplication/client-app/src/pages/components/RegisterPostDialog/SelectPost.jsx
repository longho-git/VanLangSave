import React, { useState } from 'react';
import {
  DropdownToggle,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import { formatTime } from './../../../utils/fortmatTime';

function SelectPost({ options, onChange }) {
  const style = { width: 100 };
  const [toggleContents, setToggleContents] = useState(options[0]);
  function selected(item) {
    onChange(item);
    setToggleContents(item);
  }
  return (
    <UncontrolledDropdown className="w-100">
      <DropdownToggle
        caret
        color="secondary"
        id="navbarDropdownMenuLink2"
        style={{ width: '100%' }}
      >
        Chọn sản phẩm
      </DropdownToggle>

      <DropdownMenu
        aria-labelledby="navbarDropdownMenuLink2"
        style={{ width: '100%' }}
      >
        {options.map((item) => (
          <li key={item.id}>
            <DropdownItem
              onClick={(e) => {
                e.preventDefault();
                selected(item);
              }}
              className="btn-block"
            >
              <tr>
                <td className="text-left pl-0">
                  <img
                    className=" img-fluid rounded shadow"
                    alt="..."
                    src={item.imageMain}
                    style={style}
                  ></img>
                </td>
                <td className="text-right" style={{ width: 90 }}></td>
                <td className="text-right">{item.title}</td>
                <td className="text-right" style={{ width: 90 }}></td>
                <td className="ml-3 text-right">
                  {formatTime(item.createdDate)}
                </td>
              </tr>
            </DropdownItem>
          </li>
        ))}
      </DropdownMenu>
    </UncontrolledDropdown>
  );
}

SelectPost.propTypes = {};

export default SelectPost;
