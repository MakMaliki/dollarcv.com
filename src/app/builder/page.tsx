"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2, ArrowUp, ArrowDown, Palette, FileText, Sparkles, Briefcase, Code, GraduationCap, Columns, Calendar, BarChart3, Gem } from "lucide-react";
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
            creative: Palette,
            executive: Briefcase,
            tech: Code,
            academic: GraduationCap,
            twoColumn: Columns,
            timeline: Calendar,
            infographic: BarChart3,
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
        { id: '1', type: 'workExperience', title: 'Work Experience' },
        { id: '2', type: 'education', title: 'Education' },
        { id: '3', type: 'skills', title: 'Skills' },
        { id: '4', type: 'certifications', title: 'Certifications' },
        { id: '5', type: 'references', title: 'References' },
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

        switch (section.type) {
            case 'workExperience':
                return (
                    <div key={section.id} className="mb-8">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-semibold text-foreground">{section.title}</h2>
                            <div className="flex gap-2">
                                <Button type="button" onClick={addWorkExperience} variant="outline" size="sm">
                                    <Plus className="w-4 h-4 mr-2" />
                                    Add More
                                </Button>
                                <Button
                                    type="button"
                                    onClick={() => moveSection(section.id, 'up')}
                                    variant="ghost"
                                    size="sm"
                                    disabled={sectionIndex === 0}
                                >
                                    <ArrowUp className="w-4 h-4" />
                                </Button>
                                <Button
                                    type="button"
                                    onClick={() => moveSection(section.id, 'down')}
                                    variant="ghost"
                                    size="sm"
                                    disabled={sectionIndex === sections.length - 1}
                                >
                                    <ArrowDown className="w-4 h-4" />
                                </Button>
                                <Button
                                    type="button"
                                    onClick={() => removeSection(section.id)}
                                    variant="ghost"
                                    size="sm"
                                    className="text-destructive"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                        {workExperiences.map((exp, index) => (
                            <Card key={exp.id} className="p-4 mb-4 bg-accent border-border">
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="font-semibold text-foreground">Position {index + 1}</h3>
                                    <div className="flex gap-1">
                                        <Button
                                            type="button"
                                            onClick={() => moveWorkExperience(exp.id, 'up')}
                                            variant="ghost"
                                            size="sm"
                                            disabled={index === 0}
                                        >
                                            <ArrowUp className="w-4 h-4" />
                                        </Button>
                                        <Button
                                            type="button"
                                            onClick={() => moveWorkExperience(exp.id, 'down')}
                                            variant="ghost"
                                            size="sm"
                                            disabled={index === workExperiences.length - 1}
                                        >
                                            <ArrowDown className="w-4 h-4" />
                                        </Button>
                                        <Button
                                            type="button"
                                            onClick={() => removeWorkExperience(exp.id)}
                                            variant="ghost"
                                            size="sm"
                                            className="text-destructive hover:text-destructive"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <Label>Job Title</Label>
                                        <Input
                                            value={exp.jobTitle}
                                            onChange={(e) => updateWorkExperience(exp.id, "jobTitle", e.target.value)}
                                            placeholder="Software Engineer"
                                            className="mt-1"
                                        />
                                    </div>
                                    <div>
                                        <Label>Company</Label>
                                        <Input
                                            value={exp.company}
                                            onChange={(e) => updateWorkExperience(exp.id, "company", e.target.value)}
                                            placeholder="Tech Corp"
                                            className="mt-1"
                                        />
                                    </div>
                                    <div>
                                        <Label>Start Date</Label>
                                        <Input
                                            value={exp.startDate}
                                            onChange={(e) => updateWorkExperience(exp.id, "startDate", e.target.value)}
                                            placeholder="Jan 2020"
                                            className="mt-1"
                                        />
                                    </div>
                                    <div>
                                        <Label>End Date</Label>
                                        <Input
                                            value={exp.endDate}
                                            onChange={(e) => updateWorkExperience(exp.id, "endDate", e.target.value)}
                                            placeholder="Present"
                                            className="mt-1"
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <Label>Description</Label>
                                        <Textarea
                                            value={exp.description}
                                            onChange={(e) => updateWorkExperience(exp.id, "description", e.target.value)}
                                            placeholder="Key responsibilities and achievements..."
                                            className="mt-1 min-h-[100px]"
                                        />
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                );

            case 'education':
                return (
                    <div key={section.id} className="mb-8">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-semibold text-foreground">{section.title}</h2>
                            <div className="flex gap-2">
                                <Button type="button" onClick={addEducation} variant="outline" size="sm">
                                    <Plus className="w-4 h-4 mr-2" />
                                    Add More
                                </Button>
                                <Button
                                    type="button"
                                    onClick={() => moveSection(section.id, 'up')}
                                    variant="ghost"
                                    size="sm"
                                    disabled={sectionIndex === 0}
                                >
                                    <ArrowUp className="w-4 h-4" />
                                </Button>
                                <Button
                                    type="button"
                                    onClick={() => moveSection(section.id, 'down')}
                                    variant="ghost"
                                    size="sm"
                                    disabled={sectionIndex === sections.length - 1}
                                >
                                    <ArrowDown className="w-4 h-4" />
                                </Button>
                                <Button
                                    type="button"
                                    onClick={() => removeSection(section.id)}
                                    variant="ghost"
                                    size="sm"
                                    className="text-destructive"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                        {education.map((edu, index) => (
                            <Card key={edu.id} className="p-4 mb-4 bg-accent border-border">
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="font-semibold text-foreground">Education {index + 1}</h3>
                                    <div className="flex gap-1">
                                        <Button
                                            type="button"
                                            onClick={() => moveEducation(edu.id, 'up')}
                                            variant="ghost"
                                            size="sm"
                                            disabled={index === 0}
                                        >
                                            <ArrowUp className="w-4 h-4" />
                                        </Button>
                                        <Button
                                            type="button"
                                            onClick={() => moveEducation(edu.id, 'down')}
                                            variant="ghost"
                                            size="sm"
                                            disabled={index === education.length - 1}
                                        >
                                            <ArrowDown className="w-4 h-4" />
                                        </Button>
                                        <Button
                                            type="button"
                                            onClick={() => removeEducation(edu.id)}
                                            variant="ghost"
                                            size="sm"
                                            className="text-destructive hover:text-destructive"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <Label>Degree</Label>
                                        <Input
                                            value={edu.degree}
                                            onChange={(e) => updateEducation(edu.id, "degree", e.target.value)}
                                            placeholder="Bachelor of Science"
                                            className="mt-1"
                                        />
                                    </div>
                                    <div>
                                        <Label>Institution</Label>
                                        <Input
                                            value={edu.institution}
                                            onChange={(e) => updateEducation(edu.id, "institution", e.target.value)}
                                            placeholder="University Name"
                                            className="mt-1"
                                        />
                                    </div>
                                    <div>
                                        <Label>Year</Label>
                                        <Input
                                            value={edu.year}
                                            onChange={(e) => updateEducation(edu.id, "year", e.target.value)}
                                            placeholder="2020"
                                            className="mt-1"
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <Label>Description</Label>
                                        <Textarea
                                            value={edu.description}
                                            onChange={(e) => updateEducation(edu.id, "description", e.target.value)}
                                            placeholder="Achievements, coursework, honors..."
                                            className="mt-1 min-h-[80px]"
                                        />
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                );

            case 'skills':
                return (
                    <div key={section.id} className="mb-8">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-semibold text-foreground">{section.title}</h2>
                            <div className="flex gap-2">
                                <Button
                                    type="button"
                                    onClick={() => moveSection(section.id, 'up')}
                                    variant="ghost"
                                    size="sm"
                                    disabled={sectionIndex === 0}
                                >
                                    <ArrowUp className="w-4 h-4" />
                                </Button>
                                <Button
                                    type="button"
                                    onClick={() => moveSection(section.id, 'down')}
                                    variant="ghost"
                                    size="sm"
                                    disabled={sectionIndex === sections.length - 1}
                                >
                                    <ArrowDown className="w-4 h-4" />
                                </Button>
                                <Button
                                    type="button"
                                    onClick={() => removeSection(section.id)}
                                    variant="ghost"
                                    size="sm"
                                    className="text-destructive"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                        <Textarea
                            name="skills"
                            value={formData.skills}
                            onChange={handleInputChange}
                            placeholder="e.g., JavaScript, React, Node.js, Project Management, etc."
                            className="min-h-[100px]"
                        />
                    </div>
                );

            case 'certifications':
                return (
                    <div key={section.id} className="mb-8">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-semibold text-foreground">
                                {section.title} <span className="text-sm text-muted-foreground">(Optional)</span>
                            </h2>
                            <div className="flex gap-2">
                                <Button
                                    type="button"
                                    onClick={() => moveSection(section.id, 'up')}
                                    variant="ghost"
                                    size="sm"
                                    disabled={sectionIndex === 0}
                                >
                                    <ArrowUp className="w-4 h-4" />
                                </Button>
                                <Button
                                    type="button"
                                    onClick={() => moveSection(section.id, 'down')}
                                    variant="ghost"
                                    size="sm"
                                    disabled={sectionIndex === sections.length - 1}
                                >
                                    <ArrowDown className="w-4 h-4" />
                                </Button>
                                <Button
                                    type="button"
                                    onClick={() => removeSection(section.id)}
                                    variant="ghost"
                                    size="sm"
                                    className="text-destructive"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                        <Textarea
                            name="certifications"
                            value={formData.certifications}
                            onChange={handleInputChange}
                            placeholder="List your professional certifications..."
                            className="min-h-[100px]"
                        />
                    </div>
                );

            case 'references':
                return (
                    <div key={section.id} className="mb-8">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-semibold text-foreground">
                                {section.title} <span className="text-sm text-muted-foreground">(Optional)</span>
                            </h2>
                            <div className="flex gap-2">
                                <Button type="button" onClick={addReference} variant="outline" size="sm">
                                    <Plus className="w-4 h-4 mr-2" />
                                    Add More
                                </Button>
                                <Button
                                    type="button"
                                    onClick={() => moveSection(section.id, 'up')}
                                    variant="ghost"
                                    size="sm"
                                    disabled={sectionIndex === 0}
                                >
                                    <ArrowUp className="w-4 h-4" />
                                </Button>
                                <Button
                                    type="button"
                                    onClick={() => moveSection(section.id, 'down')}
                                    variant="ghost"
                                    size="sm"
                                    disabled={sectionIndex === sections.length - 1}
                                >
                                    <ArrowDown className="w-4 h-4" />
                                </Button>
                                <Button
                                    type="button"
                                    onClick={() => removeSection(section.id)}
                                    variant="ghost"
                                    size="sm"
                                    className="text-destructive"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                        {references.map((ref, index) => (
                            <Card key={ref.id} className="p-4 mb-4 bg-accent border-border">
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="font-semibold text-foreground">Reference {index + 1}</h3>
                                    <div className="flex gap-1">
                                        <Button
                                            type="button"
                                            onClick={() => moveReference(ref.id, 'up')}
                                            variant="ghost"
                                            size="sm"
                                            disabled={index === 0}
                                        >
                                            <ArrowUp className="w-4 h-4" />
                                        </Button>
                                        <Button
                                            type="button"
                                            onClick={() => moveReference(ref.id, 'down')}
                                            variant="ghost"
                                            size="sm"
                                            disabled={index === references.length - 1}
                                        >
                                            <ArrowDown className="w-4 h-4" />
                                        </Button>
                                        <Button
                                            type="button"
                                            onClick={() => removeReference(ref.id)}
                                            variant="ghost"
                                            size="sm"
                                            className="text-destructive hover:text-destructive"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <Label>Name</Label>
                                        <Input
                                            value={ref.name}
                                            onChange={(e) => updateReference(ref.id, "name", e.target.value)}
                                            placeholder="John Doe"
                                            className="mt-1"
                                        />
                                    </div>
                                    <div>
                                        <Label>Contact Info</Label>
                                        <Input
                                            value={ref.contact}
                                            onChange={(e) => updateReference(ref.id, "contact", e.target.value)}
                                            placeholder="email@example.com, Position/Title"
                                            className="mt-1"
                                        />
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                );

            default:
                return null;
        }
    };

    const generatePDF = () => {
        if (!selectedTemplate) {
            toast({
                title: "No Template Selected",
                description: "Please select a template first.",
                variant: "destructive"
            });
            navigate.push("/templates");
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
    };

    return (
        <div className="min-h-screen bg-background pb-20">
            {/* Header */}
            <div className="bg-background border-b border-border sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <Link href="/" className="text-primary hover:underline">
                            ← Home
                        </Link>
                        <div className="h-6 w-px bg-border"></div>
                        <Link href="/templates" className="text-muted-foreground hover:text-foreground">
                            Change Template
                        </Link>
                        <div className="h-6 w-px bg-border"></div>
                        <span className="font-semibold text-foreground">
                            {selectedTemplate?.name || "Resume Builder"}
                        </span>
                    </div>
                    <Button onClick={generatePDF} className="gradient-primary shadow-elegant">
                        Download PDF
                    </Button>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Form */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Personal Info */}
                        <Card className="p-6 bg-card border-border shadow-sm">
                            <h2 className="text-2xl font-semibold text-foreground mb-6">Personal Information</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="md:col-span-2 flex items-center gap-4 mb-4">
                                    <div className="w-24 h-24 bg-accent rounded-full flex items-center justify-center overflow-hidden border-2 border-border relative group">
                                        {formData.photo ? (
                                            <>
                                                <img src={formData.photo} alt="Profile" className="w-full h-full object-cover" />
                                                <button
                                                    onClick={removePhoto}
                                                    className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-opacity"
                                                >
                                                    <Trash2 className="w-6 h-6" />
                                                </button>
                                            </>
                                        ) : (
                                            <div className="text-muted-foreground text-xs text-center p-2">
                                                Upload Photo
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <Label htmlFor="photo-upload" className="cursor-pointer">
                                            <div className="flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80 transition-colors">
                                                <Plus className="w-4 h-4" />
                                                <span>Upload Photo</span>
                                            </div>
                                            <Input
                                                id="photo-upload"
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                onChange={handlePhotoUpload}
                                            />
                                        </Label>
                                        <p className="text-xs text-muted-foreground mt-2">Recommended: Square JPG or PNG</p>
                                    </div>
                                </div>

                                <div>
                                    <Label>Full Name</Label>
                                    <Input
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleInputChange}
                                        placeholder="John Doe"
                                        className="mt-1"
                                    />
                                </div>
                                <div>
                                    <Label>Professional Title</Label>
                                    <Input
                                        name="professionalTitle"
                                        value={formData.professionalTitle}
                                        onChange={handleInputChange}
                                        placeholder="Software Engineer"
                                        className="mt-1"
                                    />
                                </div>
                                <div>
                                    <Label>Email</Label>
                                    <Input
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder="john@example.com"
                                        className="mt-1"
                                    />
                                </div>
                                <div>
                                    <Label>Phone</Label>
                                    <Input
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        placeholder="+1 234 567 890"
                                        className="mt-1"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <Label>Address</Label>
                                    <Input
                                        name="address"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        placeholder="City, Country"
                                        className="mt-1"
                                    />
                                </div>
                                <div>
                                    <Label>LinkedIn</Label>
                                    <Input
                                        name="linkedin"
                                        value={formData.linkedin}
                                        onChange={handleInputChange}
                                        placeholder="linkedin.com/in/johndoe"
                                        className="mt-1"
                                    />
                                </div>
                                <div>
                                    <Label>GitHub / Portfolio</Label>
                                    <Input
                                        name="github"
                                        value={formData.github}
                                        onChange={handleInputChange}
                                        placeholder="github.com/johndoe"
                                        className="mt-1"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <Label>Professional Summary</Label>
                                    <Textarea
                                        name="summary"
                                        value={formData.summary}
                                        onChange={handleInputChange}
                                        placeholder="Brief overview of your professional background..."
                                        className="mt-1 min-h-[100px]"
                                    />
                                </div>
                            </div>
                        </Card>

                        {/* Dynamic Sections */}
                        {sections.map(section => renderSection(section))}

                        {/* Add Section Buttons */}
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            <Button variant="outline" onClick={() => addSection('workExperience')} className="h-auto py-4 flex flex-col gap-2">
                                <Briefcase className="w-6 h-6" />
                                <span>Add Work Experience</span>
                            </Button>
                            <Button variant="outline" onClick={() => addSection('education')} className="h-auto py-4 flex flex-col gap-2">
                                <GraduationCap className="w-6 h-6" />
                                <span>Add Education</span>
                            </Button>
                            <Button variant="outline" onClick={() => addSection('skills')} className="h-auto py-4 flex flex-col gap-2">
                                <Code className="w-6 h-6" />
                                <span>Add Skills</span>
                            </Button>
                            <Button variant="outline" onClick={() => addSection('certifications')} className="h-auto py-4 flex flex-col gap-2">
                                <Award className="w-6 h-6" />
                                <span>Add Certifications</span>
                            </Button>
                            <Button variant="outline" onClick={() => addSection('references')} className="h-auto py-4 flex flex-col gap-2">
                                <Users className="w-6 h-6" />
                                <span>Add References</span>
                            </Button>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 space-y-6">
                            <Card className="p-6 bg-card border-border shadow-sm">
                                <h3 className="font-semibold text-foreground mb-4">Resume Strength</h3>
                                <div className="w-full bg-secondary rounded-full h-2.5 mb-2">
                                    <div className="bg-primary h-2.5 rounded-full" style={{ width: '85%' }}></div>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                    Your resume is looking great! Add more details to reach 100%.
                                </p>
                            </Card>

                            <Card className="p-6 bg-card border-border shadow-sm">
                                <h3 className="font-semibold text-foreground mb-4">Tips</h3>
                                <ul className="space-y-3 text-sm text-muted-foreground">
                                    <li className="flex gap-2">
                                        <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                                        <span>Use action verbs (Managed, Created, Led)</span>
                                    </li>
                                    <li className="flex gap-2">
                                        <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                                        <span>Quantify achievements where possible</span>
                                    </li>
                                    <li className="flex gap-2">
                                        <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                                        <span>Tailor your summary to the job role</span>
                                    </li>
                                    <li className="flex gap-2">
                                        <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                                        <span>Keep it concise and easy to read</span>
                                    </li>
                                </ul>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

import { Award, Users, CheckCircle2 } from "lucide-react";

export default Builder;
