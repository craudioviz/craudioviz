import React, { Suspense } from 'react';

type LazyComponentProps = {
    loader: () => Promise<{ default: React.ComponentType<any> }>;
    fallback?: React.ReactNode;
    // Optionally, you can pass props to the loaded component
    // componentProps?: Record<string, any>;
};

export default function LazyComponent({
    loader,
    fallback = null,
    // componentProps = {},
}: LazyComponentProps) {
    const Component = React.lazy(loader);

    return (
        <Suspense fallback={fallback}>
            <Component /* {...componentProps} */ />
        </Suspense>
    );
}