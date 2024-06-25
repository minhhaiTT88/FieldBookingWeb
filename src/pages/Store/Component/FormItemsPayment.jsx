import { DatePicker, Form, Input, InputNumber, Modal, Select } from "antd";
import { useGlobalConst } from "../../../utils/constData";
import { useSelector } from "react-redux";
import Invoice from "../../../components/element/Invoice";

const FormItemsPayment = ({ formInstance, action, data }) => {
  const globalConst = useGlobalConst();
  const allCode = useSelector((state) => state.allcodeReducer.ALLCODE);

  const onChangePaymentType = (value) => {
    formInstance.setFieldValue("PaymentMethod", value);
  };

  const onChangeDiscount = (value) => {
    const total = formInstance.getFieldValue("Total") || 0;
    formInstance.setFieldValue("Discount", value);
    formInstance.setFieldValue("TotalBeforeDiscount", total - value);
  };

  const onChangeFee = (value) => {
    const total = formInstance.getFieldValue("TotalBeforeDiscount") || 0;

    formInstance.setFieldValue("Fee", total - value);
  };

  return (
    <div className="field-list">
      <Form.Item name={"BillDetails"} hidden />
      <Form.Item name={"CustomerId"} hidden />
      <Form.Item name={"FieldId"} hidden />
      <Form.Item name={"Total"} hidden />
      <Form.Item name={"Code"} hidden />

      <div className="flex flex-nowrap gap-4">
        <div className="flex-1">
          <div className="flex flex-col gap-4">
            <div className="flex flex-nowrap gap-4">
              <div className="flex-1">
                <Form.Item
                  label={`Số điện thoại`}
                  name={"PhoneNumber"}
                  rules={[]}
                >
                  <Input autoComplete="off" disabled />
                </Form.Item>
              </div>
              <div className="flex-1">
                <Form.Item
                  label={`Tên khách hàng`}
                  name={"CustomerName"}
                  rules={[]}
                >
                  <Input autoComplete="off" disabled />
                </Form.Item>
              </div>
            </div>

            <div className="flex flex-nowrap gap-4">
              <div className="flex-1">
                <Form.Item label={`Sân`} name={"FieldName"}>
                  <Input disabled />
                </Form.Item>
              </div>
            </div>

            <Form.Item
              label={`Phương thức thanh toán`}
              name={"PaymentMethod"}
              rules={[globalConst.ANT.FORM.RULES.yeuCauNhap]}
            >
              <Select
                allowClear
                mode="single"
                showSearch
                optionFilterProp="children"
                onChange={onChangePaymentType}
              >
                {allCode
                  ?.filter(
                    (e) => e.Cdname === "BILL" && e.Cdtype === "PAY_TYPE"
                  )
                  .map((item, key) => (
                    <Option key={key} value={item.Cdval}>
                      {item.Content}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
            <Form.Item label={`Giảm giá`} name={"Discount"}>
              <InputNumber
                onChange={onChangeDiscount}
                min={0}
                formatter={(value) =>
                  `${value}đ`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                parser={(value) =>
                  value?.replace(/\$\s?|(,*)/g, "")?.replace("đ", "")
                }
              />
            </Form.Item>
            <Form.Item label={`Phí`} name={"Fee"}>
              <InputNumber
                onChange={onChangeFee}
                min={0}
                formatter={(value) =>
                  `${value}đ`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                parser={(value) =>
                  value?.replace(/\$\s?|(,*)/g, "")?.replace("đ", "")
                }
              />
            </Form.Item>

            <div className="flex flex-nowrap gap-4">
              <div className="flex-1">
                <Form.Item label={`Tổng tiền`} name={"TotalBeforeDiscount"} rules={[]}>
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
            </div>
          </div>
        </div>
        <div className="flex-1">
          <Form.Item
            shouldUpdate={(prevValues, currentValues) =>
              prevValues.Code !== currentValues.Code
            }
          >
            {({ getFieldValue, getFieldsValue }) => {
              const _billInfo = getFieldsValue();
              return <Invoice data={_billInfo} />;
            }}
          </Form.Item>
        </div>
      </div>
    </div>
  );
};

export default FormItemsPayment;
