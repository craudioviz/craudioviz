import { useState } from "react";
import { useTable } from "../hooks/useTable";
import { useTableMutations } from "../hooks/useTableMutations";

interface TableViewerProps {
    table: string;
    columns: string[];
}

export const TableViewer = ({ table, columns }: TableViewerProps) => {
    const { data, loading, error } = useTable(table);
    const { update, remove } = useTableMutations(table);

    const [editingId, setEditingId] = useState<number | null>(null);
    const [editValues, setEditValues] = useState<Record<string, any>>({});

    const startEdit = (row: any) => {
        setEditingId(row.id);
        setEditValues(row);
    };

    const cancelEdit = () => {
        setEditingId(null);
        setEditValues({});
    };

    const saveEdit = async () => {
        if (editingId !== null) {
            await update(editingId, editValues);
            cancelEdit();
        }
    };

    const handleDelete = async (id: number) => {
        await remove(id);
    };

    return (
        <div style={styles.container}>
            <h3>{table} Viewer</h3>
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            <table style={styles.table}>
                <thead>
                    <tr>
                        {columns.map(col => (
                            <th key={col} style={styles.th}>{col}</th>
                        ))}
                        <th style={styles.th}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row: any) => (
                        <tr key={row.id}>
                            {columns.map(col => (
                                <td key={col} style={styles.td}>
                                    {editingId === row.id ? (
                                        <input
                                            value={editValues[col] ?? ""}
                                            onChange={e =>
                                                setEditValues(prev => ({ ...prev, [col]: e.target.value }))
                                            }
                                        />
                                    ) : (
                                        row[col]
                                    )}
                                </td>
                            ))}
                            <td style={styles.td}>
                                {editingId === row.id ? (
                                    <>
                                        <button onClick={saveEdit}>Save</button>
                                        <button onClick={cancelEdit}>Cancel</button>
                                    </>
                                ) : (
                                    <>
                                        <button onClick={() => startEdit(row)}>Edit</button>
                                        <button onClick={() => handleDelete(row.id)}>Delete</button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const styles = {
    container: {
        padding: "1rem",
        fontFamily: "sans-serif",
    },
    table: {
        width: "100%",
        borderCollapse: "collapse" as const,
    },
    th: {
        borderBottom: "1px solid #ccc",
        padding: "0.5rem",
        textAlign: "left" as const,
    },
    td: {
        padding: "0.5rem",
        borderBottom: "1px solid #eee",
    },
};