/* ==========================================================================
   Portfolio data — mirrors MyCareerPortfolio profile content.
   Edit this file to update your info without touching markup/logic.
   ========================================================================== */

const PROFILE = {
  fullName: "Uppuluti Akshay",
  initials: "UA",
  title: "Senior Software Engineer",
  subtitle: "SDET",
  summary: "Senior Software Engineer specializing in end-to-end test automation across Web, API, Desktop (including AI/LLM-based applications), and enterprise platforms. Skilled in building scalable BDD automation frameworks from scratch, integrating automated testing into Azure DevOps CI/CD pipelines, and partnering closely with stakeholders to deliver high-quality, reliable software",
  location: "Hyderabad, Telangana, 500085",
  email: "uppuluti.akshay@gmail.com",
  phone: "+91 7224840581",
  linkedIn: "linkedin.com/in/uppulutiakshay",
  linkedInUrl: "https://linkedin.com/in/uppulutiakshay",
  gitHub: "github.com/akshay-uppuluti",
  gitHubUrl: "https://github.com/akshay-uppuluti",
  photoUrl: "images/AkshayImageDP.png",
  resumeUrl: "/files/Resume.pdf",
    avatar: "images/AkshayImageDP.png",

  stats: [
    { value: "4.5+", label: "Years Experience" },
    { value: "500+", label: "Automated Test Cases" },
    { value: "10+", label: "Projects Delivered" },
    { value: "95%", label: "Automation Success Rate" }
  ],

  skillGroups: [
    { category: "Programming Languages", items: [ "C# (Primary Language)", "Java" ] },
    { category: "Automation Tools", items: [ "Selenium", "WinAppDriver", "RestSharp", "SpecFlow", "Reqnroll", "Cucumber", "Postman", "Swagger", "MS-Test", "NUnit", "TestNG" ] },
    { category: "DevOps & Version Control", items: [ "Azure DevOps", "Git", "GitHub" ] },
    { category: "Test Data Management", items: [ "GenRocket Engineer", "GenRocket Admin" ] },
    { category: "Testing Frameworks", items: [ "BDD (Behavior-Driven Development)", "Key Data Driven (KDD) framework" ] },
    { category: "Databases & Connectivity", items: [ "MySQL" ] },
    { category: "Test Management & Collaboration", items: [ "Jira", "Azure Test Plan", "TestRail" ] },
    { category: "Soft Skills", items: [ "Problem-Solving", "Critical Thinking", "Team Collaboration" ] }
  ],

  experience: [
    {
      company: "Mphasis Limited",
      role: "Senior Software Engineer",
      period: "2025 — Present",
      achievements: [
        "Developed a reusable BDD automation framework adopted across multiple project teams.",
        "Automated Web, API, and Desktop applications using Selenium, WinAppDriver, and RestSharp.",
        "Reduced regression testing effort by 70% through parallelized, data-driven test execution.",
        "Integrated automated test execution with Azure DevOps Pipelines for continuous validation."
      ]
    },
    {
      company: "Tata Consultancy Services",
      role: "Software Engineer",
      period: "2022 — 2025",
      achievements: [
        "Designed and maintained API automation suites using RestSharp and Postman/Swagger.",
        "Collaborated with stakeholders to define test data strategy using GenRocket.",
        "Authored detailed test reports that improved stakeholder visibility into release quality."
      ]
    }
  ],

  projects: [
    {
      title: "UI Automation Framework",
      category: "Web",
      description: "A reusable BDD-driven UI automation framework with parallel execution and rich HTML reporting.",
      tech: [ "C#", "Selenium", "Reqnroll", "MSTest" ],
      features: [ "BDD framework", "Parallel execution", "Reporting", "CI/CD integration" ],
      gitHubUrl: "https://github.com/akshay-uppuluti/CSharpFramework",
      liveUrl: ""
    },
    {
      title: "API Automation Framework",
      category: "API",
      description: "A data-driven API test framework with a fluent request builder and automated response validation.",
      tech: [ "RestSharp", "MSTest", "Azure Pipelines" ],
      features: [ "Request builder", "Response validation", "Data-driven tests", "Reports" ],
      gitHubUrl: "https://github.com/akshay-uppuluti/CSharpFramework",
      liveUrl: ""
    },
    {
      title: "Desktop App Automation Suite",
      category: "Desktop",
      description: "WinAppDriver-based automation suite for validating Windows desktop application workflows end-to-end.",
      tech: [ "C#", "WinAppDriver", "MSTest" ],
      features: [ "Page object model", "Screenshot on failure", "CI integration" ],
      gitHubUrl: "https://github.com/akshay-uppuluti",
      liveUrl: ""
    },
    {
      title: "AnnaPurna Wholesale Website",
      category: "Web",
      description: "A responsive wholesale product catalog website built with modern front-end tooling for Client requirement.",
      tech: [ "React", "TypeScript", "Tailwind" ],
      features: [ "Product catalog", "Responsive design", "SEO optimized" ],
      gitHubUrl: "https://github.com/akshay-uppuluti/ApplicationRetail",
      liveUrl: "https://github.com/akshay-uppuluti/ApplicationRetail"
    }
  ],

  repositories: [
    { name: "automation-framework", description: "Reusable C# BDD automation framework for Web & API testing.", stars: 12, tech: [ "C#", "Selenium", "Reqnroll" ] },
    { name: "csharp-concepts", description: "A curated repository of core C# concepts, patterns, and examples.", stars: 8, tech: [ "C#", ".NET" ] },
    { name: "portfolio-website", description: "Source code for this personal portfolio site.", stars: 5, tech: [ "ASP.NET Core", "Razor Pages" ] }
  ],

  certifications: [
    { title: "GenRocket Certified Engineer - Level 1", issuer: "GenRocket", date: "Nov 2024", credentialId: "" },
    { title: "Software Testing Certificate", issuer: "The Digital Adda", date: "Nov 2024", credentialId: "DA/ST/23/15800" }
  ],

  accomplishments: [
    "Received multiple appreciations from customers and stakeholders for effective test management and issue resolution.",
    "Developed and implemented a BDD testing framework, improving testing efficiency by 30%.",
    "Enhanced visibility and accessibility of test results through detailed reporting, increasing stakeholder satisfaction by 20%."
  ],

  testimonials: [
    { quote: "Akshay's automation framework cut our regression cycle from days to hours. A true force multiplier for the team.", author: "Engineering Manager, Mphasis" },
    { quote: "Extremely thorough and proactive — consistently catches issues before they reach production.", author: "Peer Reviewer" }
  ],

  insights: [
    {
      title: "Designing a Reusable BDD Framework from Scratch",
      category: "Automation",
      date: "Aug 2025",
      readTime: "6 min read",
      summary: "A practical walkthrough of the architecture decisions behind a BDD automation framework adopted across multiple teams: layering, reporting, and CI/CD integration.",
      tags: [ "BDD", "Reqnroll", "C#", "CI/CD" ]
    },
    {
      title: "Data-Driven API Testing with RestSharp",
      category: "API Testing",
      date: "Jun 2025",
      readTime: "5 min read",
      summary: "How a fluent request builder and externalized test data cut API test maintenance time in half while improving coverage.",
      tags: [ "RestSharp", "API", "Test Data" ]
    },
    {
      title: "Scaling Desktop Automation with WinAppDriver",
      category: "Desktop Testing",
      date: "Mar 2025",
      readTime: "7 min read",
      summary: "Lessons learned building a stable, low-flake WinAppDriver suite for a legacy Windows desktop application.",
      tags: [ "WinAppDriver", "Desktop", "Stability" ]
    },
    {
      title: "GenRocket for Realistic Test Data at Scale",
      category: "Test Data",
      date: "Jan 2025",
      readTime: "4 min read",
      summary: "Why synthetic, rule-based test data generation beats hand-crafted fixtures for large, evolving test suites.",
      tags: [ "GenRocket", "Test Data Strategy" ]
    },
    {
      title: "Parallelizing Regression Suites in Azure Pipelines",
      category: "CI/CD",
      date: "Nov 2024",
      readTime: "5 min read",
      summary: "A step-by-step breakdown of the pipeline configuration that reduced regression run time by 70%.",
      tags: [ "Azure DevOps", "Parallel Execution" ]
    },
    {
      title: "Choosing Between Selenium, Playwright, and WinAppDriver",
      category: "Automation",
      date: "Sep 2024",
      readTime: "6 min read",
      summary: "A pragmatic comparison of automation tools across Web and Desktop platforms, and when each one earns its place in a framework.",
      tags: [ "Selenium", "Playwright", "Tooling" ]
    }
  ]
};

window.PROFILE = PROFILE;
