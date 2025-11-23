"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function Pricing() {
    const plans = [
        {
            name: "Basic",
            price: "$49",
            description: "Perfect for entry-level positions",
            features: [
                "1 Professional Resume",
                "ATS-Optimized Format",
                "2 Template Choices",
                "PDF Download",
                "48-Hour Delivery",
                "Email Support"
            ],
            popular: false
        },
        {
            name: "Professional",
            price: "$99",
            description: "Most popular for career growth",
            features: [
                "1 Professional Resume",
                "1 Cover Letter",
                "ATS-Optimized Format",
                "All Template Choices",
                "PDF & Word Download",
                "24-Hour Delivery",
                "Priority Email Support",
                "1 Free Revision"
            ],
            popular: true
        },
        {
            name: "Executive",
            price: "$199",
            description: "For senior-level positions",
            features: [
                "1 Professional Resume",
                "1 Cover Letter",
                "LinkedIn Profile Optimization",
                "ATS-Optimized Format",
                "All Template Choices",
                "PDF & Word Download",
                "12-Hour Delivery",
                "Priority Phone Support",
                "Unlimited Revisions",
                "30-Day Update Guarantee"
            ],
            popular: false
        }
    ];

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
                        <Link href="/selection-criteria" className="text-foreground hover:text-primary transition-smooth font-medium">
                            Selection Criteria
                        </Link>
                        <Link href="/pricing" className="text-primary font-medium">
                            Prices
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="bg-gradient-to-b from-accent/30 to-background py-16 sm:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                        Simple, Transparent Pricing
                    </h1>
                    <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
                        Choose the perfect plan for your career goals. All plans include professional quality and ATS optimization.
                    </p>
                </div>
            </section>

            {/* Pricing Cards */}
            <section className="py-16 sm:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-3 gap-8">
                        {plans.map((plan) => (
                            <div
                                key={plan.name}
                                className={`relative bg-background rounded-lg shadow-lg border-2 ${plan.popular ? "border-primary" : "border-border"
                                    } p-8`}
                            >
                                {plan.popular && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
                                        Most Popular
                                    </div>
                                )}
                                <div className="text-center mb-6">
                                    <h3 className="text-2xl font-bold text-foreground mb-2">{plan.name}</h3>
                                    <div className="text-4xl font-bold text-primary mb-2">{plan.price}</div>
                                    <p className="text-muted-foreground">{plan.description}</p>
                                </div>
                                <ul className="space-y-3 mb-8">
                                    {plan.features.map((feature) => (
                                        <li key={feature} className="flex items-start gap-3">
                                            <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                                            <span className="text-foreground">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                                <Link href="/builder">
                                    <Button
                                        className="w-full"
                                        variant={plan.popular ? "default" : "outline"}
                                        size="lg"
                                    >
                                        Get Started
                                    </Button>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Selection Criteria Pricing */}
            <section className="py-16 sm:py-20 bg-accent/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                            Selection Criteria Services
                        </h2>
                        <p className="text-lg text-muted-foreground">
                            Professional responses tailored to your job application
                        </p>
                    </div>
                    <div className="max-w-2xl mx-auto bg-background rounded-lg shadow-lg p-8">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-6">
                            <div>
                                <h3 className="text-2xl font-bold text-foreground mb-2">Custom Quote</h3>
                                <p className="text-muted-foreground">
                                    Pricing varies based on the number of criteria and complexity
                                </p>
                            </div>
                            <div className="text-3xl font-bold text-primary">From $150</div>
                        </div>
                        <ul className="space-y-3 mb-8">
                            <li className="flex items-start gap-3">
                                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                                <span className="text-foreground">STAR Method Framework</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                                <span className="text-foreground">Tailored to Job Requirements</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                                <span className="text-foreground">Expert Writer Review</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                                <span className="text-foreground">Unlimited Revisions</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                                <span className="text-foreground">48-Hour Turnaround</span>
                            </li>
                        </ul>
                        <Link href="/selection-criteria">
                            <Button className="w-full" size="lg">
                                Learn More
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-16 sm:py-20">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl sm:text-4xl font-bold text-center text-foreground mb-12">
                        Frequently Asked Questions
                    </h2>
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-xl font-semibold text-foreground mb-2">
                                What payment methods do you accept?
                            </h3>
                            <p className="text-muted-foreground">
                                We accept all major credit cards, PayPal, and bank transfers for your convenience.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-foreground mb-2">
                                Can I get a refund if I'm not satisfied?
                            </h3>
                            <p className="text-muted-foreground">
                                Yes! We offer a 100% satisfaction guarantee. If you're not happy with your resume, we'll revise it until you are, or provide a full refund.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-foreground mb-2">
                                How long does it take to receive my resume?
                            </h3>
                            <p className="text-muted-foreground">
                                Delivery times vary by plan: 48 hours for Basic, 24 hours for Professional, and 12 hours for Executive. Rush delivery is available for an additional fee.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-foreground mb-2">
                                What if I need to update my resume later?
                            </h3>
                            <p className="text-muted-foreground">
                                Executive plan includes a 30-day update guarantee. For other plans, we offer discounted update services for existing customers.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 sm:py-20 bg-gradient-to-b from-accent/30 to-background">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
                        Ready to Get Started?
                    </h2>
                    <p className="text-lg text-muted-foreground mb-8">
                        Join thousands of professionals who landed their dream jobs with our help.
                    </p>
                    <Link href="/builder">
                        <Button size="lg" className="text-lg px-8 py-6">
                            Create Your Resume Now
                        </Button>
                    </Link>
                </div>
            </section>
        </div>
    );
}
