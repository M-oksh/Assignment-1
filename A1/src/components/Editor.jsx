export default function Editor({ content, setContent, onSave, loading }) {
  return (
    <div className="flex flex-col flex-[0.5] bg-white rounded-4xl p-4 gap-4 shadow">
        <div className="flex justify-center items-center">
            <label className="font-medium text-lg align-center">Content Editor</label>
        </div>
      <textarea
        placeholder="Enter content here..."
        className="w-full grow p-3 rounded-lg border"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <button
        onClick={onSave}
        disabled={loading}
        className="self-start bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-70"
      >
        {loading ? "Saving..." : "Save Version"}
      </button>
    </div>
  );
}
