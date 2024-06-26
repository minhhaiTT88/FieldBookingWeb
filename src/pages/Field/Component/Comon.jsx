import {
  PriceFormatter,
  formatDate,
  formatNumber,
} from "../../../utils/convertData";
import { Button, Checkbox, Modal, Tooltip } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faListCheck,
  faPencil,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import { useNavigate } from "react-router-dom";

export const STAFF_STATUS = {
  dangLamViec: "A",
  daNghiViec: "B",
};

export const columFieldDefs = ({ ShowModal, HandleDelete }) => {
  const navigate = useNavigate();
  return [
    {
      field: "FieldName",
      headerName: "Tên sân",
      width: 300,
    },
    {
      field: "StatusText",
      headerName: "Trạng thái",
      width: 300,
    },
    {
      field: "Description",
      headerName: "Mô tả",
    },
    // {
    //   field: "Position",
    //   headerName: "Vị trí",
    //   width: 100,
    // },
    {
      field: "CreatedDate",
      headerName: "Ngày tạo",
      width: 250,
      cellRenderer: (data) => {
        return formatDate(data.value, "dd/MM/yyyy");
      },
    },
    {
      field: "CreatedBy",
      headerName: "Người tạo",

      width: 250,
    },
    {
      field: "ModifiedDate",
      headerName: "Ngày cập nhật cuối cùng",
      width: 250,
      cellRenderer: (data) => {
        return formatDate(data.value, "dd/MM/yyyy");
      },
    },
    {
      field: "ModifiedBy",
      headerName: "Người cập nhật cuối cùng",
      width: 250,
    },
    {
      headerName: "Chức năng",
      pinned: "right",
      width: 250,
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
                >
                  <FontAwesomeIcon icon={faEye} color="#999" />
                </Button>
              </Tooltip>
              <Tooltip placement="top" title="Cập nhật">
                <Button
                  type="actions"
                  onClick={() => {
                    ShowModal && ShowModal(e.data, "update");
                  }}
                >
                  <FontAwesomeIcon icon={faPencil} color="#999" />
                </Button>
              </Tooltip>
              <Tooltip placement="top" title="Xóa">
                <Button
                  type="actions"
                  onClick={() => {
                    Modal.confirm({
                      title: "Xác nhận",
                      content: "Bạn có chắc chắn muốn xóa sân bóng này?",
                      okText: "Xác nhận",
                      cancelText: "Đóng",
                      centered: true,
                      onOk: () => {
                        HandleDelete && HandleDelete(e.data);
                      },
                    });
                  }}
                >
                  <FontAwesomeIcon icon={faTrash} color="#999" />
                </Button>
              </Tooltip>
            </div>
          </>
        );
      },
    },
  ];
};

export const columTimeSlotList = () => {
  return [
    {
      headerName: "Giờ bắt đầu",
      field: "TimeFrom",
      editable: false,
      cellRenderer: (param) => {
        return moment(param.value).format("HH:mm");
      },
    },
    {
      headerName: "Giờ kết thúc",
      field: "TimeTo",
      editable: false,
      cellRenderer: (param) => {
        return moment(param.value).format("HH:mm");
      },
    },
    {
      headerName: "Giá",
      field: "Price",
      editable: true,
      valueFormatter: PriceFormatter,
      valueParser: (params) => {
        return parseInt(params.newValue.toString().replace(/[^\d]/g, ""), 10);
      },
    },
    {
      headerName: "Sử dụng",
      field: "Enable",
      editable: true,
      // cellRenderer: "checkboxRenderer",
      cellRendererParams: {
        checkbox: true,
      },
      cellRenderer: (param) => {
        return <Checkbox checked={param.value} disabled />;
      },
    },
  ];
};

export const CheckboxRenderer = (params) => {
  return (
    <Checkbox
      checked={params.value}
      onChange={() => {
        params.node.setDataValue(params.colDef.field, !params.value);
      }}
    />
  );
};
