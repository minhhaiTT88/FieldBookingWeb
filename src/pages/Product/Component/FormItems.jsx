import {
  Button,
  DatePicker,
  Form,
  Image,
  Input,
  InputNumber,
  Select,
  Upload,
} from "antd";
import { useGlobalConst } from "../../../utils/constData";
import { useSelector } from "react-redux";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { getBase64 } from "../../../utils/convertData";
import { isBase64 } from "../../../utils/commonFunction";

const FormItems = ({ formInstance, action }) => {
  const globalConst = useGlobalConst();
  const allCode = useSelector((state) => state.allcodeReducer.ALLCODE);

  const handleChange = ({ file: newFile, fileList: newFileList }) => {
    formInstance.setFieldValue("ImageFile", newFile);
  };

  const customRequest = async (options) => {
    const { onSuccess, onError, file, onProgress } = options;

    getBase64(file, (data) => {
      if (data) {
        formInstance.setFieldValue("ImagePreview", data);
        file.preview = data;
        onSuccess("Ok");
      } else {
        onError();
      }
    });
  };
  const props_btn_upload = {
    accept: "image/*",
    showUploadList: false,
    customRequest: customRequest,
    onChange: handleChange,
  };
  const validateFileattach = async (rule, value) => {
    if (!value) {
      throw new Error("Không được để trống");
    }
  };
  return (
    <div className="field-list">
      <Form.Item name={"ProductId"} hidden />
      <Form.Item name={"ImageFile"} hidden />
      <Form.Item name={"ImageUrl"} hidden />
      <Form.Item name={"ImagePreview"} hidden />

      <Form.Item
        label={`Hình ảnh`}
        name={"Image"}
        rules={
          [
            // // {
            // //   validator: validateFileattach,
            // // },
            // { required: true, message: "" },
          ]
        }
      >
        <div className="w-full flex flex-col items-center">
          <Form.Item
            shouldUpdate={(prevValues, currentValues) =>
              prevValues.ImagePreview !== currentValues.ImagePreview ||
              prevValues.ImageUrl !== currentValues.ImageUrl
            }
          >
            {({ getFieldValue, getFieldsValue }) => {
              const { ImagePreview, ImageUrl } = getFieldsValue();
              var urlPreview =
                "https://t4.ftcdn.net/jpg/04/81/13/43/360_F_481134373_0W4kg2yKeBRHNEklk4F9UXtGHdub3tYk.jpg";

              if (ImagePreview) {
                if (ImagePreview?.includes("base64")) {
                  urlPreview = ImagePreview;
                }
              } else {
                urlPreview =
                  import.meta.env.VITE_FIELDBOOKING_SERVICE + ImageUrl;
              }

              return (
                <div className="w-[300px] h-[300px] overflow-hidden border border-px rounded-xl mb-4">
                  <img
                    className="w-full h-full object-cover"
                    src={urlPreview}
                  />
                </div>
              );
            }}
          </Form.Item>
          {action != "detail" && (
            <Form.Item
              shouldUpdate={(prevValues, currentValues) =>
                prevValues.ImageFile !== currentValues.ImageFile
              }
            >
              {({ getFieldValue }) => {
                const image = [getFieldValue("ImageFile")];
                var list = image ? [image] : [];

                return (
                  <>
                    <Upload fileList={list} {...props_btn_upload}>
                      <Button icon={<FontAwesomeIcon icon={faUpload} />}>
                        Tải lên
                      </Button>
                    </Upload>
                  </>
                );
              }}
            </Form.Item>
          )}
        </div>
      </Form.Item>
      <Form.Item
        label={`Tên sản phẩm`}
        name={"ProductName"}
        rules={[globalConst.ANT.FORM.RULES.yeuCauNhap]}
      >
        <Input autoComplete="off" />
      </Form.Item>

      <Form.Item
        label={`Giá`}
        name={"Price"}
        rules={[
          globalConst.ANT.FORM.RULES.yeuCauNhap,
          globalConst.ANT.FORM.RULES.soLonHonKhong,
        ]}
      >
        <InputNumber
          formatter={formatPrice}
          parser={parserPrice}
        />
      </Form.Item>

      <Form.Item
        label={`Số lượng`}
        name={"Count"}
        rules={[
          globalConst.ANT.FORM.RULES.yeuCauNhap,
          globalConst.ANT.FORM.RULES.soLonHonKhong,
        ]}
      >
        <InputNumber autoComplete="off" />
      </Form.Item>

      {/* <Form.Item
        label={`Trạng thái`}
        name={"Status"}
        {...globalConst.ANT.FORM.ITEM.SELECT.FORMAT_SELECT}
        rules={[]}
      >
        <Select allowClear mode="single" showSearch optionFilterProp="children">
          {allCode
            ?.filter((e) => e.Cdname === "PRODUCT" && e.Cdtype === "STATUS")
            .map((item, key) => (
              <Option key={key} value={item.Cdval}>
                {item.Content}
              </Option>
            ))}
        </Select>
      </Form.Item> */}

      <Form.Item label={`Mô tả`} name={"Description"} rules={[]}>
        <Input autoComplete="off" />
      </Form.Item>
    </div>
  );
};

export default FormItems;
