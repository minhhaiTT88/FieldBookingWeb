import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  TimePicker,
} from "antd";
import { useGlobalConst } from "../../../utils/constData";
import { useSelector } from "react-redux";
import TextArea from "antd/es/input/TextArea";
import { AgGridReact } from "ag-grid-react";
import { CheckboxRenderer, columTimeSlotList } from "./Comon";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import moment from "moment";

const { RangePicker } = TimePicker;

const FormItems = ({ formInstance, action, data }) => {
  const globalConst = useGlobalConst();
  const allCode = useSelector((state) => state.allcodeReducer.ALLCODE);

  const columns = columTimeSlotList();

  const generateTimeSlots = (
    startTime,
    endTime,
    breakMinutes,
    matchDurationMinutes
  ) => {
    const slots = [];
    const [startHour, startMinute] = startTime.split(":").map(Number);
    const [endHour, endMinute] = endTime.split(":").map(Number);

    let currentTime = moment();
    currentTime.set({
      hour: startHour,
      minute: startMinute,
    });

    let TimeTo = moment();
    TimeTo.set({
      hour: endHour,
      minute: endMinute,
    });

    var i = 0;
    while (currentTime < TimeTo) {
      let start = moment(currentTime);
      let end = moment(currentTime);

      // cộng thêm số phút của một trận
      end.add(matchDurationMinutes, "minutes");

      // nếu thời gian kết thúc trận này mà lớn hơn thời gian đóng sân thì bỏ
      if (end.isAfter(TimeTo)) break;

      slots.push({
        TimeFrom: start,
        TimeFromStr: start.format("HH:mm"),
        TimeTo: end,
        TimeToStr: end.format("HH:mm"),
        Price: 700000,
        Enable: true,
        Position: i,
      });

      //tăng thời gian lặp lên 1 trận + thời gian nghỉ giữa trận
      currentTime = moment(currentTime).add(
        matchDurationMinutes + breakMinutes,
        "minutes"
      );
      i++;
    }
    return slots;
  };

  const handleGenTimeSlot = () => {
    const { OpeningTime, BreakTime, TimeOfSlot } =
      formInstance.getFieldsValue();

    if (OpeningTime == null) {
      toast.error("Thời gian mở sân trong ngày không được để trống!");
      return;
    } else if (BreakTime == null) {
      toast.error("Thời gian nghỉ giữa giờ là số phút lớn hơn hoặc bằng 0!");
      return;
    } else if (TimeOfSlot == null || TimeOfSlot < 60) {
      toast.error(
        "Thời gian của một khung giờ là số phút lớn hơn hoặc bằng 60!"
      );
      return;
    }

    const listTimeSlot = generateTimeSlots(
      OpeningTime[0].format("HH:mm"),
      OpeningTime[1].format("HH:mm"),
      BreakTime,
      TimeOfSlot
    );

    if (listTimeSlot.length > 0) {
      Modal.confirm({
        title: "Cảnh báo",
        content:
          "Danh sách khung giờ hiện tại sẽ bị ghi đèn, bạn có chắc chắn muốn tạo thực hiện?",
        okText: "Xác nhận",
        cancelText: "Đóng",
        centered: true,
        onOk: () => {
          formInstance.setFieldValue("TimeSlots", listTimeSlot);
          setListTimeSlot(listTimeSlot);
        },
      });
    } else {
      formInstance.setFieldValue("TimeSlots", listTimeSlot);
    }
  };

  const onStopEditting = (event) => {
    let rowData = [];
    event.api.forEachNode((node) => {
      const convertObj = {
        ...node.data,
      };
      rowData.push(convertObj);
    });
    setListTimeSlot(rowData);
    formInstance.setFieldValue("TimeSlots", rowData);
  };

  return (
    <div className="field-list">
      <Form.Item name={"FieldId"} hidden></Form.Item>
      <Form.Item name={"TimeSlots"} hidden></Form.Item>

      <Form.Item
        label={`Tên sân`}
        name={"FieldName"}
        rules={[globalConst.ANT.FORM.RULES.yeuCauNhap]}
      >
        <Input autoComplete="off" />
      </Form.Item>

      <Form.Item
        label={`Trạng thái`}
        name={"Status"}
        {...globalConst.ANT.FORM.ITEM.SELECT.FORMAT_SELECT}
        rules={[]}
      >
        <Select allowClear mode="single" showSearch optionFilterProp="children">
          {allCode
            ?.filter((e) => e.Cdname === "FIELD" && e.Cdtype === "STATUS")
            .map((item, key) => (
              <Option key={key} value={item.Cdval}>
                {item.Content}
              </Option>
            ))}
        </Select>
      </Form.Item>

      <Form.Item label={`Mô tả`} name={"Description"} rules={[]}>
        <TextArea rows={4} />
      </Form.Item>

      <div className="pb-4">
        <div className="w-full flex justify-between py-3">
          <h3 className="text-base font-bold">Danh sách khung giờ</h3>
          <Button onClick={handleGenTimeSlot}>Tạo khung giờ</Button>
        </div>
        <div className="flex gap-4">
          <Form.Item label={`Giờ mở sân trong ngày`} name="OpeningTime">
            <RangePicker format="HH:mm" />
          </Form.Item>
          <Form.Item
            label={`Thời gian nghỉ giữa giờ (phút)`}
            name={"BreakTime"}
          >
            <InputNumber min={0} />
          </Form.Item>
          <Form.Item
            label={`Thời gian một khung giờ (phút)`}
            name={"TimeOfSlot"}
            rules={[]}
          >
            <InputNumber />
          </Form.Item>
        </div>
        <Form.Item
          shouldUpdate={(prevValues, currentValues) =>
            prevValues.TimeSlots !== currentValues.TimeSlots
          }
        >
          {({ getFieldValue }) => {
            const listTimeSlot = getFieldValue("TimeSlots");
            return (
              <div
                className="ag-theme-quartz"
                style={{ height: 300, width: "100%" }}
              >
                <AgGridReact
                  rowData={listTimeSlot}
                  columnDefs={columns}
                  frameworkComponents={{ checkboxRenderer: CheckboxRenderer }}
                  defaultColDef={{
                    flex: 1,
                    minWidth: 100,
                    editable: true,
                    sortable: true,
                    filter: false,
                    resizable: false,
                  }}
                  editType="fullRow"
                  stopEditingWhenCellsLoseFocus={true}
                  onCellValueChanged={onStopEditting}
                />
              </div>
            );
          }}
        </Form.Item>
      </div>
    </div>
  );
};

export default FormItems;
