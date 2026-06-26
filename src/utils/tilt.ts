import React from 'react';

export function tiltOn(
  e: React.MouseEvent<HTMLDivElement>,
  maxDeg = 5,
  liftPx = 2,
) {
  const r = e.currentTarget.getBoundingClientRect();
  const x = (e.clientX - r.left) / r.width  - 0.5;
  const y = (e.clientY - r.top)  / r.height - 0.5;
  e.currentTarget.style.transform =
    `perspective(900px) rotateX(${-y * maxDeg}deg) rotateY(${x * maxDeg}deg) translateY(-${liftPx}px)`;
}

export function tiltOff(e: React.MouseEvent<HTMLDivElement>) {
  e.currentTarget.style.transform = '';
}

export function spotlightMove(e: React.MouseEvent<HTMLDivElement>) {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty(
    '--spotlight-x',
    `${((e.clientX - r.left) / r.width) * 100}%`,
  );
  e.currentTarget.style.setProperty(
    '--spotlight-y',
    `${((e.clientY - r.top) / r.height) * 100}%`,
  );
}

export function spotlightLeave(e: React.MouseEvent<HTMLDivElement>) {
  e.currentTarget.style.setProperty('--spotlight-x', '-200%');
  e.currentTarget.style.setProperty('--spotlight-y', '-200%');
}
