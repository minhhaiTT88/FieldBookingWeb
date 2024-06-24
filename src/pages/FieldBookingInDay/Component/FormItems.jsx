import { DatePicker, Form, Input, InputNumber, Modal, Select } from "antd";
import { useGlobalConst } from "../../../utils/constData";
import { useSelector } from "react-redux";
import { useFieldApi } from "../../../apiHelper/api/FieldApi";
import { useEffect, useState } from "react";
import moment from "moment";
import { useCustomerApi } from "../../../apiHelper/api/CustomerApi";
import { FIELD_STATUS } from "./Comon";

const FormItems = ({ formInstance, action, data }) => {
  const globalConst = useGlobalConst();
  const allCode = useSelector((state) => state.allcodeReducer.ALLCODE);

  const [lstField, setLstField] = useState([]);
  const [lstTimeSlot, setLstTimeSlot] = useState([]);
  const apiClient = useFieldApi();
  const apiCustomer = useCustomerApi();

  const LoadFields = () => {
    apiClient.GetAll().then((data) => {
      if (data) {
        setLstField(data);
      }
    });
  };

  const GetTimeSlot = (id) => {
    apiClient.GetById(id).then((data) => {
      if (data && data?.TimeSlots) {
        setLstTimeSlot(data?.TimeSlots?.filter((x) => x.Enable === true));
      }
    });
  };

  useEffect(() => {
    LoadFields();
  }, []);

  const handleOnChangeField = (value) => {
    GetTimeSlot(value);
  };

  const handleOnChangeTimeSlot = (value) => {
    if (value) {
      const timeSlot = lstTimeSlot.find((x) => x.TimeSlotId === value);
      formInstance.setFieldsValue(timeSlot);
      formInstance.setFieldValue("Deposit", timeSlot.Price * 0.4);
      formInstance.setFieldValue("TimeFrom", timeSlot.TimeFrom);
      formInstance.setFieldValue("TimeTo", timeSlot.TimeTo);
      formInstance.setFieldValue("FieldPrice", timeSlot.Price);
    }
  };

  const handleOnBlurPhoneNumber = (event) => {
    const value = event.target.value;

    const pattern = /^0\d{9}$/;
    if (value && pattern.test(value) === true) {
      apiCustomer.GetPhoneNumber(value).then((data) => {
        if (data?.PhoneNumber !== undefined) {
          Modal.confirm({
            title: "Xác nhận",
            content:
              "Thông tin khách hàng này đã tồn tại trong hệ thống bạn có muốn tự động điền?",
            okText: "Xác nhận",
            cancelText: "Đóng",
            centered: true,
            onOk: () => {
              formInstance.setFieldsValue(data);
            },
          });
        } else {
          formInstance.setFieldsValue({
            CustomerId: 0,
            CustomerName: undefined,
          });
        }
      });
    }
  };

  return (
    <div className="field-list">
      <Form.Item name={"FieldBookingId"} hidden />
      <Form.Item name={"CustomerId"} hidden />

      <Form.Item name={"TimeFrom"} hidden />
      <Form.Item name={"TimeTo"} hidden />

      <div className="flex flex-nowrap">
        <div className="flex-1">
          <Form.Item label={`Mã đơn`} name={"Code"}>
            <Input disabled />
          </Form.Item>
        </div>
      </div>
      <div className="flex flex-nowrap gap-4">
        <div className="flex-1">
          <Form.Item
            label={`Số điện thoại`}
            name={"PhoneNumber"}
            rules={[
              globalConst.ANT.FORM.RULES.yeuCauNhap,
              globalConst.ANT.FORM.RULES.soDienThoai,
            ]}
          >
            <Input autoComplete="off" onBlur={handleOnBlurPhoneNumber} />
          </Form.Item>
        </div>
        <div className="flex-1">
          <Form.Item
            label={`Tên khách hàng`}
            name={"CustomerName"}
            rules={[globalConst.ANT.FORM.RULES.yeuCauNhap]}
          >
            <Input autoComplete="off" />
          </Form.Item>
        </div>
      </div>

      <div className="flex flex-nowrap gap-4">
        <div className="flex-1">
          <Form.Item
            label={`Ngày đặt sân`}
            name={"BookingDate"}
            {...globalConst.ANT.FORM.ITEM.PARSER.DATE_DATABASE}
            rules={[globalConst.ANT.FORM.RULES.yeuCauNhap]}
          >
            <DatePicker
              format={globalConst.ANT.LOCALE.dateFormat}
              placeholder="dd/MM/yyyy"
            />
          </Form.Item>
        </div>
        <div className="flex-1">
          <Form.Item
            label={`Sân`}
            name={"FieldId"}
            {...globalConst.ANT.FORM.ITEM.SELECT.FORMAT_SELECT}
            rules={[globalConst.ANT.FORM.RULES.yeuCauNhap]}
          >
            <Select
              allowClear
              mode="single"
              showSearch
              optionFilterProp="children"
              onChange={handleOnChangeField}
            >
              {lstField.map((item, key) => (
                <Option key={key} value={item.FieldId}>
                  {item.FieldName}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </div>
      </div>
      <div className="flex flex-nowrap gap-4">
        <div className="flex-1">
          {action === "create" ? (
            <Form.Item
              label={`Khung giờ`}
              name={"TimeSlotId"}
              {...globalConst.ANT.FORM.ITEM.SELECT.FORMAT_SELECT}
              rules={[globalConst.ANT.FORM.RULES.yeuCauNhap]}
            >
              <Select
                allowClear
                mode="single"
                showSearch
                optionFilterProp="children"
                onChange={handleOnChangeTimeSlot}
              >
                {lstTimeSlot.map((item, key) => (
                  <Option key={key} value={item.TimeSlotId}>
                    {`${moment(item.TimeFrom).format("HH:mm")} - ${moment(
                      item.TimeTo
                    ).format("HH:mm")}`}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          ) : (
            <Form.Item label={`Khung giờ`} name={"TimeSlotText"}>
              <Input />
            </Form.Item>
          )}
        </div>
        <div className="flex-1">
          <Form.Item
            label={`Tiền cọc`}
            name={"Deposit"}
            rules={[globalConst.ANT.FORM.RULES.yeuCauNhap]}
          >
            <InputNumber
              formatter={(value) =>
                `${value} đ`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) =>
                value?.replace(/\$\s?|(,*)/g, "")?.replace("đ", "")
              }
            />
          </Form.Item>
        </div>
      </div>
      <div className="flex flex-nowrap gap-4">
        <div className="flex-1">
          <Form.Item
            label={`Tổng tiền`}
            name={"FieldPrice"}
            rules={[globalConst.ANT.FORM.RULES.yeuCauNhap]}
          >
            <InputNumber
              formatter={(value) =>
                `${value} đ`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) =>
                value?.replace(/\$\s?|(,*)/g, "")?.replace("đ", "")
              }
              disabled
            />
          </Form.Item>
        </div>
        <div className="flex-1"></div>
      </div>

      {action !== "create" && (
        <>
          <Form.Item label={`Trạng thái`} name={"Status"} rules={[]}>
            <Select
              allowClear
              mode="single"
              showSearch
              optionFilterProp="children"
              disabled
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
          {data?.Status === FIELD_STATUS.reject && (
            <Form.Item label={`Lý do từ chối`} name={"RejectReason"}>
              <Input />
            </Form.Item>
          )}
        </>
      )}
    </div>
  );
};

export default FormItems;
