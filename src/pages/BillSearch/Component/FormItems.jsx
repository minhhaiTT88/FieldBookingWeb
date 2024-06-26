import { DatePicker, Form, Input, InputNumber, Select } from "antd";
import {
  formatPrice,
  parserPrice,
  useGlobalConst,
} from "../../../utils/constData";
import { useSelector } from "react-redux";
import Invoice from "../../../components/element/Invoice";

const FormItems = ({ formInstance, action, data }) => {
  const globalConst = useGlobalConst();
  const allCode = useSelector((state) => state.allcodeReducer.ALLCODE);

  return (
    <div className="field-list">
      <Form.Item name={"Bill"} hidden/>
      <Form.Item
        shouldUpdate={(prevValues, currentValues) =>
          prevValues.Bill !== currentValues.Bill
        }
      >
        {({ getFieldValue }) => {
          const _billInfo = getFieldValue("Bill");
          console.log(_billInfo)
          return <Invoice data={_billInfo} />;
        }}
      </Form.Item>
    </div>
  );
};

export default FormItems;
