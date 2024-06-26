import React from "react";
import { useSelector } from "react-redux";

import { Form, Input, DatePicker, Button, Select } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
const { RangePicker } = DatePicker;

const ItemSearch = React.forwardRef(({ formInstance, onSubmit, ShowModal }, ref) => {
  const allCode = useSelector((state) => state.allcodeReducer.ALLCODE);
  const navigate = useNavigate();

  return (
    <div className="flex-controls">
      <div className="ant-form-control ant-form-input">
        <label>Tên nhân viên</label>
        <Form.Item name={"Name"}>
          <Input />
        </Form.Item>
      </div>
      <div className="ant-form-control ant-form-input">
        <label>Số điện thoại</label>
        <Form.Item name={"Phone"}>
          <Input />
        </Form.Item>
      </div>

      <div className="ant-form-control">
        <Button
          onClick={() => {
            onSubmit();
          }}
        >
          <FontAwesomeIcon icon={faSearch} />
          Tìm kiếm
        </Button>
      </div>
      <div className="ant-form-control">
        <Button
          type="primary"
          className="light-orange"
          onClick={() => {
            ShowModal(undefined, "create");
          }}
        >
          <FontAwesomeIcon icon={faPlus} />
          <span>Thêm mới</span>
        </Button>
      </div>
    </div>
  );
});

export default ItemSearch;
