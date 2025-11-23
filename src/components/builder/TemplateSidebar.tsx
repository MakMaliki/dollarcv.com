"use client";

import { useTemplate, Template } from "@/contexts/TemplateContext";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import { FileText, Sparkles, Briefcase, Code, GraduationCap, Gem, LayoutTemplate, Clock, PieChart } from "lucide-react";
import { cn } from "@/lib/utils";

export function TemplateSidebar() {
    const { selectedTemplate, setSelectedTemplate } = useTemplate();

    const templates: Template[] = [
        { id: "classic", name: "Classic Professional", description: "Traditional, formal layout perfect for corporate roles", style: "classic" },
        { id: "modern", name: "Modern Minimalist", description: "Clean design with lots of white space", style: "modern" },
        { id: "creative", name: "Creative Bold", description: "Colorful accents and modern fonts for creative fields", style: "creative" },
        { id: "executive", name: "Executive", description: "Premium, sophisticated look for senior positions", style: "executive" },
        { id: "tech", name: "Tech/Developer", description: "Code-inspired design for technical professionals", style: "tech" },
        { id: "academic", name: "Academic", description: "Research and education focused layout", style: "academic" },
        { id: "twoColumn", name: "Two Column", description: "Efficient space usage with dual-column design", style: "twoColumn" },
        { id: "timeline", name: "Timeline", description: "Career progression focused with timeline view", style: "timeline" },
        { id: "infographic", name: "Infographic", description: "Visual resume with icons and graphics", style: "infographic" },
        { id: "elegant", name: "Elegant", description: "Refined and minimalist design", style: "elegant" },
        { id: "cool2025", name: "Cool2025", description: "Modern professional with blue accent theme", style: "cool2025" },
    ];

    const getIcon = (style: Template['style']) => {
        const iconMap = {
            classic: FileText,
            modern: Sparkles,
            creative: Sparkles,
            executive: Briefcase,
            tech: Code,
            academic: GraduationCap,
            twoColumn: LayoutTemplate,
            timeline: Clock,
            infographic: PieChart,
            elegant: Gem,
            cool2025: Sparkles,
        };
        return iconMap[style];
    };

    return (
        <Sidebar collapsible="none" className="w-[280px] border-r border-white/20 bg-slate-900/95 backdrop-blur-xl h-screen sticky top-0 text-slate-100 shadow-2xl">
            <SidebarHeader className="p-6 border-b border-white/10 bg-transparent z-10">
                <div className="flex items-center gap-2 mb-1">
                    <div className="p-2 bg-blue-600/20 rounded-lg border border-blue-500/30">
                        <LayoutTemplate className="w-5 h-5 text-blue-400" />
                    </div>
                    <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">Templates</h2>
                </div>
                <p className="text-xs text-slate-400 font-medium">Choose a design to start building</p>
            </SidebarHeader>
            <SidebarContent className="p-3">
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu className="gap-3">
                            {templates.map((template) => {
                                const Icon = getIcon(template.style);
                                const isSelected = selectedTemplate?.id === template.id;
                                return (
                                    <SidebarMenuItem key={template.id}>
                                        <SidebarMenuButton
                                            onClick={() => setSelectedTemplate(template)}
                                            isActive={isSelected}
                                            className={cn(
                                                "h-auto py-4 px-4 w-full justify-start gap-4 transition-all duration-300 border rounded-xl group relative overflow-hidden",
                                                isSelected
                                                    ? "bg-blue-600/20 border-blue-500/50 shadow-lg shadow-blue-900/20"
                                                    : "bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/20 hover:translate-x-1"
                                            )}
                                        >
                                            {isSelected && (
                                                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-transparent opacity-50" />
                                            )}
                                            <div className={cn(
                                                "p-2.5 rounded-lg shrink-0 transition-colors duration-300",
                                                isSelected ? "bg-blue-500 text-white shadow-md" : "bg-slate-800 text-slate-400 group-hover:text-blue-400 group-hover:bg-slate-700"
                                            )}>
                                                <Icon className="w-5 h-5" />
                                            </div>
                                            <div className="flex flex-col items-start text-left overflow-hidden relative z-10">
                                                <span className={cn(
                                                    "font-bold text-sm truncate w-full transition-colors",
                                                    isSelected ? "text-blue-100" : "text-slate-200 group-hover:text-white"
                                                )}>
                                                    {template.name}
                                                </span>
                                                <span className={cn(
                                                    "text-[11px] truncate w-full transition-colors mt-0.5",
                                                    isSelected ? "text-blue-200/70" : "text-slate-500 group-hover:text-slate-400"
                                                )}>
                                                    {template.description}
                                                </span>
                                            </div>
                                            {isSelected && (
                                                <div className="absolute right-2 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.8)]" />
                                            )}
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                );
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}
