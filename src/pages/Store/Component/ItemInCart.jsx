import { faPlus, faSubtract, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, InputNumber } from "antd";
import React, { useEffect, useState } from "react";
import { formatNumberV2 } from "../../../utils/convertData";

const ItemInCart = ({ item, onPlus, onSubTract, onRemove, onUpdateCount }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    //set lại dữ liệu của thẻ input số lượng sau khi có thay đổi
    setCount(item?.Count);
  }, [item]);

  const handleInputCount = (value) => {
    if (value && value != null) {
      //lấy kết quả của hàm cập nhật số lượng trong giỏ hàng
      const result = onUpdateCount(item, value);
      if (result === -1) {
        //Số lượng nhập vào vượt quá số lượng trong kho thì sẽ báo lỗi
        //set count trong thẻ nhập về dữ liệu cũ
        setCount(item.Count);
      } else {
        setCount(value);
      }
    }
  };

  return (
    <>
      <div className="flex items-center justify-between gap-4 border">
        <div>{item.ProductName}</div>
        <div className="flex items-center">
          <Button
            type="text"
            onClick={(event) => onSubTract(item)}
            icon={<FontAwesomeIcon icon={faSubtract} />}
          />
          <InputNumber
            min={1}
            controls={false}
            className="w-16 text-center"
            value={count}
            onChange={handleInputCount}
          />
          <Button
            type="text"
            onClick={(event) => onPlus(item)}
            icon={<FontAwesomeIcon icon={faPlus} />}
          />
        </div>
        <div className="text-right">{formatNumberV2(item.Total)}đ</div>
        <div>
          <Button
            type="text"
            icon={<FontAwesomeIcon icon={faTrash} onClick={(envet) => onRemove(item)} />}
          />
        </div>
      </div>
    </>
  );
};
export default ItemInCart;
