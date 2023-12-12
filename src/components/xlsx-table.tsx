import { type QwikIntrinsicElements, component$ } from "@builder.io/qwik";
import { XLSXData } from "./use-xlsx-renderer";

export type Column = {
  key: string | number;
  name: any;
};
type HTMLTableProps = QwikIntrinsicElements["table"];
export type TableProps = HTMLTableProps & {
  withZeroColumn?: any;
  withoutRowNum?: any;
  data: XLSXData;
  renderRowNum?: any;
};
export const XLSXTable = component$<TableProps>((props) => {
  const { withZeroColumn, withoutRowNum, data, renderRowNum, ...rest } = props;
  return (
    <table {...rest}>
      <tbody>
        <tr>
          {withZeroColumn && !withoutRowNum && <th></th>}
          {data.cols.map((c) => (
            <th key={c.key}>{c.key === -1 ? "" : c.name}</th>
          ))}
        </tr>
        {data.rows.map((r, i) => (
          <tr key={i}>
            {!withoutRowNum && (
              <td key={i}>{renderRowNum ? renderRowNum(r, i) : i}</td>
            )}
            {data.cols.map((c) => (
              <td key={c.key}>{r[c.key]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
});
