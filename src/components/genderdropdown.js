import React from "react";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";

export default function GenderDropdown({ genderSelected }) {
  return (
    <Dropdown>
      <Dropdown.Toggle id="dropdown-button-dark-example1" variant="primary">
        Select a Gender
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item onSelect={() => genderSelected("Men")} eventKey="1">
          Men
        </Dropdown.Item>
        <Dropdown.Item onSelect={() => genderSelected("Women")} eventKey="2">
          Woman
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
