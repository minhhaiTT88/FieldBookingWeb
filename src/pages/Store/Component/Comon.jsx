import { Link, useNavigate } from "react-router-dom";
import { formatDate } from "../../../utils/convertData";
import { Button, Tooltip } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faFile, faFolder, faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";

export const StatusPost = {
  PENDING: 0,
  DONE: 1,
  HIDE: 2,
};

export const columPostList = ({ DeletePost }) => {
  const navigate = useNavigate();
  return [
    {
      field: "Name",
      headerName: "Tên sản phẩm",
      cellRenderer: (e) => {
        return (
          <Link
            to={`/quan-ly-bai-viet/quan-ly-file?id=${e.data.Post_Id}&name=${encodeURIComponent(
              e.data.Post_Name
            )}`}
          >
            {e.value}
          </Link>
        );
      },
      width: 300,
    },
    {
      field: "Số lương",
      headerName: "Loại bài viết",

      width: 250,
    },
    {
      field: "Created_Date",
      headerName: "Ngày đăng",
      width: 250,
      cellRenderer: (data) => {
        return formatDate(data.value, "dd/MM/yyyy");
      },
    },
    {
      field: "Created_By",
      headerName: "Người đăng",

      width: 250,
    },
    {
      field: "Modified_Date",
      headerName: "Ngày cập nhật cuối cùng",
      width: 250,
      cellRenderer: (data) => {
        return formatDate(data.value, "dd/MM/yyyy");
      },
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
              <Tooltip placement="top" title="Quản lý file">
                <Button
                  type="actions"
                  onClick={() => {
                    const strEncode = encodeURIComponent(e.data.Post_Name);

                    navigate(
                      `/quan-ly-bai-viet/quan-ly-file?id=${e.data.Post_Id}&name=${strEncode}`
                    );
                  }}
                >
                  <FontAwesomeIcon icon={faFolder} color="#999" />
                </Button>
              </Tooltip>
              <Tooltip placement="top" title="Xem chi tiết">
                <Button
                  type="actions"
                  onClick={() => {
                    navigate(`/quan-ly-bai-viet/bai-viet?id=${e.data.Post_Id}&action=detail`);
                  }}
                >
                  <FontAwesomeIcon icon={faEye} color="#999" />
                </Button>
              </Tooltip>
              <Tooltip placement="top" title="Cập nhật">
                <Button
                  type="actions"
                  onClick={() => {
                    navigate(`/quan-ly-bai-viet/bai-viet?id=${e.data.Post_Id}&action=update`);
                  }}
                >
                  <FontAwesomeIcon icon={faPencil} color="#999" />
                </Button>
              </Tooltip>
              <Tooltip placement="top" title="Xóa">
                <Button
                  type="actions"
                  onClick={() => {
                    DeletePost(e.data.Post_Id);
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
