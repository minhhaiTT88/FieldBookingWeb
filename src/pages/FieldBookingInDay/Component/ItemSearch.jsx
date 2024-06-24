import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { Form, Input, DatePicker, Button, Select } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useFieldApi } from "../../../apiHelper/api/FieldApi";
const { RangePicker } = DatePicker;

const ItemSearch = React.forwardRef(
  ({ formInstance, onSubmit, ShowModal }, ref) => {
    const [lstField, setLstField] = useState([]);
    const apiClient = useFieldApi();
    const LoadFields = () => {
      apiClient.GetAll().then((data) => {
        if (data) {
          setLstField(data);
        }
      });
    };
    useEffect(() => {
      LoadFields();
      // formInstance.setFieldValue("Status", "P");
    }, []);

    const allCode = useSelector((state) => state.allcodeReducer.ALLCODE);
    const navigate = useNavigate();

    return (
      <div className="flex-controls">
        <div className="ant-form-control ant-form-input">
          <label>Sân bóng</label>
          <Form.Item name={"FieldId"}>
            <Select
              allowClear
              mode="single"
              showSearch
              optionFilterProp="children"
            >
              {lstField.map((item, key) => (
                <Option key={key} value={item.FieldId}>
                  {item.FieldName}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </div>

        <div className="ant-form-control ant-form-input">
          <label>Tên khách hàng</label>
          <Form.Item name={"CustomerName"}>
            <Input />
          </Form.Item>
        </div>

        <div className="ant-form-control ant-form-input">
          <label>Số diện thoại</label>
          <Form.Item name={"PhoneNumber"}>
            <Input />
          </Form.Item>
        </div>

        <div className="ant-form-control ant-form-input">
          <label>Trạng thái</label>
          <Form.Item name={"Status"}>
            <Select
              allowClear
              mode="single"
              showSearch
              optionFilterProp="children"
            >
              {allCode
                ?.filter(
                  (e) => e.Cdname === "FIELD_BOOKING" && e.Cdtype === "STATUS"
                )
                .map((item, key) => (
                  <Option key={key} value={item.Cdval}>
                    {item.Content}
                  </Option>
                ))}
            </Select>
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
  }
);

export default ItemSearch;
