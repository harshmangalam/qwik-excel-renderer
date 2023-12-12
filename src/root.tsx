import {
  NoSerialize,
  component$,
  noSerialize,
  useSignal,
} from "@builder.io/qwik";
import { useXLSXRenderer } from "./components/use-xlsx-renderer";
import { XLSXTable } from "./components/xlsx-table";

export default component$(() => {
  const { xlsxRenderer, data, error } = useXLSXRenderer();
  const file = useSignal<NoSerialize<File>>();

  if (error) {
    console.log(error);
  }

  return (
    <>
      <head>
        <meta charSet="utf-8" />
        <title>Qwik Blank App</title>
      </head>
      <body>
        <input
          type="file"
          onChange$={(e) => {
            file.value = noSerialize((e.target as HTMLInputElement).files?.[0]);
          }}
        />

        <button
          onClick$={async () => {
            await xlsxRenderer(file.value);
          }}
        >
          Render XLSX data
        </button>

        {data && (
          <div>
            <XLSXTable data={data} />
          </div>
        )}
      </body>
    </>
  );
});
