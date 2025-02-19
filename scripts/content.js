// content.js

// Intro-tekst
export const introText = `
  <h2>Velkommen til IT‑Tycoon!</h2>
  <ul style="text-align:left; margin:0 auto; max-width:550px; line-height:1.6;">
    <li>🚀 <strong>Mission:</strong> Du er IT‑forvalter og skal styre komplekse systemer i en digital tidsalder.</li>
    <li>⏱️ <strong>Tidspres:</strong> Hver beslutning koster Tid – vær opmærksom på ikke at løbe tør.</li>
    <li>⚖️ <strong>Balancér:</strong> Fokusér på både Udvikling og Sikkerhed for at undgå negative konsekvenser.</li>
    <li>🚨 <strong>Hastende opgaver:</strong> Giver ekstra bonus, men indeholder større risici.</li>
    <li>🔎 <strong>CAB-godkendelse:</strong> Dine ændringer vurderes efter hver opgave, og rework kan koste dig yderligere tid.</li>
  </ul>
  <p style="margin-top:1rem;">Er du klar til at forme fremtidens IT-løsninger?</p>
`;

// Tutorial-tekst
export const tutorialText = `
  <h2>Tutorial</h2>
  <ul style="text-align:left; margin:0 auto; max-width:550px; line-height:1.6;">
    <li>1️⃣ Klik på “Vælg ny opgave” for at åbne opgavelisten.</li>
    <li>2️⃣ Hver opgave koster 2 Tid. Vælg trin ved at klikke på korrekt lokation.</li>
    <li>3️⃣ <strong>Udvikling</strong> eller <strong>Sikkerhed</strong> påvirkes af dine valg. Ekstreme valg kan udløse <em>events</em>.</li>
    <li>4️⃣ <strong>Hastende Opgaver</strong> giver +4 bonus, men +10% risiko for afvisning. Let løsning = -5 point. Ignorerer du opgaven, = -3 point straf i CAB.</li>
    <li>5️⃣ <strong>Max 2 events pr. PI</strong>. Hver event kan være positiv, negativ eller neutral.</li>
    <li>6️⃣ <strong>Slut:</strong> Efter 5 opgaver viser en opsummering din score, hvorefter en ny PI starter.</li>
  </ul>
  <p style="margin-top:1rem;">Held og lykke – og husk at holde balancen!</p>
`;

// Hjælp-tekst
export const helpHTML = `
  <h2>Få Hjælp</h2>
  <p><strong>Din Rolle som IT-forvalter</strong><br>
  Du skal navigere komplekse IT-systemer i en digital tidsalder. Balancer mellem <em>Udvikling</em> og <em>Sikkerhed</em>, 
  mens du holder øje med din <em>Tid</em>.</p>
  <ul style="text-align:left; margin:0 auto; max-width:500px; line-height:1.5;">
    <li>⏳ <strong>Tid:</strong> Du starter en PI med 45 Tid; hver opgave koster 2 Tid.</li>
    <li>⚖️ <strong>Balance:</strong> Hvis du vælger >65% udvikling eller <35% udvikling, kan du opleve negative hændelser (hackerangreb m.m.).</li>
    <li>🚀 <strong>Hastende Opgaver:</strong> +4 bonus, men +10% risiko. Let løsning = -5 point, ignoreret = -3 point.</li>
    <li>💥 <strong>Events:</strong> Der kan komme op til 2 hændelser pr. PI (positiv, negativ, neutral).</li>
    <li>🔍 <strong>CAB:</strong> Ved afvisning mister du 1 Tid. Ved godkendelse kan du komme videre.</li>
    <li>🎯 <strong>Slut på PI:</strong> Når du har gennemført 5 opgaver, nulstilles Tid/Sikkerhed/Udvikling, men straf/bonus kan overføres.</li>
  </ul>
`;

