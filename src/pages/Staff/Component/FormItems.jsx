import { DatePicker, Form, Input, InputNumber, Select } from "antd";
import { useGlobalConst } from "../../../utils/constData";
import { useSelector } from "react-redux";

const FormItems = ({ formInstance, action, data }) => {
  const globalConst = useGlobalConst();
  const allCode = useSelector((state) => state.allcodeReducer.ALLCODE);

  return (
    <div className="field-list">
      <Form.Item name={"StaffId"} hidden>
        <Input autoComplete="off" hidden />
      </Form.Item>
      <Form.Item
        label={`Họ và tên`}
        name={"StaffName"}
        rules={[globalConst.ANT.FORM.RULES.yeuCauNhap]}
      >
        <Input autoComplete="off" />
      </Form.Item>

      <Form.Item
        label={`Số điện thoại`}
        name={"PhoneNumber"}
        rules={[globalConst.ANT.FORM.RULES.yeuCauNhap, globalConst.ANT.FORM.RULES.soDienThoai]}
      >
        <Input autoComplete="off" />
      </Form.Item>

      <Form.Item
        label={`Số CMND/CCCD`}
        name={"IdentityNumber"}
        rules={[globalConst.ANT.FORM.RULES.yeuCauNhap]}
      >
        <Input autoComplete="off" maxLength={11} />
      </Form.Item>

      <Form.Item
        label={`Ngày sinh`}
        name={"Birthofdate"}
        {...globalConst.ANT.FORM.ITEM.PARSER.DATE_DATABASE}
        rules={[globalConst.ANT.FORM.RULES.yeuCauNhap]}
      >
        <DatePicker format={globalConst.ANT.LOCALE.dateFormat} placeholder="dd/MM/yyyy" />
      </Form.Item>

      <Form.Item
        label={`Giới tính`}
        name={"Sex"}
        {...globalConst.ANT.FORM.ITEM.SELECT.FORMAT_SELECT}
        rules={[globalConst.ANT.FORM.RULES.yeuCauNhap]}
      >
        <Select allowClear mode="single" showSearch optionFilterProp="children">
          {allCode
            ?.filter((e) => e.Cdname === "STAFF" && e.Cdtype === "SEX")
            .map((item, key) => (
              <Option key={key} value={item.Cdval}>
                {item.Content}
              </Option>
            ))}
        </Select>
      </Form.Item>
      <Form.Item
        label={`Lương`}
        name={"Salary"}
        rules={[
          globalConst.ANT.FORM.RULES.yeuCauNhap,
          globalConst.ANT.FORM.RULES.soLonHonKhong,
        ]}
      >
        <InputNumber
          formatter={(value) =>
            `${value}đ`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          }
          parser={(value) =>
            value?.replace(/\$\s?|(,*)/g, "")?.replace("đ", "")
          }
        />
      </Form.Item>
      <Form.Item
        label={`Vị trí làm việc`}
        name={"StaffPosition"}
        rules={[globalConst.ANT.FORM.RULES.yeuCauNhap]}
      >
        <Input autoComplete="off" />
      </Form.Item>

      {/* <Form.Item label={`Trạng thái`} name={"Status"} rules={[]}>
        <Select allowClear mode="single" showSearch optionFilterProp="children">
          {allCode
            ?.filter((e) => e.Cdname === "STAFF" && e.Cdtype === "STATUS")
            .map((item, key) => (
              <Option key={key} value={item.Cdval}>
                {item.Content}
              </Option>
            ))}
        </Select>
      </Form.Item> */}
    </div>
  );
};

export default FormItems;
