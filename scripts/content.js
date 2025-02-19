// content.js

/**
 * Intro-tekst
 */
export const introText = `
  <h2>Velkommen til <em>IT‑Tycoon!</em></h2>
  <ul style="text-align:left; margin:0 auto; max-width:550px; line-height:1.6;">
    <li>🚀 <strong>Mission:</strong> Du er IT‑forvalter, som skal styre komplekse systemer i en stadig mere digital verden.</li>
    <li>⏱️ <strong>Tidspres:</strong> Alle valg koster Tid, så pas på ikke at drukne i rework eller hændelser!</li>
    <li>⚖️ <strong>Balancér:</strong> Du skal finde den rette fordeling mellem <em>Udvikling</em> og <em>Sikkerhed</em>, ellers risikerer du hackerangreb, nedbrud eller administrativt bøvl.</li>
    <li>🚨 <strong>Hastende opgaver:</strong> Fristende at tage for at få bonus, men de giver ekstra risiko og kan give alvorlige konsekvenser, hvis du ikke håndterer dem korrekt.</li>
    <li>🔎 <strong>CAB-godkendelse:</strong> Hver opgave du afslutter, skal godkendes af dit Change Advisory Board. De har <em>meget</em> at skulle have sagt!</li>
    <li>💡 <strong>Tip:</strong> Vær ikke bange for at scrolle igennem opgavelisten – måske er der en “perfekt opgave” til din strategi.</li>
  </ul>
  <p style="margin-top:1rem;">
    Er du klar til at forme fremtidens IT-løsninger, 
    <br/>og lede dit team til succes <strong>– eller til kaos?</strong>
  </p>
`;

/**
 * Tutorial-tekst
 */
export const tutorialText = `
  <h2>Sådan spiller du!</h2>
  <ul style="text-align:left; margin:0 auto; max-width:560px; line-height:1.6;">
    <li>
      <strong>1. Vælg opgave</strong> 
      <br/>Klik på “Vælg ny opgave” for at se en liste. Hver opgave består af flere <em>trin</em>, 
      hvor du skal vælge den rigtige <em>lokation</em> (fx “cybersikkerhed” eller “hospital”).
    </li>
    <li>
      <strong>2. Gør det grundigt eller hurtigt</strong>
      <br/>Hvert trin har to valg: En <em>avanceret</em> (typisk: +2/-2 tid eller +3/-2 tid) 
      og en <em>hurtig</em> (1 point, men sparer tid). Avancerede løsninger giver flere point i Sikkerhed/ Udvikling, 
      men koster mere Tid.
    </li>
    <li>
      <strong>3. Håndtér hændelser</strong>
      <br/>Ekstreme fokus på enten Udvikling eller Sikkerhed (eller meget lav Tid) 
      kan trigge hændelser (fx “Hackerangreb”). De kan ske undervejs, max 2 pr. “PI”.
    </li>
    <li>
      <strong>4. CAB-godkendelse</strong>
      <br/>Når du har gennemført alle trin, bliver opgaven vurderet. 
      Er der for høj risiko eller for få point i den ene KPI, kan CAB kræve rework (koster ekstra Tid).
    </li>
    <li>
      <strong>5. Afslut en PI</strong>
      <br/>Når du har fuldført 5 opgaver, opsummeres dine resultater i en “PI Feedback”. 
      Så starter en ny PI helt forfra – men du kan få straffe eller bonusser med videre.
    </li>
    <li>
      <strong>6. Balance is key</strong>
      <br/>Prøv at bevare en nogenlunde balanceret Udvikling/Sikkerhed. 
      Hvis du stikker helt af i den ene retning, <em>vil</em> negative hændelser komme og bide dig bagi.
    </li>
  </ul>
  <p style="margin-top:1rem;">
    God fornøjelse! Husk at nyde rejsen – 
    <strong>hver PI er et nyt eventyr!</strong>
  </p>
`;

/**
 * Hjælp-tekst (Help)
 */
export const helpHTML = `
  <h2>Har du brug for hjælp?</h2>
  <p>
    Ingen fare! Her er en hurtig oversigt over nogle vigtige aspekter af spillet:
  </p>
  <ol style="text-align:left; margin:0 auto; max-width:550px; line-height:1.6;">
    <li>
      <strong>Tid (⏳)</strong> 
      <br/>Du starter en PI (Program Increment) med 45 Tid. Hver gang du vælger en opgave, 
      bruges 2 Tid pr. opgave. Desuden koster hver avanceret løsning som regel ekstra Tid. 
      Løber du tør for Tid, slutter spillet.
    </li>
    <li>
      <strong>Udvikling vs. Sikkerhed (⚖️)</strong>
      <br/>Når du løser opgaver, stiger enten “development” eller “security”. 
      Du kan ende med negative hændelser, hvis du vælger <em>for meget</em> udvikling (hackerangreb) 
      eller <em>for meget</em> sikkerhed (ineffektiv drift). 
      Prøv at få en god balance mellem de to.
    </li>
    <li>
      <strong>Hastende opgaver (🚨)</strong>
      <br/>Disse giver +4 bonus til enten Udvikling eller Sikkerhed, men øger risikoen for CAB-afvisning 
      med 10%. Hvis du tager en “let løsning” på en hastende opgave, får du -5 strafpoint. 
      Hvis du helt ignorerer den, får du -3 i næste CAB. 
    </li>
    <li>
      <strong>Events (💥)</strong> 
      <br/>Der udløses max 2 events pr. PI. De kan være positive, negative eller neutrale. 
      Sandsynligheden stiger, hvis du har for lidt Tid tilbage eller en ekstrem fordeling (meget dev vs. lidt sec, eller omvendt).
    </li>
    <li>
      <strong>CAB (Change Advisory Board)</strong>
      <br/>Efter hver opgave skal dine ændringer godkendes. 
      Går det galt, kræver de rework, og du mister 1 Tid. 
      Går det godt, slipper du igennem med dine nye forbedringer.
    </li>
    <li>
      <strong>Slut på PI (🎯)</strong>
      <br/>Når du har gennemført 5 opgaver, sluttes en PI. 
      Din Tid, Sikkerhed og Udvikling nulstilles (til nye start-værdier), 
      men du kan have medbragt straf/bonus til den næste. 
      Prøv at sætte en personlig Highscore!
    </li>
  </ol>
  <p style="margin-top:1rem;">
    <strong>Tip:</strong> Du kan fortryde et trin én gang pr. opgave, hvis du vil “revidere” dit valg 
    for at undgå en CAB-afvisning. Det koster dog typisk ekstra Tid eller indsats.
  </p>
  <p>
    Held og lykke – og husk: <em>At være en god IT-forvalter handler om at balancere risici, 
    holde stakeholderne tilfredse, og stadig levere resultater.</em>
  </p>
`;
