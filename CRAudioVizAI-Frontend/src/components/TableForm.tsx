import { useState } from "react";
import { useTableMutations } from "../hooks/useTableMutations";

interface TableFormProps {
    table: string;
    fields: string[];
    onCreated?: () => void;
}

export const TableForm = ({ table, fields, onCreated }: TableFormProps) => {
    const { insert } = useTableMutations(table);
    const [values, setValues] = useState<Record<string, any>>({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (field: string, value: string) => {
        setValues(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            await insert(values);
            setValues({});
            onCreated?.();
        } catch (err: any) {
            setError(err.message);
        }

        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} style={styles.form}>
            <h3>Create New {table.slice(0, -1)}</h3>
            {fields.map(field => (
                <input
                    key={field}
                    placeholder={field}
                    value={values[field] ?? ""}
                    onChange={e => handleChange(field, e.target.value)}
                    style={styles.input}
                />
            ))}
            <button type="submit" disabled={loading} style={styles.button}>
                {loading ? "Creating..." : "Create"}
            </button>
            {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
    );
};

const styles = {
    form: {
        marginBottom: "2rem",
        fontFamily: "sans-serif",
    } as React.CSSProperties,
    input: {
        display: "block",
        width: "100%",
        padding: "0.5rem",
        marginBottom: "1rem",
    } as React.CSSProperties,
    button: {
        padding: "0.5rem 1rem",
    } as React.CSSProperties,
};