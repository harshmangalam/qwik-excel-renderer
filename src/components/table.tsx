import { type QwikIntrinsicElements, component$ } from "@builder.io/qwik";

export type Column = {
  key: string | number;
  name: any;
};
type HTMLTableProps = QwikIntrinsicElements["table"];
export type TableProps = HTMLTableProps & {
  withZeroColumn: any;
  withoutRowNum: any;
  columns: Column[];
  data: any[];
  renderRowNum: any;
};
export const Table = component$<TableProps>((props) => {
  const {
    withZeroColumn,
    withoutRowNum,
    columns,
    data,
    renderRowNum,
    ...rest
  } = props;
  return (
    <table {...rest}>
      <tbody>
        <tr>
          {withZeroColumn && !withoutRowNum && <th></th>}
          {columns.map((c) => (
            <th key={c.key}>{c.key === -1 ? "" : c.name}</th>
          ))}
        </tr>
        {data.map((r, i) => (
          <tr key={i}>
            {!withoutRowNum && (
              <td key={i}>{renderRowNum ? renderRowNum(r, i) : i}</td>
            )}
            {columns.map((c) => (
              <td key={c.key}>{r[c.key]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
});
