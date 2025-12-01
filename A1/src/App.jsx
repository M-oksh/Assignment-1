import { useEffect, useState } from "react";
import Head from "./components/Head";
import Editor from "./components/Editor";
import VersionList from "./components/VersionList";

function App() {
  const [content, setContent] = useState("");
  const [previousText, setPreviousText] = useState("");
  const [versions, setVersions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchVersions = async () => {
      const res = await fetch("/versions");
      if (!res.ok) return;
      const data = await res.json();
      setVersions(data);
    };

    fetchVersions();
  }, []);

  const handleSaveVersion = async () => {
    if (!content.trim() && !previousText.trim()) return;

    setLoading(true);
    try {
      const res = await fetch("/save-version", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ oldText: previousText, newText: content }),
      });
      const savedVersion = await res.json();
      setVersions((prev) => [savedVersion, ...prev]);
      setPreviousText(content);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 flex flex-col gap-4 h-screen w-screen bg-linear-to-br from-slate-400 via-blue-400 to-teal-400">
      <Head />
      <div className="flex grow gap-4">
        <Editor
          content={content}
          setContent={setContent}
          onSave={handleSaveVersion}
          loading={loading}
        />
        <VersionList versions={versions} />
      </div>
    </div>
  );
}

export default App;
