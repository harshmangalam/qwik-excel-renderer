# qwik-excel-renderer

A Qwik library to render and display excel sheets on webpage.

## Installation

```shell
npm i qwik-excel-renderer
```

```shell
pnpm add qwik-excel-renderer
```

```shell
yarn add qwik-excel-renderer
```

```shell
bun add qwik-excel-renderer
```

```jsx
import {
  NoSerialize,
  component$,
  noSerialize,
  useSignal,
} from "@builder.io/qwik";
import { useXLSXRenderer,XLSXTable } from "qwik-excel-renderer";

export default component$(() => {
  const { xlsxRenderer, data } = useXLSXRenderer();
  const file = useSignal<NoSerialize<File>>();
  return (
      <div>
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
      </div>
  );
});


```
