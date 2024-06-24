import React, { useRef, useEffect, useImperativeHandle, useMemo, useCallback } from "react";

import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { Space } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { formatNumber } from "../../utils/convertData";


ModuleRegistry.registerModules([ClientSideRowModelModule]);

const DataTableV3 = React.forwardRef(
  (
    {
      data,
      columns = [],
      style = {
        height: "calc(100vh - 380px)",
        width: "100%",
        minHeight: "350px",
      },
      onRowDoubleClicked,
      onSelectionChanged,
    },
    ref
  ) => {
    const gridRef = useRef();

    const containerStyle = useMemo(
      () => ({ width: "100%", height: "100%", position: "relative" }),
      []
    );
    const gridStyle = useMemo(() => style, []);

    // Set row data
    const columnDefs = useMemo(() => columns, [columns]);

    const defaultColDef = useMemo(() => ({
      editable: false,
      sortable: true,
      filter: false,
      resizable: true,
      // tooltipComponent: CustomTooltip,
      enableCellChangeFlash: true,
    }));

    useImperativeHandle(ref, () => ({
      onEvent: (data) => {},
    }));

    return (
      <div style={containerStyle}>
        <div style={gridStyle} className="ag-theme-quartz">
          <AgGridReact
            onSelectionChanged={onSelectionChanged}
            onRowDoubleClicked={onRowDoubleClicked}
            rowData={data}
            enableCellTextSelection={true}
            suppressDragLeaveHidesColumns={true}
            ref={gridRef}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            autoSizeStrategy={{
              type: "fitCellContents",
            }}
            // paginationPageSize={10}
            rowSelection={"single"}
            multiSortKey={"ctrl"}
            className="ag-grid-fullwidth"
            pagination={false}
            overlayLoadingTemplate="<span class='ag-overlay-loading-center'>Đang tải...</span>"
            overlayNoRowsTemplate="<span class='ag-overlay-loading-center'>Không có dữ liệu</span>"
          />
        </div>
      </div>
    );
  }
);

export default DataTableV3;
