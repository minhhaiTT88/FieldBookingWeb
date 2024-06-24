import React from "react";

import { Form, Input, Button } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const ItemSearch = React.forwardRef(({ formInstance, onSubmit }, ref) => {
  return (
    <div className="flex items-end justify-between">
      <div className="flex-controls w-full">
        <div className="ant-form-control w-full">
          <label>Tên sản phẩm</label>
          <Form.Item name={"Name"}>
            <Input
              onChange={(e) => {
                console.log(e.target.value)
                onSubmit(e.target.value);
              }}
            />
          </Form.Item>
        </div>
      </div>
    </div>
  );
});

export default ItemSearch;
