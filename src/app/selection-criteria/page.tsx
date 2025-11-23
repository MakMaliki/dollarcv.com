"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle2, FileText, Star, Zap } from "lucide-react";
import Link from "next/link";

export default function SelectionCriteria() {
    return (
        <div className="min-h-screen bg-background">
            {/* Navigation */}
            <nav className="bg-background border-b border-border py-4 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
                            <svg viewBox="0 0 24 24" className="w-5 h-5 text-primary-foreground" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                <polyline points="14 2 14 8 20 8" />
                                <line x1="16" y1="13" x2="8" y2="13" />
                                <line x1="16" y1="17" x2="8" y2="17" />
                                <polyline points="10 9 9 9 8 9" />
                            </svg>
                        </div>
                        <span className="text-lg font-bold text-primary">Dollarcv.com</span>
                    </Link>

                    <div className="hidden md:flex items-center gap-8">
                        <Link href="/" className="text-foreground hover:text-primary transition-smooth font-medium">
                            Home
                        </Link>
                        <Link href="/about" className="text-foreground hover:text-primary transition-smooth font-medium">
                            About Us
                        </Link>
                        <Link href="/templates" className="text-foreground hover:text-primary transition-smooth font-medium">
                            Resumes
                        </Link>
                        <Link href="/selection-criteria" className="text-primary font-medium">
                            Selection Criteria
                        </Link>
                        <Link href="/pricing" className="text-foreground hover:text-primary transition-smooth font-medium">
                            Prices
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="bg-gradient-to-b from-accent/30 to-background py-16 sm:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                        Selection Criteria Services
                    </h1>
                    <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
                        Professional selection criteria responses that showcase your qualifications and help you stand out in government and corporate applications.
                    </p>
                </div>
            </section>

            {/* What is Selection Criteria */}
            <section className="py-16 sm:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6 text-center">
                            What is Selection Criteria?
                        </h2>
                        <p className="text-lg text-muted-foreground mb-4">
                            Selection criteria are specific skills, knowledge, and experience requirements that employers use to evaluate candidates. They're commonly used in government job applications and many corporate positions.
                        </p>
                        <p className="text-lg text-muted-foreground">
                            Our expert writers help you craft compelling responses using the STAR method (Situation, Task, Action, Result) to demonstrate how you meet each criterion.
                        </p>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="py-16 sm:py-20 bg-accent/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl sm:text-4xl font-bold text-center text-foreground mb-12">
                        Our Selection Criteria Services Include
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-background rounded-lg p-6 shadow-sm">
                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                                <FileText className="w-6 h-6 text-primary" />
                            </div>
                            <h3 className="text-xl font-semibold text-foreground mb-3">STAR Method</h3>
                            <p className="text-muted-foreground">
                                Structured responses using the proven STAR framework to highlight your achievements.
                            </p>
                        </div>
                        <div className="bg-background rounded-lg p-6 shadow-sm">
                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                                <Star className="w-6 h-6 text-primary" />
                            </div>
                            <h3 className="text-xl font-semibold text-foreground mb-3">Custom Tailored</h3>
                            <p className="text-muted-foreground">
                                Every response is tailored to the specific requirements of your target position.
                            </p>
                        </div>
                        <div className="bg-background rounded-lg p-6 shadow-sm">
                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                                <Zap className="w-6 h-6 text-primary" />
                            </div>
                            <h3 className="text-xl font-semibold text-foreground mb-3">Quick Turnaround</h3>
                            <p className="text-muted-foreground">
                                Fast delivery without compromising quality - get your responses when you need them.
                            </p>
                        </div>
                        <div className="bg-background rounded-lg p-6 shadow-sm">
                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                                <CheckCircle2 className="w-6 h-6 text-primary" />
                            </div>
                            <h3 className="text-xl font-semibold text-foreground mb-3">Expert Review</h3>
                            <p className="text-muted-foreground">
                                Professional writers with government application experience review every response.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Process */}
            <section className="py-16 sm:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl sm:text-4xl font-bold text-center text-foreground mb-12">
                        Our Process
                    </h2>
                    <div className="max-w-3xl mx-auto space-y-6">
                        <div className="flex gap-4">
                            <div className="flex-shrink-0 w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold">
                                1
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-foreground mb-2">Share Your Details</h3>
                                <p className="text-muted-foreground">
                                    Provide us with the selection criteria requirements and your relevant experience.
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="flex-shrink-0 w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold">
                                2
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-foreground mb-2">Expert Writing</h3>
                                <p className="text-muted-foreground">
                                    Our professional writers craft compelling responses using the STAR method.
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="flex-shrink-0 w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold">
                                3
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-foreground mb-2">Review & Revise</h3>
                                <p className="text-muted-foreground">
                                    We review your responses and offer revisions to ensure they're perfect.
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="flex-shrink-0 w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold">
                                4
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-foreground mb-2">Ready to Submit</h3>
                                <p className="text-muted-foreground">
                                    Receive your polished selection criteria responses, ready for submission.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 sm:py-20 bg-gradient-to-b from-accent/30 to-background">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
                        Ready to Ace Your Selection Criteria?
                    </h2>
                    <p className="text-lg text-muted-foreground mb-8">
                        Let our experts help you craft responses that get you noticed.
                    </p>
                    <Link href="/pricing">
                        <Button size="lg" className="text-lg px-8 py-6">
                            View Pricing
                        </Button>
                    </Link>
                </div>
            </section>
        </div>
    );
}
