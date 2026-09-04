# Herdr.dev - UI/UX Design System & Deconstruction

This document contains a complete "de-classification" and design breakdown of the `herdr.dev` website based on visual analysis. You can use this as a direct blueprint or UI/UX specification to build a similar developer-focused, dark-mode website.

## 1. Core Aesthetic & Vibe
*   **Theme:** Developer-Native Dark Mode.
*   **Style:** Minimalist, Technical, CLI-inspired, Neo-Brutalist touches (sharp lines, monospace elements).
*   **Vibe:** Professional, robust, stealthy, and highly functional. It speaks directly to engineers by using familiar interfaces (terminals, code blocks) as primary design elements.

---

## 2. Color Palette

The site uses a highly constrained, monochromatic base with a single, striking accent color. 

### Backgrounds
*   **Global Background:** `#0A0A0A` (Near Black) - *Provides deep contrast without being harsh pure black.*
*   **Surface/Card Background:** `#121212` or `#171717` - *Used for terminal windows, code blocks, and feature panels.*
*   **Border/Divider:** `#27272A` (Zinc 800) - *Used for the thin horizontal separator lines between sections.*

### Typography Colors
*   **Text Primary (Headlines):** `#FFFFFF` (Pure White) - *High contrast for impact.*
*   **Text Secondary (Body/Descriptions):** `#A1A1AA` (Zinc 400) - *Muted for readability and hierarchy.*
*   **Text Tertiary (Meta/Numbers):** `#52525B` (Zinc 600) - *Used for the large 01-05 list numbers.*

### Accents & Highlights
*   **Primary Brand Accent:** `#C084FC` (Vibrant Purple/Lavender) - *Used for key word highlights like "anywhere.", the logo mark, and active states.*
*   **Terminal Colors (Syntax):**
    *   Success/Prompt Green: `#4ADE80`
    *   Path/String Blue: `#60A5FA`
    *   Warning/Tag Orange: `#FB923C`

---

## 3. Typography System

The design relies heavily on typography to create structure. It mixes a geometric/grotesque sans-serif with a crisp monospace font.

### Font Families
1.  **Sans-Serif (Headings & Body):** **Geist**, **Inter**, or **Helvetica Neue**. 
    *   *Implementation tip:* Use `Geist` or `Inter` with tight letter-spacing (`tracking-tight`) for headlines.
2.  **Monospace (Code, Numbers, Meta):** **Geist Mono**, **JetBrains Mono**, or **Fira Code**.

### Font Hierarchy
*   **Hero Headline (H1):** 
    *   Size: ~72px (Desktop) / ~48px (Mobile)
    *   Weight: Bold (700) or ExtraBold (800)
    *   Line Height: 1.0 (Leading None)
    *   Letter Spacing: -0.04em (Tightly packed)
*   **Section Headlines (H2/H3):**
    *   Size: ~24px - 32px
    *   Weight: SemiBold (600)
*   **Body Text:**
    *   Size: 16px
    *   Weight: Regular (400)
    *   Line Height: 1.6 (Relaxed for readability)
*   **Stats Numbers:**
    *   Size: ~36px
    *   Weight: Bold (700)
    *   Family: Monospace or Tabular Sans
*   **Microcopy / CLI Text:**
    *   Size: 13px - 14px
    *   Family: Monospace
    *   Color: Muted grey

---

## 4. Layout System & Grid

The layout is strict, linear, and horizontal. It rarely uses complex overlapping, preferring clean horizontal bands separated by 1px borders.

*   **Container Max-Width:** ~1200px - 1280px. Centered (`mx-auto`).
*   **Page Padding:** Generous padding on left/right (`px-6` or `px-8`).
*   **Section Spacing:** Deep vertical padding between major sections (e.g., `py-24` or `py-32`).

### Specific Grids:
*   **Stats Section:** 4-column CSS grid (`grid-cols-4`).
*   **Features List (01-05):** A 12-column grid setup:
    *   Col 1-1: The Number (e.g., "01").
    *   Col 2-6: The Text (Heading + Paragraph).
    *   Col 7-12: The Code snippet / Terminal UI representation.

---

## 5. Component Library & UI Details

### 1. Navigation Bar
*   **Layout:** Flexbox, Space-between. Logo on the far left, Nav links center-right, CTA button far right.
*   **Links:** Small monospace or uppercase sans-serif text, heavily muted until hovered.
*   **CTA Button ("Log in" / "Install"):** 
    *   Style: Solid white background `#FFFFFF`, black text `#000000`.
    *   Border-radius: Very slight (e.g., `rounded-md` or 6px).
    *   Padding: Small and tight (e.g., `px-4 py-1.5`).

### 2. The Hero Section
*   **Alignment:** Primarily Left-aligned text.
*   **Highlighting:** The word "anywhere." uses the purple accent color to draw the eye immediately.
*   **CLI Install Block:** A horizontal bar looking like a terminal prompt.
    *   Background: `#1A1A1A`
    *   Text: `curl -fsSL https://herdr.dev/install.sh | sh` (Monospace)
    *   Icon: A small copy-to-clipboard icon on the right.
*   **Watermark:** A massive, cropped, 5-10% opacity SVG of the Herdr Ram logo positioned absolutely on the right side of the hero section, overflowing the bounds. This adds texture without distracting.

### 3. Feature Rows (The "01 to 05" Section)
*   **Divider Lines:** Every feature row is separated by a 1px solid border (`border-t border-zinc-800`).
*   **Vertical Alignment:** Items within the row are top-aligned, not center-aligned.
*   **Interactive Feel:** The right side of these features features interactive-looking (though perhaps static) terminal UI components. Dark panels, colored status dots (red, yellow, green), and syntax-highlighted code.

### 4. Complex Terminal UI (Product Demo)
*   This is the centerpiece of the site. It’s a mock terminal window.
*   **Window Frame:** Dark grey background, slight border, rounded corners.
*   **Sidebar:** A darker vertical strip on the left showing active "agents" or sessions.
*   **Main Pane:** Shows terminal output with distinct colors for commands (white), paths (blue), and status messages (green).

---

## 6. Implementation Guide (Tailwind CSS Examples)

If you are building this with Tailwind CSS, here are quick references to match the style:

**Body Setup:**
```html
<body class="bg-[#0A0A0A] text-white font-sans antialiased selection:bg-purple-500/30">
```

**Hero H1 Highlight:**
```html
<h1 class="text-6xl md:text-8xl font-extrabold tracking-tight leading-none">
  Run them <span class="text-[#C084FC]">anywhere.</span><br/>
  Leave them running.
</h1>
```

**Feature Row (Grid Layout):**
```html
<div class="grid grid-cols-1 md:grid-cols-12 gap-8 py-16 border-t border-zinc-800">
  <div class="md:col-span-1 text-zinc-600 font-mono text-xl">01</div>
  <div class="md:col-span-5">
    <h3 class="text-white font-semibold text-xl mb-4">Always running.</h3>
    <p class="text-zinc-400">Herdr isn't an app you keep open. It's a server running in the background...</p>
  </div>
  <div class="md:col-span-6 bg-[#121212] rounded-lg border border-zinc-800 p-4">
    <!-- Terminal mock UI here -->
  </div>
</div>
```

**CLI Copy Box:**
```html
<div class="flex items-center justify-between bg-[#121212] border border-zinc-800 rounded-md p-3 max-w-xl">
  <code class="text-sm font-mono text-zinc-300">$ curl -fsSL https://herdr.dev/install.sh | sh</code>
  <button class="text-zinc-500 hover:text-white"><svg>...</svg></button>
</div>
```
