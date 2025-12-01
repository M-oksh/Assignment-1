export default function AuditTrail({v}){
    return(
        <div
        key={v.id}
        className="bg-white p-3 rounded-lg mb-3 border border-gray-200 text-xs md:text-sm font-mono"
        >
        <div className="mb-1">
            <span className="font-semibold">id:</span> "{v.id}"
        </div>
        <div className="mb-1">
            <span className="font-semibold">timestamp:</span> "{v.timestamp}"
        </div>
        <div className="mb-1">
            <span className="font-semibold">addedWords:</span>{" "}
            [
            {v.addedWords.map((w, idx) => (
            <span key={idx}>
                "{w}"{idx < v.addedWords.length - 1 ? ", " : ""}
            </span>
            ))}
            ]
        </div>
        <div className="mb-1">
            <span className="font-semibold">removedWords:</span>{" "}
            [
            {v.removedWords.map((w, idx) => (
            <span key={idx}>
                "{w}"{idx < v.removedWords.length - 1 ? ", " : ""}
            </span>
            ))}
            ]
        </div>
        <div>
            <span className="font-semibold">oldLength:</span> {v.oldLength},{" "}
            <span className="font-semibold">newLength:</span> {v.newLength}
        </div>
        </div>
    )
}
