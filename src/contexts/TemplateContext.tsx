"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export interface Template {
    id: string;
    name: string;
    description: string;
    style: "classic" | "modern" | "creative" | "executive" | "tech" | "academic" | "twoColumn" | "timeline" | "infographic" | "elegant" | "cool2025";
}

interface TemplateContextType {
    selectedTemplate: Template | null;
    setSelectedTemplate: (template: Template) => void;
}

const TemplateContext = createContext<TemplateContextType | undefined>(undefined);

export const useTemplate = () => {
    const context = useContext(TemplateContext);
    if (!context) {
        throw new Error("useTemplate must be used within a TemplateProvider");
    }
    return context;
};

export const TemplateProvider = ({ children }: { children: ReactNode }) => {
    const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);

    return (
        <TemplateContext.Provider value={{ selectedTemplate, setSelectedTemplate }}>
            {children}
        </TemplateContext.Provider>
    );
};
