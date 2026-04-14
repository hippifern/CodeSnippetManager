export const snippets = [
  {
    id: 1001,
    user_id: 1,
    title: "Creating a React app with Vite",
    language: "Bash",
    code: "npm create vite@latest CodeSnippetManager -- --template react-ts",
    tags: ["React", "Vite", "Bash", "Template", "Terminal"],
    notes:
      "My regularly used snippet for quickly setting up a React app skeleton with Vite build tool and typescript implementation",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: 1002,
    user_id: 1,
    title: "React Functional Component",
    language: "Bash",
    code: `export const ComponentName = () => {
  return (
    <>
      
    </>
  );
}`,
    tags: ["React", "Functional", "Component"],
    notes:
      "My regularly used snippet for setting up a functional react component.",
    created_at: new Date(),
    updated_at: new Date(),
  },
];

export const optimisations = [
  {
    id: 2001,
    snippet_id: 1001,
    improved_code: "npm create vite@latest APPNAME -- --template react-ts",
    explanation:
      "Removed specific app name and replaced with a placeholder APPNAME that can be changed with each use.",
    created_at: new Date(),
  },
];
