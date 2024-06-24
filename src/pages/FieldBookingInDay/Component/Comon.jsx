import { PriceFormatter, formatDate } from "../../../utils/convertData";
import { Button, Form, Input, Modal, Tooltip } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCancel,
  faCashRegister,
  faCheck,
  faEye,
  faPencil,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { faMarkdown } from "@fortawesome/free-brands-svg-icons";
import { useState } from "react";
import { useGlobalConst } from "../../../utils/constData";
import { toast } from "react-toastify";
import { useForm } from "antd/es/form/Form";

export const FIELD_STATUS = {
  pending: "P",
  approved: "A",
  done: "D",
  leave_deposit: "L",
  reject: "X",
};

export const PAYMENT_TYPE = {
  card: "CARD",
  cash: "CASH",
};

export const columFieldBookingDefs = ({
  ShowModal,
  HandleDelete,
  HandleUpdateStatus,
}) => {
  const [form] = useForm();

  const showConfirm = (data, newStatus) => {
    const globalConst = useGlobalConst();
    var actionText = "";
    if (newStatus == FIELD_STATUS.approved) {
      actionText = "duyệt";
    } else if (newStatus == FIELD_STATUS.reject) {
      actionText = "từ chối";
    }
    Modal.confirm({
      title: `Xác nhận ${actionText} đơn đặt sân`,
      content: (
        <>
          <div>
            Bạn có muốn {actionText} đơn đặt sân [{data.FieldName}], khung giờ [
            {formatDate(data.TimeFrom, "hh:mm")}-
            {formatDate(data.TimeTo, "hh:mm")}], ngày{" "}
            {formatDate(data.BookingDate, "dd/MM/yyyy")} của khách hàng [
            {data.CustomerName}].
          </div>
          {newStatus == FIELD_STATUS.reject && (
            <Form className="mt-5" form={form}>
              <div className="field-list">
                <Form.Item
                  label={`Lý do từ chối`}
                  name={"rejectReason"}
                  rules={[globalConst.ANT.FORM.RULES.yeuCauNhap]}
                >
                  <Input placeholder="-- nhập lý do --" />
                </Form.Item>
              </div>
            </Form>
          )}
        </>
      ),
      onOk() {
        const { rejectReason } = form.getFieldsValue();
        if (
          (!rejectReason || rejectReason?.length == 0) &&
          newStatus == FIELD_STATUS.reject
        ) {
          toast.error("Lý do từ chối không được để trống");
          return Promise.reject("Input is required");
        } else {
          HandleUpdateStatus(data.FieldBookingId, newStatus, rejectReason);
        }
      },
    });
  };

  return [
    {
      field: "Code",
      headerName: "Mã đơn",
      width: 200,
    },
    {
      field: "StatusText",
      headerName: "Trạng thái",
      cellRenderer: (e) => {
        if (e.data.Status == FIELD_STATUS.pending) {
          return (
            <div>
              <span className="rounded-pill text-light-yellow">{e.value}</span>
            </div>
          );
        } else if (e.data.Status == FIELD_STATUS.approved) {
          return (
            <div>
              <span className="rounded-pill text-light-green">{e.value}</span>
            </div>
          );
        } else if (e.data.Status == FIELD_STATUS.reject) {
          return (
            <div>
              <span className="rounded-pill text-light-red">{e.value}</span>
            </div>
          );
        } else if (e.data.Status == FIELD_STATUS.done) {
          return (
            <div>
              <span className="rounded-pill text-light-blue">{e.value}</span>
            </div>
          );
        } else {
          return <p>{e.value}</p>;
        }
      },
      width: 150,
    },
    {
      field: "FieldName",
      headerName: "Tên sân",
      width: 100,
    },
    {
      field: "CustomerName",
      headerName: "Tên khách hàng",
      width: 180,
    },
    {
      field: "BookingDate",
      headerName: "Ngày đặt",
      width: 250,
      cellRenderer: (data) => {
        return formatDate(data.value, "dd/MM/yyyy");
      },
    },
    {
      field: "TimeSlotText",
      headerName: "Khung giờ",
      width: 250,
    },
    {
      field: "Deposit",
      headerName: "Đã cọc",
      valueFormatter: PriceFormatter,
      width: 250,
    },
    {
      field: "CreatedDate",
      headerName: "Ngày tạo",
      width: 250,
      cellRenderer: (data) => {
        return formatDate(data.value, "dd/MM/yyyy");
      },
    },
    {
      headerName: "Chức năng",
      pinned: "right",
      width: 230,
      suppressSizeToFit: true,
      resizable: false,
      cellRenderer: (e) => {
        return (
          <>
            <div className="ag-cell-actions">
              <Tooltip placement="top" title="Xem chi tiết">
                <Button
                  type="actions"
                  onClick={() => {
                    ShowModal && ShowModal(e.data, "detail");
                  }}
                  icon={<FontAwesomeIcon icon={faEye} />}
                />
              </Tooltip>
              <Tooltip placement="top" title="Duyệt">
                <Button
                  type="actions"
                  disabled={!(e.data.Status == FIELD_STATUS.pending)}
                  onClick={() => {
                    showConfirm(e.data, FIELD_STATUS.approved);
                  }}
                  icon={<FontAwesomeIcon icon={faCheck} />}
                />
              </Tooltip>
              <Tooltip placement="top" title="Từ chối">
                <Button
                  type="actions"
                  disabled={!(e.data.Status == FIELD_STATUS.pending)}
                  onClick={() => {
                    showConfirm(e.data, FIELD_STATUS.reject);
                  }}
                  icon={<FontAwesomeIcon icon={faCancel} />}
                />
              </Tooltip>
              <Tooltip placement="top" title="Thanh toán">
                <Button
                  type="actions"
                  disabled={e.data.Status !== FIELD_STATUS.approved}
                  onClick={() => {
                    ShowModal && ShowModal(e.data, "payment");
                  }}
                  icon={<FontAwesomeIcon icon={faCashRegister} />}
                />
              </Tooltip>
              <Tooltip placement="top" title="Cập nhật">
                <Button
                  type="actions"
                  disabled={!(e.data.Status == FIELD_STATUS.pending)}
                  onClick={() => {
                    ShowModal && ShowModal(e.data, "update");
                  }}
                  icon={<FontAwesomeIcon icon={faPencil} />}
                />
              </Tooltip>
              <Tooltip placement="top" title="Xóa">
                <Button
                  type="actions"
                  disabled={e.data.Status != FIELD_STATUS.reject}
                  onClick={() => {
                    Modal.confirm({
                      title: "Xác nhận",
                      content: "Bạn có chắc chắn muốn xóa đơn đặt sân này?",
                      okText: "Xác nhận",
                      cancelText: "Đóng",
                      centered: true,
                      onOk: () => {
                        HandleDelete && HandleDelete(e.data);
                      },
                    });
                  }}
                  icon={<FontAwesomeIcon icon={faTrash} />}
                />
              </Tooltip>
            </div>
          </>
        );
      },
    },
  ];
};
