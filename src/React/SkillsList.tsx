import React, { useState } from "react";

const CategoryIcons = {
  "System Architecture": (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-6 h-6 text-[var(--sec)] opacity-70"
    >
      <path d="M4 16V4H2V2H22V4H20V16H22V18H14V22H10V18H2V16H4ZM6 4V16H18V4H6ZM8 6H16V14H8V6Z" />
    </svg>
  ),
  "Medical Device Development": (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-6 h-6 text-[var(--sec)] opacity-70"
    >
      <path d="M19 8C20.6569 8 22 9.34315 22 11V13C22 14.6569 20.6569 16 19 16H17V20H15V4H19C20.6569 4 22 5.34315 22 7V8H19ZM12 18V20H5C3.34315 20 2 18.6569 2 17V7C2 5.34315 3.34315 4 5 4H12V6H5C4.44772 6 4 6.44772 4 7V17C4 17.5523 4.44772 18 5 18H12ZM19 14C19.5523 14 20 13.5523 20 13V11C20 10.4477 19.5523 10 19 10H17V14H19ZM19 6H17V8H20C20 7.44772 19.5523 7 19 7V6ZM9 8V10H7V12H9V14H11V12H13V10H11V8H9Z" />
    </svg>
  ),
  "Embedded Systems": (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-6 h-6 text-[var(--sec)] opacity-70"
    >
      <path d="M8 20V14H16V20H19V4H5V20H8ZM10 20H14V16H10V20ZM21 4C21.5523 4 22 4.44772 22 5V19C22 19.5523 21.5523 20 21 20H18V22H6V20H3C2.44772 20 2 19.5523 2 19V5C2 4.44772 2.44772 4 3 4H21ZM8 7V9H16V7H8ZM8 10V12H16V10H8Z" />
    </svg>
  ),
  "Modern Development": (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-6 h-6 text-[var(--sec)] opacity-70"
    >
      <path d="M24 12L18.3431 17.6569L16.9289 16.2426L21.1716 12L16.9289 7.75736L18.3431 6.34315L24 12ZM2.82843 12L7.07107 16.2426L5.65685 17.6569L0 12L5.65685 6.34315L7.07107 7.75736L2.82843 12ZM9.78845 21H7.66009L14.2116 3H16.3399L9.78845 21Z" />
    </svg>
  ),
};

const SkillsList = () => {
  const [openItem, setOpenItem] = useState<string | null>(null);

  const skills = {
    "System Architecture": [
      "Hardware-software interface design",
      "Scalable software architecture",
      "Requirements-driven development",
      "Performance optimization",
    ],
    "Medical Device Development": [
      "IEC 62304 compliance expertise",
      "FDA submission documentation",
      "Experience from first-in-human trials to market",
      "Risk-based design approach and FMEA expertise",
    ],
    "Embedded Systems": [
      "Real-time system development",
      "Resource-constrained optimization",
      "Bare metal programming",
      "RTOS implementation",
    ],
    "Modern Development": [
      "CI/CD pipeline implementation",
      "Automated testing frameworks",
      "Modern toolchain integration",
      "Rapid prototyping practices",
    ],
  };

  const toggleItem = (item: string) => {
    setOpenItem(openItem === item ? null : item);
  };

  return (
    <div className="text-left pt-3 md:pt-9">
      <h3 className="text-[var(--white)] text-3xl md:text-4xl font-semibold md:mb-6">
        Areas of Expertise
      </h3>
      <ul className="space-y-4 mt-4 text-lg">
        {Object.entries(skills).map(([category, items]) => (
          <li key={category} className="w-full">
            <div
              onClick={() => toggleItem(category)}
              className="md:w-[400px] w-full bg-[#1414149c] rounded-2xl text-left hover:bg-opacity-80 transition-all border border-[var(--white-icon-tr)] cursor-pointer overflow-hidden"
            >
              <div className="flex items-center gap-3 p-4">
                {CategoryIcons[category]}
                <div className="flex items-center gap-2 flex-grow justify-between">
                  <div className="min-w-0 max-w-[200px] md:max-w-none overflow-hidden">
                    <span className="block truncate text-[var(--white)] text-lg">
                      {category}
                    </span>
                  </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className={`w-6 h-6 text-[var(--white)] transform transition-transform flex-shrink-0 ${
                      openItem === category ? "rotate-180" : ""
                    }`}
                  >
                    <path d="M11.9999 13.1714L16.9497 8.22168L18.3639 9.63589L11.9999 15.9999L5.63599 9.63589L7.0502 8.22168L11.9999 13.1714Z"></path>
                  </svg>
                </div>
              </div>

              <div
                className={`transition-all duration-300 px-4 ${
                  openItem === category
                    ? "max-h-[500px] pb-4 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <ul className="space-y-2 text-[var(--white-icon)] text-sm">
                  {items.map((item, index) => (
                    <div key={index} className="flex items-center">
                      <span className="pl-1">•</span>
                      <li className="pl-3">{item}</li>
                    </div>
                  ))}
                </ul>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SkillsList;
