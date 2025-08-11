import BrandingPanel from './BrandingPanel';
import LogicComposer from './LogicComposer';
import DeploymentPanel from './DeploymentPanel';
import PreviewPanel from './PreviewPanel';

export default function AppBuilderLayout() {
    return (
        <div className="flex flex-col h-screen">
            <header className="p-4 bg-gray-900 text-white text-xl font-bold">
                CR AudioViz App Builder
            </header>
            <div className="flex flex-1 overflow-hidden">
                <aside className="w-64 bg-gray-100 p-4 overflow-y-auto">
                    <nav>
                        <ul className="space-y-2">
                            <li><a href="#branding" className="text-blue-600">Branding</a></li>
                            <li><a href="#logic" className="text-blue-600">Logic</a></li>
                            <li><a href="#deployment" className="text-blue-600">Deployment</a></li>
                            <li><a href="#preview" className="text-blue-600">Preview</a></li>
                        </ul>
                    </nav>
                </aside>
                <main className="flex-1 p-4 overflow-y-auto space-y-6">
                    <section id="branding"><BrandingPanel /></section>
                    <section id="logic"><LogicComposer /></section>
                    <section id="deployment"><DeploymentPanel /></section>
                    <section id="preview"><PreviewPanel /></section>
                </main>
            </div>
        </div>
    );
}