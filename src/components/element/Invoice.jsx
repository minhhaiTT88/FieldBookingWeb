import moment from "moment";
import { formatNumberVND } from "../../utils/convertData";
import { useSelector } from "react-redux";
import logo from "../../assets/image/logo.png";

const Invoice = ({ data }) => {
  console.log(data);
  const allCode = useSelector((state) => state.allcodeReducer.ALLCODE);

  const getPaymentMethodText = (value) => {
    return (
      allCode?.find(
        (e) =>
          e.Cdname === "BILL" && e.Cdtype === "PAY_TYPE" && e.Cdval == value
      )?.Content || ""
    );
  };

  return (
    <div className="w-[420px] mx-auto p-6 bg-white rounded shadow-sm my-6">
      <div className="grid grid-cols-2 items-center">
        <div>
          {/*  Company logo  */}
          <img
            src={logo}
            alt="company-logo"
            height={100}
            width={100}
          />
        </div>
        <div className="text-right">
          <p className="text-base font-bold">Hóa đơn</p>
          <p className="text-gray-500 text-sm">Sân bóng thủy lợi</p>
          <p className="text-gray-500 text-sm mt-1">0867123459</p>
          <p className="text-gray-500 text-sm mt-1">
            tlufootballfield@gmail.com
          </p>
        </div>
      </div>
      {/* Client info */}
      <div className="grid grid-cols-2 items-center mt-8">
        <div>
          <p className="font-bold text-gray-800">Khách hàng :</p>
          <p className="text-gray-500">{data?.CustomerName}</p>
          <p className="text-gray-500">{data?.PhoneNumber}</p>
        </div>
        <div className="text-right">
          <p className="">
            Mã hóa đơn:
            <span className="text-gray-500">{data?.Code}</span>
          </p>
          <p>
            Ngày tạo:
            <span className="text-gray-500">
              {" "}
              {moment().format("DD/MM/YYYY HH:mm")}
            </span>
          </p>
          <p className="">
            Sân:
            <span className="text-gray-500">{data?.FieldName}</span>
          </p>
        </div>
      </div>
      {/* Invoice Items */}
      <div className="-mx-4 mt-8 flow-root sm:mx-0">
        <table className="min-w-full">
          <colgroup>
            <col className="w-full sm:w-1/2" />
            <col className="sm:w-1/6" />
            <col className="sm:w-1/6" />
            <col className="sm:w-1/6" />
          </colgroup>
          <thead className="border-b border-gray-300 text-gray-900">
            <tr>
              <th
                scope="col"
                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
              >
                Sản phẩm
              </th>
              <th
                scope="col"
                className="hidden px-3 py-3.5 text-right text-sm font-semibold text-gray-900 sm:table-cell"
              >
                Số lượng
              </th>
              <th
                scope="col"
                className="hidden px-3 py-3.5 text-right text-sm font-semibold text-gray-900 sm:table-cell"
              >
                Giá
              </th>
              <th
                scope="col"
                className="py-3.5 pl-3 pr-4 text-right text-sm font-semibold text-gray-900 sm:pr-0"
              >
                Thành tiền
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.BillDetails?.map((item, k) => (
              <tr className="border-b border-gray-200" key={k}>
                <td className="max-w-0 py-1 pl-4 pr-3 text-sm sm:pl-0">
                  <div className="font-medium text-gray-900">
                    {item.ProductName}
                  </div>
                  <div className="mt-1 text-gray-500">{item.Description}</div>
                </td>
                <td className="hidden px-3 py-1 text-right text-sm text-gray-500 sm:table-cell">
                  {item.Count}
                </td>
                <td className="hidden px-3 py-1 text-right text-sm text-gray-500 sm:table-cell">
                  {formatNumberVND(item.Price)}
                </td>
                <td className="py-1 pl-3 pr-4 text-right text-sm text-gray-500 sm:pr-0">
                  {formatNumberVND(item.Price)}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th
                scope="row"
                colSpan={3}
                className="hidden pl-4 pr-3 pt-6 text-right text-sm font-normal text-gray-500 sm:table-cell sm:pl-0"
              >
                Phương thức thanh toán
              </th>
              <td className="pl-3 pr-6 pt-6 text-right text-sm text-gray-500 sm:pr-0">
                {getPaymentMethodText(data?.PaymentMethod)}
              </td>
            </tr>
            <tr>
              <th
                scope="row"
                colSpan={3}
                className="hidden pl-4 pr-3 pt-6 text-right text-sm font-normal text-gray-500 sm:table-cell sm:pl-0"
              >
                Tổng giá trị
              </th>
              <td className="pl-3 pr-6 pt-6 text-right text-sm text-gray-500 sm:pr-0">
                {formatNumberVND(data?.Total)}
              </td>
            </tr>
            <tr>
              <th
                scope="row"
                colSpan={3}
                className="hidden pl-4 pr-3 pt-4 text-right text-sm font-normal text-gray-500 sm:table-cell sm:pl-0"
              >
                Phí dịch vụ
              </th>

              <td className="pl-3 pr-6 pt-4 text-right text-sm text-gray-500 sm:pr-0">
                {formatNumberVND(data?.Fee)}
              </td>
            </tr>
            <tr>
              <th
                scope="row"
                colSpan={3}
                className="hidden pl-4 pr-3 pt-4 text-right text-sm font-normal text-gray-500 sm:table-cell sm:pl-0"
              >
                Chiết khấu
              </th>
              <td className="pl-3 pr-6 pt-4 text-right text-sm text-gray-500 sm:pr-0">
                {formatNumberVND(data?.Discount)}
              </td>
            </tr>
            <tr>
              <th
                scope="row"
                colSpan={3}
                className="hidden pl-4 pr-3 pt-4 text-right text-sm font-semibold text-gray-900 sm:table-cell sm:pl-0"
              >
                Tổng tiền
              </th>

              <td className="pl-3 pr-4 pt-4 text-right text-sm font-semibold text-gray-900 sm:pr-0">
                {formatNumberVND(data?.TotalBeforeDiscount)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
      <div className="w-full">
        <div>
          {/*  Company logo  */}
          <img
            className="m-auto"
            src="https://quickchart.io/qr?text=BarcodesInc&size=200"
            alt="company-logo"
            height={200}
            width={200}
          />
        </div>
      </div>
    </div>
  );
};

export default Invoice;
