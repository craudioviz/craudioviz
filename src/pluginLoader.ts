type Plugin = {
  id: string
  name: string
  icon: string
  description: string
  status: 'active' | 'inactive'
  partner: string
  page?: {
    path: string
    componentPath: string
  }
}

export function getPluginMeta(): Plugin[] {
  const pluginModules = import.meta.glob('./plugins/**/PluginAComponent.tsx', { eager: true })

  return Object.keys(pluginModules).map(path => {
    const parts = path.split('/')
    const id = parts[2] // e.g. 'PluginA'

    return {
      id: id.toLowerCase(),
      name: id,
      icon: '🧩',
      description: `Auto-discovered plugin: ${id}`,
      status: 'active',
      partner: 'CR AudioViz',
      page: {
        path: `/plugin/${id.toLowerCase()}`,
        componentPath: path,
      },
    }
  })
}