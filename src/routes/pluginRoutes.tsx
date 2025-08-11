import React, { Suspense } from 'react'
import { getPluginMeta } from '../pluginLoader'

export function getPluginRoutes() {
  const plugins = getPluginMeta()

  return plugins
    .filter(p => p.page)
    .map(p => {
      const LazyComponent = React.lazy(() => import(/* @vite-ignore */ p.page!.componentPath))

      return {
        path: p.page!.path,
        element: (
          <Suspense fallback={<div>Loading {p.name}...</div>}>
            <LazyComponent />
          </Suspense>
        ),
      }
    })
}