function sendOrder() {
  const phone = '9966221286'; // Your actual WhatsApp number

  // Start building the message array
  const m = [
    '🎩 *SMART SUITS — BESPOKE ORDER*',
    '─────────────────────────────',
    `👤 *Customer:* ${S.name || 'Not provided'}`,
    `📧 *Email:* ${S.email || 'Not provided'}`,
    `📞 *Phone:* ${S.customerPhone || 'Not provided'}`,
    '',
    '📋 *SELECTIONS*',
    `• Garment:   ${S.garment}`,
    `• Fabric:    ${S.fabric}`
  ];

  // Conditional formatting based on selected garment
  const hasJacket = S.garment !== 'Pants Only';
  const hasPant = S.garment !== 'Jacket Only';
  const hasVest = S.garment === '3-Piece Suit';

  if (hasJacket) {
    m.push(`• Jacket:    ${S.jacketStyle} | Lapel: ${S.jacketLapel} | Pocket: ${S.jacketPocket} | Vent: ${S.jacketVent}`);
  }
  
  if (hasPant) {
    const pFab = S.pantFabric === 'Same as Jacket' ? 'Matches Jacket' : S.pantFabric;
    m.push(`• Pant:      ${S.pantFit} | Pleat: ${S.pantPleat} | Hem: ${S.pantHem} | Fabric: ${pFab}`);
  }

  if (hasVest) {
    const vFab = S.vestFabric === 'Same as Jacket' ? 'Matches Jacket' : S.vestFabric;
    m.push(`• Vest:      ${S.vestNeck} | Buttons: ${S.vestButtons} | Fabric: ${vFab}`);
  }

  if (hasJacket) {
    m.push(`• Lining:    ${S.lining}`);
    m.push(`• Monogram:  ${S.monogram || 'None'}`);
  }

  m.push('');
  m.push('📏 *MEASUREMENTS (cm)*');
  
  const measurements = [];
  if (S.height || S.weight) measurements.push(`• Height: ${S.height||'-'} | Weight: ${S.weight||'-'} kg`);
  if (S.chest || S.waist) measurements.push(`• Chest: ${S.chest||'-'} | Waist: ${S.waist||'-'}`);
  if (hasJacket && (S.shoulder || S.sleeve)) measurements.push(`• Shoulder: ${S.shoulder||'-'} | Sleeve: ${S.sleeve||'-'}`);
  if (hasPant && S.inseam) measurements.push(`• Inseam: ${S.inseam||'-'}`);
  
  if(measurements.length > 0) {
    m.push(...measurements);
  } else {
    m.push('• (Not provided)');
  }

  m.push('');
  m.push('🚚 *DELIVERY REQUEST*');
  m.push(`• Expected Within: ${S.deliveryDays ? S.deliveryDays + ' Days' : 'Not specified'}`);

  m.push('');
  m.push('─────────────────────────────');
  m.push('_Please confirm receipt and order processing._');

  // Convert array to a properly line-broken string for WhatsApp
  // Using %0A guarantees a line break in WhatsApp Web and Mobile
  const textPayload = m.map(line => encodeURIComponent(line)).join('%0A');

  const url = `https://api.whatsapp.com/send?phone=${phone}&text=${textPayload}`;
  window.open(url, '_blank');
}
