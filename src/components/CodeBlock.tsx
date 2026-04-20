import CodeMirror, { oneDark } from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";

type snippetType = {
  id: number;
  user_id: string;
  title: string;
  language: string;
  code: string;
  tags: string[];
  notes: string;
  created_at: Date;
  updated_at: Date;
};

export const CodeBlock = ({
  value = "console.log('Hello World');",
  updateSelectedSnippet,
  keyToChange,
  sid,
}: {
  value: string;
  updateSelectedSnippet: (
    sid: number,
    keyToChange: keyof snippetType,
    val: string,
  ) => void;
  keyToChange: keyof snippetType;
  sid: number;
}) => {
  return (
    <div className="code-block h-full w-full flex-1 bg-gray-800 rounded-2xl p-2 shadow-black shadow-sm">
      <div className="h-full w-full rounded-xl border-1 border-gray-500 p-2">
        <CodeMirror
          value={value}
          extensions={[javascript({ jsx: true })]}
          theme={oneDark}
          onChange={(val) => {
            updateSelectedSnippet(sid, keyToChange, val);
          }}
        />
      </div>
    </div>
  );
};
