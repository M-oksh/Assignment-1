import AuditTrail from "./audittrail";

export default function VersionList({ versions }) {
  return (
    <div className="flex-[0.5] bg-purple-50 rounded-4xl p-4 overflow-y-auto shadow">
      <div className="flex justify-center items-center">
        <h2 className="font-semibold text-lg mb-3">Audit Trails</h2>
      </div>

      {versions.length === 0 ? (
        <p className="text-gray-600 text-sm">
          No Audit yet. Edit the text and click <b>Save Version</b>...
        </p>
      ) : (
        versions.map((v) => <AuditTrail key={v.id} v={v} /> )
      )}
    </div>
  );
}