import jsPDF from "jspdf";

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  linkedin: string;
  github: string;
  professionalTitle: string;
  summary: string;
  skills: string;
  certifications: string;
  photo: string;
}

interface WorkExperience {
  jobTitle: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface Education {
  degree: string;
  institution: string;
  year: string;
  description: string;
}

interface Reference {
  name: string;
  contact: string;
}

type SectionType = 'workExperience' | 'education' | 'skills' | 'certifications' | 'references';

interface Section {
  type: SectionType;
}

type TemplateStyle = "classic" | "modern" | "creative" | "executive" | "tech" | "academic" | "twoColumn" | "timeline" | "infographic" | "elegant" | "cool2025";

export const generatePDFByTemplate = (
  templateStyle: TemplateStyle,
  formData: FormData,
  workExperiences: WorkExperience[],
  education: Education[],
  references: Reference[],
  sectionOrder: Section[]
) => {
  switch (templateStyle) {
    case "classic":
      return generateClassicTemplate(formData, workExperiences, education, references, sectionOrder);
    case "modern":
      return generateModernTemplate(formData, workExperiences, education, references, sectionOrder);
    case "creative":
      return generateCreativeTemplate(formData, workExperiences, education, references, sectionOrder);
    case "executive":
      return generateExecutiveTemplate(formData, workExperiences, education, references, sectionOrder);
    case "tech":
      return generateTechTemplate(formData, workExperiences, education, references, sectionOrder);
    case "academic":
      return generateAcademicTemplate(formData, workExperiences, education, references, sectionOrder);
    case "twoColumn":
      return generateTwoColumnTemplate(formData, workExperiences, education, references, sectionOrder);
    case "timeline":
      return generateTimelineTemplate(formData, workExperiences, education, references, sectionOrder);
    case "infographic":
      return generateInfographicTemplate(formData, workExperiences, education, references, sectionOrder);
    case "elegant":
      return generateElegantTemplate(formData, workExperiences, education, references, sectionOrder);
    case "cool2025":
      return generateCool2025Template(formData, workExperiences, education, references, sectionOrder);
    default:
      return generateClassicTemplate(formData, workExperiences, education, references, sectionOrder);
  }
};

// Classic Professional Template
function generateClassicTemplate(formData: FormData, workExperiences: WorkExperience[], education: Education[], references: Reference[], sectionOrder: Section[]) {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margins = { left: 20, right: 20 };
  const contentWidth = pageWidth - margins.left - margins.right;
  let y = 20;

  // Add photo if provided - top right corner, no overlap
  const photoMargin = 5;
  if (formData.photo) {
    const imgWidth = 30;
    const imgHeight = 30;
    const imgX = pageWidth - margins.right - imgWidth;
    doc.addImage(formData.photo, 'JPEG', imgX, y, imgWidth, imgHeight);
  }

  // Name - Left aligned to avoid photo overlap
  doc.setFont("helvetica", "bold");
  doc.setFontSize(24);
  doc.setTextColor(0, 0, 0);
  const nameWidth = doc.getTextWidth(formData.fullName);
  const maxNameWidth = formData.photo ? contentWidth - 35 : contentWidth;
  if (nameWidth > maxNameWidth) {
    doc.text(formData.fullName, margins.left, y + 5);
  } else {
    doc.text(formData.fullName, margins.left, y + 5);
  }
  y += 10;

  // Contact Info
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(60, 60, 60);
  const contactParts = [];
  if (formData.phone) contactParts.push(formData.phone);
  if (formData.email) contactParts.push(formData.email);
  if (formData.address) contactParts.push(formData.address);
  if (contactParts.length > 0) {
    const contactInfo = contactParts.join(" | ");
    doc.text(contactInfo, margins.left, y);
    y += 5;
  }

  // LinkedIn and GitHub
  if (formData.linkedin || formData.github) {
    const links = [];
    if (formData.linkedin) links.push(formData.linkedin);
    if (formData.github) links.push(formData.github);
    doc.text(links.join(" | "), margins.left, y);
    y += 8;
  } else {
    y += 3;
  }

  // Professional Title
  if (formData.professionalTitle) {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(0, 0, 0);
    doc.text(formData.professionalTitle, margins.left, y);
    y += 8;
  }

  // Professional Summary
  if (formData.summary) {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    const summaryLines = doc.splitTextToSize(formData.summary, contentWidth);
    doc.text(summaryLines, margins.left, y);
    y += summaryLines.length * 5 + 8;
  }

  // Helper function to check page space
  const checkPageSpace = (needed: number) => {
    if (y + needed > 270) {
      doc.addPage();
      y = 20;
    }
  };

  // Helper functions for each section
  const renderWorkExperience = () => {
    if (!workExperiences.some(exp => exp.jobTitle || exp.company)) return;

    checkPageSpace(20);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text("WORK EXPERIENCE", margins.left, y);
    y += 2;

    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(0.5);
    doc.line(margins.left, y, pageWidth - margins.right, y);
    y += 7;

    workExperiences.forEach(exp => {
      if (exp.jobTitle || exp.company) {
        checkPageSpace(15);

        // Job title and dates
        doc.setFont("helvetica", "bold");
        doc.setFontSize(10);
        doc.text(exp.jobTitle, margins.left, y);

        if (exp.startDate || exp.endDate) {
          const dateRange = `${exp.startDate} – ${exp.endDate}`;
          doc.setFont("helvetica", "normal");
          doc.text(dateRange, pageWidth - margins.right, y, { align: "right" });
        }
        y += 5;

        // Company
        if (exp.company) {
          doc.setFont("helvetica", "italic");
          doc.setFontSize(10);
          doc.text(exp.company, margins.left, y);
          y += 6;
        }

        // Description
        if (exp.description) {
          doc.setFont("helvetica", "normal");
          doc.setFontSize(9);
          const descLines = exp.description.split('\n');
          descLines.forEach(line => {
            const wrappedLines = doc.splitTextToSize(line.trim(), contentWidth - 5);
            wrappedLines.forEach((wrappedLine: string, index: number) => {
              checkPageSpace(5);
              if (index === 0 && !line.startsWith('•')) {
                doc.text('• ' + wrappedLine, margins.left + 3, y);
              } else {
                doc.text(wrappedLine, margins.left + (index === 0 ? 3 : 6), y);
              }
              y += 4;
            });
          });
          y += 2;
        }
        y += 3;
      }
    });
    y += 2;
  };

  const renderEducation = () => {
    if (!education.some(edu => edu.degree || edu.institution)) return;

    checkPageSpace(20);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text("EDUCATION", margins.left, y);
    y += 2;

    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(0.5);
    doc.line(margins.left, y, pageWidth - margins.right, y);
    y += 7;

    education.forEach(edu => {
      if (edu.degree || edu.institution) {
        checkPageSpace(15);

        // Degree and Year
        doc.setFont("helvetica", "bold");
        doc.setFontSize(10);
        doc.text(edu.degree, margins.left, y);

        if (edu.year) {
          doc.setFont("helvetica", "normal");
          doc.text(edu.year, pageWidth - margins.right, y, { align: "right" });
        }
        y += 5;

        // Institution
        if (edu.institution) {
          doc.setFont("helvetica", "italic");
          doc.setFontSize(10);
          doc.text(edu.institution, margins.left, y);
          y += 6;
        }

        // Description
        if (edu.description) {
          doc.setFont("helvetica", "normal");
          doc.setFontSize(9);
          const descLines = edu.description.split('\n');
          descLines.forEach(line => {
            const wrappedLines = doc.splitTextToSize(line.trim(), contentWidth - 5);
            wrappedLines.forEach((wrappedLine: string, index: number) => {
              checkPageSpace(5);
              if (index === 0 && !line.startsWith('•')) {
                doc.text('• ' + wrappedLine, margins.left + 3, y);
              } else {
                doc.text(wrappedLine, margins.left + (index === 0 ? 3 : 6), y);
              }
              y += 4;
            });
          });
          y += 2;
        }
        y += 3;
      }
    });
    y += 2;
  };

  const renderSkills = () => {
    if (!formData.skills) return;

    checkPageSpace(20);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text("SKILLS", margins.left, y);
    y += 2;

    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(0.5);
    doc.line(margins.left, y, pageWidth - margins.right, y);
    y += 7;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    const skillsLines = formData.skills.split('\n');
    skillsLines.forEach(line => {
      checkPageSpace(5);
      const wrappedLines = doc.splitTextToSize(line.trim(), contentWidth);
      doc.text(wrappedLines, margins.left, y);
      y += wrappedLines.length * 4.5;
    });
    y += 5;
  };

  const renderCertifications = () => {
    if (!formData.certifications) return;

    checkPageSpace(20);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text("CERTIFICATIONS", margins.left, y);
    y += 2;

    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(0.5);
    doc.line(margins.left, y, pageWidth - margins.right, y);
    y += 7;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    const certLines = formData.certifications.split('\n');
    certLines.forEach(line => {
      checkPageSpace(5);
      const wrappedLines = doc.splitTextToSize(line.trim(), contentWidth);
      doc.text(wrappedLines, margins.left, y);
      y += wrappedLines.length * 4.5;
    });
    y += 5;
  };

  const renderReferences = () => {
    if (!references.some(ref => ref.name || ref.contact)) return;

    checkPageSpace(20);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text("REFERENCES", margins.left, y);
    y += 2;

    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(0.5);
    doc.line(margins.left, y, pageWidth - margins.right, y);
    y += 7;

    references.forEach(ref => {
      if (ref.name || ref.contact) {
        checkPageSpace(10);

        doc.setFont("helvetica", "bold");
        doc.setFontSize(10);
        doc.text(ref.name, margins.left, y);
        y += 5;

        if (ref.contact) {
          doc.setFont("helvetica", "normal");
          doc.setFontSize(9);
          doc.text(ref.contact, margins.left, y);
          y += 6;
        }
      }
    });
    y += 2;
  };

  // Render sections based on order
  sectionOrder.forEach(section => {
    switch (section.type) {
      case 'workExperience':
        renderWorkExperience();
        break;
      case 'education':
        renderEducation();
        break;
      case 'skills':
        renderSkills();
        break;
      case 'certifications':
        renderCertifications();
        break;
      case 'references':
        renderReferences();
        break;
    }
  });

  return doc;
}

// Modern Minimalist Template
function generateModernTemplate(formData: FormData, workExperiences: WorkExperience[], education: Education[], references: Reference[], sectionOrder: Section[]) {
  const doc = new jsPDF();
  let y = 30;

  // Photo - Circular, top right if provided
  if (formData.photo) {
    const imgSize = 25;
    const imgX = 165;
    const imgY = 25;
    doc.addImage(formData.photo, 'JPEG', imgX, imgY, imgSize, imgSize);
    // Draw circle border
    doc.setDrawColor(37, 99, 235);
    doc.setLineWidth(0.5);
    doc.circle(imgX + imgSize / 2, imgY + imgSize / 2, imgSize / 2, 'S');
  }

  // Name - Large and minimal
  doc.setFontSize(28);
  doc.setTextColor(37, 99, 235);
  doc.text(formData.fullName, 20, y);
  y += 15;

  // Professional Title
  if (formData.professionalTitle) {
    doc.setFontSize(12);
    doc.setTextColor(100, 116, 139);
    doc.text(formData.professionalTitle, 20, y);
    y += 8;
  }

  // Contact - Simple line
  doc.setFontSize(9);
  doc.setTextColor(100, 116, 139);
  doc.text(`${formData.email}  •  ${formData.phone}`, 20, y);
  y += 5;

  // LinkedIn and GitHub
  if (formData.linkedin || formData.github) {
    const linksInfo = [formData.linkedin, formData.github].filter(Boolean).join("  •  ");
    doc.text(linksInfo, 20, y);
    y += 20;
  } else {
    y += 15;
  }

  // Summary - No header, just text
  if (formData.summary) {
    doc.setFontSize(10);
    doc.setTextColor(71, 85, 105);
    const summaryLines = doc.splitTextToSize(formData.summary, 170);
    doc.text(summaryLines, 20, y);
    y += summaryLines.length * 5 + 15;
  }

  // Experience - Minimal headers
  if (workExperiences.some(exp => exp.jobTitle)) {
    doc.setFontSize(11);
    doc.setTextColor(37, 99, 235);
    doc.text("Experience", 20, y);
    y += 8;

    workExperiences.forEach(exp => {
      if (exp.jobTitle) {
        doc.setFontSize(11);
        doc.setTextColor(15, 23, 42);
        doc.text(exp.jobTitle, 20, y);
        y += 5;
        doc.setFontSize(9);
        doc.setTextColor(100, 116, 139);
        doc.text(exp.company, 20, y);
        y += 4;
        doc.text(`${exp.startDate} - ${exp.endDate}`, 20, y);
        y += 6;

        if (exp.description) {
          doc.setFontSize(9);
          doc.setTextColor(71, 85, 105);
          const lines = doc.splitTextToSize(exp.description, 170);
          doc.text(lines, 20, y);
          y += lines.length * 4 + 8;
        }

        if (y > 270) {
          doc.addPage();
          y = 20;
        }
      }
    });
  }

  // Education
  if (education.some(edu => edu.degree)) {
    if (y > 250) {
      doc.addPage();
      y = 20;
    }
    doc.setFontSize(11);
    doc.setTextColor(37, 99, 235);
    doc.text("Education", 20, y);
    y += 8;

    education.forEach(edu => {
      if (edu.degree) {
        doc.setFontSize(10);
        doc.setTextColor(15, 23, 42);
        doc.text(`${edu.degree} - ${edu.institution}`, 20, y);
        y += 5;
        doc.setFontSize(9);
        doc.setTextColor(100, 116, 139);
        doc.text(edu.year, 20, y);
        y += 8;
      }
    });
  }

  // Skills
  if (formData.skills) {
    if (y > 250) {
      doc.addPage();
      y = 20;
    }
    doc.setFontSize(11);
    doc.setTextColor(37, 99, 235);
    doc.text("Skills", 20, y);
    y += 7;
    doc.setFontSize(9);
    doc.setTextColor(71, 85, 105);
    doc.text(formData.skills, 20, y);
    y += 10;
  }

  // Certifications
  if (formData.certifications) {
    if (y > 250) {
      doc.addPage();
      y = 20;
    }
    doc.setFontSize(11);
    doc.setTextColor(37, 99, 235);
    doc.text("Certifications", 20, y);
    y += 7;
    doc.setFontSize(9);
    doc.setTextColor(71, 85, 105);
    const certLines = doc.splitTextToSize(formData.certifications, 170);
    doc.text(certLines, 20, y);
    y += certLines.length * 5 + 10;
  }

  // References
  if (references && references.length > 0 && references.some(ref => ref.name || ref.contact)) {
    if (y > 250) {
      doc.addPage();
      y = 20;
    }
    doc.setFontSize(11);
    doc.setTextColor(37, 99, 235);
    doc.text("References", 20, y);
    y += 7;

    references.forEach(ref => {
      if (ref.name || ref.contact) {
        doc.setFontSize(10);
        doc.setTextColor(15, 23, 42);
        doc.setFont("helvetica", "bold");
        doc.text(ref.name, 20, y);
        doc.setFont("helvetica", "normal");
        y += 5;

        if (ref.contact) {
          doc.setFontSize(9);
          doc.setTextColor(71, 85, 105);
          const contactLines = doc.splitTextToSize(ref.contact, 170);
          doc.text(contactLines, 20, y);
          y += contactLines.length * 5 + 5;
        }

        if (y > 270) {
          doc.addPage();
          y = 20;
        }
      }
    });
  }

  return doc;
}

// Creative Bold Template
function generateCreativeTemplate(formData: FormData, workExperiences: WorkExperience[], education: Education[], references: Reference[], sectionOrder: Section[]) {
  const doc = new jsPDF();
  let y = 20;

  // Colored header background
  doc.setFillColor(37, 99, 235);
  doc.rect(0, 0, 210, 40, "F");

  // Photo in header - circular with white border
  if (formData.photo) {
    const imgSize = 25;
    const imgX = 165;
    const imgY = 7.5;
    // White circle background
    doc.setFillColor(255, 255, 255);
    doc.circle(imgX + imgSize / 2, imgY + imgSize / 2, imgSize / 2 + 1, 'F');
    doc.addImage(formData.photo, 'JPEG', imgX, imgY, imgSize, imgSize);
    doc.setDrawColor(255, 255, 255);
    doc.setLineWidth(1);
    doc.circle(imgX + imgSize / 2, imgY + imgSize / 2, imgSize / 2, 'S');
  }

  // Name in white
  doc.setFontSize(26);
  doc.setTextColor(255, 255, 255);
  doc.text(formData.fullName, 20, 20);

  // Contact in white
  doc.setFontSize(10);
  doc.text(`${formData.email} | ${formData.phone}`, 20, 30);

  // Professional Title
  if (formData.professionalTitle) {
    doc.setFontSize(12);
    doc.text(formData.professionalTitle, 20, 36);
    y = 60;
  } else {
    y = 55;
  }

  // LinkedIn and GitHub
  if (formData.linkedin || formData.github) {
    doc.setFontSize(9);
    const links = [];
    if (formData.linkedin) links.push(`LinkedIn: ${formData.linkedin}`);
    if (formData.github) links.push(`GitHub: ${formData.github}`);
    doc.text(links.join(' | '), 20, y - 8);
  }

  // Summary with accent
  if (formData.summary) {
    doc.setFillColor(219, 234, 254);
    doc.roundedRect(15, y - 5, 180, 15, 2, 2, "F");
    doc.setFontSize(10);
    doc.setTextColor(37, 99, 235);
    const summaryLines = doc.splitTextToSize(formData.summary, 165);
    doc.text(summaryLines, 20, y);
    y += summaryLines.length * 5 + 15;
  }

  // Work Experience with side accent
  if (workExperiences.some(exp => exp.jobTitle)) {
    doc.setFontSize(16);
    doc.setTextColor(37, 99, 235);
    doc.text("EXPERIENCE", 20, y);
    y += 8;

    workExperiences.forEach(exp => {
      if (exp.jobTitle) {
        // Accent line
        doc.setFillColor(37, 99, 235);
        doc.rect(15, y - 3, 2, 15, "F");

        doc.setFontSize(12);
        doc.setTextColor(15, 23, 42);
        doc.setFont("helvetica", "bold");
        doc.text(exp.jobTitle, 22, y);
        doc.setFont("helvetica", "normal");
        y += 6;

        doc.setFontSize(10);
        doc.setTextColor(100, 116, 139);
        doc.text(`${exp.company} | ${exp.startDate} - ${exp.endDate}`, 22, y);
        y += 5;

        if (exp.description) {
          doc.setFontSize(10);
          doc.setTextColor(71, 85, 105);
          const lines = doc.splitTextToSize(exp.description, 168);
          doc.text(lines, 22, y);
          y += lines.length * 5 + 8;
        }

        if (y > 270) {
          doc.addPage();
          y = 20;
        }
      }
    });
  }

  // Education
  if (education.some(edu => edu.degree)) {
    if (y > 250) {
      doc.addPage();
      y = 20;
    }
    doc.setFontSize(16);
    doc.setTextColor(37, 99, 235);
    doc.text("EDUCATION", 20, y);
    y += 8;

    education.forEach(edu => {
      if (edu.degree) {
        doc.setFontSize(11);
        doc.setTextColor(15, 23, 42);
        doc.text(edu.degree, 20, y);
        y += 5;
        doc.setFontSize(10);
        doc.setTextColor(100, 116, 139);
        doc.text(`${edu.institution} - ${edu.year}`, 20, y);
        y += 8;
      }
    });
  }

  // Skills in box
  if (formData.skills) {
    if (y > 250) {
      doc.addPage();
      y = 20;
    }
    doc.setFontSize(16);
    doc.setTextColor(37, 99, 235);
    doc.text("SKILLS", 20, y);
    y += 8;

    doc.setFillColor(219, 234, 254);
    doc.roundedRect(15, y - 3, 180, 15, 2, 2, "F");

    doc.setFontSize(10);
    doc.setTextColor(15, 23, 42);
    const skillsLines = doc.splitTextToSize(formData.skills, 170);
    doc.text(skillsLines, 20, y);
  }

  return doc;
}

// Executive Template - Dark sidebar with premium look
function generateExecutiveTemplate(formData: FormData, workExperiences: WorkExperience[], education: Education[], references: Reference[], sectionOrder: Section[]) {
  const doc = new jsPDF();

  // Dark sidebar background
  doc.setFillColor(30, 41, 59); // slate-800
  doc.rect(0, 0, 70, 297, "F");

  let y = 25;
  let sideY = 25;

  // Photo on sidebar - rounded square
  if (formData.photo) {
    const imgSize = 45;
    const imgX = 12.5;
    doc.addImage(formData.photo, 'JPEG', imgX, sideY, imgSize, imgSize);
    doc.setDrawColor(203, 213, 225);
    doc.setLineWidth(0.5);
    doc.roundedRect(imgX, sideY, imgSize, imgSize, 2, 2, 'S');
    sideY += imgSize + 10;
  }

  // Name on sidebar - white
  doc.setFontSize(18);
  doc.setTextColor(255, 255, 255);
  const nameLines = doc.splitTextToSize(formData.fullName, 55);
  doc.text(nameLines, 10, sideY);
  sideY += nameLines.length * 7 + 10;

  // Professional Title
  if (formData.professionalTitle) {
    doc.setFontSize(10);
    doc.setTextColor(203, 213, 225);
    const titleLines = doc.splitTextToSize(formData.professionalTitle, 55);
    doc.text(titleLines, 10, sideY);
    sideY += titleLines.length * 5 + 8;
  }

  // Contact on sidebar
  doc.setFontSize(9);
  doc.setTextColor(203, 213, 225);
  if (formData.phone) {
    doc.text(formData.phone, 10, sideY);
    sideY += 5;
  }
  if (formData.email) {
    const emailLines = doc.splitTextToSize(formData.email, 55);
    doc.text(emailLines, 10, sideY);
    sideY += emailLines.length * 5 + 5;
  }
  if (formData.address) {
    const addrLines = doc.splitTextToSize(formData.address, 55);
    doc.text(addrLines, 10, sideY);
    sideY += addrLines.length * 5 + 5;
  }
  if (formData.linkedin) {
    const linkedinLines = doc.splitTextToSize(`LinkedIn: ${formData.linkedin}`, 55);
    doc.text(linkedinLines, 10, sideY);
    sideY += linkedinLines.length * 5 + 5;
  }
  if (formData.github) {
    const githubLines = doc.splitTextToSize(`GitHub: ${formData.github}`, 55);
    doc.text(githubLines, 10, sideY);
    sideY += githubLines.length * 5 + 10;
  }

  // Skills on sidebar
  if (formData.skills) {
    doc.setFontSize(12);
    doc.setTextColor(255, 255, 255);
    doc.text("SKILLS", 10, sideY);
    sideY += 7;
    doc.setFontSize(9);
    doc.setTextColor(203, 213, 225);
    const skillsLines = doc.splitTextToSize(formData.skills, 55);
    doc.text(skillsLines, 10, sideY);
  }

  // Main content area
  const mainX = 75;

  // Summary
  if (formData.summary) {
    doc.setFontSize(11);
    doc.setTextColor(37, 99, 235);
    doc.text("PROFESSIONAL SUMMARY", mainX, y);
    y += 7;
    doc.setFontSize(10);
    doc.setTextColor(51, 65, 85);
    const summaryLines = doc.splitTextToSize(formData.summary, 125);
    doc.text(summaryLines, mainX, y);
    y += summaryLines.length * 5 + 10;
  }

  // Work Experience
  if (workExperiences.some(exp => exp.jobTitle)) {
    doc.setFontSize(11);
    doc.setTextColor(37, 99, 235);
    doc.text("WORK EXPERIENCE", mainX, y);
    y += 7;

    workExperiences.forEach(exp => {
      if (exp.jobTitle) {
        doc.setFontSize(11);
        doc.setTextColor(15, 23, 42);
        doc.setFont("helvetica", "bold");
        doc.text(exp.jobTitle, mainX, y);
        doc.setFont("helvetica", "normal");
        y += 5;
        doc.setFontSize(9);
        doc.setTextColor(100, 116, 139);
        doc.text(`${exp.company} | ${exp.startDate} - ${exp.endDate}`, mainX, y);
        y += 5;

        if (exp.description) {
          doc.setFontSize(9);
          doc.setTextColor(71, 85, 105);
          const lines = doc.splitTextToSize(exp.description, 125);
          doc.text(lines, mainX, y);
          y += lines.length * 4 + 6;
        }

        if (y > 270) {
          doc.addPage();
          y = 20;
        }
      }
    });
  }

  return doc;
}

// Tech Template - Green accent with code style
function generateTechTemplate(formData: FormData, workExperiences: WorkExperience[], education: Education[], references: Reference[], sectionOrder: Section[]) {
  const doc = new jsPDF();
  let y = 25;

  // Photo - Square with green border
  if (formData.photo) {
    const imgSize = 28;
    const imgX = 165;
    doc.addImage(formData.photo, 'JPEG', imgX, y, imgSize, imgSize);
    doc.setDrawColor(16, 185, 129);
    doc.setLineWidth(1);
    doc.rect(imgX, y, imgSize, imgSize, 'S');
  }

  // Name - Large
  doc.setFontSize(22);
  doc.setTextColor(16, 185, 129); // green
  doc.text(formData.fullName.toUpperCase(), 20, y);
  y += 8;

  // Title/Role line
  doc.setFontSize(11);
  doc.setTextColor(71, 85, 105);
  doc.text("TECHNICAL PROFESSIONAL", 20, y);
  y += 12;

  // Contact - inline with bullets
  doc.setFontSize(9);
  doc.setTextColor(100, 116, 139);
  const contact = [formData.email, formData.phone, formData.address].filter(Boolean).join(" • ");
  doc.text(contact, 20, y);
  y += 15;

  // Summary
  if (formData.summary) {
    doc.setFontSize(12);
    doc.setTextColor(16, 185, 129);
    doc.text("// PROFESSIONAL SUMMARY", 20, y);
    y += 7;
    doc.setFontSize(10);
    doc.setTextColor(71, 85, 105);
    const summaryLines = doc.splitTextToSize(formData.summary, 170);
    doc.text(summaryLines, 20, y);
    y += summaryLines.length * 5 + 12;
  }

  // Skills
  if (formData.skills) {
    doc.setFontSize(12);
    doc.setTextColor(16, 185, 129);
    doc.text("// TECHNICAL SKILLS", 20, y);
    y += 7;
    doc.setFontSize(10);
    doc.setTextColor(71, 85, 105);
    const skillsLines = doc.splitTextToSize(formData.skills, 170);
    doc.text(skillsLines, 20, y);
    y += skillsLines.length * 5 + 12;
  }

  // Work Experience
  if (workExperiences.some(exp => exp.jobTitle)) {
    doc.setFontSize(12);
    doc.setTextColor(16, 185, 129);
    doc.text("// WORK EXPERIENCE", 20, y);
    y += 7;

    workExperiences.forEach(exp => {
      if (exp.jobTitle) {
        doc.setFontSize(11);
        doc.setTextColor(15, 23, 42);
        doc.setFont("helvetica", "bold");
        doc.text(`> ${exp.jobTitle}`, 20, y);
        doc.setFont("helvetica", "normal");
        y += 5;
        doc.setFontSize(9);
        doc.setTextColor(100, 116, 139);
        doc.text(`${exp.company} | ${exp.startDate} - ${exp.endDate}`, 25, y);
        y += 5;

        if (exp.description) {
          doc.setFontSize(9);
          doc.setTextColor(71, 85, 105);
          const lines = doc.splitTextToSize(exp.description, 165);
          doc.text(lines, 25, y);
          y += lines.length * 4 + 8;
        }

        if (y > 270) {
          doc.addPage();
          y = 20;
        }
      }
    });
  }

  // Education
  if (education.some(edu => edu.degree)) {
    if (y > 250) {
      doc.addPage();
      y = 20;
    }
    doc.setFontSize(12);
    doc.setTextColor(16, 185, 129);
    doc.text("// EDUCATION", 20, y);
    y += 7;

    education.forEach(edu => {
      if (edu.degree) {
        doc.setFontSize(10);
        doc.setTextColor(15, 23, 42);
        doc.text(`> ${edu.degree}`, 20, y);
        y += 5;
        doc.setFontSize(9);
        doc.setTextColor(100, 116, 139);
        doc.text(`${edu.institution} - ${edu.year}`, 25, y);
        y += 7;
      }
    });
    y += 5;
  }

  // Skills
  if (formData.skills) {
    if (y > 250) {
      doc.addPage();
      y = 20;
    }
    doc.setFontSize(12);
    doc.setTextColor(16, 185, 129);
    doc.text("// SKILLS", 20, y);
    y += 7;
    doc.setFontSize(9);
    doc.setTextColor(71, 85, 105);
    const skillsLines = doc.splitTextToSize(formData.skills, 170);
    doc.text(skillsLines, 20, y);
    y += skillsLines.length * 4 + 10;
  }

  // Certifications
  if (formData.certifications) {
    if (y > 250) {
      doc.addPage();
      y = 20;
    }
    doc.setFontSize(12);
    doc.setTextColor(16, 185, 129);
    doc.text("// CERTIFICATIONS", 20, y);
    y += 7;
    doc.setFontSize(9);
    doc.setTextColor(71, 85, 105);
    const certLines = doc.splitTextToSize(formData.certifications, 170);
    doc.text(certLines, 20, y);
    y += certLines.length * 4 + 10;
  }

  // References
  if (references && references.length > 0 && references.some(ref => ref.name || ref.contact)) {
    if (y > 250) {
      doc.addPage();
      y = 20;
    }
    doc.setFontSize(12);
    doc.setTextColor(16, 185, 129);
    doc.text("// REFERENCES", 20, y);
    y += 7;

    references.forEach(ref => {
      if (ref.name || ref.contact) {
        doc.setFontSize(10);
        doc.setTextColor(15, 23, 42);
        doc.text(`> ${ref.name}`, 20, y);
        y += 5;

        if (ref.contact) {
          doc.setFontSize(9);
          doc.setTextColor(100, 116, 139);
          const contactLines = doc.splitTextToSize(ref.contact, 170);
          doc.text(contactLines, 25, y);
          y += contactLines.length * 4 + 6;
        }

        if (y > 270) {
          doc.addPage();
          y = 20;
        }
      }
    });
  }

  return doc;
}

// Academic Template - Traditional serif style
function generateAcademicTemplate(formData: FormData, workExperiences: WorkExperience[], education: Education[], references: Reference[], sectionOrder: Section[]) {
  const doc = new jsPDF();
  let y = 30;

  // Photo - Small, top right corner
  if (formData.photo) {
    const imgSize = 22;
    const imgX = 168;
    const imgY = 25;
    doc.addImage(formData.photo, 'JPEG', imgX, imgY, imgSize, imgSize);
    doc.setDrawColor(100, 116, 139);
    doc.setLineWidth(0.5);
    doc.rect(imgX, imgY, imgSize, imgSize, 'S');
  }

  // Name - Centered, large
  doc.setFontSize(24);
  doc.setTextColor(15, 23, 42);
  doc.text(formData.fullName, 105, y, { align: "center" });
  y += 8;

  // Professional Title
  if (formData.professionalTitle) {
    doc.setFontSize(12);
    doc.setTextColor(37, 99, 235);
    doc.text(formData.professionalTitle, 105, y, { align: "center" });
    y += 6;
  }

  // Contact - Centered, small
  doc.setFontSize(9);
  doc.setTextColor(100, 116, 139);
  if (formData.address) {
    doc.text(formData.address, 105, y, { align: "center" });
    y += 4;
  }
  doc.text(`${formData.email} | ${formData.phone}`, 105, y, { align: "center" });
  y += 4;

  // LinkedIn and GitHub
  if (formData.linkedin || formData.github) {
    const linksInfo = [formData.linkedin, formData.github].filter(Boolean).join("   ");
    doc.text(linksInfo, 105, y, { align: "center" });
    y += 15;
  } else {
    y += 11;
  }

  // Horizontal line
  doc.setDrawColor(37, 99, 235);
  doc.line(20, y, 190, y);
  y += 10;

  // Education FIRST (academic style)
  if (education.some(edu => edu.degree)) {
    doc.setFontSize(13);
    doc.setTextColor(37, 99, 235);
    doc.text("EDUCATION", 20, y);
    y += 7;

    education.forEach(edu => {
      if (edu.degree) {
        doc.setFontSize(11);
        doc.setTextColor(15, 23, 42);
        doc.setFont("helvetica", "bold");
        doc.text(edu.degree, 20, y);
        doc.setFont("helvetica", "normal");
        y += 5;
        doc.setFontSize(10);
        doc.setTextColor(100, 116, 139);
        doc.text(`${edu.institution}, ${edu.year}`, 20, y);
        y += 8;
      }
    });
    y += 5;
  }

  // Research/Summary
  if (formData.summary) {
    doc.setFontSize(13);
    doc.setTextColor(37, 99, 235);
    doc.text("RESEARCH INTERESTS", 20, y);
    y += 7;
    doc.setFontSize(10);
    doc.setTextColor(71, 85, 105);
    const summaryLines = doc.splitTextToSize(formData.summary, 170);
    doc.text(summaryLines, 20, y);
    y += summaryLines.length * 5 + 10;
  }

  // Experience
  if (workExperiences.some(exp => exp.jobTitle)) {
    doc.setFontSize(13);
    doc.setTextColor(37, 99, 235);
    doc.text("PROFESSIONAL EXPERIENCE", 20, y);
    y += 7;

    workExperiences.forEach(exp => {
      if (exp.jobTitle) {
        doc.setFontSize(11);
        doc.setTextColor(15, 23, 42);
        doc.setFont("helvetica", "bold");
        doc.text(exp.jobTitle, 20, y);
        doc.setFont("helvetica", "normal");
        y += 5;
        doc.setFontSize(10);
        doc.setTextColor(100, 116, 139);
        doc.text(`${exp.company}, ${exp.startDate} - ${exp.endDate}`, 20, y);
        y += 5;

        if (exp.description) {
          doc.setFontSize(10);
          doc.setTextColor(71, 85, 105);
          const lines = doc.splitTextToSize(exp.description, 170);
          doc.text(lines, 20, y);
          y += lines.length * 5 + 7;
        }

        if (y > 270) {
          doc.addPage();
          y = 20;
        }
      }
    });
  }

  // Skills
  if (formData.skills) {
    if (y > 250) {
      doc.addPage();
      y = 20;
    }
    doc.setFontSize(13);
    doc.setTextColor(37, 99, 235);
    doc.text("SKILLS & EXPERTISE", 20, y);
    y += 7;
    doc.setFontSize(10);
    doc.setTextColor(71, 85, 105);
    const skillsLines = doc.splitTextToSize(formData.skills, 170);
    doc.text(skillsLines, 20, y);
  }

  return doc;
}

// Two Column Template - Sidebar with colored accent
function generateTwoColumnTemplate(formData: FormData, workExperiences: WorkExperience[], education: Education[], references: Reference[], sectionOrder: Section[]) {
  const doc = new jsPDF();

  // Colored sidebar
  doc.setFillColor(219, 234, 254); // light blue
  doc.rect(0, 0, 65, 297, "F");

  let sideY = 20;
  let mainY = 20;

  // Photo in sidebar - rounded
  if (formData.photo) {
    const imgSize = 45;
    const imgX = 10;
    doc.addImage(formData.photo, 'JPEG', imgX, sideY, imgSize, imgSize);
    doc.setDrawColor(37, 99, 235);
    doc.setLineWidth(0.5);
    doc.roundedRect(imgX, sideY, imgSize, imgSize, 3, 3, 'S');
    sideY += imgSize + 8;
  }

  // Profile section in sidebar
  doc.setFontSize(16);
  doc.setTextColor(37, 99, 235);
  doc.text(formData.fullName, 10, sideY);
  sideY += 10;

  // Contact in sidebar
  doc.setFontSize(8);
  doc.setTextColor(71, 85, 105);
  if (formData.phone) {
    doc.text(`Phone: ${formData.phone}`, 10, sideY);
    sideY += 5;
  }
  if (formData.email) {
    const emailLines = doc.splitTextToSize(formData.email, 50);
    doc.text(emailLines, 10, sideY);
    sideY += emailLines.length * 5 + 5;
  }
  if (formData.address) {
    const addrLines = doc.splitTextToSize(formData.address, 50);
    doc.text(addrLines, 10, sideY);
    sideY += addrLines.length * 5 + 10;
  }

  // Skills in sidebar
  if (formData.skills) {
    doc.setFontSize(11);
    doc.setTextColor(37, 99, 235);
    doc.text("SKILLS", 10, sideY);
    sideY += 6;
    doc.setFontSize(8);
    doc.setTextColor(71, 85, 105);
    const skillsLines = doc.splitTextToSize(formData.skills, 50);
    doc.text(skillsLines, 10, sideY);
    sideY += skillsLines.length * 4 + 10;
  }

  // Education in sidebar
  if (education.some(edu => edu.degree)) {
    doc.setFontSize(11);
    doc.setTextColor(37, 99, 235);
    doc.text("EDUCATION", 10, sideY);
    sideY += 6;

    education.forEach(edu => {
      if (edu.degree) {
        doc.setFontSize(9);
        doc.setTextColor(15, 23, 42);
        doc.setFont("helvetica", "bold");
        const degreeLines = doc.splitTextToSize(edu.degree, 50);
        doc.text(degreeLines, 10, sideY);
        doc.setFont("helvetica", "normal");
        sideY += degreeLines.length * 4 + 3;
        doc.setFontSize(8);
        doc.setTextColor(71, 85, 105);
        const instLines = doc.splitTextToSize(edu.institution, 50);
        doc.text(instLines, 10, sideY);
        sideY += instLines.length * 4 + 2;
        doc.text(edu.year, 10, sideY);
        sideY += 7;
      }
    });
  }

  // Main content
  const mainX = 70;

  // Summary
  if (formData.summary) {
    doc.setFontSize(12);
    doc.setTextColor(37, 99, 235);
    doc.text("PROFESSIONAL SUMMARY", mainX, mainY);
    mainY += 7;
    doc.setFontSize(10);
    doc.setTextColor(71, 85, 105);
    const summaryLines = doc.splitTextToSize(formData.summary, 130);
    doc.text(summaryLines, mainX, mainY);
    mainY += summaryLines.length * 5 + 12;
  }

  // Work Experience
  if (workExperiences.some(exp => exp.jobTitle)) {
    doc.setFontSize(12);
    doc.setTextColor(37, 99, 235);
    doc.text("WORK EXPERIENCE", mainX, mainY);
    mainY += 7;

    workExperiences.forEach(exp => {
      if (exp.jobTitle) {
        doc.setFontSize(11);
        doc.setTextColor(15, 23, 42);
        doc.setFont("helvetica", "bold");
        doc.text(exp.jobTitle, mainX, mainY);
        doc.setFont("helvetica", "normal");
        mainY += 5;
        doc.setFontSize(9);
        doc.setTextColor(100, 116, 139);
        doc.text(`${exp.company}`, mainX, mainY);
        mainY += 4;
        doc.text(`${exp.startDate} - ${exp.endDate}`, mainX, mainY);
        mainY += 5;

        if (exp.description) {
          doc.setFontSize(9);
          doc.setTextColor(71, 85, 105);
          const lines = doc.splitTextToSize(exp.description, 130);
          doc.text(lines, mainX, mainY);
          mainY += lines.length * 4 + 7;
        }

        if (mainY > 270) {
          doc.addPage();
          doc.setFillColor(219, 234, 254);
          doc.rect(0, 0, 65, 297, "F");
          mainY = 20;
        }
      }
    });
  }

  // Certifications
  if (formData.certifications) {
    if (mainY > 250) {
      doc.addPage();
      doc.setFillColor(219, 234, 254);
      doc.rect(0, 0, 65, 297, "F");
      mainY = 20;
    }
    doc.setFontSize(12);
    doc.setTextColor(37, 99, 235);
    doc.text("CERTIFICATIONS", mainX, mainY);
    mainY += 7;
    doc.setFontSize(9);
    doc.setTextColor(71, 85, 105);
    const certLines = doc.splitTextToSize(formData.certifications, 130);
    doc.text(certLines, mainX, mainY);
    mainY += certLines.length * 4 + 12;
  }

  // References
  if (references && references.length > 0 && references.some(ref => ref.name || ref.contact)) {
    if (mainY > 250) {
      doc.addPage();
      doc.setFillColor(219, 234, 254);
      doc.rect(0, 0, 65, 297, "F");
      mainY = 20;
    }
    doc.setFontSize(12);
    doc.setTextColor(37, 99, 235);
    doc.text("REFERENCES", mainX, mainY);
    mainY += 7;

    references.forEach(ref => {
      if (ref.name || ref.contact) {
        doc.setFontSize(10);
        doc.setTextColor(15, 23, 42);
        doc.setFont("helvetica", "bold");
        doc.text(ref.name, mainX, mainY);
        doc.setFont("helvetica", "normal");
        mainY += 5;

        if (ref.contact) {
          doc.setFontSize(9);
          doc.setTextColor(71, 85, 105);
          const contactLines = doc.splitTextToSize(ref.contact, 130);
          doc.text(contactLines, mainX, mainY);
          mainY += contactLines.length * 4 + 6;
        }

        if (mainY > 270) {
          doc.addPage();
          doc.setFillColor(219, 234, 254);
          doc.rect(0, 0, 65, 297, "F");
          mainY = 20;
        }
      }
    });
  }

  return doc;
}

// Timeline Template - Vertical timeline with dots
function generateTimelineTemplate(formData: FormData, workExperiences: WorkExperience[], education: Education[], references: Reference[], sectionOrder: Section[]) {
  const doc = new jsPDF();
  let y = 25;

  // Photo - Circular, top right
  if (formData.photo) {
    const imgSize = 25;
    const imgX = 165;
    const imgY = 20;
    doc.addImage(formData.photo, 'JPEG', imgX, imgY, imgSize, imgSize);
    doc.setDrawColor(37, 99, 235);
    doc.setLineWidth(1);
    doc.circle(imgX + imgSize / 2, imgY + imgSize / 2, imgSize / 2, 'S');
  }

  // Header
  doc.setFontSize(22);
  doc.setTextColor(37, 99, 235);
  doc.text(formData.fullName, 20, y);
  y += 10;

  doc.setFontSize(9);
  doc.setTextColor(100, 116, 139);
  doc.text(`${formData.email} | ${formData.phone}`, 20, y);
  y += 15;

  // Summary
  if (formData.summary) {
    doc.setFontSize(10);
    doc.setTextColor(71, 85, 105);
    const summaryLines = doc.splitTextToSize(formData.summary, 170);
    doc.text(summaryLines, 20, y);
    y += summaryLines.length * 5 + 15;
  }

  // Timeline line
  const timelineX = 25;

  // Work Experience with timeline
  if (workExperiences.some(exp => exp.jobTitle)) {
    doc.setFontSize(14);
    doc.setTextColor(37, 99, 235);
    doc.text("CAREER TIMELINE", 20, y);
    y += 10;

    workExperiences.forEach(exp => {
      if (exp.jobTitle) {
        // Timeline dot
        doc.setFillColor(37, 99, 235);
        doc.circle(timelineX, y - 2, 2, "F");

        // Timeline line
        doc.setDrawColor(219, 234, 254);
        doc.setLineWidth(1);
        doc.line(timelineX, y, timelineX, y + 20);

        // Content
        doc.setFontSize(11);
        doc.setTextColor(15, 23, 42);
        doc.setFont("helvetica", "bold");
        doc.text(exp.jobTitle, 35, y);
        doc.setFont("helvetica", "normal");
        y += 5;

        doc.setFontSize(9);
        doc.setTextColor(100, 116, 139);
        doc.text(exp.company, 35, y);
        y += 4;
        doc.text(`${exp.startDate} - ${exp.endDate}`, 35, y);
        y += 6;

        if (exp.description) {
          doc.setFontSize(9);
          doc.setTextColor(71, 85, 105);
          const lines = doc.splitTextToSize(exp.description, 155);
          doc.text(lines, 35, y);
          y += lines.length * 4 + 10;
        }

        if (y > 260) {
          doc.addPage();
          y = 20;
        }
      }
    });
  }

  // Education
  if (education.some(edu => edu.degree)) {
    if (y > 240) {
      doc.addPage();
      y = 20;
    }

    doc.setFontSize(14);
    doc.setTextColor(37, 99, 235);
    doc.text("EDUCATION", 20, y);
    y += 10;

    education.forEach(edu => {
      if (edu.degree) {
        doc.setFillColor(37, 99, 235);
        doc.circle(timelineX, y - 2, 2, "F");

        doc.setFontSize(10);
        doc.setTextColor(15, 23, 42);
        doc.setFont("helvetica", "bold");
        doc.text(edu.degree, 35, y);
        doc.setFont("helvetica", "normal");
        y += 5;
        doc.setFontSize(9);
        doc.setTextColor(100, 116, 139);
        doc.text(`${edu.institution} - ${edu.year}`, 35, y);
        y += 10;
      }
    });
  }

  // Skills
  if (formData.skills) {
    if (y > 250) {
      doc.addPage();
      y = 20;
    }
    doc.setFontSize(14);
    doc.setTextColor(37, 99, 235);
    doc.text("SKILLS", 20, y);
    y += 8;
    doc.setFontSize(9);
    doc.setTextColor(71, 85, 105);
    const skillsLines = doc.splitTextToSize(formData.skills, 170);
    doc.text(skillsLines, 20, y);
    y += skillsLines.length * 4 + 10;
  }

  // Certifications
  if (formData.certifications) {
    if (y > 250) {
      doc.addPage();
      y = 20;
    }
    doc.setFontSize(14);
    doc.setTextColor(37, 99, 235);
    doc.text("CERTIFICATIONS", 20, y);
    y += 8;
    doc.setFontSize(9);
    doc.setTextColor(71, 85, 105);
    const certLines = doc.splitTextToSize(formData.certifications, 170);
    doc.text(certLines, 20, y);
    y += certLines.length * 4 + 10;
  }

  // References
  if (references && references.length > 0 && references.some(ref => ref.name || ref.contact)) {
    if (y > 250) {
      doc.addPage();
      y = 20;
    }
    doc.setFontSize(14);
    doc.setTextColor(37, 99, 235);
    doc.text("REFERENCES", 20, y);
    y += 8;

    references.forEach(ref => {
      if (ref.name || ref.contact) {
        doc.setFillColor(37, 99, 235);
        doc.circle(timelineX, y - 2, 2, "F");

        doc.setFontSize(10);
        doc.setTextColor(15, 23, 42);
        doc.setFont("helvetica", "bold");
        doc.text(ref.name, 35, y);
        doc.setFont("helvetica", "normal");
        y += 5;

        if (ref.contact) {
          doc.setFontSize(9);
          doc.setTextColor(71, 85, 105);
          const contactLines = doc.splitTextToSize(ref.contact, 165);
          doc.text(contactLines, 35, y);
          y += contactLines.length * 4 + 6;
        }

        if (y > 270) {
          doc.addPage();
          y = 20;
        }
      }
    });
  }

  return doc;
}

// Infographic Template - Visual with icons/badges
function generateInfographicTemplate(formData: FormData, workExperiences: WorkExperience[], education: Education[], references: Reference[], sectionOrder: Section[]) {
  const doc = new jsPDF();

  // Header with gradient simulation
  doc.setFillColor(37, 99, 235);
  doc.rect(0, 0, 210, 35, "F");

  // Photo - Circular with white border in header
  if (formData.photo) {
    const imgSize = 24;
    const imgX = 168;
    const imgY = 5.5;
    // White circle background
    doc.setFillColor(255, 255, 255);
    doc.circle(imgX + imgSize / 2, imgY + imgSize / 2, imgSize / 2 + 1.5, 'F');
    doc.addImage(formData.photo, 'JPEG', imgX, imgY, imgSize, imgSize);
    doc.setDrawColor(255, 255, 255);
    doc.setLineWidth(1.5);
    doc.circle(imgX + imgSize / 2, imgY + imgSize / 2, imgSize / 2, 'S');
  }

  // Name
  doc.setFontSize(24);
  doc.setTextColor(255, 255, 255);
  doc.text(formData.fullName, 105, 20, { align: "center" });

  // Professional Title
  if (formData.professionalTitle) {
    doc.setFontSize(11);
    doc.text(formData.professionalTitle, 105, 26, { align: "center" });
  }

  // Contact
  doc.setFontSize(9);
  doc.text(`${formData.email} | ${formData.phone}`, 105, formData.professionalTitle ? 32 : 28, { align: "center" });

  // LinkedIn and GitHub
  if (formData.linkedin || formData.github) {
    const linksInfo = [formData.linkedin, formData.github].filter(Boolean).join(" | ");
    doc.text(linksInfo, 105, formData.professionalTitle ? 37 : 33, { align: "center" });
  }

  let y = formData.professionalTitle ? 55 : 50;

  // Summary in box
  if (formData.summary) {
    doc.setFillColor(219, 234, 254);
    doc.roundedRect(15, y - 5, 180, 20, 3, 3, "F");
    doc.setFontSize(10);
    doc.setTextColor(37, 99, 235);
    const summaryLines = doc.splitTextToSize(formData.summary, 170);
    doc.text(summaryLines, 20, y);
    y += summaryLines.length * 5 + 20;
  }

  // Skills with badges
  if (formData.skills) {
    doc.setFontSize(13);
    doc.setTextColor(37, 99, 235);
    doc.text("CORE COMPETENCIES", 20, y);
    y += 10;

    const skills = formData.skills.split(',').map(s => s.trim()).slice(0, 8);
    let xPos = 20;
    let yPos = y;

    skills.forEach((skill, index) => {
      if (index > 0 && index % 3 === 0) {
        yPos += 12;
        xPos = 20;
      }

      doc.setFillColor(37, 99, 235);
      doc.roundedRect(xPos, yPos - 5, 55, 8, 2, 2, "F");
      doc.setFontSize(8);
      doc.setTextColor(255, 255, 255);
      doc.text(skill.substring(0, 20), xPos + 27.5, yPos, { align: "center" });

      xPos += 60;
    });

    y = yPos + 15;
  }

  // Experience
  if (workExperiences.some(exp => exp.jobTitle)) {
    doc.setFontSize(13);
    doc.setTextColor(37, 99, 235);
    doc.text("PROFESSIONAL JOURNEY", 20, y);
    y += 10;

    workExperiences.forEach(exp => {
      if (exp.jobTitle) {
        // Icon circle
        doc.setFillColor(37, 99, 235);
        doc.circle(25, y - 2, 3, "F");

        doc.setFontSize(11);
        doc.setTextColor(15, 23, 42);
        doc.setFont("helvetica", "bold");
        doc.text(exp.jobTitle, 35, y);
        doc.setFont("helvetica", "normal");
        y += 5;

        doc.setFontSize(9);
        doc.setTextColor(100, 116, 139);
        doc.text(`${exp.company} | ${exp.startDate} - ${exp.endDate}`, 35, y);
        y += 5;

        if (exp.description) {
          doc.setFontSize(9);
          doc.setTextColor(71, 85, 105);
          const lines = doc.splitTextToSize(exp.description, 160);
          doc.text(lines, 35, y);
          y += lines.length * 4 + 8;
        }

        if (y > 260) {
          doc.addPage();
          y = 20;
        }
      }
    });
  }

  // Education
  if (education.some(edu => edu.degree)) {
    if (y > 240) {
      doc.addPage();
      y = 20;
    }

    doc.setFontSize(13);
    doc.setTextColor(37, 99, 235);
    doc.text("ACADEMIC BACKGROUND", 20, y);
    y += 10;

    education.forEach(edu => {
      if (edu.degree) {
        doc.setFillColor(37, 99, 235);
        doc.circle(25, y - 2, 3, "F");

        doc.setFontSize(10);
        doc.setTextColor(15, 23, 42);
        doc.setFont("helvetica", "bold");
        doc.text(edu.degree, 35, y);
        doc.setFont("helvetica", "normal");
        y += 5;
        doc.setFontSize(9);
        doc.setTextColor(100, 116, 139);
        doc.text(`${edu.institution} - ${edu.year}`, 35, y);
        y += 10;
      }
    });
    y += 5;
  }

  // Skills
  if (formData.skills) {
    if (y > 250) {
      doc.addPage();
      y = 20;
    }
    doc.setFontSize(13);
    doc.setTextColor(37, 99, 235);
    doc.text("SKILLS & EXPERTISE", 20, y);
    y += 10;
    doc.setFontSize(9);
    doc.setTextColor(71, 85, 105);
    const skillsLines = doc.splitTextToSize(formData.skills, 160);
    doc.text(skillsLines, 35, y);
    y += skillsLines.length * 4 + 10;
  }

  // Certifications
  if (formData.certifications) {
    if (y > 250) {
      doc.addPage();
      y = 20;
    }
    doc.setFontSize(13);
    doc.setTextColor(37, 99, 235);
    doc.text("CERTIFICATIONS", 20, y);
    y += 10;
    doc.setFontSize(9);
    doc.setTextColor(71, 85, 105);
    const certLines = doc.splitTextToSize(formData.certifications, 160);
    doc.text(certLines, 35, y);
    y += certLines.length * 4 + 10;
  }

  // References
  if (references && references.length > 0 && references.some(ref => ref.name || ref.contact)) {
    if (y > 250) {
      doc.addPage();
      y = 20;
    }
    doc.setFontSize(13);
    doc.setTextColor(37, 99, 235);
    doc.text("REFERENCES", 20, y);
    y += 10;

    references.forEach(ref => {
      if (ref.name || ref.contact) {
        doc.setFillColor(37, 99, 235);
        doc.circle(25, y - 2, 3, "F");

        doc.setFontSize(10);
        doc.setTextColor(15, 23, 42);
        doc.setFont("helvetica", "bold");
        doc.text(ref.name, 35, y);
        doc.setFont("helvetica", "normal");
        y += 5;

        if (ref.contact) {
          doc.setFontSize(9);
          doc.setTextColor(71, 85, 105);
          const contactLines = doc.splitTextToSize(ref.contact, 160);
          doc.text(contactLines, 35, y);
          y += contactLines.length * 4 + 6;
        }

        if (y > 270) {
          doc.addPage();
          y = 20;
        }
      }
    });
  }

  return doc;
}

// Elegant Template - Minimalist with refined typography
function generateElegantTemplate(formData: FormData, workExperiences: WorkExperience[], education: Education[], references: Reference[], sectionOrder: Section[]) {
  const doc = new jsPDF();
  let y = 40;

  // Photo - Small square, centered above name
  if (formData.photo) {
    const imgSize = 20;
    const imgX = 95;
    const imgY = 15;
    doc.addImage(formData.photo, 'JPEG', imgX, imgY, imgSize, imgSize);
    doc.setDrawColor(203, 213, 225);
    doc.setLineWidth(0.3);
    doc.rect(imgX, imgY, imgSize, imgSize, 'S');
    y += 5;
  }

  // Name - Centered, elegant
  doc.setFontSize(26);
  doc.setTextColor(15, 23, 42);
  doc.text(formData.fullName, 105, y, { align: "center" });
  y += 6;

  // Thin line
  doc.setDrawColor(203, 213, 225);
  doc.setLineWidth(0.3);
  doc.line(70, y, 140, y);
  y += 8;

  // Professional Title
  if (formData.professionalTitle) {
    doc.setFontSize(11);
    doc.setTextColor(37, 99, 235);
    doc.text(formData.professionalTitle, 105, y, { align: "center" });
    y += 6;
  }

  // Contact - Centered
  doc.setFontSize(9);
  doc.setTextColor(100, 116, 139);
  doc.text(formData.email, 105, y, { align: "center" });
  y += 4;
  doc.text(formData.phone, 105, y, { align: "center" });
  y += 4;

  // LinkedIn and GitHub
  if (formData.linkedin || formData.github) {
    const linksInfo = [formData.linkedin, formData.github].filter(Boolean).join("  •  ");
    doc.text(linksInfo, 105, y, { align: "center" });
    y += 15;
  } else {
    y += 11;
  }

  // Summary
  if (formData.summary) {
    doc.setFontSize(10);
    doc.setTextColor(71, 85, 105);
    const summaryLines = doc.splitTextToSize(formData.summary, 150);
    summaryLines.forEach((line: string) => {
      doc.text(line, 105, y, { align: "center" });
      y += 5;
    });
    y += 12;
  }

  // Experience
  if (workExperiences.some(exp => exp.jobTitle)) {
    doc.setFontSize(11);
    doc.setTextColor(37, 99, 235);
    doc.text("Experience", 105, y, { align: "center" });
    y += 8;

    workExperiences.forEach(exp => {
      if (exp.jobTitle) {
        doc.setFontSize(11);
        doc.setTextColor(15, 23, 42);
        doc.setFont("helvetica", "bold");
        doc.text(exp.jobTitle, 30, y);
        doc.setFont("helvetica", "normal");
        y += 5;

        doc.setFontSize(9);
        doc.setTextColor(100, 116, 139);
        doc.text(exp.company, 30, y);
        y += 4;
        doc.text(`${exp.startDate} - ${exp.endDate}`, 30, y);
        y += 6;

        if (exp.description) {
          doc.setFontSize(9);
          doc.setTextColor(71, 85, 105);
          const lines = doc.splitTextToSize(exp.description, 150);
          doc.text(lines, 30, y);
          y += lines.length * 4 + 8;
        }

        if (y > 265) {
          doc.addPage();
          y = 20;
        }
      }
    });
  }

  // Education
  if (education.some(edu => edu.degree)) {
    if (y > 240) {
      doc.addPage();
      y = 20;
    }

    doc.setFontSize(11);
    doc.setTextColor(37, 99, 235);
    doc.text("Education", 105, y, { align: "center" });
    y += 8;

    education.forEach(edu => {
      if (edu.degree) {
        doc.setFontSize(10);
        doc.setTextColor(15, 23, 42);
        doc.setFont("helvetica", "bold");
        doc.text(edu.degree, 30, y);
        doc.setFont("helvetica", "normal");
        y += 5;
        doc.setFontSize(9);
        doc.setTextColor(100, 116, 139);
        doc.text(`${edu.institution}, ${edu.year}`, 30, y);
        y += 8;
      }
    });
  }

  // Skills
  if (formData.skills) {
    if (y > 250) {
      doc.addPage();
      y = 20;
    }
    doc.setFontSize(11);
    doc.setTextColor(37, 99, 235);
    doc.text("Skills", 105, y, { align: "center" });
    y += 8;
    doc.setFontSize(9);
    doc.setTextColor(71, 85, 105);
    const skillsLines = doc.splitTextToSize(formData.skills, 150);
    skillsLines.forEach((line: string) => {
      doc.text(line, 105, y, { align: "center" });
      y += 4;
    });
    y += 8;
  }

  // Certifications
  if (formData.certifications) {
    if (y > 250) {
      doc.addPage();
      y = 20;
    }
    doc.setFontSize(11);
    doc.setTextColor(37, 99, 235);
    doc.text("Certifications", 105, y, { align: "center" });
    y += 8;
    doc.setFontSize(9);
    doc.setTextColor(71, 85, 105);
    const certLines = doc.splitTextToSize(formData.certifications, 150);
    certLines.forEach((line: string) => {
      doc.text(line, 105, y, { align: "center" });
      y += 4;
    });
    y += 8;
  }

  // References
  if (references && references.length > 0 && references.some(ref => ref.name || ref.contact)) {
    if (y > 250) {
      doc.addPage();
      y = 20;
    }
    doc.setFontSize(11);
    doc.setTextColor(37, 99, 235);
    doc.text("References", 105, y, { align: "center" });
    y += 8;

    references.forEach(ref => {
      if (ref.name || ref.contact) {
        doc.setFontSize(10);
        doc.setTextColor(15, 23, 42);
        doc.setFont("helvetica", "bold");
        doc.text(ref.name, 30, y);
        doc.setFont("helvetica", "normal");
        y += 5;

        if (ref.contact) {
          doc.setFontSize(9);
          doc.setTextColor(71, 85, 105);
          const contactLines = doc.splitTextToSize(ref.contact, 150);
          doc.text(contactLines, 30, y);
          y += contactLines.length * 4 + 6;
        }

        if (y > 270) {
          doc.addPage();
          y = 20;
        }
      }
    });
  }

  return doc;
}

// Cool2025 Template - Matching the uploaded PDF design
function generateCool2025Template(formData: FormData, workExperiences: WorkExperience[], education: Education[], references: Reference[], sectionOrder: Section[]) {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margins = { left: 20, right: 20 };
  const centerX = pageWidth / 2;
  let y = 15;

  // Brand color - Blue/Teal
  const brandColor = [30, 106, 170]; // RGB
  const lightBrandColor = [100, 150, 200]; // Lighter blue for links

  // Top horizontal line
  doc.setDrawColor(brandColor[0], brandColor[1], brandColor[2]);
  doc.setLineWidth(0.5);
  doc.line(margins.left, y, pageWidth - margins.right, y);
  y += 10;

  // Name - Large, Bold, Blue, Centered
  doc.setFont("times", "bold");
  doc.setFontSize(22);
  doc.setTextColor(brandColor[0], brandColor[1], brandColor[2]);
  doc.text(formData.fullName.toUpperCase(), centerX, y, { align: "center" });
  y += 8;

  // Bottom horizontal line under name
  doc.setDrawColor(brandColor[0], brandColor[1], brandColor[2]);
  doc.setLineWidth(0.5);
  doc.line(margins.left, y, pageWidth - margins.right, y);
  y += 8;

  // Contact info - address, phone, email on one line
  doc.setFont("times", "normal");
  doc.setFontSize(9);
  doc.setTextColor(80, 80, 80);
  const contactLine = `${formData.address}  •  ${formData.phone}  •  ${formData.email}`;
  doc.text(contactLine, centerX, y, { align: "center" });
  y += 5;

  // LinkedIn and GitHub on separate line
  if (formData.linkedin || formData.github) {
    doc.setFontSize(8);
    doc.setTextColor(lightBrandColor[0], lightBrandColor[1], lightBrandColor[2]);
    const socialLine = `${formData.linkedin ? 'in ' + formData.linkedin : ''}  ${formData.github ? '  ' + formData.github : ''}`;
    doc.text(socialLine, centerX, y, { align: "center" });
    y += 8;
  }

  // Photo - Circular, centered
  if (formData.photo) {
    const imgSize = 25;
    const imgX = centerX - imgSize / 2;
    doc.addImage(formData.photo, 'JPEG', imgX, y, imgSize, imgSize);
    y += imgSize + 8;
  }

  // Professional Title - Blue, centered
  if (formData.professionalTitle) {
    doc.setFont("times", "normal");
    doc.setFontSize(12);
    doc.setTextColor(brandColor[0], brandColor[1], brandColor[2]);
    doc.text(formData.professionalTitle, centerX, y, { align: "center" });
    y += 10;
  }

  // Helper function to draw section header with decorative lines
  const drawSectionHeader = (title: string, currentY: number) => {
    const titleWidth = doc.getTextWidth(title);
    const lineWidth = 35;
    const gap = 5;

    doc.setFont("times", "normal");
    doc.setFontSize(12);
    doc.setTextColor(brandColor[0], brandColor[1], brandColor[2]);
    doc.text(title, centerX, currentY, { align: "center" });

    // Left line
    doc.setDrawColor(180, 180, 180);
    doc.setLineWidth(0.3);
    doc.line(centerX - titleWidth / 2 - gap - lineWidth, currentY - 2, centerX - titleWidth / 2 - gap, currentY - 2);

    // Right line
    doc.line(centerX + titleWidth / 2 + gap, currentY - 2, centerX + titleWidth / 2 + gap + lineWidth, currentY - 2);

    return currentY + 7;
  };

  // Helper to check page space
  const checkPageSpace = (requiredSpace: number) => {
    if (y + requiredSpace > pageHeight - 20) {
      doc.addPage();
      return 20;
    }
    return y;
  };

  // Professional Summary - Render first after header
  if (formData.summary) {
    y = checkPageSpace(20);
    y = drawSectionHeader("Professional Summary", y);

    doc.setFont("times", "normal");
    doc.setFontSize(9);
    doc.setTextColor(40, 40, 40);
    const summaryLines = doc.splitTextToSize(formData.summary, pageWidth - margins.left - margins.right - 10);
    summaryLines.forEach((line: string) => {
      y = checkPageSpace(5);
      doc.text(line, margins.left + 5, y);
      y += 4;
    });
    y += 8;
  }

  // Render sections in order
  sectionOrder.forEach((section) => {
    if (section.type === 'workExperience' && workExperiences.length > 0 && workExperiences.some(we => we.jobTitle || we.company)) {
      y = checkPageSpace(20);
      y = drawSectionHeader("Work experience", y);

      workExperiences.forEach((we, index) => {
        if (we.jobTitle || we.company) {
          y = checkPageSpace(25);

          // Date range - left aligned
          doc.setFont("times", "normal");
          doc.setFontSize(10);
          doc.setTextColor(60, 60, 60);
          const dateText = `${we.startDate} - ${we.endDate}`;
          doc.text(dateText, margins.left, y);
          y += 6;

          // Job Title - Bold
          doc.setFont("times", "bold");
          doc.setFontSize(10);
          doc.setTextColor(0, 0, 0);
          doc.text(we.jobTitle, margins.left + 40, y - 6);

          // Company - Blue Italic
          if (we.company) {
            doc.setFont("times", "italic");
            doc.setFontSize(10);
            doc.setTextColor(brandColor[0], brandColor[1], brandColor[2]);
            doc.text(we.company, margins.left + 40, y);
            y += 5;
          }

          // Description - Bullet points
          if (we.description) {
            doc.setFont("times", "normal");
            doc.setFontSize(9);
            doc.setTextColor(40, 40, 40);
            const descLines = we.description.split('\n');
            descLines.forEach(line => {
              const trimmedLine = line.trim();
              if (trimmedLine) {
                const bulletLine = trimmedLine.startsWith('•') ? trimmedLine : `• ${trimmedLine}`;
                const wrappedLines = doc.splitTextToSize(bulletLine, pageWidth - margins.left - margins.right - 45);
                wrappedLines.forEach((wLine: string) => {
                  y = checkPageSpace(5);
                  doc.text(wLine, margins.left + 40, y);
                  y += 4;
                });
              }
            });
            y += 5;
          }
        }
      });
      y += 3;
    }

    if (section.type === 'education' && education.length > 0 && education.some(edu => edu.degree || edu.institution)) {
      y = checkPageSpace(20);
      y = drawSectionHeader("Education", y);

      education.forEach((edu) => {
        if (edu.degree || edu.institution) {
          y = checkPageSpace(15);

          // Degree - Bold
          doc.setFont("times", "bold");
          doc.setFontSize(10);
          doc.setTextColor(0, 0, 0);
          doc.text(edu.degree, margins.left, y);
          y += 5;

          // Institution - Blue Italic
          if (edu.institution) {
            doc.setFont("times", "italic");
            doc.setFontSize(10);
            doc.setTextColor(brandColor[0], brandColor[1], brandColor[2]);
            doc.text(edu.institution, margins.left, y);
            y += 5;
          }

          // Year
          if (edu.year) {
            doc.setFont("times", "normal");
            doc.setFontSize(9);
            doc.setTextColor(60, 60, 60);
            doc.text(edu.year, margins.left, y);
            y += 5;
          }

          // Description
          if (edu.description) {
            doc.setFont("times", "normal");
            doc.setFontSize(9);
            doc.setTextColor(40, 40, 40);
            const descLines = doc.splitTextToSize(edu.description, pageWidth - margins.left - margins.right - 5);
            descLines.forEach((line: string) => {
              y = checkPageSpace(5);
              doc.text(line, margins.left, y);
              y += 4;
            });
          }
          y += 5;
        }
      });
      y += 3;
    }

    if (section.type === 'skills' && formData.skills) {
      y = checkPageSpace(20);
      y = drawSectionHeader("Skills", y);

      doc.setFont("times", "normal");
      doc.setFontSize(9);
      doc.setTextColor(40, 40, 40);
      const skillLines = doc.splitTextToSize(formData.skills, pageWidth - margins.left - margins.right - 10);
      skillLines.forEach((line: string) => {
        y = checkPageSpace(5);
        doc.text(line, margins.left + 5, y);
        y += 4;
      });
      y += 8;
    }

    if (section.type === 'certifications' && formData.certifications) {
      y = checkPageSpace(20);
      y = drawSectionHeader("Certifications", y);

      doc.setFont("times", "normal");
      doc.setFontSize(9);
      doc.setTextColor(40, 40, 40);
      const certLines = doc.splitTextToSize(formData.certifications, pageWidth - margins.left - margins.right - 10);
      certLines.forEach((line: string) => {
        y = checkPageSpace(5);
        doc.text(line, margins.left + 5, y);
        y += 4;
      });
      y += 8;
    }

    if (section.type === 'references' && references.length > 0 && references.some(ref => ref.name || ref.contact)) {
      y = checkPageSpace(20);
      y = drawSectionHeader("References", y);

      references.forEach((ref) => {
        if (ref.name || ref.contact) {
          y = checkPageSpace(12);

          doc.setFont("times", "bold");
          doc.setFontSize(10);
          doc.setTextColor(0, 0, 0);
          doc.text(ref.name, margins.left, y);
          y += 5;

          if (ref.contact) {
            doc.setFont("times", "normal");
            doc.setFontSize(9);
            doc.setTextColor(60, 60, 60);
            const contactLines = doc.splitTextToSize(ref.contact, pageWidth - margins.left - margins.right - 5);
            contactLines.forEach((line: string) => {
              y = checkPageSpace(5);
              doc.text(line, margins.left, y);
              y += 4;
            });
          }
          y += 5;
        }
      });
    }
  });

  return doc;
}
