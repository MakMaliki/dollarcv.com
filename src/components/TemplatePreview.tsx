interface TemplatePreviewProps {
    style: string;
    size?: 'sm' | 'md' | 'lg';
}

export function TemplatePreview({ style, size = 'md' }: TemplatePreviewProps) {
    const sizeClasses = {
        sm: 'w-full h-32',
        md: 'w-full h-48',
        lg: 'w-full h-80'
    };

    const baseClasses = `${sizeClasses[size]} rounded-lg p-4 flex flex-col gap-2`;

    switch (style) {
        case "classic":
            return (
                <div className={`${baseClasses} bg-gradient-to-b from-background to-accent border-2 border-border`}>
                    <div className="w-3/4 h-3 bg-primary rounded"></div>
                    <div className="w-1/2 h-2 bg-muted-foreground/30 rounded"></div>
                    <div className="space-y-1 mt-2">
                        <div className="w-full h-2 bg-muted-foreground/20 rounded"></div>
                        <div className="w-full h-2 bg-muted-foreground/20 rounded"></div>
                        <div className="w-2/3 h-2 bg-muted-foreground/20 rounded"></div>
                    </div>
                </div>
            );
        case "modern":
            return (
                <div className={`${baseClasses} bg-background border border-border`}>
                    <div className="w-1/2 h-4 bg-primary rounded-full"></div>
                    <div className="flex gap-4 mt-4">
                        <div className="flex-1 space-y-2">
                            <div className="w-full h-2 bg-muted-foreground/20 rounded"></div>
                            <div className="w-3/4 h-2 bg-muted-foreground/20 rounded"></div>
                        </div>
                    </div>
                </div>
            );
        case "creative":
            return (
                <div className={`${baseClasses} gradient-primary`}>
                    <div className="w-2/3 h-4 bg-white rounded-lg shadow-sm"></div>
                    <div className="flex gap-2 mt-2">
                        <div className="w-8 h-8 bg-white/80 rounded-full"></div>
                        <div className="flex-1 space-y-1">
                            <div className="w-full h-2 bg-white/70 rounded"></div>
                            <div className="w-2/3 h-2 bg-white/70 rounded"></div>
                        </div>
                    </div>
                </div>
            );
        case "executive":
            return (
                <div className={`${baseClasses} bg-slate-900 text-white`}>
                    <div className="w-3/4 h-4 bg-primary rounded"></div>
                    <div className="border-l-2 border-primary pl-3 mt-2 space-y-1">
                        <div className="w-full h-2 bg-white/30 rounded"></div>
                        <div className="w-5/6 h-2 bg-white/30 rounded"></div>
                    </div>
                </div>
            );
        case "tech":
            return (
                <div className={`${baseClasses} bg-slate-950 text-green-400 font-mono border border-green-500/30`}>
                    <div className="w-1/2 h-3 bg-green-500 rounded"></div>
                    <div className="space-y-1 mt-2 font-mono text-xs">
                        <div className="w-full h-2 bg-green-500/30 rounded"></div>
                        <div className="w-4/5 h-2 bg-green-500/30 rounded"></div>
                        <div className="w-3/5 h-2 bg-green-500/30 rounded"></div>
                    </div>
                </div>
            );
        case "academic":
            return (
                <div className={`${baseClasses} bg-amber-50 border-2 border-amber-200`}>
                    <div className="text-center space-y-2">
                        <div className="w-1/2 h-3 bg-amber-700 rounded mx-auto"></div>
                        <div className="w-2/3 h-2 bg-amber-600/30 rounded mx-auto"></div>
                    </div>
                    <div className="space-y-1 mt-2">
                        <div className="w-full h-2 bg-amber-600/20 rounded"></div>
                        <div className="w-full h-2 bg-amber-600/20 rounded"></div>
                    </div>
                </div>
            );
        default:
            return <div className={`${baseClasses} bg-accent border border-border`}></div>;
    }
}
