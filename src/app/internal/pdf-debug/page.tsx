"use client";

import { useEffect, useRef, useState } from "react";
import { generatePDFByTemplate } from "@/lib/pdfTemplates";
import * as pdfjsLib from "pdfjs-dist";

// Set worker source
pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

const templates = [
    { id: "classic", style: "classic" },
    { id: "modern", style: "modern" },
    { id: "creative", style: "creative" },
    { id: "executive", style: "executive" },
    { id: "tech", style: "tech" },
    { id: "academic", style: "academic" },
    { id: "twoColumn", style: "twoColumn" },
    { id: "timeline", style: "timeline" },
    { id: "infographic", style: "infographic" },
    { id: "elegant", style: "elegant" },
    { id: "cool2025", style: "cool2025" },
];

const dummyData = {
    formData: {
        fullName: "John Doe",
        email: "john.doe@example.com",
        phone: "+1 234 567 890",
        address: "New York, USA",
        linkedin: "linkedin.com/in/johndoe",
        github: "github.com/johndoe",
        professionalTitle: "Senior Software Engineer",
        summary: "Experienced software engineer with a passion for building scalable web applications. Proven track record of delivering high-quality code and leading teams.",
        skills: "JavaScript, TypeScript, React, Node.js, Python, SQL, AWS, Docker",
        certifications: "AWS Certified Solutions Architect\nMeta Frontend Developer Professional Certificate",
        photo: "" // No photo for consistent testing
    },
    workExperiences: [
        {
            jobTitle: "Senior Developer",
            company: "Tech Solutions Inc.",
            startDate: "2020",
            endDate: "Present",
            description: "• Led a team of 5 developers\n• Architected microservices"
        },
        {
            jobTitle: "Web Developer",
            company: "StartUp Co",
            startDate: "2018",
            endDate: "2020",
            description: "• Built main product dashboard\n• Optimized performance"
        }
    ],
    education: [
        {
            degree: "BS Computer Science",
            institution: "Tech University",
            year: "2018",
            description: "Graduated with Honors"
        }
    ],
    references: [
        {
            name: "Jane Smith",
            contact: "Manager, Tech Solutions"
        }
    ],
    sectionOrder: [
        { type: "workExperience" },
        { type: "education" },
        { type: "skills" },
        { type: "certifications" },
        { type: "references" }
    ]
};

export default function PdfDebugPage() {
    const [status, setStatus] = useState<Record<string, string>>({});

    useEffect(() => {
        const renderAll = async () => {
            for (const template of templates) {
                try {
                    setStatus(prev => ({ ...prev, [template.id]: "Generating..." }));

                    // 1. Generate PDF
                    // @ts-ignore
                    const doc = generatePDFByTemplate(template.style, dummyData.formData, dummyData.workExperiences, dummyData.education, dummyData.references, dummyData.sectionOrder);
                    const pdfBlob = doc.output("blob");
                    const pdfUrl = URL.createObjectURL(pdfBlob);

                    // 2. Render to Canvas
                    const loadingTask = pdfjsLib.getDocument(pdfUrl);
                    const pdf = await loadingTask.promise;
                    const page = await pdf.getPage(1);

                    const scale = 1.5;
                    const viewport = page.getViewport({ scale });

                    const canvas = document.getElementById(`canvas-${template.id}`) as HTMLCanvasElement;
                    if (canvas) {
                        const context = canvas.getContext("2d");
                        canvas.height = viewport.height;
                        canvas.width = viewport.width;

                        const renderContext = {
                            canvasContext: context!,
                            viewport: viewport,
                        };
                        // @ts-ignore
                        await page.render(renderContext).promise;
                        setStatus(prev => ({ ...prev, [template.id]: "Done" }));
                    }
                } catch (e: any) {
                    console.error(`Error rendering ${template.id}:`, e);
                    setStatus(prev => ({ ...prev, [template.id]: `Error: ${e.message}` }));
                }
            }
        };

        renderAll();
    }, []);

    return (
        <div className="p-8 bg-slate-100 min-h-screen">
            <h1 className="text-2xl font-bold mb-6">PDF Rendering Debug</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {templates.map(t => (
                    <div key={t.id} className="bg-white p-4 rounded shadow">
                        <h3 className="font-bold mb-2 capitalize">{t.id}</h3>
                        <div className="text-sm text-slate-500 mb-2">Status: {status[t.id] || "Waiting..."}</div>
                        <div className="border border-slate-200 overflow-hidden">
                            <canvas id={`canvas-${t.id}`} className="w-full h-auto" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
