"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTemplate, Template } from "@/contexts/TemplateContext";
import { FileText, Sparkles, Palette, Briefcase, Code, GraduationCap, Columns, Calendar, BarChart3, Gem } from "lucide-react";

import Image from "next/image";

const Templates = () => {
    const navigate = useRouter();
    const { setSelectedTemplate } = useTemplate();

    const [dialogOpen, setDialogOpen] = useState(false);
    const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null);

    const openPreview = (template: Template) => {
        setPreviewTemplate(template);
        setDialogOpen(true);
    };

    const recommendations: Record<Template['style'], string[]> = {
        classic: ["Formal corporate roles", "Conservative industries", "ATS-friendly"],
        modern: ["Clean layout", "Startups & product roles", "Fast scanning"],
        executive: ["Senior roles", "Leadership focus", "Strong sidebar"],
        tech: ["Developers & engineers", "Technical skills emphasis", "Code cues"],
        academic: ["Research/education", "Publications first", "Detailed experience"],
        twoColumn: ["Space efficiency", "Showcase many items", "Clear sections"],
        cool2025: ["Modern professional", "Blue accent theme", "Centered design"],
    };

    const highlights: Record<Template['style'], string[]> = {
        classic: ["Blue accents", "Centered header", "Traditional sections"],
        modern: ["Large name left", "Minimal headers", "Whitespace"],
        executive: ["Dark sidebar", "Main content focus", "Premium look"],
        tech: ["Green accent", "Inline metadata", "Monospace/code feel"],
        academic: ["Education first", "Centered name", "Thin rules"],
        twoColumn: ["Left sidebar", "Right content", "Compact typography"],
        cool2025: ["Blue header lines", "Circular photo", "Professional serif font"],
    };
    const templates: Template[] = [
        {
            id: "classic",
            name: "Classic Professional",
            description: "Traditional, formal layout perfect for corporate roles",
            style: "classic"
        },
        {
            id: "modern",
            name: "Modern Minimalist",
            description: "Clean design with lots of white space",
            style: "modern"
        },
        {
            id: "executive",
            name: "Executive",
            description: "Premium, sophisticated look for senior positions",
            style: "executive"
        },
        {
            id: "tech",
            name: "Tech/Developer",
            description: "Code-inspired design for technical professionals",
            style: "tech"
        },
        {
            id: "academic",
            name: "Academic",
            description: "Research and education focused layout",
            style: "academic"
        },
        {
            id: "twoColumn",
            name: "Two Column",
            description: "Efficient space usage with dual-column design",
            style: "twoColumn"
        },
        {
            id: "cool2025",
            name: "Cool2025",
            description: "Modern professional with blue accents and centered layout",
            style: "cool2025"
        }
    ];

    const getIcon = (style: string) => {
        switch (style) {
            case "classic": return <FileText className="w-12 h-12 text-primary" />;
            case "modern": return <Sparkles className="w-12 h-12 text-primary" />;
            case "executive": return <Briefcase className="w-12 h-12 text-primary" />;
            case "tech": return <Code className="w-12 h-12 text-primary" />;
            case "academic": return <GraduationCap className="w-12 h-12 text-primary" />;
            case "twoColumn": return <Columns className="w-12 h-12 text-primary" />;
            case "cool2025": return <Sparkles className="w-12 h-12 text-primary" />;
            default: return <FileText className="w-12 h-12 text-primary" />;
        }
    };

    const getTemplatePreview = (style: string) => {
        const previews: Record<string, string> = {
            classic: "/classic_preview.png",
            modern: "/modern_preview.png",
            executive: "/executive_preview.png",
            tech: "/tech_preview.png",
            academic: "/academic_preview.png",
            twoColumn: "/twoColumn_preview.png",
            cool2025: "/cool2025_preview.png",
        };

        return (
            <div className="relative w-full aspect-[210/297] rounded-lg overflow-hidden shadow-md border border-border group-hover:shadow-xl transition-all duration-300">
                <Image
                    src={previews[style] || "/classic_preview.png"}
                    alt={`${style} template preview`}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                    <span className="text-white font-medium px-4 py-2 bg-primary/90 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        Use Template
                    </span>
                </div>
            </div>
        );
    };

    const handleSelectTemplate = (template: Template) => {
        setSelectedTemplate(template);
        navigate.push("/builder");
    };

    return (
        <div className="min-h-screen gradient-hero py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12 animate-fade-in">
                    <Link href="/" className="text-primary hover:underline mb-4 inline-block">
                        ← Back to Home
                    </Link>
                    <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
                        Choose Your CV Template
                    </h1>
                    <p className="text-xl text-muted-foreground">
                        Select a design that matches your style and start building your professional resume
                    </p>
                </div>

                {/* Templates Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {templates.map((template, index) => (
                        <Card
                            key={template.id}
                            className="group cursor-pointer shadow-card hover:shadow-hover transition-smooth hover:scale-105 overflow-hidden animate-scale-in border-2 border-transparent hover:border-primary"
                            style={{ animationDelay: `${index * 0.05}s` }}
                            onClick={() => openPreview(template)}
                        >
                            {/* Template Preview */}
                            <div className="relative bg-accent h-64 w-full">
                                {getTemplatePreview(template.style)}
                                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-smooth flex items-center justify-center">
                                    <Button className="gradient-primary shadow-elegant" onClick={(e) => { e.stopPropagation(); openPreview(template); }}>
                                        Preview & Select
                                    </Button>
                                </div>
                            </div>

                            {/* Template Info */}
                            <div className="p-6">
                                <div className="flex items-center gap-3 mb-2">
                                    {getIcon(template.style)}
                                    <h3 className="text-xl font-bold text-foreground">
                                        {template.name}
                                    </h3>
                                </div>
                                <p className="text-muted-foreground text-sm">
                                    {template.description}
                                </p>
                            </div>
                        </Card>
                    ))}
                </div>

                {/* Overview Dialog */}
                <Dialog open={dialogOpen} onOpenChange={(open) => { setDialogOpen(open); if (!open) setPreviewTemplate(null); }}>
                    <DialogContent className="max-w-5xl">
                        <DialogHeader>
                            <DialogTitle>Choose Your CV Template</DialogTitle>
                            <DialogDescription>Select a design that matches your style</DialogDescription>
                        </DialogHeader>
                        {previewTemplate && (
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <div className="bg-accent p-4 rounded-lg h-[500px] relative">
                                    {getTemplatePreview(previewTemplate.style)}
                                </div>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        {getIcon(previewTemplate.style)}
                                        <div>
                                            <h3 className="text-xl font-bold text-foreground">{previewTemplate.name}</h3>
                                            <p className="text-muted-foreground text-sm">{previewTemplate.description}</p>
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="font-semibold text-foreground mb-2">Recommended for</h4>
                                        <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                                            {recommendations[previewTemplate.style as keyof typeof recommendations].map((item) => (
                                                <li key={item}>{item}</li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div>
                                        <h4 className="font-semibold text-foreground mb-2">Layout highlights</h4>
                                        <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                                            {highlights[previewTemplate.style as keyof typeof highlights].map((item) => (
                                                <li key={item}>{item}</li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="flex gap-3">
                                        <Button className="gradient-primary shadow-elegant" onClick={() => { if (previewTemplate) handleSelectTemplate(previewTemplate); }}>
                                            Select Template
                                        </Button>
                                        <Button variant="outline" onClick={() => setDialogOpen(false)}>Close</Button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </DialogContent>
                </Dialog>

                {/* Info Card */}
                <Card className="p-6 sm:p-8 shadow-card max-w-3xl mx-auto text-center bg-accent border-border">
                    <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-3">
                        Can't decide? No worries!
                    </h3>
                    <p className="text-muted-foreground">
                        You can always come back and try a different template. Each template will format your information in a unique, professional way.
                    </p>
                </Card>
            </div>
        </div>
    );
};

export default Templates;
