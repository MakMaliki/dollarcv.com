"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Sparkles, Zap, Award, TrendingUp, Star, ShieldCheck, Target, FileCheck } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

const ClientOnlyTwinkles = () => {
  const [mounted, setMounted] = useState(false);
  const [twinkles, setTwinkles] = useState<{ left: string; top: string; delay: string; opacity: number }[]>([]);

  useEffect(() => {
    setMounted(true);
    setTwinkles(
      [...Array(30)].map(() => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        delay: `${Math.random() * 3}s`,
        opacity: Math.random() * 0.5 + 0.2,
      }))
    );
  }, []);

  if (!mounted) return null;

  return (
    <>
      {twinkles.map((style, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 bg-blue-600 rounded-full animate-twinkle"
          style={{
            left: style.left,
            top: style.top,
            animationDelay: style.delay,
            opacity: style.opacity,
          }}
        />
      ))}
    </>
  );
};

const AnimatedCounter = () => {
  const [count, setCount] = useState(100000);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setCount((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!mounted) return <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">100,000+</div>;

  return (
    <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 transition-all duration-500 transform hover:scale-110">
      {count.toLocaleString()}+
    </div>
  );
};

const DollarRain = () => {
  const [mounted, setMounted] = useState(false);
  const [dollars, setDollars] = useState<{ left: string; animationDuration: string; animationDelay: string; fontSize: string }[]>([]);

  useEffect(() => {
    setMounted(true);
    setDollars(
      [...Array(4)].map(() => ({
        left: `${Math.random() * 100}%`,
        animationDuration: `${Math.random() * 3 + 4}s`,
        animationDelay: `${Math.random() * 5}s`,
        fontSize: `${Math.random() * 20 + 30}px`,
      }))
    );
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {dollars.map((style, i) => (
        <div
          key={i}
          className="absolute animate-fall opacity-30"
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

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 relative overflow-hidden">
      {/* Dollar Rain Animation */}
      <DollarRain />

      {/* Animated Mesh Gradient Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100/40 via-white to-slate-100/40 animate-gradient-shift"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-200/40 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-200/40 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-cyan-200/40 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>

        {/* Animated Dots Pattern */}
        <div className="absolute inset-0 opacity-10">
          <ClientOnlyTwinkles />
        </div>
      </div>

      {/* Premium Glassmorphic Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-2xl bg-white/80 border-b border-slate-200/60 shadow-sm supports-[backdrop-filter]:bg-white/60">
        <div className="max-w-7xl mx-auto py-4 px-0 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between px-4 sm:px-0">
            {/* Logo with Premium Glow Effect */}
            <div className="flex items-center gap-3 group cursor-pointer">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-600 rounded-xl blur-lg opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
                <div className="relative w-10 h-10 bg-gradient-to-br from-blue-700 to-indigo-800 rounded-xl flex items-center justify-center transform group-hover:scale-105 transition-transform duration-500 shadow-lg border border-white/20">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
              </div>
              <span className="text-xl font-bold text-slate-900 tracking-tight group-hover:text-blue-700 transition-colors duration-300">
                DollarCV
              </span>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center gap-8">
              {['Home', 'About Us', 'Resumes', 'Selection Criteria', 'Prices'].map((item, index) => {
                const links = ['/', '/about', '/templates', '/selection-criteria', '/pricing'];
                return (
                  <Link
                    key={item}
                    href={links[index]}
                    className="text-lg font-semibold text-slate-600 hover:text-blue-700 transition-all duration-300 relative group"
                  >
                    {item}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 rounded-full group-hover:w-full transition-all duration-300 opacity-0 group-hover:opacity-100"></span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section with 3D Effect */}
      <section className="relative pt-20 pb-12 sm:pt-32 sm:pb-16 overflow-hidden flex items-center justify-center min-h-[70vh]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Floating Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-blue-400 to-indigo-400 rounded-full opacity-20 blur-xl animate-float"></div>
            <div className="absolute top-40 right-20 w-32 h-32 bg-gradient-to-br from-indigo-400 to-blue-400 rounded-full opacity-20 blur-xl animate-float animation-delay-1000"></div>
            <div className="absolute bottom-20 left-1/3 w-24 h-24 bg-gradient-to-br from-cyan-400 to-blue-400 rounded-full opacity-20 blur-xl animate-float animation-delay-2000"></div>
          </div>

          <div className="relative text-center space-y-10 animate-fade-in-up">

            {/* Main Headline with Gradient - Single Line */}
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black leading-tight tracking-tight text-slate-900">
              Create Your <span className="animate-shimmer inline-block transform hover:scale-105 transition-transform duration-300 cursor-default text-blue-700">Dream Resume</span> In Minutes
            </h1>

            {/* Motivational Subheading with ATS Focus */}
            <div className="max-w-3xl mx-auto space-y-6">
              <p className="text-xl sm:text-2xl text-slate-600 leading-relaxed font-light">
                Beat the bots and get hired faster. Our templates are designed to
                <span className="block mt-2 text-blue-700 font-bold text-2xl sm:text-3xl">
                  Filter 99% of ATS Systems
                </span>
              </p>

              <div className="flex flex-wrap justify-center gap-4 mt-4">
                <div className="flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full border border-blue-100 shadow-sm text-slate-700">
                  <ShieldCheck className="w-5 h-5 text-green-600" />
                  <span className="font-medium">ATS Friendly</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full border border-blue-100 shadow-sm text-slate-700">
                  <Target className="w-5 h-5 text-blue-600" />
                  <span className="font-medium">Keyword Optimized</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full border border-blue-100 shadow-sm text-slate-700">
                  <FileCheck className="w-5 h-5 text-indigo-600" />
                  <span className="font-medium">Recruiter Approved</span>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
              <Link href="/builder">
                <Button
                  size="lg"
                  className="group relative px-10 py-8 text-xl font-bold overflow-hidden bg-blue-700 hover:bg-blue-800 text-white shadow-xl hover:shadow-blue-900/20 transform hover:scale-105 transition-all duration-300 rounded-xl"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    Create Resume Now
                    <Sparkles className="w-6 h-6 animate-pulse" />
                  </span>
                </Button>
              </Link>

              <Link href="/templates">
                <Button
                  size="lg"
                  variant="outline"
                  className="px-10 py-8 text-xl font-bold bg-white border-2 border-slate-200 text-slate-700 hover:border-blue-600 hover:text-blue-700 shadow-lg transform hover:scale-105 transition-all duration-300 rounded-xl"
                >
                  Browse Templates
                </Button>
              </Link>
            </div>

            {/* Trust Indicators - Reduced bottom padding */}
            <div className="flex flex-wrap items-center justify-center gap-8 pt-8 pb-4 opacity-90">
              <div className="flex items-center gap-2 text-slate-700">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                <span className="text-sm sm:text-base font-bold">1.5M+ Users</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <Star className="w-5 h-5 text-yellow-500" />
                <span className="text-sm sm:text-base font-bold">4.9/5 Rating</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <Award className="w-5 h-5 text-blue-600" />
                <span className="text-sm sm:text-base font-bold">Award Winning</span>
              </div>
            </div>
          </div>
        </div>
      </section>





      {/* Resume Counter Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-3 text-slate-600">
              <FileCheck className="w-6 h-6 text-blue-600" />
              <span className="text-lg font-semibold">Resumes Created</span>
            </div>
            <AnimatedCounter />
            <p className="text-sm text-slate-500 max-w-md">
              Join thousands of professionals creating their dream resumes every day
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="relative">
            <div className="absolute inset-0 bg-blue-600 rounded-3xl blur-2xl opacity-20"></div>
            <div className="relative p-12 sm:p-16 rounded-3xl bg-gradient-to-br from-blue-900 to-slate-900 text-center shadow-2xl overflow-hidden border border-white/10">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute -top-24 -left-24 w-64 h-64 bg-blue-500 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-indigo-500 rounded-full blur-3xl"></div>
              </div>

              <div className="relative z-10">
                <h2 className="text-3xl sm:text-5xl font-black text-white mb-6">
                  Ready to Land Your Dream Job?
                </h2>
                <p className="text-xl sm:text-2xl text-blue-100 mb-10 max-w-2xl mx-auto font-light">
                  Join millions of professionals who trust DollarCV to advance their careers.
                </p>
                <Link href="/builder">
                  <Button
                    size="lg"
                    className="px-12 py-8 text-xl font-bold bg-white text-blue-900 hover:bg-blue-50 shadow-xl transform hover:scale-105 transition-all duration-300 rounded-xl"
                  >
                    Start Building Now - It's Free!
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <p className="text-center text-slate-400 mb-12 text-sm font-semibold uppercase tracking-widest">
            Trusted by professionals at
          </p>
          <div className="flex flex-wrap items-center justify-center gap-12 sm:gap-20 opacity-60 hover:opacity-100 transition-opacity duration-500">
            {['Google', 'Facebook', 'Microsoft', 'Amazon', 'Airbnb'].map((company, i) => (
              <div
                key={i}
                className="text-2xl sm:text-3xl font-bold text-slate-400 hover:text-blue-800 transition-all duration-300 cursor-default"
              >
                {company}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-100 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-slate-400">
            &copy; {new Date().getFullYear()} DollarCV. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
