// Real-world Enterprise Hotel Staff Roles & Modules Dataset
// Modeled after Forbes Travel Guide, Marriott Digital Learning Zone, and Lobster Ink

export const seedStaffRoles = [
  { id: "front-desk", title: "Front Desk & Reception", code: "FO", staffCount: 14, icon: "Key" },
  { id: "housekeeping", title: "Housekeeping & Rooms", code: "HK", staffCount: 28, icon: "Bed" },
  { id: "food-beverage", title: "F&B Service & Banquets", code: "FB", staffCount: 22, icon: "Utensils" },
  { id: "kitchen", title: "Culinary & Stewarding", code: "CUL", staffCount: 16, icon: "Flame" },
  { id: "concierge-valet", title: "Concierge & Guest Services", code: "CON", staffCount: 8, icon: "Compass" },
  { id: "security", title: "Safety, Security & Loss Prevention", code: "SEC", staffCount: 6, icon: "Shield" },
  { id: "bartending", title: "Bar & Mixology", code: "BAR", staffCount: 7, icon: "Wine" },
  { id: "spa-wellness", title: "Spa & Wellness", code: "SPA", staffCount: 5, icon: "Sparkles" }
];

export const seedUsers = [
  {
    id: "usr_01",
    password: "$2a$10$B6xDaB5kBbxGxvv1S5t.0uORh9auDpN631TsIXuz6kFMZ7PkveRoa",
    name: "Aiden Mercer",
    email: "aiden.mercer@luckyhotel.com",
    role: "staff",
    staffRole: "front-desk",
    department: "Front Desk & Reception",
    position: "Senior Receptionist",
    employeeId: "EMP-4109",
    hireDate: "March 2024",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80",
    hotel: "THE LUCKY HOTEL",
    propertyCode: "TLH-01",
    completedModules: ["FO-101", "FO-102", "SEC-401"],
    inProgressModules: [
      { moduleId: "FO-103", progress: 65, currentLessonId: "fo-103-l2", dueDate: "Tomorrow" },
      { moduleId: "FB-301", progress: 20, currentLessonId: "fb-301-l1", dueDate: "In 6 days" }
    ],
    mandatoryPending: 1,
    ceuCredits: 18.5
  },
  {
    id: "usr_02",
    password: "$2a$10$B6xDaB5kBbxGxvv1S5t.0uORh9auDpN631TsIXuz6kFMZ7PkveRoa",
    name: "Elena Rostova",
    email: "elena.rostova@luckyhotel.com",
    role: "staff",
    staffRole: "housekeeping",
    department: "Housekeeping & Rooms",
    position: "Floor Housekeeping Supervisor",
    employeeId: "EMP-3882",
    hireDate: "January 2023",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=256&q=80",
    hotel: "THE LUCKY HOTEL",
    propertyCode: "TLH-01",
    completedModules: ["HK-201", "HK-202", "HK-203", "SEC-401"],
    inProgressModules: [
      { moduleId: "HK-204", progress: 40, currentLessonId: "hk-204-l1", dueDate: "In 3 days" }
    ],
    mandatoryPending: 0,
    ceuCredits: 24.0
  },
  {
    id: "usr_03",
    password: "$2a$10$B6xDaB5kBbxGxvv1S5t.0uORh9auDpN631TsIXuz6kFMZ7PkveRoa",
    name: "Mateo Rossi",
    email: "mateo.rossi@luckyhotel.com",
    role: "staff",
    staffRole: "food-beverage",
    department: "F&B Service & Banquets",
    position: "Lead Fine Dining Server",
    employeeId: "EMP-5021",
    hireDate: "June 2024",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&q=80",
    hotel: "THE LUCKY HOTEL",
    propertyCode: "TLH-01",
    completedModules: ["FB-301", "FB-302"],
    inProgressModules: [
      { moduleId: "FB-303", progress: 50, currentLessonId: "fb-303-l2", dueDate: "In 4 days" }
    ],
    mandatoryPending: 1,
    ceuCredits: 14.0
  },
  {
    id: "usr_04",
    password: "$2a$10$B6xDaB5kBbxGxvv1S5t.0uORh9auDpN631TsIXuz6kFMZ7PkveRoa",
    name: "Marcus Vance",
    email: "director@luckyhotel.com",
    role: "manager",
    staffRole: "management",
    department: "Hotel Operations & Training Directorate",
    position: "Director of Learning & Quality Standards",
    employeeId: "EMP-1002",
    hireDate: "August 2020",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80",
    hotel: "THE LUCKY HOTEL",
    propertyCode: "TLH-01",
    completedModules: ["FO-101", "FO-102", "HK-201", "FB-301", "CUL-101", "SEC-401"],
    inProgressModules: [],
    mandatoryPending: 0,
    ceuCredits: 62.0
  }
];

export const seedModules = [
  // ===================== FRONT DESK & RECEPTION =====================
  {
    id: "FO-101",
    courseCode: "FO-101",
    title: "Luxury Check-In Sequence & VIP Reception Protocol",
    staffRole: "front-desk",
    department: "Front Desk & Reception",
    type: "Mandatory Onboarding",
    level: "Foundational",
    duration: "25 min",
    lessonsCount: 3,
    ceuCredits: 2.0,
    thumbnail: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
    summary: "Master the 3-minute Forbes Travel Guide arrival protocol: guest greeting, discreet room allocation, keycard handover, and bell desk escort coordination.",
    sopCode: "SOP-FO-01",
    lessons: [
      {
        id: "fo-101-l1",
        title: "The 15/5 Foot Rule & Verbal Salutation",
        duration: "8 min",
        videoUrl: "https://www.youtube-nocookie.com/embed/B3pb8y-0Cos",
        sopObjective: "Ensure every guest is acknowledged within 15 seconds without exception.",
        standards: [
          "15-Foot Standard: Make natural eye contact and offer an engaging warm smile.",
          "5-Foot Standard: Speak a cordial greeting before the guest speaks: 'Good morning/afternoon, welcome to THE LUCKY HOTEL.'",
          "Personalization: Identify and use the guest surname naturally at least twice during the encounter."
        ],
        procedureSteps: [
          { step: 1, action: "Stand with upright, open posture", detail: "Hands rested gently on counter; no crossed arms, leaning, or looking down at PMS screens." },
          { step: 2, action: "Curated Welcome Salutation", detail: "Use proper brand phraseology: 'Welcome to THE LUCKY HOTEL. May I have the pleasure of checking you in today?'" },
          { step: 3, action: "Secure Identification Check", detail: "Request photo ID and credit card politely: 'May I verify your identification and a payment card for incidental authorizations?'" }
        ],
        auditChecklist: [
          "Did associate smile within 3 seconds of guest approach?",
          "Was the guest surname used respectfully?",
          "Was eye contact maintained for 70%+ of the interaction?"
        ]
      },
      {
        id: "fo-101-l2",
        title: "Room Keycard Presentation & Guest Security Law",
        duration: "9 min",
        sopObjective: "Safeguard guest security and room confidentiality under international hospitality security mandates.",
        standards: [
          "Zero Room Announcement: NEVER audibly utter the guest room number in the lobby or desk area.",
          "Discreet Folder Presentation: Write or circle the room number inside the luxury leatherette folder."
        ],
        procedureSteps: [
          { step: 1, action: "Code Keycard on RFID Encoder", detail: "Verify check-out date and authorized room access zones before programming." },
          { step: 2, action: "Slide Keycard into Branded Sleeve", detail: "Point gently with open palm: 'Your suite is on the 8th floor, accessible via the main elevators directly to your right.'" },
          { step: 3, action: "Bell Staff Handover", detail: "Signal bell staff: 'James, please assist Mr. Sterling with his luggage to Suite 814' (said quietly away from guest queue)." }
        ],
        auditChecklist: [
          "Was room number kept completely silent to passersby?",
          "Were elevators and breakfast timings clearly explained?"
        ]
      },
      {
        id: "fo-101-l3",
        title: "VIP Profile Preferences & Amenities Handling",
        duration: "8 min",
        sopObjective: "Ensure Opera PMS profile notes regarding pillows, allergies, and anniversary preferences are strictly honored.",
        standards: [
          "Review confidential guest profile notes prior to check-in.",
          "Verify welcome amenity (fruit platter, champagne, handwritten GM note) is placed in suite prior to arrival."
        ],
        procedureSteps: [
          { step: 1, action: "Check Profile Tags", detail: "Review tags: 'Feather Pillow Allergy', 'Prefers High Floor Away from Elevator'." },
          { step: 2, action: "Confirm Amenity Delivery", detail: "Radio In-Room Dining team to verify fresh ice and welcome gift are staged." },
          { step: 3, action: "Offer Escort", detail: "For Penthouse and Suite reservations, the Duty Manager must personally escort the guest to their room." }
        ],
        auditChecklist: [
          "Did staff acknowledge guest return or special milestone?",
          "Were all profile preferences verified?"
        ]
      }
    ],
    quiz: {
      passingScore: 80,
      questions: [
        {
          id: "q_fo1",
          question: "When handing the room keycard to an arriving guest, what is the mandatory Forbes security standard?",
          options: [
            "Announce the room number out loud so the bellman hears it",
            "Discreetly write/point to the room number inside the folder without speaking it aloud",
            "Say only the floor number and make the guest guess the room",
            "Text the room number to the guest's mobile phone"
          ],
          correctAnswer: 1,
          explanation: "Never state room numbers aloud in public lobby spaces to prevent unauthorized listeners from learning a guest's location."
        },
        {
          id: "q_fo2",
          question: "According to the 15/5 Foot Rule, what must staff do at 5 feet from a guest?",
          options: [
            "Turn away to let the guest pass in peace",
            "Offer a cordial verbal greeting before the guest speaks",
            "Check the guest's luggage tags",
            "Hand them a room brochure"
          ],
          correctAnswer: 1,
          explanation: "At 5 feet, associates must proactively speak a warm, professional salutation."
        }
      ]
    }
  },
  {
    id: "FO-102",
    courseCode: "FO-102",
    title: "PBX & Telephone Etiquette: The 3-Ring Benchmark",
    staffRole: "front-desk",
    department: "Front Desk & Reception",
    type: "Mandatory Compliance",
    level: "Foundational",
    duration: "20 min",
    lessonsCount: 2,
    ceuCredits: 1.5,
    thumbnail: "https://images.unsplash.com/photo-1520333789090-1afc82db536a?auto=format&fit=crop&w=800&q=80",
    summary: "Forbes 5-Star telephone standards: 3-ring pickup rule, hold-time maximums, phraseology, and warm transfers.",
    sopCode: "SOP-FO-04",
    lessons: [
      {
        id: "fo-102-l1",
        title: "Telephone Greeting Standards & Voice Modulation",
        duration: "10 min",
        sopObjective: "Project calm luxury, clarity, and attentiveness across all internal and external hotel calls.",
        standards: [
          "Answer on or before the 3rd ring; never allow a call to reach 4 rings.",
          "Smile before answering; smiling physically alters vocal tone to sound warmer.",
          "Brand Salutation: 'Good morning/afternoon, thank you for calling THE LUCKY HOTEL. My name is [Name], how may I assist you today?'"
        ],
        procedureSteps: [
          { step: 1, action: "Pause Current Activity", detail: "Cease typing on keyboard or talking with coworkers before lifting the receiver." },
          { step: 2, action: "Clear Enunciation", detail: "Speak at a moderate, calm tempo. Avoid rushed or monotone cadence." },
          { step: 3, action: "Take Sincere Ownership", detail: "Never say 'That is not my department.' Say: 'I will personally connect you with Chef Jean in In-Room Dining.'" }
        ],
        auditChecklist: [
          "Was call answered before the 3rd ring?",
          "Was the hotel brand name clearly stated?"
        ]
      },
      {
        id: "fo-102-l2",
        title: "Hold Time Limits & Professional Warm Transfers",
        duration: "10 min",
        sopObjective: "Prevent caller frustration during call transfers and information lookup.",
        standards: [
          "Never place a caller on hold for longer than 30 seconds without checking back.",
          "Warm Transfer Protocol: Always brief the receiving colleague about the caller's request before connecting."
        ],
        procedureSteps: [
          { step: 1, action: "Ask Permission to Hold", detail: "'May I place you on a brief hold while I check availability with our concierge?'" },
          { step: 2, action: "30-Second Refresh", detail: "If retrieval takes longer, return: 'Thank you for your patience, Mr. Davis. I am still locating the manager.'" },
          { step: 3, action: "Brief Receiving Associate", detail: "'Sarah, I have Mrs. Vance on line 2 asking about limousine availability for 7:00 PM.'" }
        ],
        auditChecklist: [
          "Was caller permission requested before holding?",
          "Did associate brief the receiving party before completing transfer?"
        ]
      }
    ],
    quiz: {
      passingScore: 80,
      questions: [
        {
          id: "q_fo102_1",
          question: "What is the maximum allowed time a guest may be placed on hold before staff must check back?",
          options: [
            "30 seconds",
            "2 minutes",
            "5 minutes",
            "As long as needed"
          ],
          correctAnswer: 0,
          explanation: "Forbes standard requires associates to refresh the caller every 30 seconds with an update."
        }
      ]
    }
  },
  {
    id: "FO-103",
    courseCode: "FO-103",
    title: "Opera Cloud PMS: Cashiering, Folio Split & Night Audit",
    staffRole: "front-desk",
    department: "Front Desk & Reception",
    type: "Skill Upgrade",
    level: "Intermediate",
    duration: "35 min",
    lessonsCount: 3,
    ceuCredits: 3.0,
    thumbnail: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80",
    summary: "Accurate folio split billing, corporate master routing, incidentals hold release, and end-of-day cashier balancing.",
    sopCode: "SOP-FO-08",
    lessons: [
      {
        id: "fo-103-l1",
        title: "Billing Routing & Corporate Master Windows",
        duration: "12 min",
        sopObjective: "Route room & tax to corporate direct billing while routing incidentals to guest personal card.",
        standards: [
          "Window 1: Room & Tax (Direct Bill).",
          "Window 2: Personal Incidentals (Food, Minibar, Spa).",
          "Window 3: Disputed or Discretionary Adjustment."
        ],
        procedureSteps: [
          { step: 1, action: "Open Reservation Folio", detail: "Verify Company Direct Bill voucher authorization code." },
          { step: 2, action: "Configure Routing Instructions", detail: "Route Transaction Codes 1000-1090 to Window 1." },
          { step: 3, action: "Print Preliminary Folio", detail: "Review charges with guest before closing check-out." }
        ],
        auditChecklist: [
          "Were direct billing codes verified against company contract?",
          "Was guest personal card authorized for incidental deposit ($100/night)?"
        ]
      }
    ],
    quiz: {
      passingScore: 80,
      questions: [
        {
          id: "q_fo103_1",
          question: "Why are corporate direct bill charges routed to Window 1 and incidentals to Window 2?",
          options: [
            "To prevent corporate clients from being billed for personal mini-bar or movie charges",
            "Because Opera PMS only allows one window",
            "To hide room rates from the guest",
            "To save printing paper"
          ],
          correctAnswer: 0,
          explanation: "Window routing separates corporate-approved room charges from discretionary guest personal spend."
        }
      ]
    }
  },

  // ===================== HOUSEKEEPING & ROOMS =====================
  {
    id: "HK-201",
    courseCode: "HK-201",
    title: "Five-Star Bed Making & Triple-Sheeting Standards",
    staffRole: "housekeeping",
    department: "Housekeeping & Rooms",
    type: "Mandatory Onboarding",
    level: "Foundational",
    duration: "30 min",
    lessonsCount: 3,
    ceuCredits: 2.5,
    thumbnail: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80",
    summary: "Precision bed dressing: fitted bottom sheet, middle flat sheet, duvet tucking with 45-degree hospital corners, and standing pillow plumpness.",
    sopCode: "SOP-HK-03",
    lessons: [
      {
        id: "hk-201-l1",
        title: "Mattress Inspection & Base Sheeting",
        duration: "10 min",
        sopObjective: "Achieve drum-tight bottom sheeting with zero wrinkles or loose fabric.",
        standards: [
          "Check mattress protector for stains or wear; replace immediately if imperfect.",
          "Tuck bottom sheet with tight hospital corners at all 4 mattress edges."
        ],
        procedureSteps: [
          { step: 1, action: "Inspect Protector Pad", detail: "Ensure mattress protector is centered and elastic bands are firmly secured." },
          { step: 2, action: "Lay Fitted / Base Sheet", detail: "Pull fabric firmly from headboard to foot of bed, smoothing all creases with palms." },
          { step: 3, action: "Form 45-Degree Hospital Corner", detail: "Lift edge of sheet at 45-degree angle, tuck hanging drape underneath, then fold top flap down crisply." }
        ],
        auditChecklist: [
          "Is bottom sheet taut with zero wrinkles?",
          "Are corners tucked firmly underneath mattress?"
        ]
      },
      {
        id: "hk-201-l2",
        title: "Triple Sheeting & Down Duvet Encasement",
        duration: "10 min",
        sopObjective: "Ensure goose-down duvet is protected between two luxury high-thread-count sheets.",
        standards: [
          "Top fold: Turn down top sheet 12 inches over the duvet fold.",
          "All seams facing inward towards mattress so no stitching is visible to guest."
        ],
        procedureSteps: [
          { step: 1, action: "Position Middle Sheet", detail: "Align top hem with mattress headboard edge, smooth flat." },
          { step: 2, action: "Center Down Duvet", detail: "Duvet must hang equally on both left and right sides of bed (10 inches drape)." },
          { step: 3, action: "Execute 12-Inch Turn-back", detail: "Fold top sheet back over duvet, tucking foot of bed securely under mattress." }
        ],
        auditChecklist: [
          "Is the turn-back fold straight and measured at 12 inches?",
          "Does duvet hang equally on both sides?"
        ]
      },
      {
        id: "hk-201-l3",
        title: "Pillow Artistry & Accent Cushion Styling",
        duration: "10 min",
        sopObjective: "Present pillows that stand erect with plump symmetry and centered hotel monograms.",
        standards: [
          "Firm feather pillows in back, soft hypoallergenic pillows in front.",
          "Open sham openings must face inward towards center of bed (never outward)."
        ],
        procedureSteps: [
          { step: 1, action: "Plump Each Pillow", detail: "Karate chop lightly down center to create crisp indent, then smooth outer edges." },
          { step: 2, action: "Align Sham Opening", detail: "Ensure opening flap is hidden towards the center line of the mattress." },
          { step: 3, action: "Position Bed Runner", detail: "Center silk accent runner 6 inches from foot of bed, perfectly straight." }
        ],
        auditChecklist: [
          "Are all 4 pillows erect and standing at 75-degree angle?",
          "Are sham envelope openings concealed from sight?"
        ]
      }
    ],
    quiz: {
      passingScore: 80,
      questions: [
        {
          id: "q_hk201_1",
          question: "Which direction should pillowcase envelope openings face on a luxury hotel bed?",
          options: [
            "Inward toward the center of the bed",
            "Outward toward the nightstands",
            "Downward toward the mattress",
            "Whichever way is easiest"
          ],
          correctAnswer: 0,
          explanation: "Openings must always face inward towards the center of the bed so guests entering the room see smooth, closed edges."
        }
      ]
    }
  },
  {
    id: "HK-202",
    courseCode: "HK-202",
    title: "Bathroom Sanitization & Chrome Mirror Buffing",
    staffRole: "housekeeping",
    department: "Housekeeping & Rooms",
    type: "Mandatory Compliance",
    level: "Foundational",
    duration: "25 min",
    lessonsCount: 2,
    ceuCredits: 2.0,
    thumbnail: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80",
    summary: "Streak-free glass polishing, descaling vanity faucets, color-coded microfiber discipline, and surgical hair inspection.",
    sopCode: "SOP-HK-07",
    lessons: [
      {
        id: "hk-202-l1",
        title: "Color-Coded Cloth Protocol & Cross-Contamination",
        duration: "12 min",
        sopObjective: "Zero bacterial transfer between toilet fixtures and guest vanity or drinking glasses.",
        standards: [
          "RED Cloths: Toilet bowl, rim, base, and flush handle ONLY.",
          "YELLOW Cloths: Shower walls, bathtub basin, and tile surrounds.",
          "BLUE Cloths: Glass vanity mirrors, shower glass doors, chrome faucets."
        ],
        procedureSteps: [
          { step: 1, action: "Apply Eco-Certified Disinfectant", detail: "Allow 60-second contact dwell time before wiping surfaces." },
          { step: 2, action: "Clean from Top to Bottom", detail: "Start at top of mirror and wall tile, work downward to floor." },
          { step: 3, action: "Isolate Red Cloths in Waste Pouch", detail: "Never place used red toilet cloths on vanity countertops." }
        ],
        auditChecklist: [
          "Were proper colored cloths used for designated zones?",
          "Was chemical dwell time observed?"
        ]
      }
    ],
    quiz: {
      passingScore: 80,
      questions: [
        {
          id: "q_hk202_1",
          question: "Under the hotel housekeeping color-code standard, which color cloth is strictly used for toilet sanitation?",
          options: [
            "Red cloth",
            "Blue cloth",
            "Yellow cloth",
            "White towel"
          ],
          correctAnswer: 0,
          explanation: "Red cloths are strictly isolated for toilet fixtures to prevent bio-contamination."
        }
      ]
    }
  },
  {
    id: "HK-203",
    courseCode: "HK-203",
    title: "Forbes Evening Turndown Service & Ambiance Setting",
    staffRole: "housekeeping",
    department: "Housekeeping & Rooms",
    type: "Skill Upgrade",
    level: "Intermediate",
    duration: "20 min",
    lessonsCount: 2,
    ceuCredits: 1.5,
    thumbnail: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80",
    summary: "Ambient lighting presets, blackout curtain light seals, bedside slipper mat alignment, and artisan pillow mist staging.",
    sopCode: "SOP-HK-11",
    lessons: [
      {
        id: "hk-203-l1",
        title: "Turndown Geometry & Slipper Placement",
        duration: "10 min",
        sopObjective: "Prepare the suite for restful sleep with anticipatory luxury touches.",
        standards: [
          "Turn down side of bed corresponding to solo guest preference, or both sides for double occupancy.",
          "Fold sheet back at 90 degrees with 45-degree triangle fold pointing to nightstand.",
          "Lay linen bedside mat with slippers angled 45 degrees towards the room."
        ],
        procedureSteps: [
          { step: 1, action: "Turn down duvet", detail: "Turn down 18 inches of duvet to invite guest into bed." },
          { step: 2, action: "Place Bedside Water & Glass", detail: "Fresh bottle of still artisan water with crystal tumbler placed on leather coaster." },
          { step: 3, action: "Set Lighting & Sound", detail: "Dim room lighting to 20% evening preset; close blackout drapes completely." }
        ],
        auditChecklist: [
          "Is bedside water bottle unopened with label facing forward?",
          "Are slippers placed so guest can step directly into them?"
        ]
      }
    ],
    quiz: {
      passingScore: 80,
      questions: [
        {
          id: "q_hk203_1",
          question: "What is the primary objective of evening turndown service?",
          options: [
            "To transform the room into a tranquil sleep sanctuary with personalized comfort",
            "To vacuum the carpets loudly",
            "To deliver the laundry bill",
            "To turn on all bright ceiling lights"
          ],
          correctAnswer: 0,
          explanation: "Turndown is about sleep sanctuary ambiance: warm dim lighting, closed drapes, and bedside amenities."
        }
      ]
    }
  },
  {
    id: "HK-204",
    courseCode: "HK-204",
    title: "Minibar Restock, Par Stocking & Expiry Auditing",
    staffRole: "housekeeping",
    department: "Housekeeping & Rooms",
    type: "Elective",
    level: "Foundational",
    duration: "15 min",
    lessonsCount: 1,
    ceuCredits: 1.0,
    thumbnail: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
    summary: "Checking sensor minibar seals, FIFO replenishment of fine spirits and snacks, and logging billing to Opera PMS.",
    sopCode: "SOP-HK-15",
    lessons: [
      {
        id: "hk-204-l1",
        title: "Sensor Bar Auditing & Expiry Checking",
        duration: "15 min",
        sopObjective: "Maintain 100% par levels with pristine packaging and zero expired confectionaries.",
        standards: [
          "Check expiry dates on all chocolate, nuts, and sodas; discard any within 30 days of expiration.",
          "Face all product labels forward with surgical alignment."
        ],
        procedureSteps: [
          { step: 1, action: "Scan In-Room Bar", detail: "Verify bottle levels against PMS automated sensor log." },
          { step: 2, action: "Wipe Credenza Interior", detail: "Dust minibar shelving with dry microfiber cloth." },
          { step: 3, action: "Post Consumption Charges", detail: "Immediately enter consumed items in Opera Housekeeping handheld tablet." }
        ],
        auditChecklist: ["Are bottle labels facing forward?", "Are glassware polished without fingerprints?"]
      }
    ],
    quiz: {
      passingScore: 80,
      questions: [
        {
          id: "q_hk204_1",
          question: "How should snacks and beverages be aligned inside the luxury minibar?",
          options: [
            "With brand labels facing directly front in neat rows",
            "Stacked on top of each other",
            "Turned backwards to save label wear",
            "Placed randomly"
          ],
          correctAnswer: 0,
          explanation: "Brand labels must always face front with consistent spacing under luxury presentation standards."
        }
      ]
    }
  },

  // ===================== F&B SERVICE & BANQUETS =====================
  {
    id: "FB-301",
    courseCode: "FB-301",
    title: "Fine Dining Silver Service: Serve Left, Clear Right",
    staffRole: "food-beverage",
    department: "F&B Service & Banquets",
    type: "Mandatory Onboarding",
    level: "Foundational",
    duration: "30 min",
    lessonsCount: 3,
    ceuCredits: 2.5,
    thumbnail: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
    summary: "Classic French & English table service: table cover geometry, silver cutlery positioning, carrying 3 plates, and synchronized cloche service.",
    sopCode: "SOP-FB-02",
    lessons: [
      {
        id: "fb-301-l1",
        title: "The Golden Rule: Serve Food Left, Clear & Pour Right",
        duration: "10 min",
        sopObjective: "Execute synchronized, unobtrusive service without obstructing guest line of sight.",
        standards: [
          "Serve Plated Food: From guest's LEFT with server's LEFT hand.",
          "Clear Soiled Plates: From guest's RIGHT with server's RIGHT hand.",
          "Pour Beverages & Wine: From guest's RIGHT with server's RIGHT hand."
        ],
        procedureSteps: [
          { step: 1, action: "Approach Table Gracefully", detail: "Never reach across a guest's torso or conversation line." },
          { step: 2, action: "Announce Dish Elegantly", detail: "'For you, madam, the pan-seared Chilean sea bass with saffron velouté.'" },
          { step: 3, action: "Synchronized Service for Parties", detail: "For tables of 4+, servers lower plates simultaneously on signal." }
        ],
        auditChecklist: [
          "Was food served from left side?",
          "Were beverages poured from right side?"
        ]
      },
      {
        id: "fb-301-l2",
        title: "Carrying Three Plates & Silent Table Crumbing",
        duration: "10 min",
        sopObjective: "Safely transport hot plates and crumb table before dessert without touching table linens.",
        standards: [
          "Three-Plate Carry: Thumb and pinky support Plate 1, remaining three fingers support Plate 2, Plate 3 balances on forearm.",
          "Silent Crumbing: Use silver table crumber or folded service napkin from left side into small silver tray."
        ],
        procedureSteps: [
          { step: 1, action: "Clear Main Entrées", detail: "Clear all entrée plates, side bread plates, and butter dishes." },
          { step: 2, action: "Perform Silent Crumbing", detail: "Sweep table clean of bread crumbs from guest left side." },
          { step: 3, action: "Adjust Dessert Silverware", detail: "Bring dessert fork down to left, dessert spoon to right." }
        ],
        auditChecklist: ["Was table crumbed before dessert menus presented?"]
      }
    ],
    quiz: {
      passingScore: 80,
      questions: [
        {
          id: "q_fb301_1",
          question: "Under classical fine dining service standards, from which side should wine and water be poured?",
          options: [
            "From the guest's right side",
            "From the guest's left side",
            "Directly across the table",
            "From whichever side has space"
          ],
          correctAnswer: 0,
          explanation: "All beverages, including water and wine, are poured from the guest's right side with the right hand."
        }
      ]
    }
  },
  {
    id: "FB-302",
    courseCode: "FB-302",
    title: "Life-Critical Allergen Management & The Big 9",
    staffRole: "food-beverage",
    department: "F&B Service & Banquets",
    type: "Mandatory Compliance",
    level: "Foundational",
    duration: "25 min",
    lessonsCount: 2,
    ceuCredits: 2.0,
    thumbnail: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
    summary: "Preventing fatal anaphylaxis: recognizing the Big-9 food allergens, POS red alert tagging, and dedicated purple kitchen equipment.",
    sopCode: "SOP-FB-06",
    lessons: [
      {
        id: "fb-302-l1",
        title: "The Big 9 Allergens & Guest Inquiry Protocol",
        duration: "12 min",
        sopObjective: "Never assume ingredients; ensure strict verbal and written cross-contact prevention.",
        standards: [
          "The Big 9: Peanuts, Tree Nuts, Milk, Eggs, Wheat/Gluten, Soy, Fish, Shellfish, Sesame.",
          "Table Ingestion Check: 'May I inquire if anyone at the table has food allergies or dietary restrictions?'"
        ],
        procedureSteps: [
          { step: 1, action: "Capture Allergy in POS", detail: "Select RED 'ALLERGY' modifier in capital letters so ticket prints in red in kitchen." },
          { step: 2, action: "Verbal Briefing to Chef", detail: "Server must personally notify Sous Chef or Head Chef face-to-face." },
          { step: 3, action: "Separate Hand Carry", detail: "Allergy plates must NEVER be carried on a shared tray next to allergen dishes." }
        ],
        auditChecklist: [
          "Did server ask table about allergies at greeting?",
          "Was red allergy ticket printed in kitchen?"
        ]
      }
    ],
    quiz: {
      passingScore: 80,
      questions: [
        {
          id: "q_fb302_1",
          question: "If a guest's salad accidentally receives chopped walnuts, what is the mandatory safety action?",
          options: [
            "Discard the dish completely, sanitize the preparation area, and remake the dish from scratch",
            "Scrape off the walnuts with a clean spoon and serve",
            "Pick the walnuts off and add extra salad dressing",
            "Blow the nut crumbs away"
          ],
          correctAnswer: 0,
          explanation: "Nut oils remain on food surfaces; wiping or picking off causes fatal anaphylactic cross-contact. Dish must be remade."
        }
      ]
    }
  },
  {
    id: "FB-303",
    courseCode: "FB-303",
    title: "Sommelier Wine Presentation & Decanting Standards",
    staffRole: "food-beverage",
    department: "F&B Service & Banquets",
    type: "Skill Upgrade",
    level: "Intermediate",
    duration: "25 min",
    lessonsCount: 2,
    ceuCredits: 2.0,
    thumbnail: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80",
    summary: "Presenting the bottle label, foil capsule cutting below the lip, cork extraction etiquette, and host tasting pour sequence.",
    sopCode: "SOP-FB-09",
    lessons: [
      {
        id: "fb-303-l1",
        title: "Bottle Presentation & Capsule Cutting",
        duration: "12 min",
        sopObjective: "Ensure wine service is seamless, dripless, and respectful of vintage.",
        standards: [
          "Present bottle with label facing host: State producer, vintage, grape varietal, and region.",
          "Cut foil beneath lower lip of bottle to prevent wine contact with foil."
        ],
        procedureSteps: [
          { step: 1, action: "Host Verbal Confirmation", detail: "'Château Margaux, 2015 Premier Grand Cru Classé for your approval, sir.'" },
          { step: 2, action: "Clean Cork Removal", detail: "Extract cork silently without loud pop; place cork on coaster beside host." },
          { step: 3, action: "Tasting Pour", detail: "Pour 1 oz tasting sample for host; wait for nod of approval before serving guests." }
        ],
        auditChecklist: ["Was cork presented on coaster?", "Was label presented facing host?"]
      }
    ],
    quiz: {
      passingScore: 80,
      questions: [
        {
          id: "q_fb303_1",
          question: "Where should the foil capsule of a wine bottle be cut with a sommelier knife?",
          options: [
            "Below the second lower lip of the bottle neck",
            "Directly over the top of the cork",
            "Torn off with bare hands",
            "At the bottom of the bottle"
          ],
          correctAnswer: 0,
          explanation: "Cutting below the second lip prevents wine drips from contacting foil and contaminating the pour."
        }
      ]
    }
  },

  // ===================== CULINARY & KITCHEN =====================
  {
    id: "CUL-101",
    courseCode: "CUL-101",
    title: "Commercial Kitchen HACCP & Temperature Logs",
    staffRole: "kitchen",
    department: "Culinary & Stewarding",
    type: "Mandatory Compliance",
    level: "Foundational",
    duration: "30 min",
    lessonsCount: 2,
    ceuCredits: 2.5,
    thumbnail: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=80",
    summary: "Temperature Danger Zone (41°F–135°F), 2-hour digital log intervals, probe thermometer calibration, and rapid blast chilling.",
    sopCode: "SOP-CUL-01",
    lessons: [
      {
        id: "cul-101-l1",
        title: "The Temperature Danger Zone & Bacterial Growth",
        duration: "15 min",
        sopObjective: "Strict adherence to food safety limits to eliminate pathogenic bacteria.",
        standards: [
          "Danger Zone: 41°F to 135°F (5°C to 57°C).",
          "Cold Holding: At or below 41°F (5°C).",
          "Hot Holding: At or above 135°F (57°C)."
        ],
        procedureSteps: [
          { step: 1, action: "Digital Probe Calibration", detail: "Calibrate thermometer in 50/50 ice slurry to ensure exact 32.0°F reading." },
          { step: 2, action: "Log Every 2 Hours", detail: "Record hot holding well and reach-in line temperatures in digital HACCP log." },
          { step: 3, action: "4-Hour Corrective Action", detail: "Any TCS food in the danger zone past 4 hours must be condemned and discarded." }
        ],
        auditChecklist: ["Were temperatures recorded on schedule?", "Are probes sanitized before and after probing?"]
      }
    ],
    quiz: {
      passingScore: 80,
      questions: [
        {
          id: "q_cul101_1",
          question: "What is the critical Temperature Danger Zone temperature range for TCS foods?",
          options: [
            "41°F to 135°F (5°C to 57°C)",
            "0°F to 32°F (-18°C to 0°C)",
            "150°F to 190°F (65°C to 88°C)",
            "60°F to 90°F (15°C to 32°C)"
          ],
          correctAnswer: 0,
          explanation: "Between 41°F and 135°F, bacteria multiply exponentially every 20 minutes."
        }
      ]
    }
  },
  {
    id: "CUL-102",
    courseCode: "CUL-102",
    title: "Walk-In Cooler Shelf Hierarchy & FIFO Day-Dotting",
    staffRole: "kitchen",
    department: "Culinary & Stewarding",
    type: "Mandatory Compliance",
    level: "Foundational",
    duration: "20 min",
    lessonsCount: 2,
    ceuCredits: 1.5,
    thumbnail: "https://images.unsplash.com/photo-1574484284002-952d92456975?auto=format&fit=crop&w=800&q=80",
    summary: "Preventing salmonella drip contamination: vertical meat storage hierarchy based on minimum internal cooking temperatures.",
    sopCode: "SOP-CUL-04",
    lessons: [
      {
        id: "cul-102-l1",
        title: "Vertical Storage Hierarchy from Top to Bottom",
        duration: "10 min",
        sopObjective: "Store meats according to cooking temperature to eliminate cross-contamination risks.",
        standards: [
          "Top Shelf: Ready-to-eat foods, cooked items, dairy, prepared produce.",
          "Second Shelf: Whole raw fish and seafood (145°F).",
          "Third Shelf: Whole cuts of beef and pork (145°F).",
          "Fourth Shelf: Ground beef and ground pork (155°F).",
          "Bottom Shelf: Raw poultry (chicken, duck, turkey) (165°F)."
        ],
        procedureSteps: [
          { step: 1, action: "Inspect Received Meats", detail: "Ensure packaging is unbroken and temperatures are below 41°F upon delivery." },
          { step: 2, action: "Affix Color Day-Dot Label", detail: "Write item name, prep date, use-by date, and cook initials." },
          { step: 3, action: "Rotate Stock (FIFO)", detail: "Place older dated stock in front for immediate utilization." }
        ],
        auditChecklist: ["Is raw chicken on the lowest bottom shelf?", "Are all pans covered and day-dotted?"]
      }
    ],
    quiz: {
      passingScore: 80,
      questions: [
        {
          id: "q_cul102_1",
          question: "Why must raw poultry always be placed on the lowest bottom shelf of the walk-in cooler?",
          options: [
            "Because poultry juices carry salmonella and have the highest required cooking temperature (165°F)",
            "Because chicken is the heaviest meat",
            "To keep it cold from the floor",
            "Because bottom shelves are larger"
          ],
          correctAnswer: 0,
          explanation: "Poultry has the highest pathogen risk and highest required cook temp; storing it on the bottom prevents dangerous drips."
        }
      ]
    }
  },

  // ===================== CONCIERGE & GUEST SERVICES =====================
  {
    id: "CON-501",
    courseCode: "CON-501",
    title: "Luggage Escort, Room Orientation & Bell Desk SOP",
    staffRole: "concierge-valet",
    department: "Concierge & Guest Services",
    type: "Mandatory Onboarding",
    level: "Foundational",
    duration: "20 min",
    lessonsCount: 2,
    ceuCredits: 1.5,
    thumbnail: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80",
    summary: "Baggage delivery within 8 minutes of arrival, brass birdcage trolley etiquette, and luxury in-room technology orientation.",
    sopCode: "SOP-CON-01",
    lessons: [
      {
        id: "con-501-l1",
        title: "Baggage Tagging & In-Room Delivery Benchmark",
        duration: "10 min",
        sopObjective: "Deliver luggage expeditiously without scuffing walls or carpet.",
        standards: [
          "Delivery Time: Within 8 minutes of guest arrival in room.",
          "Luggage Placement: Place bags on designated luggage rack; never on bed or floor."
        ],
        procedureSteps: [
          { step: 1, action: "Knock and Announce", detail: "Knock twice: 'Bell Service, luggage delivery for Mr. Sterling.'" },
          { step: 2, action: "Place on Luggage Bench", detail: "Position suitcase with zipper facing forward for effortless unpacking." },
          { step: 3, action: "Offer Room Orientation", detail: "'May I show you how the smart climate control and electric drapes operate?'" }
        ],
        auditChecklist: ["Was luggage delivered within 8 minutes?", "Was luggage placed on luggage bench?"]
      }
    ],
    quiz: {
      passingScore: 80,
      questions: [
        {
          id: "q_con501_1",
          question: "Where should guest suitcases be positioned by the bell attendant inside the hotel room?",
          options: [
            "On the dedicated luggage rack or bench, never on the white bed linens",
            "Directly on the bed duvet",
            "In the bathroom shower",
            "Left outside in the corridor"
          ],
          correctAnswer: 0,
          explanation: "Placing luggage with wheels on bed linens violates luxury sanitation standards."
        }
      ]
    }
  },
  {
    id: "CON-502",
    courseCode: "CON-502",
    title: "Curbside Valet Vehicle Handover & Damage Inspection",
    staffRole: "concierge-valet",
    department: "Concierge & Guest Services",
    type: "Mandatory Compliance",
    level: "Foundational",
    duration: "15 min",
    lessonsCount: 1,
    ceuCredits: 1.0,
    thumbnail: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80",
    summary: "30-second digital walkaround damage inspection, valet receipt ticketing, steering wheel protective covers, and key safe custody.",
    sopCode: "SOP-CON-04",
    lessons: [
      {
        id: "con-502-l1",
        title: "Curbside Greeting & Digital Damage Inspection",
        duration: "15 min",
        sopObjective: "Protect hotel from liability while offering curbside luxury reception.",
        standards: [
          "Open guest vehicle door within 15 seconds of stopping at porte-cochère.",
          "Perform 360-degree walkaround logging any scratches on tablet before issuing valet claim stub."
        ],
        procedureSteps: [
          { step: 1, action: "Open Driver Door", detail: "'Good afternoon, welcome to THE LUCKY HOTEL. May I assist you with your vehicle?'" },
          { step: 2, action: "Walkaround Camera Log", detail: "Record video walkaround on handheld valet scanner." },
          { step: 3, action: "Issue Branded Claim Card", detail: "Hand claim stub in luxury envelope: 'Your vehicle is secured in our subterranean garage.'" }
        ],
        auditChecklist: ["Was vehicle scanned for preexisting damage?", "Was driver door opened within 15 seconds?"]
      }
    ],
    quiz: {
      passingScore: 80,
      questions: [
        {
          id: "q_con502_1",
          question: "Why must valet attendants conduct a 360-degree digital scan before parking a guest vehicle?",
          options: [
            "To log any preexisting scratches and protect the hotel from fraudulent damage claims",
            "To admire the car model",
            "To check if the car has fuel",
            "To take photos for social media"
          ],
          correctAnswer: 0,
          explanation: "Digital walkaround scans create legally verifiable condition records protecting both guest and property."
        }
      ]
    }
  },

  // ===================== SAFETY, SECURITY & LOSS PREVENTION =====================
  {
    id: "SEC-401",
    courseCode: "SEC-401",
    title: "Hotel Emergency Codes, Fire Evacuation & Code Blue",
    staffRole: "security",
    department: "Safety, Security & Loss Prevention",
    type: "Mandatory Compliance",
    level: "Foundational",
    duration: "25 min",
    lessonsCount: 2,
    ceuCredits: 2.5,
    thumbnail: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
    summary: "Discreet color codes: Code Red (Fire/Smoke), Code Blue (Medical CPR/AED), floor sweep tagging, and assembly zone headcounts.",
    sopCode: "SOP-SEC-01",
    lessons: [
      {
        id: "sec-401-l1",
        title: "Emergency Color Codes & Discreet Radio Communications",
        duration: "12 min",
        sopObjective: "Ensure rapid staff response without causing public lobby panic.",
        standards: [
          "Code Red: Fire or smoke detected.",
          "Code Blue: Cardiac arrest, AED needed, urgent medical emergency.",
          "Code Yellow: Hazardous chemical spill.",
          "Code Black: Armed threat or security lockdown."
        ],
        procedureSteps: [
          { step: 1, action: "Radio Protocol", detail: "'Security Dispatch, Code Blue in North Wing Room 402, AED liaison requested.'" },
          { step: 2, action: "Elevator Lock", detail: "Switch freight elevator 4 to Fireman/First Responder priority mode." },
          { step: 3, action: "Driveway Clear", detail: "Doorman clears porte-cochère for ambulance ingress." }
        ],
        auditChecklist: ["Were correct color codes used over radio?", "Was elevator prioritized for medical responders?"]
      }
    ],
    quiz: {
      passingScore: 80,
      questions: [
        {
          id: "q_sec401_1",
          question: "Which emergency code designates a life-threatening medical emergency requiring immediate CPR and AED response?",
          options: [
            "Code Blue",
            "Code Red",
            "Code Green",
            "Code Yellow"
          ],
          correctAnswer: 0,
          explanation: "Code Blue universally denotes cardiac arrest or urgent medical resuscitation."
        }
      ]
    }
  },
  {
    id: "SEC-402",
    courseCode: "SEC-402",
    title: "24-Hour DND (Do Not Disturb) Welfare Check Protocol",
    staffRole: "security",
    department: "Safety, Security & Loss Prevention",
    type: "Mandatory Compliance",
    level: "Intermediate",
    duration: "15 min",
    lessonsCount: 1,
    ceuCredits: 1.5,
    thumbnail: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=80",
    summary: "Ensuring guest safety and legal compliance when Do Not Disturb privacy indicators remain active beyond 24 consecutive hours.",
    sopCode: "SOP-SEC-05",
    lessons: [
      {
        id: "sec-402-l1",
        title: "The 24-Hour DND Escalation Flow",
        duration: "15 min",
        sopObjective: "Balance guest privacy rights with life-safety welfare obligations.",
        standards: [
          "DND Active 12 Hours: Log in PMS, slide discreet 'We Missed You' card under door.",
          "DND Active 24 Hours: Duty Manager and Security Officer must perform formal wellness entry."
        ],
        procedureSteps: [
          { step: 1, action: "Attempt Phone Call", detail: "Call guestroom telephone; allow 6 rings. Call guest mobile phone." },
          { step: 2, action: "Duty Manager Knock", detail: "Knock firmly 3 times: 'Duty Manager and Security conducting welfare verification.'" },
          { step: 3, action: "Two-Person Entry", detail: "Key in with master key with security camera recording to confirm guest safety." }
        ],
        auditChecklist: ["Did two associates conduct the welfare entry?", "Was entry logged in security shift logbook?"]
      }
    ],
    quiz: {
      passingScore: 80,
      questions: [
        {
          id: "q_sec402_1",
          question: "Who must be present when conducting a mandatory 24-hour DND room welfare check?",
          options: [
            "At least two staff members: The Duty Manager and a Security Officer",
            "Only a solo room attendant",
            "Any staff member who happens to be on the floor",
            "The front desk intern"
          ],
          correctAnswer: 0,
          explanation: "Hotel policy requires a managerial duo (Duty Manager + Security) for legal witness and safety reasons."
        }
      ]
    }
  },

  // ===================== BAR & MIXOLOGY =====================
  {
    id: "BAR-101",
    courseCode: "BAR-101",
    title: "Cocktail Jigger Accuracy & Ice Well Sanitization",
    staffRole: "bartending",
    department: "Bar & Mixology",
    type: "Mandatory Compliance",
    level: "Foundational",
    duration: "20 min",
    lessonsCount: 1,
    ceuCredits: 1.5,
    thumbnail: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=80",
    summary: "Precision pouring, Japanese jigger discipline, ice hygiene (never scoop ice with glass), and glassware streak-free steam polishing.",
    sopCode: "SOP-BAR-01",
    lessons: [
      {
        id: "bar-101-l1",
        title: "The Cardinal Ice Rule & Hygiene Sanitation",
        duration: "20 min",
        sopObjective: "Ensure drink safety and prevent glass shard contamination in beverage ice wells.",
        standards: [
          "NEVER scoop ice using a drinking glass; use dedicated metal ice scoops with holsters.",
          "Burn the Ice: Melt and sanitize ice wells at close of every shift with hot water."
        ],
        procedureSteps: [
          { step: 1, action: "Use Metal Scoop Only", detail: "Glass can chip microscopically in ice, creating severe internal bleeding hazard." },
          { step: 2, action: "Jigger Every Pour", detail: "Pour with Japanese jigger held at eye level to guarantee flavor consistency and liquor cost control." },
          { step: 3, action: "Steam Polish Glassware", detail: "Hold glass over boiling water steam and polish with lint-free microfiber cloth." }
        ],
        auditChecklist: ["Was ice scoop stored outside the ice well?", "Were glasses inspected for lip chips?"]
      }
    ],
    quiz: {
      passingScore: 80,
      questions: [
        {
          id: "q_bar101_1",
          question: "Why is scooping ice directly with a glass cup strictly prohibited in hotel bars?",
          options: [
            "The glass can easily chip or shatter in the ice well, creating an invisible, lethal hazard for customers",
            "Because glass warms the ice too fast",
            "Because metal scoops are lighter",
            "It is just a stylistic preference"
          ],
          correctAnswer: 0,
          explanation: "Chipped glass in an ice bin is virtually invisible in clear ice and can cause catastrophic internal lacerations if swallowed."
        }
      ]
    }
  },

  // ===================== SPA & WELLNESS =====================
  {
    id: "SPA-101",
    courseCode: "SPA-101",
    title: "Spa Intake Consultation & Treatment Room Standards",
    staffRole: "spa-wellness",
    department: "Spa & Wellness",
    type: "Mandatory Onboarding",
    level: "Foundational",
    duration: "20 min",
    lessonsCount: 1,
    ceuCredits: 1.5,
    thumbnail: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80",
    summary: "Medical contraindications, essential oil allergy screening, heated towel cabi temperature maintenance, and whispered tone etiquette.",
    sopCode: "SOP-SPA-01",
    lessons: [
      {
        id: "spa-101-l1",
        title: "Intake Review & Treatment Sanctuary Setup",
        duration: "20 min",
        sopObjective: "Deliver tranquil wellness experiences while honoring health contraindications.",
        standards: [
          "Review health intake form for pregnancy, blood pressure, or recent surgeries.",
          "Maintain treatment room temperature at 73°F (23°C) with heated massage table."
        ],
        procedureSteps: [
          { step: 1, action: "Consultation in Relaxation Lounge", detail: "Greet guest in hushed, soothing voice: 'Welcome to THE LUCKY HOTEL Spa, Mrs. Vance.'" },
          { step: 2, action: "Check Essential Oil Allergies", detail: "Offer sensory test of signature aromatherapy blends on wrist." },
          { step: 3, action: "Draping & Privacy", detail: "Leave room for 3 minutes to allow guest complete privacy to disrobe and position on table." }
        ],
        auditChecklist: ["Was intake form signed by guest?", "Was privacy respected during disrobing?"]
      }
    ],
    quiz: {
      passingScore: 80,
      questions: [
        {
          id: "q_spa101_1",
          question: "Why must spa therapists leave the treatment room before a massage therapy session begins?",
          options: [
            "To allow the guest complete privacy to comfortably disrobe and position themselves under the linen drape",
            "To take a rest break",
            "To fetch extra towels from the laundry",
            "To turn off the music"
          ],
          correctAnswer: 0,
          explanation: "Leaving the room grants total privacy and maintains dignity for the guest."
        }
      ]
    }
  }
];

export const seedScenarios = [
  {
    id: "scen-01",
    title: "The Downgraded Presidential Suite",
    department: "Front Desk & Reception",
    staffRole: "front-desk",
    difficulty: "High Stress",
    xpReward: 300,
    guestName: "Ambassador Richardson",
    guestAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&q=80",
    guestRole: "Platinum VIP & Diplomat",
    scenarioSetup: "Ambassador Richardson booked the Presidential Suite 3 months in advance for his 25th wedding anniversary. Due to an emergency water pipe burst 2 hours ago, the suite is flooded. You must accommodate him in a Royal Executive Suite, but he has just arrived after a trans-Atlantic flight.",
    stages: [
      {
        stageId: 1,
        prompt: "Ambassador Richardson approaches your desk: 'Good evening. Ambassador Richardson here. I believe my Presidential Suite is prepared for my anniversary?' How do you open the conversation?",
        options: [
          {
            id: "opt_1a",
            text: "Whisper nervously: 'Well, sir, we had a major pipe burst and your room is ruined, so you will have to stay in a regular executive room.'",
            scoreDelta: -30,
            feedback: "Disastrous! Using negative terms like 'ruined' and telling a diplomat they 'have to' accept a downgrade creates immediate outrage.",
            isBest: false
          },
          {
            id: "opt_1b",
            text: "Welcome him warmly by name, step out from behind the desk, invite him to the private VIP parlor, and gently explain the situation with complete ownership and empathy.",
            scoreDelta: +25,
            feedback: "Outstanding Forbes protocol! Stepping out to a private seating area preserves the Ambassador's dignity and creates a respectful atmosphere.",
            isBest: true,
            nextStageId: 2
          },
          {
            id: "opt_1c",
            text: "Hand him the keycard without saying anything about the flood and hope he only notices once he gets up to the room.",
            scoreDelta: -50,
            feedback: "Unacceptable. Hiding a room downgrade is a catastrophic breach of trust that guarantees viral PR fallout.",
            isBest: false
          }
        ]
      },
      {
        stageId: 2,
        prompt: "In the private parlor, the Ambassador sighs deeply: 'My wife has been dreaming of this penthouse terrace for six months. This is our 25th anniversary. An executive suite is not what I promised her.' How do you respond and solve?",
        options: [
          {
            id: "opt_2a",
            text: "Explain: 'Sir, maintenance is working on it, but water leaks happen everywhere. You should be happy the hotel didn't walk you to another property.'",
            scoreDelta: -40,
            feedback: "Defensive and patronizing. Never minimize a guest's milestone celebration or treat accommodating them as a favor.",
            isBest: false
          },
          {
            id: "opt_2b",
            text: "'Ambassador, I deeply share your disappointment. We have reserved our Royal Executive Suite and connected it with the adjacent corner terrace parlor at no charge. Furthermore, our Executive Chef will curate a private candlelit 5-course dinner on our rooftop conservatory tonight with Dom Pérignon, with our compliments.'",
            scoreDelta: +35,
            feedback: "Magnificent! You acknowledged the emotional core (the terrace dream), provided a creative spatial upgrade (connecting rooms), and delivered an extraordinary culinary experience.",
            isBest: true,
            nextStageId: 3
          }
        ]
      },
      {
        stageId: 3,
        prompt: "The Ambassador's expression softens: 'That private rooftop conservatory dinner sounds truly exquisite. My wife will appreciate that thoughtfulness. Thank you for handling this with such grace.' How do you conclude?",
        options: [
          {
            id: "opt_3a",
            text: "'It is our absolute pleasure, Ambassador. I will personally escort you both upstairs now, and here is my direct mobile number should you desire anything at any hour.'",
            scoreDelta: +20,
            feedback: "Flawless service recovery! You transformed a catastrophic maintenance crisis into a memorable, deeply appreciated luxury moment.",
            isBest: true
          },
          {
            id: "opt_3b",
            text: "'Okay great, here are your keys. Please remind the waiter not to charge you tonight.'",
            scoreDelta: -15,
            feedback: "Trivializes the handover. The staff member must coordinate all billing behind the scenes so the guest never discusses finances.",
            isBest: false
          }
        ]
      }
    ]
  },
  {
    id: "scen-02",
    title: "Severe Peanut Allergy at the Gala Banquet",
    department: "F&B Service & Banquets",
    staffRole: "food-beverage",
    difficulty: "Critical Safety",
    xpReward: 350,
    guestName: "Lady Jacqueline",
    guestAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=256&q=80",
    guestRole: "Charity Gala Hostess",
    scenarioSetup: "During a 300-person charity gala, Lady Jacqueline approaches you frantically. Her daughter has an airborne/anaphylactic peanut allergy. The plated dessert just served has a chocolate praline garnish that smells like roasted nuts.",
    stages: [
      {
        stageId: 1,
        prompt: "Lady Jacqueline is distressed: 'Server, is there peanut in this crust? My 10-year-old daughter is sitting right next to it and her throat feels itchy!' What is your instantaneous reaction?",
        options: [
          {
            id: "opt_1a",
            text: "Take the plate away immediately, step the young girl away from the table, verify if an EpiPen is in their bag, and radio the Banquet Manager: 'Code Blue Medical standby at Table 12, allergy check.'",
            scoreDelta: +30,
            feedback: "Lifesaving instinct! Immediate removal of the antigen, checking for epinephrine, and pre-alerting first aid avoids fatal delays.",
            isBest: true,
            nextStageId: 2
          },
          {
            id: "opt_1b",
            text: "Pick off the praline with your bare fingers: 'I removed the garnish, she should be able to eat the sponge cake now.'",
            scoreDelta: -100,
            feedback: "CRITICAL FAILURE! Cross-contact oils remain on the sponge. This could kill the child and result in criminal negligence.",
            isBest: false
          }
        ]
      },
      {
        stageId: 2,
        prompt: "The Banquet Sous Chef arrives with the ingredient specification sheet: the praline contains crushed almonds, but the prep line shared equipment with peanut brittle. The mother administers the daughter's inhaler and she stabilizes. How do you ensure the family is safely catered to?",
        options: [
          {
            id: "opt_2a",
            text: "Have the Executive Pastry Chef personally prepare fresh allergen-free vanilla sorbet with hand-sliced berries in a sanitized room, inspected and covered with a silver cloche.",
            scoreDelta: +30,
            feedback: "Perfect adherence to allergy SOP! A dedicated chef preparing fresh fruit/sorbet away from the banquet line guarantees 100% safety.",
            isBest: true
          },
          {
            id: "opt_2b",
            text: "Tell them dessert is too risky and advise them to just skip food for the rest of the night.",
            scoreDelta: -20,
            feedback: "Lacks luxury hospitality care. A top property always provides safe, elevated culinary alternatives.",
            isBest: false
          }
        ]
      }
    ]
  }
];

export const seedRoomInspection = {
  id: "insp-penthouse-401",
  roomName: "Presidential Penthouse Suite 401",
  roomCategory: "Signature Luxury Suite",
  targetDefectsCount: 5,
  instructions: "Inspect this luxury suite before VIP arrival. There are 5 critical housekeeping and presentation defects violating Forbes Five-Star standards. Spot and click on all 5 infractions!",
  defects: [
    {
      id: "def-1",
      name: "Bed Pillow Asymmetry & Crease",
      location: "Bed Area - Left Pillow",
      description: "Left king sham pillow is visibly dented with an unironed fabric fold instead of upright plump presentation.",
      severity: "Medium",
      standardReference: "SOP-HK-03: Pillow Fluffing & Plump Symmetry"
    },
    {
      id: "def-2",
      name: "Unstocked Champagne Flutes & Fingerprint on Glassware",
      location: "Minibar Credenza",
      description: "One champagne flute has a visible smudge near the rim and the second flute is missing from the mirrored bar tray.",
      severity: "High",
      standardReference: "SOP-HK-15: Glassware Polishing & Minibar Par Stock"
    },
    {
      id: "def-3",
      name: "Water Droplets on Bathroom Vanity Chrome",
      location: "Master Bath Vanity",
      description: "Chrome faucet basin shows dried water stains and missed microfiber buffing.",
      severity: "High",
      standardReference: "SOP-HK-07: Chrome Fixture Streak-Free Polish"
    },
    {
      id: "def-4",
      name: "Clock Radio Time Mismatch",
      location: "Right Nightstand",
      description: "Digital clock displays 12:47 PM while actual local time is 03:15 PM.",
      severity: "Medium",
      standardReference: "SOP-HK-19: Electronics & Clock Synchronization"
    },
    {
      id: "def-5",
      name: "Curtain Sheer Light Leak Gap",
      location: "Main Panoramic Window",
      description: "Blackout curtains are left with a 4-inch gap in the center exposing direct sun glare.",
      severity: "Low",
      standardReference: "SOP-HK-11: Window Drapes 100% Light Seal Protocol"
    }
  ]
};

export const seedQuickCards = [
  {
    id: "qc-1",
    title: "Code Red (Fire Evacuation Protocol)",
    code: "CODE RED",
    color: "red",
    department: "All Staff",
    icon: "Flame",
    steps: [
      "R - Rescue: Remove anyone in immediate danger without placing yourself at risk.",
      "A - Alarm: Pull the nearest manual station; call PBX / Security Dispatch at Ext. 5555.",
      "C - Contain: Close doors and windows to starve the fire of airflow. NEVER lock doors.",
      "E - Evacuate: Direct guests down nearest fire exit stairwell. NEVER USE ELEVATORS."
    ]
  },
  {
    id: "qc-2",
    title: "Code Blue (Medical / CPR / AED)",
    code: "CODE BLUE",
    color: "blue",
    department: "Security & First Responders",
    icon: "HeartPulse",
    steps: [
      "Check responsiveness and verify clear breathing airway.",
      "Radio Security Dispatch: 'Code Blue [Location], AED Liaison Required.'",
      "Begin chest compressions (100–120 bpm, 2 inches depth) if unresponsive.",
      "Assign lobby associate curbside to direct incoming paramedics to designated elevator."
    ]
  },
  {
    id: "qc-3",
    title: "The L.A.S.T. Conflict Recovery Protocol",
    code: "GUEST RELATIONS",
    color: "amber",
    department: "Front Office & F&B",
    icon: "Sparkles",
    steps: [
      "L - Listen: Allow the guest to speak uninterrupted for 60 seconds without defensiveness.",
      "A - Apologize: Offer a heartfelt, sincere apology for the disruption without blaming colleagues.",
      "S - Solve: Present 2 attractive solutions. Frontline associates empowered up to $250 without approval.",
      "T - Thank: Sincerely thank the guest for alerting the hotel so quality can be maintained."
    ]
  },
  {
    id: "qc-4",
    title: "24-Hour DND Privacy & Welfare Policy",
    code: "SECURITY & ROOMS",
    color: "indigo",
    department: "Housekeeping & Security",
    icon: "EyeOff",
    steps: [
      "Never knock, ring bell, or enter when DND privacy light is illuminated.",
      "If DND continues past 12 hours, slide discreet 'We Missed You' card under door.",
      "If DND persists past 24 consecutive hours, notify Duty Manager.",
      "Duty Manager + Security Officer conduct mandatory 2-person welfare room check."
    ]
  }
];
