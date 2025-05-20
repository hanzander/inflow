"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Shield, Globe, Brain, AlertTriangle, CheckCircle } from "lucide-react"
import InflowLogo from "@/components/inflow-logo"
import { ThemeToggle } from "@/components/theme-toggle"
import { useInView } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"

export default function LandingPage() {
  const featuresRef = useRef(null)
  const featuresInView = useInView(featuresRef, { once: true, amount: 0.2 })

  const howItWorksRef = useRef(null)
  const howItWorksInView = useInView(howItWorksRef, { once: true, amount: 0.2 })

  const ctaRef = useRef(null)
  const ctaInView = useInView(ctaRef, { once: true, amount: 0.5 })

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/70 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
          <InflowLogo />
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link href="/app">
              <Button variant="ghost" className="rounded-full">
                App
                <ArrowRight size={16} className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-16 md:pt-32 md:pb-24">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-inflow-purple-100/50 via-transparent to-inflow-blue-100/30 dark:from-inflow-purple-950/50 dark:via-transparent dark:to-inflow-blue-950/30" />

          {/* Animated background elements */}
          <motion.div
            className="absolute top-20 left-1/4 w-64 h-64 rounded-full bg-inflow-purple-400/10 dark:bg-inflow-purple-600/10 blur-3xl"
            animate={{
              x: [0, 30, 0],
              y: [0, -30, 0],
            }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />

          <motion.div
            className="absolute bottom-20 right-1/4 w-80 h-80 rounded-full bg-inflow-blue-400/10 dark:bg-inflow-blue-600/10 blur-3xl"
            animate={{
              x: [0, -40, 0],
              y: [0, 40, 0],
            }}
            transition={{
              duration: 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-3xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
                <span className="bg-gradient-to-r from-inflow-purple-600 to-inflow-blue-600 bg-clip-text text-transparent">
                  Combat Misinformation
                </span>
                <br />
                <span className="text-card-foreground">Track the Truth</span>
              </h1>
            </motion.div>

            <motion.p
              className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Inflow helps you identify, track, and combat the spread of misinformation across social networks with
              AI-powered analysis and visualization.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link href="/app">
                <Button
                  size="lg"
                  className="rounded-full px-8 bg-gradient-to-r from-inflow-purple-600 to-inflow-blue-600 hover:from-inflow-purple-700 hover:to-inflow-blue-700"
                >
                  Get Started
                  <ArrowRight size={16} className="ml-2" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="rounded-full px-8">
                Learn More
              </Button>
            </motion.div>
          </div>

          {/* App Preview */}
          <motion.div
            className="mt-16 relative max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            <div className="bg-card rounded-2xl shadow-xl overflow-hidden border">
              <div className="aspect-[16/9] bg-muted flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-inflow-purple-600 to-inflow-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield size={32} className="text-white" />
                  </div>
                  <h3 className="text-xl font-medium text-card-foreground mb-2">App Preview</h3>
                  <p className="text-muted-foreground">
                    Interactive visualization of misinformation spread and fact-checking
                  </p>
                </div>
              </div>
            </div>

            {/* Floating elements */}
            <motion.div
              className="absolute -top-6 -right-6 bg-card rounded-xl shadow-lg p-4 border"
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              <div className="flex items-center gap-2">
                <AlertTriangle size={16} className="text-amber-500" />
                <span className="text-sm font-medium">Misinformation Detected</span>
              </div>
            </motion.div>

            <motion.div
              className="absolute -bottom-6 -left-6 bg-card rounded-xl shadow-lg p-4 border"
              animate={{
                y: [0, 10, 0],
              }}
              transition={{
                duration: 5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              <div className="flex items-center gap-2">
                <CheckCircle size={16} className="text-green-500" />
                <span className="text-sm font-medium">Fact Check Complete</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-muted/50" ref={featuresRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-4 text-card-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={featuresInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              Key Features
            </motion.h2>
            <motion.p
              className="text-xl text-muted-foreground max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={featuresInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Powerful tools to identify and combat misinformation
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Brain className="h-8 w-8 text-inflow-purple-600" />,
                title: "AI-Powered Analysis",
                description: "Advanced algorithms detect patterns of misinformation and compare with verified sources.",
              },
              {
                icon: <Globe className="h-8 w-8 text-inflow-blue-600" />,
                title: "Geographic Tracking",
                description: "Visualize how misinformation spreads across different regions and communities.",
              },
              {
                icon: <CheckCircle className="h-8 w-8 text-green-600" />,
                title: "Fact Checking",
                description: "Access verified information from trusted sources to counter false claims.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="bg-card rounded-xl p-6 shadow-sm border"
                initial={{ opacity: 0, y: 20 }}
                animate={featuresInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="bg-muted rounded-full w-14 h-14 flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-medium mb-2 text-card-foreground">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 md:py-24" ref={howItWorksRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-4 text-card-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={howItWorksInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              How It Works
            </motion.h2>
            <motion.p
              className="text-xl text-muted-foreground max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={howItWorksInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Our streamlined process for identifying and combating misinformation
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Report",
                description: "Submit suspected misinformation from social media or other sources.",
              },
              {
                step: "02",
                title: "Analyze",
                description: "Our AI system analyzes the content and compares it with verified information.",
              },
              {
                step: "03",
                title: "Visualize",
                description: "See how the misinformation is spreading across different regions.",
              },
              {
                step: "04",
                title: "Act",
                description: "Access fact-checks and share accurate information to counter false claims.",
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                animate={howItWorksInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              >
                <div className="bg-card rounded-xl p-6 shadow-sm border h-full">
                  <div className="text-4xl font-bold text-inflow-purple-200 dark:text-inflow-purple-900 mb-4">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-medium mb-2 text-card-foreground">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>

                {index < 3 && (
                  <motion.div
                    className="hidden lg:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 z-10"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={howItWorksInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                  >
                    <ArrowRight size={24} className="text-inflow-purple-400 dark:text-inflow-purple-600" />
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="py-16 md:py-24 bg-gradient-to-br from-inflow-purple-900/10 to-inflow-blue-900/10 dark:from-inflow-purple-900/30 dark:to-inflow-blue-900/30"
        ref={ctaRef}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-card-foreground">
              Join the Fight Against Misinformation
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Be part of the solution. Help identify and combat false information in your community.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/app">
                <Button
                  size="lg"
                  className="rounded-full px-8 bg-gradient-to-r from-inflow-purple-600 to-inflow-blue-600 hover:from-inflow-purple-700 hover:to-inflow-blue-700"
                >
                  Get Started Now
                  <ArrowRight size={16} className="ml-2" />
                </Button>
              </Link>
              <Link href="/submit">
                <Button size="lg" variant="outline" className="rounded-full px-8">
                  Report Misinformation
                </Button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            className="mt-16 text-center"
            initial={{ opacity: 0 }}
            animate={ctaInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <p className="text-sm text-muted-foreground mb-4">Powered by</p>
            <div className="flex justify-center">
              <Image
                src="/images/factsfirstph-logo.png"
                alt="FactsFirstPH Logo"
                width={250}
                height={60}
                className="h-12 w-auto"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <InflowLogo />
            <div className="mt-4 md:mt-0 text-sm text-muted-foreground">© 2023 Inflow. All rights reserved.</div>
          </div>
        </div>
      </footer>
    </main>
  )
}
