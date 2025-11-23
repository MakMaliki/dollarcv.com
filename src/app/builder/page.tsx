
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2, ArrowUp, ArrowDown, FileText, Sparkles, Briefcase, Code, GraduationCap, Gem, Award, Users, CheckCircle2, UserCircle } from "lucide-react";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { TemplateSidebar } from "@/components/builder/TemplateSidebar";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { useTemplate, Template } from "@/contexts/TemplateContext";
import { generatePDFByTemplate } from "@/lib/pdfTemplates";

interface WorkExperience {
    id: string;
    jobTitle: string;
    company: string;
    startDate: string;
    endDate: string;
    description: string;
}

interface Education {
    id: string;
    degree: string;
    institution: string;
    year: string;
    description: string;
}

interface Reference {
    id: string;
    name: string;
    contact: string;
}

type SectionType = 'workExperience' | 'education' | 'skills' | 'certifications' | 'references';

interface Section {
    id: string;
    type: SectionType;
    title: string;
    isOpen?: boolean;
}

const Builder = () => {
    const { toast } = useToast();
    const navigate = useRouter();
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
            creative: Sparkles, // Replaced Palette
            executive: Briefcase,
            tech: Code,
            academic: GraduationCap,
            twoColumn: FileText, // Replaced Columns
            timeline: FileText, // Replaced Calendar
            infographic: FileText, // Replaced BarChart3
            elegant: Gem,
            cool2025: Sparkles,
        };
        return iconMap[style];
    };

    // Set default template to classic if none selected
    useEffect(() => {
        if (!selectedTemplate) {
            const classicTemplate = templates.find(t => t.style === "classic");
            if (classicTemplate) {
                setSelectedTemplate(classicTemplate);
            }
        }
    }, []);

    const [sections, setSections] = useState<Section[]>([
        { id: "work-experience", title: "Work Experience", type: "workExperience", isOpen: true },
        { id: "education", title: "Education", type: "education", isOpen: true },
        { id: "skills", title: "Skills", type: "skills", isOpen: true },
        { id: "certifications", title: "Certifications", type: "certifications", isOpen: true },
        { id: 'references', type: 'references', title: 'References', isOpen: true },
    ]);

    const [formData, setFormData] = useState({
        fullName: "MALIK FAISAL HAKIM",
        email: "malikfaisalhakim@gmail.com",
        phone: "+49 163 460 6499",
        address: "Aachener Str. 2, 80804 München, Munich Germany",
        linkedin: "linkedin.com/in/malik-faisal-hakim-a11336166/",
        github: "github.com/MakMaliki",
        professionalTitle: "Mobile App Developer / Software Development Instructor",
        summary: "Analytical and detail-oriented Software developer with stellar communication skills and 6 years of professional experience in Mobile Applications Development, Data, software design, and system design fields. Malik Faisal Hakim works at T&S as a Software Engineer Consultant and part-time Instructor at the American University of Afghanistan. He was the Lead Software Developer at Afghanistan Holding Group (Moore Afghanistan) where he developed Afghanistan's first online payment Software (Hesab Pay), the first ride-hailing and personal safety app (BBR), data collection software (Hesab Collect), and Report corruption (Notify App). He is an experienced software developer with a track record of success in creating technology systems that are both well-received and commercially viable in the software industry.",
        skills: "Android/ Backend Development Skills\nModern Language Programming Skills & Technologies\nKotlin, Java, Android Native SDK, REST API, Jetpack Compose, Kotlin Spring Boot Backend MVVM, MVI, Room, Unit / Instrument testing, Flow, Coroutines, SwiftUI, Compose Multiplatform, Dagger Hilt, Koin, CI/CD, Ktor",
        certifications: "Software Development Projects Mentor at the American University of Afghanistan\nCertification of Appreciation 2017 Afghanistan Holding Group, Moore Afghanistan\nSoftware Development William and Hewlett Foundation, Afghanistan High School Students training",
        photo: ""
    });

    const [workExperiences, setWorkExperiences] = useState<WorkExperience[]>([
        {
            id: "1",
            jobTitle: "Android / Backend Software Engineer, Android Auto",
            company: "T&S Services, I HAUS AG",
            startDate: "September 2021",
            endDate: "Present",
            description: "• Developed mobile applications for simulating car apps using Kotlin, adhering to modern Android SDK guidelines and resulting in 60% less bugs in the real Android auto app\n• Developed and implemented instrument tests for Android Auto apps used by AUDI and VW, ensuring the reliability and functionality of the applications\n• Played a key role in the Android app development of Ihaus Mobile App V3 for smart buildings, enhancing the functionality and user experience resulting in 40% new user engagement and 70% improvement in app performance\n• Designed and Developed REST APIs using Kotlin Spring Boot simulating navigation and data collection API\n\nTech Stack: Kotlin, Java, Android Native SDK, REST API, Jetpack Compose, Kotlin Spring Boot Backend MVVM, MVI, Room, Unit / Instrument testing, Flow, Coroutines, SwiftUI, Compose Multiplatform, Dagger Hilt, Koin, CI/CD, Ktor"
        },
        {
            id: "2",
            jobTitle: "Software Development, Basic Data Science - Part-time Instructor",
            company: "American University of Afghanistan",
            startDate: "June 2019",
            endDate: "August 2023",
            description: "• Teach courses on 1) Native Mobile App Development Android & IOS 2) Intro to Data Science (Python Language) 3) Intro to Software Engineering 101, 103\n• Conduct ongoing development, assessment, and revision of curriculum that reflects innovative and inclusive pedagogy and advances in Mobile Application Development\n• Contributed intelligence and wisdom to the research department of the university"
        },
        {
            id: "3",
            jobTitle: "Lead of Software Development, Mobile Apps",
            company: "Office of the President - National Security Advisor",
            startDate: "January 2021",
            endDate: "May 2021",
            description: "• Handover of the software projects from assistant countries (NATO) to the Afghanistan Software Team\n• Head of Development for creating a Mobile app from scratch at the president's office, Notify, Report, Analysis, of all incidents happening in the country\n• An active member of the Mobile Governance Team Afghanistan"
        },
        {
            id: "4",
            jobTitle: "Lead Mobile App Developer",
            company: "Moore Afghanistan",
            startDate: "November 2016",
            endDate: "November 2020",
            description: "• Leading a team of Software developers to maintain and improve software systems, Databases. Hesab Pay is managing more than 300 Million Dollars now\n• Implemented magnetic card reading functionalities through mobile for POS machines\n• Implement the core functionalities for the Mobile Banking app, ride-hailing app, data collection Security, reporting, transaction histories\n• Developed and uploaded more than ten(10) mobile applications to Google Play, and Apple App Store used by more than 1 Million People"
        }
    ]);

    const [education, setEducation] = useState<Education[]>([
        {
            id: "1",
            degree: "Digital Product School",
            institution: "UnternehmerTUM, BMW",
            year: "03 May 2021 - 1 Nov 2021",
            description: "• Development of a proactive voice assistant in cooperation with BMW\n• Developed an Android Auto app for BMW\n• Working as a member of a cross-functional team"
        },
        {
            id: "2",
            degree: "Project Management-Online",
            institution: "University of Virginia",
            year: "Sep 2020 - Oct 2020",
            description: "• Learned how to manage technical projects\n• Effective means of monitoring and controlling project performance in line with objectives"
        },
        {
            id: "3",
            degree: "Bachelor of Computer Science",
            institution: "Kabul Education University, Kabul, Afghanistan",
            year: "2013 - 2017",
            description: "Software Engineering"
        },
        {
            id: "4",
            degree: "Diploma in English Language (DEL)",
            institution: "Kardan University",
            year: "2015 - 2016",
            description: "English Language Diploma, Kabul, Afghanistan"
        }
    ]);

    const [references, setReferences] = useState<Reference[]>([
        {
            id: "1",
            name: "Steffen Kastner",
            contact: "kastner@unternehmertum.de, Head of Product Management"
        },
        {
            id: "2",
            name: "Walid Chioukh",
            contact: "w.chouikh@technologyandstrategy.com, Manager at T & S Services"
        }
    ]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData({ ...formData, photo: reader.result as string });
            };
            reader.readAsDataURL(file);
        }
    };

    const removePhoto = () => {
        setFormData({ ...formData, photo: "" });
    };

    const addWorkExperience = () => {
        setWorkExperiences([
            { id: Date.now().toString(), jobTitle: "", company: "", startDate: "", endDate: "", description: "" },
            ...workExperiences
        ]);
    };

    const removeWorkExperience = (id: string) => {
        setWorkExperiences(workExperiences.filter(exp => exp.id !== id));
    };

    const updateWorkExperience = (id: string, field: string, value: string) => {
        setWorkExperiences(workExperiences.map(exp =>
            exp.id === id ? { ...exp, [field]: value } : exp
        ));
    };

    const moveWorkExperience = (id: string, direction: 'up' | 'down') => {
        const index = workExperiences.findIndex(exp => exp.id === id);
        if (index === -1) return;
        if (direction === 'up' && index === 0) return;
        if (direction === 'down' && index === workExperiences.length - 1) return;

        const newExperiences = [...workExperiences];
        const targetIndex = direction === 'up' ? index - 1 : index + 1;
        [newExperiences[index], newExperiences[targetIndex]] = [newExperiences[targetIndex], newExperiences[index]];
        setWorkExperiences(newExperiences);
    };

    const addEducation = () => {
        setEducation([
            { id: Date.now().toString(), degree: "", institution: "", year: "", description: "" },
            ...education
        ]);
    };

    const removeEducation = (id: string) => {
        setEducation(education.filter(edu => edu.id !== id));
    };

    const updateEducation = (id: string, field: string, value: string) => {
        setEducation(education.map(edu =>
            edu.id === id ? { ...edu, [field]: value } : edu
        ));
    };

    const moveEducation = (id: string, direction: 'up' | 'down') => {
        const index = education.findIndex(edu => edu.id === id);
        if (index === -1) return;
        if (direction === 'up' && index === 0) return;
        if (direction === 'down' && index === education.length - 1) return;

        const newEducation = [...education];
        const targetIndex = direction === 'up' ? index - 1 : index + 1;
        [newEducation[index], newEducation[targetIndex]] = [newEducation[targetIndex], newEducation[index]];
        setEducation(newEducation);
    };

    const addReference = () => {
        setReferences([
            { id: Date.now().toString(), name: "", contact: "" },
            ...references
        ]);
    };

    const removeReference = (id: string) => {
        setReferences(references.filter(ref => ref.id !== id));
    };

    const updateReference = (id: string, field: string, value: string) => {
        setReferences(references.map(ref =>
            ref.id === id ? { ...ref, [field]: value } : ref
        ));
    };

    const moveReference = (id: string, direction: 'up' | 'down') => {
        const index = references.findIndex(ref => ref.id === id);
        if (index === -1) return;
        if (direction === 'up' && index === 0) return;
        if (direction === 'down' && index === references.length - 1) return;

        const newReferences = [...references];
        const targetIndex = direction === 'up' ? index - 1 : index + 1;
        [newReferences[index], newReferences[targetIndex]] = [newReferences[targetIndex], newReferences[index]];
        setReferences(newReferences);
    };

    const moveSection = (id: string, direction: 'up' | 'down') => {
        const index = sections.findIndex(sec => sec.id === id);
        if (index === -1) return;
        if (direction === 'up' && index === 0) return;
        if (direction === 'down' && index === sections.length - 1) return;

        const newSections = [...sections];
        const targetIndex = direction === 'up' ? index - 1 : index + 1;
        [newSections[index], newSections[targetIndex]] = [newSections[targetIndex], newSections[index]];
        setSections(newSections);
    };

    const removeSection = (id: string) => {
        setSections(sections.filter(sec => sec.id !== id));
    };

    const addSection = (type: SectionType) => {
        const titles: Record<SectionType, string> = {
            workExperience: 'Work Experience',
            education: 'Education',
            skills: 'Skills',
            certifications: 'Certifications',
            references: 'References'
        };

        setSections([
            ...sections,
            { id: Date.now().toString(), type, title: titles[type] }
        ]);
    };

    const renderSection = (section: Section) => {
        const sectionIndex = sections.findIndex(s => s.id === section.id);

        const getSectionIcon = (type: SectionType) => {
            switch (type) {
                case 'workExperience': return Briefcase;
                case 'education': return GraduationCap;
                case 'skills': return Code;
                case 'certifications': return Award;
                case 'references': return Users;
                default: return FileText;
            }
        };

        const Icon = getSectionIcon(section.type);

        return (
            <AccordionItem key={section.id} value={section.id} className="border border-border/50 rounded-xl bg-card/50 backdrop-blur-sm overflow-hidden shadow-sm">
                <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-accent/50 transition-colors group">
                    <div className="flex items-center justify-between w-full pr-4">
                        <div className="flex items-center gap-3">
                            <div className={`p - 2 rounded - lg ${section.type === 'workExperience' ? 'bg-blue-500/10 text-blue-600' :
                                section.type === 'education' ? 'bg-purple-500/10 text-purple-600' :
                                    section.type === 'skills' ? 'bg-green-500/10 text-green-600' :
                                        section.type === 'certifications' ? 'bg-orange-500/10 text-orange-600' :
                                            'bg-pink-500/10 text-pink-600'
                                } `}>
                                <Icon className="w-5 h-5" />
                            </div>
                            <span className="text-lg font-semibold">{section.title}</span>
                        </div>
                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity" onClick={(e) => e.stopPropagation()}>
                            <Button
                                type="button"
                                onClick={() => moveSection(section.id, 'up')}
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                disabled={sectionIndex === 0}
                            >
                                <ArrowUp className="w-4 h-4" />
                            </Button>
                            <Button
                                type="button"
                                onClick={() => moveSection(section.id, 'down')}
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                disabled={sectionIndex === sections.length - 1}
                            >
                                <ArrowDown className="w-4 h-4" />
                            </Button>
                            <Button
                                type="button"
                                onClick={() => removeSection(section.id)}
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                            >
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6 pt-2">
                    {section.type === 'workExperience' && (
                        <div className="space-y-4">
                            {workExperiences.map((exp, index) => (
                                <Card key={exp.id} className="p-4 bg-background/50 border-border/50 relative group hover:border-primary/30 transition-colors">
                                    <div className="absolute top-4 right-4 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Button type="button" onClick={() => moveWorkExperience(exp.id, 'up')} variant="ghost" size="icon" className="h-7 w-7" disabled={index === 0}><ArrowUp className="w-3 h-3" /></Button>
                                        <Button type="button" onClick={() => moveWorkExperience(exp.id, 'down')} variant="ghost" size="icon" className="h-7 w-7" disabled={index === workExperiences.length - 1}><ArrowDown className="w-3 h-3" /></Button>
                                        <Button type="button" onClick={() => removeWorkExperience(exp.id)} variant="ghost" size="icon" className="h-7 w-7 text-destructive"><Trash2 className="w-3 h-3" /></Button>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <Label className="text-xs font-medium uppercase text-muted-foreground">Job Title</Label>
                                            <Input value={exp.jobTitle} onChange={(e) => updateWorkExperience(exp.id, "jobTitle", e.target.value)} placeholder="Software Engineer" className="mt-1 bg-transparent" />
                                        </div>
                                        <div>
                                            <Label className="text-xs font-medium uppercase text-muted-foreground">Company</Label>
                                            <Input value={exp.company} onChange={(e) => updateWorkExperience(exp.id, "company", e.target.value)} placeholder="Tech Corp" className="mt-1 bg-transparent" />
                                        </div>
                                        <div>
                                            <Label className="text-xs font-medium uppercase text-muted-foreground">Start Date</Label>
                                            <Input value={exp.startDate} onChange={(e) => updateWorkExperience(exp.id, "startDate", e.target.value)} placeholder="Jan 2020" className="mt-1 bg-transparent" />
                                        </div>
                                        <div>
                                            <Label className="text-xs font-medium uppercase text-muted-foreground">End Date</Label>
                                            <Input value={exp.endDate} onChange={(e) => updateWorkExperience(exp.id, "endDate", e.target.value)} placeholder="Present" className="mt-1 bg-transparent" />
                                        </div>
                                        <div className="md:col-span-2">
                                            <Label className="text-xs font-medium uppercase text-muted-foreground">Description</Label>
                                            <Textarea value={exp.description} onChange={(e) => updateWorkExperience(exp.id, "description", e.target.value)} placeholder="Key responsibilities..." className="mt-1 min-h-[100px] bg-transparent" />
                                        </div>
                                    </div>
                                </Card>
                            ))}
                            <Button type="button" onClick={addWorkExperience} variant="outline" size="sm" className="w-full border-dashed border-2 hover:border-primary hover:text-primary">
                                <Plus className="w-4 h-4 mr-2" /> Add Position
                            </Button>
                        </div>
                    )}

                    {section.type === 'education' && (
                        <div className="space-y-4">
                            {education.map((edu, index) => (
                                <Card key={edu.id} className="p-4 bg-background/50 border-border/50 relative group hover:border-primary/30 transition-colors">
                                    <div className="absolute top-4 right-4 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Button type="button" onClick={() => moveEducation(edu.id, 'up')} variant="ghost" size="icon" className="h-7 w-7" disabled={index === 0}><ArrowUp className="w-3 h-3" /></Button>
                                        <Button type="button" onClick={() => moveEducation(edu.id, 'down')} variant="ghost" size="icon" className="h-7 w-7" disabled={index === education.length - 1}><ArrowDown className="w-3 h-3" /></Button>
                                        <Button type="button" onClick={() => removeEducation(edu.id)} variant="ghost" size="icon" className="h-7 w-7 text-destructive"><Trash2 className="w-3 h-3" /></Button>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <Label className="text-xs font-medium uppercase text-muted-foreground">Degree</Label>
                                            <Input value={edu.degree} onChange={(e) => updateEducation(edu.id, "degree", e.target.value)} placeholder="Bachelor of Science" className="mt-1 bg-transparent" />
                                        </div>
                                        <div>
                                            <Label className="text-xs font-medium uppercase text-muted-foreground">Institution</Label>
                                            <Input value={edu.institution} onChange={(e) => updateEducation(edu.id, "institution", e.target.value)} placeholder="University Name" className="mt-1 bg-transparent" />
                                        </div>
                                        <div>
                                            <Label className="text-xs font-medium uppercase text-muted-foreground">Year</Label>
                                            <Input value={edu.year} onChange={(e) => updateEducation(edu.id, "year", e.target.value)} placeholder="2020" className="mt-1 bg-transparent" />
                                        </div>
                                        <div className="md:col-span-2">
                                            <Label className="text-xs font-medium uppercase text-muted-foreground">Description</Label>
                                            <Textarea value={edu.description} onChange={(e) => updateEducation(edu.id, "description", e.target.value)} placeholder="Achievements..." className="mt-1 min-h-[80px] bg-transparent" />
                                        </div>
                                    </div>
                                </Card>
                            ))}
                            <Button type="button" onClick={addEducation} variant="outline" size="sm" className="w-full border-dashed border-2 hover:border-primary hover:text-primary">
                                <Plus className="w-4 h-4 mr-2" /> Add Education
                            </Button>
                        </div>
                    )}

                    {section.type === 'skills' && (
                        <div className="space-y-2">
                            <Label className="text-xs font-medium uppercase text-muted-foreground">Skills List</Label>
                            <Textarea
                                name="skills"
                                value={formData.skills}
                                onChange={handleInputChange}
                                placeholder="e.g., JavaScript, React, Node.js..."
                                className="min-h-[150px] bg-background/50 border-border/50 focus:border-primary/50"
                            />
                        </div>
                    )}

                    {section.type === 'certifications' && (
                        <div className="space-y-2">
                            <Label className="text-xs font-medium uppercase text-muted-foreground">Certifications List</Label>
                            <Textarea
                                name="certifications"
                                value={formData.certifications}
                                onChange={handleInputChange}
                                placeholder="List your certifications..."
                                className="min-h-[150px] bg-background/50 border-border/50 focus:border-primary/50"
                            />
                        </div>
                    )}

                    {section.type === 'references' && (
                        <div className="space-y-4">
                            {references.map((ref, index) => (
                                <Card key={ref.id} className="p-4 bg-background/50 border-border/50 relative group hover:border-primary/30 transition-colors">
                                    <div className="absolute top-4 right-4 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Button type="button" onClick={() => moveReference(ref.id, 'up')} variant="ghost" size="icon" className="h-7 w-7" disabled={index === 0}><ArrowUp className="w-3 h-3" /></Button>
                                        <Button type="button" onClick={() => moveReference(ref.id, 'down')} variant="ghost" size="icon" className="h-7 w-7" disabled={index === references.length - 1}><ArrowDown className="w-3 h-3" /></Button>
                                        <Button type="button" onClick={() => removeReference(ref.id)} variant="ghost" size="icon" className="h-7 w-7 text-destructive"><Trash2 className="w-3 h-3" /></Button>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <Label className="text-xs font-medium uppercase text-muted-foreground">Name</Label>
                                            <Input value={ref.name} onChange={(e) => updateReference(ref.id, "name", e.target.value)} placeholder="John Doe" className="mt-1 bg-transparent" />
                                        </div>
                                        <div>
                                            <Label className="text-xs font-medium uppercase text-muted-foreground">Contact Info</Label>
                                            <Input value={ref.contact} onChange={(e) => updateReference(ref.id, "contact", e.target.value)} placeholder="email@example.com" className="mt-1 bg-transparent" />
                                        </div>
                                    </div>
                                </Card>
                            ))}
                            <Button type="button" onClick={addReference} variant="outline" size="sm" className="w-full border-dashed border-2 hover:border-primary hover:text-primary">
                                <Plus className="w-4 h-4 mr-2" /> Add Reference
                            </Button>
                        </div>
                    )}
                </AccordionContent>
            </AccordionItem>
        );
    };

    const generatePDF = () => {
        try {
            if (!selectedTemplate) {
                toast({
                    title: "No Template Selected",
                    description: "Please select a template first.",
                    variant: "destructive"
                });
                // navigate.push("/templates"); // Removed navigation as sidebar is present
                return;
            }

            if (!formData.fullName || !formData.email) {
                toast({
                    title: "Missing Information",
                    description: "Please fill in at least your name and email.",
                    variant: "destructive"
                });
                return;
            }

            const doc = generatePDFByTemplate(
                selectedTemplate.style,
                formData,
                workExperiences,
                education,
                references,
                sections.map(s => ({ type: s.type }))
            );

            doc.save(`${formData.fullName.replace(/\s+/g, '_')}_Resume.pdf`);

            toast({
                title: "Resume Generated!",
                description: "Your resume has been successfully generated and downloaded.",
            });
        } catch (error) {
            console.error("PDF Generation Error:", error);
            toast({
                title: "Generation Failed",
                description: "An error occurred while generating your resume. Please try again.",
                variant: "destructive"
            });
        }
    };

    const DollarRain = () => {
        const [mounted, setMounted] = useState(false);
        const [dollars, setDollars] = useState<{ left: string; animationDuration: string; animationDelay: string; fontSize: string }[]>([]);

        useEffect(() => {
            setMounted(true);
            setDollars(
                [...Array(10)].map(() => ({
                    left: `${Math.random() * 100}%`,
                    animationDuration: `${Math.random() * 3 + 4}s`,
                    animationDelay: `${Math.random() * 5}s`,
                    fontSize: `${Math.random() * 20 + 20}px`,
                }))
            );
        }, []);

        if (!mounted) return null;

        return (
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                {dollars.map((style, i) => (
                    <div
                        key={i}
                        className="absolute animate-fall opacity-20"
                        style={{
                            left: style.left,
                            top: '-100px',
                            animationDuration: style.animationDuration,
                            animationDelay: style.animationDelay,
                            fontSize: style.fontSize,
                        }}
                    >
                        💵
                    </div>
                ))}
            </div>
        );
    };

    return (
        <SidebarProvider>
            <div className="flex h-screen w-full bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 overflow-hidden relative">
                {/* Background Effects */}
                <DollarRain />
                <div className="fixed inset-0 -z-10">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-100/40 via-white to-slate-100/40 animate-gradient-shift"></div>
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-200/40 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
                    <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-200/40 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
                    <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-cyan-200/40 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
                </div>

                <TemplateSidebar />
                <SidebarInset className="flex-1 h-full overflow-hidden bg-transparent">
                    <div className="h-full overflow-y-auto pb-20 w-full relative z-10">
                        {/* Header */}
                        <div className="bg-white/70 backdrop-blur-xl border-b border-white/20 sticky top-0 z-20 shadow-sm">
                            <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <SidebarTrigger className="-ml-2 text-slate-600 hover:text-blue-600 transition-colors" />
                                    <Link href="/" className="flex items-center gap-2 group">
                                        <div className="p-1.5 bg-blue-600/10 rounded-lg group-hover:bg-blue-600/20 transition-colors">
                                            <Sparkles className="w-4 h-4 text-blue-600" />
                                        </div>
                                        <span className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors">Back to Home</span>
                                    </Link>
                                    <div className="h-4 w-[1px] bg-slate-300 mx-2" />
                                    <div className="flex items-center gap-2 text-sm text-slate-500">
                                        <span className="font-medium text-slate-900">{selectedTemplate?.name || "Select a Template"}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Button variant="outline" size="sm" className="gap-2 border-blue-200 text-blue-700 hover:bg-blue-50 hover:text-blue-800 hover:border-blue-300 transition-all">
                                        <Sparkles className="w-4 h-4" />
                                        Auto-Fill
                                    </Button>
                                    <Button onClick={generatePDF} size="sm" className="gap-2 bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20 transition-all hover:scale-105">
                                        <FileText className="w-4 h-4" />
                                        Download PDF
                                    </Button>
                                </div>
                            </div>
                        </div>

                        <div className="max-w-5xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
                            {/* Main Form Area */}
                            <div className="lg:col-span-12 space-y-8">
                                {/* Personal Info Section */}
                                <div className="space-y-6">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg shadow-blue-500/20 text-white">
                                            <UserCircle className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h2 className="text-2xl font-bold text-slate-800">Personal Information</h2>
                                            <p className="text-slate-500">Start with the basics to get hired.</p>
                                        </div>
                                    </div>

                                    <Accordion type="single" collapsible defaultValue="personal-info" className="w-full space-y-4">
                                        <AccordionItem value="personal-info" className="border border-white/40 rounded-2xl bg-white/60 backdrop-blur-md overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
                                            <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-white/40 transition-colors">
                                                <div className="flex items-center gap-3">
                                                    <div className="p-2 bg-blue-100/50 rounded-lg text-blue-600">
                                                        <UserCircle className="w-5 h-5" />
                                                    </div>
                                                    <span className="text-lg font-semibold text-slate-800">Personal Details</span>
                                                </div>
                                            </AccordionTrigger>
                                            <AccordionContent className="px-6 pb-8 pt-2">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    <div className="space-y-2">
                                                        <Label className="text-xs font-bold uppercase text-slate-500 tracking-wider">Full Name</Label>
                                                        <Input name="fullName" value={formData.fullName} onChange={handleInputChange} placeholder="e.g. John Doe" className="bg-white/50 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all h-11" />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label className="text-xs font-bold uppercase text-slate-500 tracking-wider">Professional Title</Label>
                                                        <Input name="professionalTitle" value={formData.professionalTitle} onChange={handleInputChange} placeholder="e.g. Senior Software Engineer" className="bg-white/50 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all h-11" />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label className="text-xs font-bold uppercase text-slate-500 tracking-wider">Email</Label>
                                                        <Input name="email" value={formData.email} onChange={handleInputChange} placeholder="john@example.com" className="bg-white/50 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all h-11" />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label className="text-xs font-bold uppercase text-slate-500 tracking-wider">Phone</Label>
                                                        <Input name="phone" value={formData.phone} onChange={handleInputChange} placeholder="+1 (555) 000-0000" className="bg-white/50 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all h-11" />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label className="text-xs font-bold uppercase text-slate-500 tracking-wider">Location</Label>
                                                        <Input name="address" value={formData.address} onChange={handleInputChange} placeholder="City, Country" className="bg-white/50 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all h-11" />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label className="text-xs font-bold uppercase text-slate-500 tracking-wider">LinkedIn (Optional)</Label>
                                                        <Input name="linkedin" value={formData.linkedin} onChange={handleInputChange} placeholder="linkedin.com/in/johndoe" className="bg-white/50 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all h-11" />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label className="text-xs font-bold uppercase text-slate-500 tracking-wider">GitHub (Optional)</Label>
                                                        <Input name="github" value={formData.github} onChange={handleInputChange} placeholder="github.com/johndoe" className="bg-white/50 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all h-11" />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label className="text-xs font-bold uppercase text-slate-500 tracking-wider">Photo</Label>
                                                        <div className="flex items-center gap-4">
                                                            <Input type="file" accept="image/*" onChange={handlePhotoUpload} className="bg-white/50 border-slate-200 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-all h-11 pt-1.5" />
                                                            {formData.photo && (
                                                                <Button type="button" variant="destructive" size="icon" onClick={removePhoto} className="h-10 w-10 shrink-0 rounded-full shadow-sm">
                                                                    <Trash2 className="w-4 h-4" />
                                                                </Button>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="col-span-1 md:col-span-2 space-y-2">
                                                        <Label className="text-xs font-bold uppercase text-slate-500 tracking-wider">Professional Summary</Label>
                                                        <Textarea name="summary" value={formData.summary} onChange={handleInputChange} placeholder="Briefly describe your professional background and key achievements..." className="bg-white/50 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all min-h-[120px] resize-y" />
                                                    </div>
                                                </div>
                                            </AccordionContent>
                                        </AccordionItem>

                                        {/* Dynamic Sections */}
                                        {sections.map(section => renderSection(section))}
                                    </Accordion>

                                    {/* Add Section Grid */}
                                    <div className="space-y-4">
                                        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider ml-1">Add Section</h3>
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                            <Button variant="outline" onClick={() => addSection('workExperience')} className="h-auto py-6 flex flex-col gap-3 bg-card/50 hover:bg-primary/5 hover:border-primary/50 transition-all group border-border/50 shadow-sm">
                                                <div className="p-2 bg-blue-500/10 text-blue-600 rounded-lg group-hover:scale-110 transition-transform">
                                                    <Briefcase className="w-6 h-6" />
                                                </div>
                                                <span className="font-medium">Work Experience</span>
                                            </Button>
                                            <Button variant="outline" onClick={() => addSection('education')} className="h-auto py-6 flex flex-col gap-3 bg-card/50 hover:bg-primary/5 hover:border-primary/50 transition-all group border-border/50 shadow-sm">
                                                <div className="p-2 bg-purple-500/10 text-purple-600 rounded-lg group-hover:scale-110 transition-transform">
                                                    <GraduationCap className="w-6 h-6" />
                                                </div>
                                                <span className="font-medium">Education</span>
                                            </Button>
                                            <Button variant="outline" onClick={() => addSection('skills')} className="h-auto py-6 flex flex-col gap-3 bg-card/50 hover:bg-primary/5 hover:border-primary/50 transition-all group border-border/50 shadow-sm">
                                                <div className="p-2 bg-green-500/10 text-green-600 rounded-lg group-hover:scale-110 transition-transform">
                                                    <Code className="w-6 h-6" />
                                                </div>
                                                <span className="font-medium">Skills</span>
                                            </Button>
                                            <Button variant="outline" onClick={() => addSection('certifications')} className="h-auto py-6 flex flex-col gap-3 bg-card/50 hover:bg-primary/5 hover:border-primary/50 transition-all group border-border/50 shadow-sm">
                                                <div className="p-2 bg-orange-500/10 text-orange-600 rounded-lg group-hover:scale-110 transition-transform">
                                                    <Award className="w-6 h-6" />
                                                </div>
                                                <span className="font-medium">Certifications</span>
                                            </Button>
                                            <Button variant="outline" onClick={() => addSection('references')} className="h-auto py-6 flex flex-col gap-3 bg-card/50 hover:bg-primary/5 hover:border-primary/50 transition-all group border-border/50 shadow-sm">
                                                <div className="p-2 bg-pink-500/10 text-pink-600 rounded-lg group-hover:scale-110 transition-transform">
                                                    <Users className="w-6 h-6" />
                                                </div>
                                                <span className="font-medium">References</span>
                                            </Button>
                                        </div>
                                    </div>
                                </div>

                                {/* Sidebar */}
                                <div className="lg:col-span-1">
                                    <div className="sticky top-24 space-y-6">
                                        <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50 shadow-lg relative overflow-hidden">
                                            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
                                            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                                                <Sparkles className="w-4 h-4 text-primary" />
                                                Resume Strength
                                            </h3>
                                            <div className="w-full bg-secondary/50 rounded-full h-3 mb-2 overflow-hidden">
                                                <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-full rounded-full animate-pulse" style={{ width: '85%' }}></div>
                                            </div>
                                            <p className="text-sm text-muted-foreground">
                                                Your resume is looking great! Add more details to reach 100%.
                                            </p>
                                        </Card>

                                        <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50 shadow-lg">
                                            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                                                <Gem className="w-4 h-4 text-primary" />
                                                Pro Tips
                                            </h3>
                                            <ul className="space-y-4 text-sm text-muted-foreground">
                                                <li className="flex gap-3 items-start">
                                                    <div className="mt-0.5 p-1 bg-green-500/10 rounded-full text-green-600 shrink-0">
                                                        <CheckCircle2 className="w-3 h-3" />
                                                    </div>
                                                    <span>Use action verbs like <strong>Managed</strong>, <strong>Created</strong>, and <strong>Led</strong>.</span>
                                                </li>
                                                <li className="flex gap-3 items-start">
                                                    <div className="mt-0.5 p-1 bg-green-500/10 rounded-full text-green-600 shrink-0">
                                                        <CheckCircle2 className="w-3 h-3" />
                                                    </div>
                                                    <span>Quantify achievements (e.g., "Increased sales by 20%").</span>
                                                </li>
                                                <li className="flex gap-3 items-start">
                                                    <div className="mt-0.5 p-1 bg-green-500/10 rounded-full text-green-600 shrink-0">
                                                        <CheckCircle2 className="w-3 h-3" />
                                                    </div>
                                                    <span>Tailor your summary to the specific job role.</span>
                                                </li>
                                            </ul>
                                        </Card>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </SidebarInset>
            </div>
        </SidebarProvider>
    );
};

export default Builder;
