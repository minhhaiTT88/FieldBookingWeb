import { PriceFormatter, formatDate } from "../../../utils/convertData";
import { Button, Modal, Tooltip } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";

export const STAFF_STATUS = {
  dangLamViec: "A",
  daNghiViec: "B",
};

export const columStaffDefs = ({ ShowModal, HandleDelete }) => {
  return [
    {
      field: "Code",
      headerName: "Mã hóa đơn",
      width: 300,
    },
    {
      field: "CustomerName",
      headerName: "Tên khách hàng",
      width: 250,
    },
    {
      field: "FieldName",
      headerName: "Sân",
      width: 250,
    },
    {
      field: "DateCheckout",
      headerName: "Ngày thanh toán",
      width: 300,
      cellRenderer: (data) => {
        return formatDate(data.value, "dd/MM/yyyy HH:mm:ss");
      },
    },
    {
      field: "PaymentMethodText",
      headerName: "Phương thức thanh toán",
      width: 250,
    },
    {
      field: "Fee",
      headerName: "Phí dịch vụ",
      valueFormatter: PriceFormatter,
      width: 250,
    },
    {
      field: "Total",
      headerName: "Thành tiền",
      valueFormatter: PriceFormatter,
      width: 250,
    },
    {
      field: "Discount",
      headerName: "Chiết khấu",
      valueFormatter: PriceFormatter,
      width: 250,
    },
    {
      field: "TotalBeforeDiscount",
      headerName: "Tổng tiền sau giảm giá",
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
      field: "CreatedBy",
      headerName: "Người tạo",

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
            </div>
          </>
        );
      },
    },
  ];
};
