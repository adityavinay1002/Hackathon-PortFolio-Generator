/**
 * Simple Regex-based Resume Parser
 * Extracts basic information from raw text.
 */
const parseResumeText = (text) => {
    const data = {
        profile: {
            fullName: '',
            email: '',
            phone: '',
            title: '',
            location: '',
            bio: ''
        },
        socialLinks: {
            github: '',
            linkedin: '',
            twitter: '',
            instagram: '',
            website: ''
        },
        skills: [],
        projects: [],
        specializations: []
    };

    const commonSkills = [
        'React', 'Node.js', 'JavaScript', 'TypeScript', 'HTML', 'CSS', 'Python', 'Java',
        'MongoDB', 'SQL', 'Git', 'Docker', 'AWS', 'Redux', 'Express', 'Tailwind', 'Next.js',
        'C++', 'C#', 'Spring Boot', 'PHP', 'Laravel', 'Vue', 'Angular', 'Firebase', 'PostgreSQL',
        'Machine Learning', 'AI', 'Full Stack', 'Cloud', 'Kubernetes', 'CI/CD'
    ];

    const escapeRegExp = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    // 1. Extract Email
    const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi;
    const emailMatch = text.match(emailRegex);
    if (emailMatch) {
        data.socialLinks.email = emailMatch[0];
        data.profile.email = emailMatch[0];
    }

    // 2. Extract Phone
    const phoneRegex = /(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g;
    const phoneMatch = text.match(phoneRegex);
    if (phoneMatch) {
        data.profile.phone = phoneMatch[0];
    }

    // 3. Extract Name (Usually at the top)
    const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 2);
    if (lines.length > 0) {
        // Try to filter out lines that look like headers or contact info
        const nameCandidates = lines.slice(0, 5).filter(line =>
            !line.includes('@') &&
            !line.includes('http') &&
            !line.match(/\d{4}/) && // Skip dates
            line.split(' ').length <= 4 // Names usually aren't too long
        );
        if (nameCandidates.length > 0) {
            data.profile.fullName = nameCandidates[0];
        }
    }

    // 4. Extract LinkedIn
    const linkedinRegex = /linkedin\.com\/in\/([a-zA-Z0-9-]+)/i;
    const linkedinMatch = text.match(linkedinRegex);
    if (linkedinMatch) {
        data.socialLinks.linkedin = linkedinMatch[0].startsWith('http') ? linkedinMatch[0] : `https://${linkedinMatch[0]}`;
    }

    // 5. Extract GitHub
    const githubRegex = /github\.com\/([a-zA-Z0-9-]+)/i;
    const githubMatch = text.match(githubRegex);
    if (githubMatch) {
        data.socialLinks.github = githubMatch[1];
    }

    // 6. Extract Projects
    // Look for common section headers
    const projectSectionHeaders = ['PROJECTS', 'ACADEMIC PROJECTS', 'PERSONAL PROJECTS', 'TECHNICAL PROJECTS', 'KEY PROJECTS'];
    let projectSectionStart = -1;
    let projectSectionHeaderValue = '';

    for (const header of projectSectionHeaders) {
        const index = text.toUpperCase().indexOf(header);
        if (index !== -1) {
            projectSectionStart = index + header.length;
            projectSectionHeaderValue = header;
            break;
        }
    }

    if (projectSectionStart !== -1) {
        // Find the end of project section (next uppercase section header)
        const nextSectionHeaders = ['EXPERIENCE', 'WORK EXPERIENCE', 'EDUCATION', 'SKILLS', 'CERTIFICATIONS', 'COURSES', 'LANGUAGES', 'ACHIEVEMENTS'];
        let projectSectionEnd = text.length;

        for (const header of nextSectionHeaders) {
            const index = text.toUpperCase().indexOf(header, projectSectionStart);
            if (index !== -1 && index < projectSectionEnd) {
                // Ensure it's a line-start header
                const prevChar = text[index - 1];
                if (!prevChar || prevChar === '\n') {
                    projectSectionEnd = index;
                }
            }
        }

        const projectText = text.substring(projectSectionStart, projectSectionEnd).trim();
        const projectLines = projectText.split('\n').map(l => l.trim()).filter(l => l.length > 0);

        let currentProject = null;

        projectLines.forEach(line => {
            // Heuristic for a project title:
            // 1. Doesn't start with a bullet point
            // 2. Short (less than 100 chars)
            // 3. Doesn't look like a purely descriptive sentence
            const isBullet = /^[\u2022\*\-\>\d\.]/.test(line);

            // Refined heuristic for a project title:
            // 1. Doesn't start with a bullet point
            // 2. Short (3 to 70 chars)
            // 3. Usually starts with a capital letter
            // 4. Doesn't start with common action/linking words like "and", "using", "built"
            const startsWithActionWord = /^(and|using|built|implemented|created|designed|worked|developed|improved|managed|implemented|leveraged|utilized|provided)\b/i.test(line);
            const startsWithCapital = /^[A-Z]/.test(line);
            const isTooLong = line.length > 70;
            const isTooShort = line.length < 3;

            const isLikelyTitle = !isBullet && !isTooLong && !isTooShort && startsWithCapital && !startsWithActionWord;

            if (isLikelyTitle) {
                // Potential new project title
                if (currentProject && currentProject.title) {
                    data.projects.push(currentProject);
                }
                currentProject = {
                    title: line.replace(/^[:\-\*]\s*/, '').trim(),
                    description: '',
                    techStack: [],
                    githubLink: '',
                    liveLink: ''
                };
            } else if (currentProject) {
                // Append to description if we have a current project
                const cleanLine = line.replace(/^[\u2022\*\-\>\d\.]+\s*/, '').trim();
                if (cleanLine) {
                    currentProject.description += (currentProject.description ? ' ' : '') + cleanLine;

                    // Also check for tech in this line
                    commonSkills.forEach(skill => {
                        const escaped = escapeRegExp(skill);
                        if (new RegExp(`(?:\\b|(?<=\\W))${escaped}(?=\\s|\\b|$)`, 'i').test(line)) {
                            if (!currentProject.techStack.includes(skill)) {
                                currentProject.techStack.push(skill);
                            }
                        }
                    });
                }
            }
        });

        // Push the last one
        if (currentProject && currentProject.title) {
            data.projects.push(currentProject);
        }

        // Limit to reasonable number of projects
        data.projects = data.projects.slice(0, 6);

        // Final cleanup for each project
        data.projects.forEach(p => {
            p.techStack = p.techStack.slice(0, 5);
            if (!p.description) p.description = p.title;
        });
    }

    // 7. Extract Skills
    commonSkills.forEach(skill => {
        const escaped = escapeRegExp(skill);
        // Special handling for skills like C++ or C# that end in non-word characters
        // Word boundary \b only works between \w and \W
        const regex = new RegExp(`(?:\\b|(?<=\\W))${escaped}(?=\\s|\\b|$)`, 'i');

        if (regex.test(text)) {
            data.skills.push({ name: skill, level: 85, category: 'Frontend' });
        }
    });

    // 7. Extract Title
    // Look for keywords like "Developer", "Engineer", "Student"
    const titles = ['Software Engineer', 'Full Stack Developer', 'Frontend Developer', 'Backend Developer', 'Web Developer', 'Java Developer', 'Data Scientist'];
    for (const title of titles) {
        const escapedTitle = escapeRegExp(title);
        if (new RegExp(`\\b${escapedTitle}\\b`, 'i').test(text)) {
            data.profile.title = title;
            break;
        }
    }

    return data;
};

module.exports = { parseResumeText };
