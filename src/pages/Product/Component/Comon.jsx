import { PriceFormatter, formatDate, formatNumber } from "../../../utils/convertData";
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
      field: "ProductName",
      headerName: "Tên sản phẩm",
      width: 300,
    },
    // {
    //   field: "StatusText",
    //   headerName: "Trạng thái",
    // },
    {
      field: "Price",
      headerName: "Giá",
      valueFormatter: PriceFormatter,
      width: 250,
    },

    {
      field: "Count",
      headerName: "Số lượng",
      cellRenderer: (data) => {
        return formatNumber(data.value);
      },
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
                      content: "Bạn có chắc chắn muốn xóa sản phẩm này?",
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
