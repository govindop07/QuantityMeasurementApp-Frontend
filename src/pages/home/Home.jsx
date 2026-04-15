import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/authService.js';
import { FaRulerCombined, FaCalculator, FaHistory, FaArrowRight } from 'react-icons/fa';

const CARDS = [
  {
    key: 'conversion',
    route: '/conversion',
    title: 'Conversion',
    subtitle: 'Instantly switch between any units.',
    color: '#2ec4a9',
    lightBg: '#edfdf8',
    border: '#2ec4a9',
    shadow: 'rgba(46,196,169,0.25)',
    badge: 'Length · Temp · Volume · Weight',
    Icon: FaRulerCombined,
  },
  {
    key: 'operations',
    route: '/operations',
    title: 'Operations',
    subtitle: 'Calculate across quantity types.',
    color: '#6366f1',
    lightBg: '#eef2ff',
    border: '#6366f1',
    shadow: 'rgba(99,102,241,0.25)',
    badge: '+ − × ÷',
    Icon: FaCalculator,
  },
  {
    key: 'history',
    route: '/history',
    title: 'History',
    subtitle: 'Every action, saved & searchable.',
    color: '#f59e0b',
    lightBg: '#fffbeb',
    border: '#f59e0b',
    shadow: 'rgba(245,158,11,0.25)',
    badge: 'All Records',
    Icon: FaHistory,
  },
];

export default function Home() {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(null);
  const name = authService.getUserName();

  return (
    <div style={{ minHeight: '100vh', background: '#eef0f5' }}>
      {/* Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #4f6ef7 0%, #6366f1 100%)',
        padding: '36px 40px 40px',
        textAlign: 'center',
      }}>
        <h2 style={{ color: '#fff', fontSize: '26px', fontWeight: 400, margin: 0 }}>
          Welcome To Quantity Measurement
        </h2>
        {name && (
          <p style={{ color: 'rgba(255,255,255,0.8)', marginTop: '8px', fontSize: '15px', margin: '8px 0 0' }}>
            Hello, <strong>{name}</strong>! What would you like to do today?
          </p>
        )}
      </div>

      {/* Cards */}
      <div style={{
        maxWidth: '960px',
        margin: '0 auto',
        padding: '52px 24px',
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '28px',
      }}>
        {CARDS.map(({ key, route, title, subtitle, color, lightBg, border, shadow, badge, Icon }) => {
          const isHovered = hovered === key;
          return (
            <div
              key={key}
              onClick={() => navigate(route)}
              onMouseEnter={() => setHovered(key)}
              onMouseLeave={() => setHovered(null)}
              style={{
                background: isHovered ? lightBg : '#fff',
                border: `2px solid ${isHovered ? border : '#e5e7eb'}`,
                borderRadius: '22px',
                padding: '36px 24px 28px',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '16px',
                transition: 'all 0.25s ease',
                boxShadow: isHovered ? `0 14px 40px ${shadow}` : '0 2px 8px rgba(0,0,0,0.06)',
                transform: isHovered ? 'translateY(-8px) scale(1.02)' : 'translateY(0) scale(1)',
                userSelect: 'none',
              }}
            >
              {/* Icon */}
              <div style={{
                width: '62px', height: '62px', borderRadius: '50%',
                background: isHovered ? `${color}20` : '#f5f6f8',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.25s ease',
                transform: isHovered ? 'scale(1.1)' : 'scale(1)',
              }}>
                <Icon size={28} color={isHovered ? color : '#bbb'} style={{ transition: 'color 0.2s' }} />
              </div>

              {/* Title */}
              <h3 style={{
                fontSize: '20px', fontWeight: 700, margin: 0,
                color: isHovered ? color : '#1a1a2e',
                transition: 'color 0.2s',
                letterSpacing: '-0.01em',
              }}>
                {title}
              </h3>

              {/* Subtitle */}
              <p style={{
                fontSize: '13px', color: '#888', textAlign: 'center',
                lineHeight: '1.65', margin: 0,
              }}>
                {subtitle}
              </p>

              {/* Badge */}
              <div style={{
                background: isHovered ? lightBg : '#f3f4f6',
                border: `1px solid ${isHovered ? border : '#e5e7eb'}`,
                borderRadius: '20px',
                padding: '5px 16px',
                fontSize: '12px',
                fontWeight: 600,
                color: isHovered ? color : '#888',
                letterSpacing: '0.04em',
                transition: 'all 0.2s',
              }}>
                {badge}
              </div>

              {/* Go button */}
              <div style={{
                marginTop: '4px',
                width: '42px', height: '42px', borderRadius: '50%',
                background: isHovered ? color : '#f0f1f3',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.25s ease',
                boxShadow: isHovered ? `0 4px 14px ${shadow}` : 'none',
                transform: isHovered ? 'scale(1.1)' : 'scale(1)',
              }}>
                <FaArrowRight size={16} color={isHovered ? '#fff' : '#bbb'} style={{ transition: 'color 0.2s' }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
