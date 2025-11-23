"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Buy = () => {
    const navigate = useRouter();

    const plans = [
        {
            duration: "2 Months",
            price: "$1.99",
            description: "Best for Quick Updates",
            popular: false
        },
        {
            duration: "1 Year",
            price: "$9.99",
            description: "Most Popular",
            popular: true
        },
        {
            duration: "2 Years",
            price: "$15.00",
            description: "Best Value",
            popular: true
        }
    ];

    const features = [
        "Unlimited edits during your plan",
        "PDF download anytime",
        "No watermarks",
        "Professional templates",
        "Instant access"
    ];

    const handleSelectPlan = () => {
        navigate.push("/pricing");
    };

    return (
        <div className="min-h-screen gradient-hero py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12 animate-fade-in">
                    <Link href="/" className="text-primary hover:underline mb-4 inline-block">
                        ← Back to Home
                    </Link>
                    <h1 className="text-5xl font-bold text-foreground mb-4">
                        Resume Services - Pricing
                    </h1>
                    <p className="text-xl text-muted-foreground">
                        For detailed pricing information, please visit our pricing page
                    </p>
                    <Link href="/pricing">
                        <Button size="lg" className="mt-6 gradient-primary">
                            View All Pricing Options
                        </Button>
                    </Link>
                </div>

                {/* Info Section - Redirect to Pricing */}
                <Card className="p-8 shadow-card max-w-3xl mx-auto text-center bg-accent border-border animate-fade-in">
                    <h3 className="text-2xl font-bold text-foreground mb-4">
                        Professional Resume Services
                    </h3>
                    <p className="text-muted-foreground mb-6">
                        We offer comprehensive resume writing services with professional templates,
                        unlimited edits, and expert guidance to help you land your dream job.
                    </p>
                    <Link href="/pricing">
                        <Button size="lg" className="gradient-primary">
                            View Complete Pricing Plans
                        </Button>
                    </Link>
                </Card>
            </div>
        </div>
    );
};

export default Buy;
