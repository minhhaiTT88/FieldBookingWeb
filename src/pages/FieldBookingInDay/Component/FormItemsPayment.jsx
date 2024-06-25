import { DatePicker, Form, Input, InputNumber, Modal, Select } from "antd";
import { formatPrice, parserPrice, useGlobalConst } from "../../../utils/constData";
import { useSelector } from "react-redux";
import Invoice from "../../../components/element/Invoice";

const FormItemsPayment = ({ formInstance, action, data }) => {
  const globalConst = useGlobalConst();
  const allCode = useSelector((state) => state.allcodeReducer.ALLCODE);

  const onChangePaymentType = (value) => {
    console.log(value);
    formInstance.setFieldValue(["Bill", "PaymentMethod"], value);
  };

  const onChangeDiscount = (value) => {
    console.log(value);
    const total = formInstance.getFieldValue(["Bill", "Total"]) || 0;
    formInstance.setFieldValue(["Bill", "Discount"], value);
    formInstance.setFieldValue(["Bill", "TotalBeforeDiscount"], total - value);
  };

  const onChangeFee = (value) => {
    console.log(value);
    const total = formInstance.getFieldValue("TotalBeforeDiscount") || 0;

    formInstance.setFieldValue(["Bill", "Fee"], total - value);
  };

  return (
    <div className="field-list">
      <Form.Item name={"FieldBookingId"} hidden />
      <Form.Item name={"CustomerId"} hidden />
      <Form.Item name={"Bill"} hidden />
      <div className="flex flex-nowrap gap-4">
        <div className="flex-1">
          <div className="flex flex-col gap-4">
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
                <Form.Item
                  label={`Ngày đặt sân`}
                  name={"BookingDate"}
                  {...globalConst.ANT.FORM.ITEM.PARSER.DATE_DATABASE}
                  rules={[]}
                >
                  <DatePicker
                    disabled
                    format={globalConst.ANT.LOCALE.dateFormat}
                    placeholder="dd/MM/yyyy"
                  />
                </Form.Item>
              </div>
              <div className="flex-1">
                <Form.Item label={`Sân`} name={"FieldName"}>
                  <Input disabled />
                </Form.Item>
              </div>
            </div>
            <div className="flex flex-nowrap gap-4">
              <div className="flex-1">
                <Form.Item label={`Khung giờ`} name={"TimeSlotText"}>
                  <Input disabled />
                </Form.Item>
              </div>
              <div className="flex-1">
                <Form.Item label={`Tổng tiền`} name={"FieldPrice"} rules={[]}>
                  <InputNumber
                    formatter={formatPrice}
                    parser={parserPrice}
                    disabled
                  />
                </Form.Item>
              </div>
            </div>
            <div className="flex flex-nowrap gap-4">
              <div className="flex-1">
                <Form.Item label={`Tiền cọc`} name={"Deposit"} rules={[]}>
                  <InputNumber
                    disabled
                    formatter={formatPrice}
                    parser={parserPrice}
                  />
                </Form.Item>
              </div>
              <div className="flex-1">
                <Form.Item
                  label={`Số tiền cần thanh toán`}
                  name={"CashMustPay"}
                  rules={[]}
                >
                  <InputNumber
                    formatter={formatPrice}
                    parser={parserPrice}
                    disabled
                  />
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
                formatter={formatPrice}
                parser={parserPrice}
              />
            </Form.Item>
            <Form.Item label={`Phí`} name={"Fee"}>
              <InputNumber
                onChange={onChangeFee}
                min={0}
                formatter={formatPrice}
                parser={parserPrice}
              />
            </Form.Item>
          </div>
        </div>
        <div className="flex-1">
          <Form.Item
            shouldUpdate={(prevValues, currentValues) =>
              prevValues.Bill !== currentValues.Bill
            }
          >
            {({ getFieldValue }) => {
              const _billInfo = getFieldValue("Bill");
              return <Invoice data={_billInfo} />;
            }}
          </Form.Item>
        </div>
      </div>
    </div>
  );
};

export default FormItemsPayment;
