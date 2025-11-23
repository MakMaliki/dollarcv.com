"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle2, Target, Users, Award } from "lucide-react";
import Link from "next/link";

export default function About() {
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
                        <Link href="/about" className="text-primary font-medium">
                            About Us
                        </Link>
                        <Link href="/templates" className="text-foreground hover:text-primary transition-smooth font-medium">
                            Resumes
                        </Link>
                        <Link href="/selection-criteria" className="text-foreground hover:text-primary transition-smooth font-medium">
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
                        About Dollarcv.com
                    </h1>
                    <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
                        Your trusted partner in crafting professional resumes that get you noticed and land you interviews.
                    </p>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-16 sm:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
                                Our Mission
                            </h2>
                            <p className="text-lg text-muted-foreground mb-4">
                                At Dollarcv.com, we believe everyone deserves a professionally crafted resume that showcases their unique talents and experiences. Our mission is to make professional resume writing accessible and affordable for all job seekers.
                            </p>
                            <p className="text-lg text-muted-foreground">
                                We combine cutting-edge technology with proven resume writing strategies to help you stand out in today's competitive job market.
                            </p>
                        </div>
                        <div className="bg-accent/20 rounded-lg p-8">
                            <div className="grid grid-cols-2 gap-6">
                                <div className="text-center">
                                    <div className="text-4xl font-bold text-primary mb-2">10K+</div>
                                    <div className="text-sm text-muted-foreground">Resumes Created</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-4xl font-bold text-primary mb-2">95%</div>
                                    <div className="text-sm text-muted-foreground">Success Rate</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-4xl font-bold text-primary mb-2">50+</div>
                                    <div className="text-sm text-muted-foreground">Industries</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-4xl font-bold text-primary mb-2">24/7</div>
                                    <div className="text-sm text-muted-foreground">Support</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-16 sm:py-20 bg-accent/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl sm:text-4xl font-bold text-center text-foreground mb-12">
                        Our Core Values
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-background rounded-lg p-6 shadow-sm">
                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                                <Target className="w-6 h-6 text-primary" />
                            </div>
                            <h3 className="text-xl font-semibold text-foreground mb-3">Quality First</h3>
                            <p className="text-muted-foreground">
                                Every resume we help create meets the highest standards of professional writing and formatting.
                            </p>
                        </div>
                        <div className="bg-background rounded-lg p-6 shadow-sm">
                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                                <Users className="w-6 h-6 text-primary" />
                            </div>
                            <h3 className="text-xl font-semibold text-foreground mb-3">Customer Success</h3>
                            <p className="text-muted-foreground">
                                Your success is our success. We're committed to helping you achieve your career goals.
                            </p>
                        </div>
                        <div className="bg-background rounded-lg p-6 shadow-sm">
                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                                <Award className="w-6 h-6 text-primary" />
                            </div>
                            <h3 className="text-xl font-semibold text-foreground mb-3">Innovation</h3>
                            <p className="text-muted-foreground">
                                We continuously improve our tools and templates to stay ahead of hiring trends.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 sm:py-20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
                        Ready to Create Your Perfect Resume?
                    </h2>
                    <p className="text-lg text-muted-foreground mb-8">
                        Join thousands of satisfied professionals who landed their dream jobs with our help.
                    </p>
                    <Link href="/builder">
                        <Button size="lg" className="text-lg px-8 py-6">
                            Get Started Now
                        </Button>
                    </Link>
                </div>
            </section>
        </div>
    );
}
