import React, { useState } from 'react';
import conversionService from '../../services/conversionService.js';
import { FaRulerCombined, FaThermometerHalf, FaFlask, FaWeight } from 'react-icons/fa';

const LENGTH_UNITS = [
  { label: 'Metres',      value: 'METERS' },
  { label: 'Centimetres', value: 'CENTIMETERS' },
  { label: 'Feet',        value: 'FEET' },
  { label: 'Inches',      value: 'INCHES' },
  { label: 'Yards',       value: 'YARDS' },
];
const TEMP_UNITS = [
  { label: 'Celsius',    value: 'CELSIUS' },
  { label: 'Fahrenheit', value: 'FAHRENHEIT' },
  { label: 'Kelvin',     value: 'KELVIN' },
];
const VOL_UNITS = [
  { label: 'Litres',      value: 'LITRE' },
  { label: 'Millilitres', value: 'MILLILITRE' },
  { label: 'Gallons',     value: 'GALLON' },
];
const WEIGHT_UNITS = [
  { label: 'Grams',      value: 'GRAM' },
  { label: 'Milligrams', value: 'MILLIGRAM' },
  { label: 'Kilograms',  value: 'KILOGRAM' },
];

function getUnits(type) {
  if (type === 'TEMPERATURE') return TEMP_UNITS;
  if (type === 'VOLUME') return VOL_UNITS;
  if (type === 'WEIGHT') return WEIGHT_UNITS;
  return LENGTH_UNITS;
}

const TYPE_OPTIONS = [
  { key: 'LENGTH',      label: 'Length',      activeColor: '#2ec4a9', activeBg: '#edfdf8', activeBorder: '#2ec4a9', Icon: FaRulerCombined },
  { key: 'TEMPERATURE', label: 'Temperature', activeColor: '#e03030', activeBg: '#fff5f5', activeBorder: '#e03030', Icon: FaThermometerHalf },
  { key: 'VOLUME',      label: 'Volume',      activeColor: '#8a4fff', activeBg: '#f5efff', activeBorder: '#8a4fff', Icon: FaFlask },
  { key: 'WEIGHT',      label: 'Weight',      activeColor: '#0ea5e9', activeBg: '#f0f9ff', activeBorder: '#0ea5e9', Icon: FaWeight },
];

const OPERATIONS = [
  { key: 'ADD',      label: 'Add',      symbol: '+', color: '#22c55e', bg: '#f0fdf4' },
  { key: 'SUBTRACT', label: 'Subtract', symbol: '−', color: '#ef4444', bg: '#fff5f5' },
  { key: 'MULTIPLY', label: 'Multiply', symbol: '×', color: '#f59e0b', bg: '#fffbeb' },
  { key: 'DIVIDE',   label: 'Divide',   symbol: '÷', color: '#6366f1', bg: '#eef2ff' },
];

export default function Operations() {
  const [selectedType, setSelectedType] = useState('LENGTH');
  const [selectedOp,   setSelectedOp]   = useState('ADD');
  const [val1,  setVal1]   = useState(1);
  const [unit1, setUnit1]  = useState('METERS');
  const [val2,  setVal2]   = useState(1);
  const [unit2, setUnit2]  = useState('CENTIMETERS');
  const [resUnit, setResUnit] = useState('METERS');
  const [result, setResult]  = useState(null);
  const [error,  setError]   = useState('');
  const [loading, setLoading] = useState(false);

  const units = getUnits(selectedType);
  const activeType = TYPE_OPTIONS.find(t => t.key === selectedType);
  const activeOp   = OPERATIONS.find(o => o.key === selectedOp);
  const isDivide   = selectedOp === 'DIVIDE';

  const selectType = (type) => {
    setSelectedType(type);
    setResult(null);
    setError('');
    const u = getUnits(type);
    setUnit1(u[0].value);
    setUnit2(u[1]?.value || u[0].value);
    setResUnit(u[0].value);
  };

  const handleCalculate = async () => {
    setError('');
    setLoading(true);
    try {
      const res = await conversionService.arithmetic({
        type: selectedType,
        operation: selectedOp,
        quantity1: { value: Number(val1), unit: unit1 },
        quantity2: { value: Number(val2), unit: unit2 },
        resultUnit: isDivide ? unit1 : resUnit,
      });
      setResult(res);
    } catch (e) {
      setError(e.message || 'Operation failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#eef0f5' }}>
      {/* Blue Banner */}
      <div style={{ background: '#4f6ef7', padding: '28px 40px', textAlign: 'center' }}>
        <h2 style={{ color: '#fff', fontSize: '22px', fontWeight: 400 }}>
          Quantity Operations
        </h2>
      </div>

      <div style={{ maxWidth: '860px', margin: '0 auto', padding: '40px 24px' }}>

        {/* Type selector */}
        <p style={S.sectionLabel}>CHOOSE TYPE</p>
        <div style={{ display: 'flex', gap: '16px', marginBottom: '32px' }}>
          {TYPE_OPTIONS.map(({ key, label, activeColor, activeBg, activeBorder, Icon }) => {
            const active = selectedType === key;
            return (
              <div key={key} onClick={() => selectType(key)}
                style={{
                  flex: 1, cursor: 'pointer', borderRadius: '14px',
                  background: active ? activeBg : '#fff',
                  border: `2px solid ${active ? activeBorder : '#e5e7eb'}`,
                  padding: '22px 14px 16px',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px',
                  transition: 'all 0.2s',
                  boxShadow: active ? `0 2px 12px ${activeBorder}22` : '0 1px 3px rgba(0,0,0,0.06)',
                }}>
                <div style={{
                  width: '52px', height: '52px', borderRadius: '50%',
                  background: active ? `${activeColor}18` : '#f5f6f8',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'all 0.2s',
                }}>
                  <Icon size={24} color={active ? activeColor : '#bbb'} style={{ transition: 'color 0.2s' }} />
                </div>
                <span style={{ fontSize: '14px', fontWeight: active ? 700 : 500, color: active ? activeColor : '#aaa' }}>
                  {label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Operation selector */}
        <p style={S.sectionLabel}>CHOOSE OPERATION</p>
        <div style={{ display: 'flex', gap: '14px', marginBottom: '32px' }}>
          {OPERATIONS.map(({ key, label, symbol, color, bg }) => {
            const active = selectedOp === key;
            return (
              <div key={key} onClick={() => { setSelectedOp(key); setResult(null); }}
                style={{
                  flex: 1, cursor: 'pointer', borderRadius: '12px',
                  background: active ? bg : '#fff',
                  border: `2px solid ${active ? color : '#e5e7eb'}`,
                  padding: '18px 12px',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
                  transition: 'all 0.2s',
                  boxShadow: active ? `0 2px 10px ${color}33` : '0 1px 3px rgba(0,0,0,0.06)',
                }}>
                <span style={{ fontSize: '28px', fontWeight: 700, color: active ? color : '#bbb', lineHeight: 1 }}>{symbol}</span>
                <span style={{ fontSize: '13px', fontWeight: active ? 700 : 500, color: active ? color : '#aaa' }}>{label}</span>
              </div>
            );
          })}
        </div>

        {/* Inputs */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px', flexWrap: 'wrap' }}>
          {/* Quantity 1 */}
          <div style={{ ...S.box, flex: 1, minWidth: '200px' }}>
            <span style={S.boxLabel}>FIRST QUANTITY</span>
            <input type="number" value={val1}
              onChange={e => setVal1(e.target.value)}
              style={S.bigInput} />
            <div style={S.divider} />
            <select value={unit1} onChange={e => setUnit1(e.target.value)} style={S.select}>
              {units.map(u => <option key={u.value} value={u.value}>{u.label}</option>)}
            </select>
          </div>

          {/* Operator Badge */}
          <div style={{
            width: '48px', height: '48px', borderRadius: '50%',
            background: activeOp.bg, border: `2px solid ${activeOp.color}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '24px', fontWeight: 700, color: activeOp.color,
            flexShrink: 0,
          }}>
            {activeOp.symbol}
          </div>

          {/* Quantity 2 */}
          <div style={{ ...S.box, flex: 1, minWidth: '200px' }}>
            <span style={S.boxLabel}>SECOND QUANTITY</span>
            <input type="number" value={val2}
              onChange={e => setVal2(e.target.value)}
              style={S.bigInput} />
            <div style={S.divider} />
            <select value={unit2} onChange={e => setUnit2(e.target.value)} style={S.select}>
              {units.map(u => <option key={u.value} value={u.value}>{u.label}</option>)}
            </select>
          </div>
        </div>

        {/* Result unit selector (not for divide) */}
        {!isDivide && (
          <div style={{ marginBottom: '24px' }}>
            <p style={S.sectionLabel}>RESULT UNIT</p>
            <div style={{ ...S.box, maxWidth: '320px' }}>
              <select value={resUnit} onChange={e => setResUnit(e.target.value)} style={{ ...S.select, fontSize: '15px', color: '#333', padding: '4px 0' }}>
                {units.map(u => <option key={u.value} value={u.value}>{u.label}</option>)}
              </select>
            </div>
          </div>
        )}

        {/* Calculate button */}
        <button onClick={handleCalculate} disabled={loading} style={{
          background: '#4f6ef7', color: '#fff', border: 'none',
          borderRadius: '10px', padding: '14px 48px',
          fontSize: '16px', fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer',
          opacity: loading ? 0.7 : 1, transition: 'all 0.2s',
          boxShadow: '0 3px 12px #4f6ef733',
          marginBottom: '28px',
        }}>
          {loading ? 'Calculating…' : 'Calculate'}
        </button>

        {/* Result display */}
        {result && (
          <div style={{
            background: '#fff', borderRadius: '14px', padding: '24px 32px',
            boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
            borderLeft: `5px solid ${activeOp.color}`,
          }}>
            <p style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '0.08em', color: '#aaa', marginBottom: '10px' }}>
              RESULT
            </p>
            <div style={{ fontSize: '32px', fontWeight: 700, color: activeOp.color, marginBottom: '10px' }}>
              {result.resultValue} <span style={{ fontSize: '18px', color: '#888', fontWeight: 500 }}>{result.resultUnit}</span>
            </div>
            <div style={{ fontSize: '14px', color: '#888', fontFamily: 'monospace', background: '#f8f9fa', padding: '10px 14px', borderRadius: '8px' }}>
              {result.expression}
            </div>
          </div>
        )}

        {error && <div style={S.error}>{error}</div>}
      </div>
    </div>
  );
}

const S = {
  sectionLabel: { fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em', color: '#666', marginBottom: '14px' },
  box: { background: '#fff', borderRadius: '12px', padding: '16px 20px', boxShadow: '0 1px 4px rgba(0,0,0,0.07)' },
  boxLabel: { display: 'block', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', color: '#999', marginBottom: '8px' },
  bigInput: {
    border: 'none', outline: 'none', fontSize: '30px', fontWeight: 600,
    color: '#111', width: '100%', background: 'transparent', padding: '0', display: 'block',
  },
  divider: { height: '1px', background: '#eee', margin: '10px 0' },
  select: { border: 'none', outline: 'none', fontSize: '14px', color: '#888', background: 'transparent', cursor: 'pointer', width: '100%', appearance: 'auto' },
  error: { marginTop: '16px', background: '#fef2f2', color: '#dc2626', padding: '10px 16px', borderRadius: '8px', fontSize: '14px' },
};
