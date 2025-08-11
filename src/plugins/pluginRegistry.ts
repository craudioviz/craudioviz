export interface PluginEntry {
  id: string;
  name: string;
  description: string;
  source: string; // Keep this for remote plugins only
  status: "active" | "coming-soon" | "beta";
  partner: string;
  icon?: string;
}

export const pluginRegistry: PluginEntry[] = [
  {
    id: "voice-enhancer",
    name: "Voice Enhancer",
    description: "Real-time voice cleanup and enhancement",
    source: "", // 👈 Leave blank or ignore for local
    status: "active",
    partner: "CR AudioViz",
    icon: "🎙️"
  },
  {
    id: "avatar-generator",
    name: "Avatar Generator",
    description: "AI-powered avatar creation from voice and video",
    source: "https://cdn.craudioviz.ai/plugins/avatar-generator.js",
    status: "coming-soon",
    partner: "CR AudioViz",
    icon: "🧑‍🎨"
  }
];