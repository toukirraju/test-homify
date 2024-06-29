import { View, Text } from "react-native";
import React from "react";
import * as DropdownMenu from "zeego/dropdown-menu";
import RoundButton from "./RoundButton";

const Dropdown = () => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <RoundButton text="More" icon={"ellipsis-horizontal"} />
      </DropdownMenu.Trigger>
      {/* <DropdownMenu.Content
      >
        <DropdownMenu.Item key="statement">
          <DropdownMenu.ItemTitle>Statement</DropdownMenu.ItemTitle>
          <DropdownMenu.ItemIcon />
        </DropdownMenu.Item>
      </DropdownMenu.Content> */}
    </DropdownMenu.Root>
  );
};

export default Dropdown;
