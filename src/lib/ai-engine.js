/**
 * LaunchPilot AI Simulator Engine
 * Contains intelligent simulated logic for SaaS validation
 */

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// Analyze text for positive/negative viability keywords
const analyzeKeywords = (text) => {
    const t = text.toLowerCase();
    let viabilityBoost = 0;
    let competitionBoost = 0;

    // Positive keywords
    if (t.includes('ai') || t.includes('artificial intelligence') || t.includes('machine learning')) viabilityBoost += 15;
    if (t.includes('automation') || t.includes('workflow')) viabilityBoost += 10;
    if (t.includes('developer') || t.includes('devtool') || t.includes('security')) viabilityBoost += 10;
    if (t.includes('enterprise') || t.includes('cloud') || t.includes('b2b')) viabilityBoost += 10;

    // Warning keywords
    if (t.includes('simple tool') || t.includes('basic generator') || t.includes('clone')) competitionBoost += 20;
    if (t.includes('wrapper') || t.includes('chatgpt wrapper')) competitionBoost += 25;
    if (t.includes('social network') || t.includes('consumer')) competitionBoost += 15;

    return { viabilityBoost, competitionBoost };
};

// Generate realistic verbal analysis based on the level of brutality
const generateReasoning = (idea, mode, scoreInfo) => {
    const { isWrapper, isB2B } = scoreInfo;

    if (mode === 'SAVAGE') {
        let base = "This idea is a delusional fantasy floating on an ocean of hype. ";
        if (isWrapper) base += "It's literally just a thin wrapper that will get crushed the moment OpenAI sneezes. Do you seriously think users will pay for a prompt? ";
        if (!isB2B) base += "Building horizontal consumer apps with no distribution advantage is a mathematically guaranteed path to zero. ";
        base += "Your assumptions are unrealistic, the market will ignore this, and your execution better be flawless (it won't be). Skip it unless you enjoy burning cash.";
        return base;
    }

    if (mode === 'BRUTAL') {
        let base = "Let's be intellectually rigorous. Your idea lacks a genuine moat. ";
        if (isWrapper) base += "This is highly replicable. The competition will eat your margins in 6 months because you are building on rented ground. ";
        if (!isB2B) base += "You are entering a saturated space where user acquisition costs are fatal. ";
        base += "Unless your distribution plan is exceptional, this is a dangerous bet. Build cautiously or reconsider the core value proposition.";
        return base;
    }

    // NORMAL mode
    let base = "This is a solid core concept, but faces significant market realities. ";
    if (isWrapper) base += "Consider adding proprietary workflows or integrations, as standalone 'simple tools' have high churn risks and low defensibility. ";
    if (!isB2B) base += "Consumer applications require massive top-of-funnel marketing. Ensure you have a clear GTM strategy before writing code. ";
    base += "Overall, a viable path if you focus heavily on customer discovery and niching down effectively.";
    return base;
};

export const simulateIdeaValidation = async (ideaDetails, mode = 'NORMAL') => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    const { name, description, audience, pricing } = ideaDetails;
    const analysis = analyzeKeywords(description);

    // Base scores
    let rawDemand = getRandomInt(40, 75) + analysis.viabilityBoost - analysis.competitionBoost;
    let rawViability = getRandomInt(40, 75) + analysis.viabilityBoost - (analysis.competitionBoost / 2);

    // Bound scores between 40-95
    const demandScore = Math.min(Math.max(rawDemand, 40), 95);
    const futureViabilityScore = Math.min(Math.max(rawViability, 40), 95);

    // Competition logic
    let competitionLevel = "Medium";
    if (analysis.competitionBoost > 10) competitionLevel = "High";
    else if (analysis.viabilityBoost > 20) competitionLevel = "High"; // Hot markets have high competition
    else if (demandScore < 50) competitionLevel = "Low";

    // Revenue logic
    let revenuePotential = "Medium";
    if (pricing.toLowerCase().includes('enterprise') || pricing.toLowerCase().includes('high ticket')) revenuePotential = "High";
    if (pricing.toLowerCase().includes('free') || pricing.toLowerCase().includes('cheap')) revenuePotential = "Low";

    // Longevity prediction
    let longevityPrediction = "3-5 years";
    if (futureViabilityScore > 80) longevityPrediction = "5-10 years";
    else if (futureViabilityScore < 55) longevityPrediction = "2-3 years";

    // AI Risk
    let aiReplacementRisk = "Medium";
    if (analysis.competitionBoost > 15) aiReplacementRisk = "High";
    if (analysis.viabilityBoost > 15) aiReplacementRisk = "Low"; // If they are the AI, risk is lower (debatable, but realistic logic)

    // Verdict
    let verdict = "BUILD WITH CAUTION";
    if (futureViabilityScore > 80 && demandScore > 75) verdict = "BUILD";
    if (futureViabilityScore < 55 && demandScore < 55) verdict = "SKIP";

    const isWrapper = analysis.competitionBoost > 10;
    const isB2B = analysis.viabilityBoost > 10;

    const reasoning = generateReasoning(description, mode, { isWrapper, isB2B });

    return {
        reportType: 'idea',
        demandScore,
        revenuePotential,
        competitionLevel,
        futureViabilityScore,
        longevityPrediction,
        aiReplacementRisk,
        verdict,
        reasoning,
        mode,
        timestamp: new Date().toISOString()
    };
};

export const simulateLaunchScan = async (url) => {
    await new Promise(resolve => setTimeout(resolve, 2500));

    const isSecure = url.startsWith('https');
    const launchScore = isSecure ? getRandomInt(60, 95) : getRandomInt(40, 75);

    const checklist = {
        privacyPolicy: Math.random() > 0.3,
        termsOfService: Math.random() > 0.3,
        sslSecurity: isSecure,
        analyticsSetup: Math.random() > 0.4,
        mobileOptimization: Math.random() > 0.2,
        emailCapture: Math.random() > 0.5,
        seoMetaTags: Math.random() > 0.4
    };

    const missingCount = Object.values(checklist).filter(v => !v).length;
    const verdict = missingCount <= 2 ? 'READY' : 'NOT READY';

    let explanation = "";
    if (verdict === 'READY') {
        explanation = "Your platform shows strong launch readiness. Critical legal and analytical infrastructure is present. Proceed with launch.";
    } else {
        explanation = `Critical launch infrastructure missing (${missingCount} issues). Launching now increases risk of churn, legal liability, or abandoned carts. Fix missing items.`;
    }

    return {
        reportType: 'scan',
        url,
        launchScore,
        checklist,
        verdict,
        explanation,
        timestamp: new Date().toISOString()
    };
};
