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

export default function Conversion() {
  const [selectedType, setSelectedType] = useState('LENGTH');
  const [fromValue, setFromValue] = useState(1);
  const [fromUnit,  setFromUnit]  = useState('METERS');
  const [toUnit,    setToUnit]    = useState('CENTIMETERS');
  const [result,    setResult]    = useState(100);
  const [errorMsg,  setErrorMsg]  = useState('');

  const units = getUnits(selectedType);

  const doConvert = async (fv, fu, tu, type) => {
    setErrorMsg('');
    if (fu === tu) { setResult(Number(fv)); return; }
    try {
      const res = await conversionService.convert({
        type,
        thisQuantityDTO: { value: Number(fv), unit: fu },
        thatQuantityDTO: { value: 0, unit: tu },
      });
      setResult(res.resultValue);
    } catch {
      setErrorMsg('Conversion failed. Please try again.');
    }
  };

  const selectType = (type) => {
    setSelectedType(type);
    setResult(null);
    setErrorMsg('');
    const u = getUnits(type);
    setFromUnit(u[0].value);
    setToUnit(u[1]?.value || u[0].value);
    setFromValue(1);
  };

  const handleFromValue = (v) => { setFromValue(v); doConvert(v, fromUnit, toUnit, selectedType); };
  const handleFromUnit  = (v) => { setFromUnit(v);  doConvert(fromValue, v, toUnit, selectedType); };
  const handleToUnit    = (v) => { setToUnit(v);    doConvert(fromValue, fromUnit, v, selectedType); };

  return (
    <div style={{ minHeight: '100vh', background: '#eef0f5' }}>
      <div style={{ background: '#4f6ef7', padding: '28px 40px', textAlign: 'center' }}>
        <h2 style={{ color: '#fff', fontSize: '22px', fontWeight: 400 }}>Welcome To Quantity Measurement</h2>
      </div>

      <div style={{ maxWidth: '780px', margin: '0 auto', padding: '40px 24px' }}>
        <p style={S.chooseLabel}>CHOOSE TYPE</p>

        <div style={{ display: 'flex', gap: '18px', marginBottom: '40px' }}>
          {TYPE_OPTIONS.map(({ key, label, activeColor, activeBg, activeBorder, Icon }) => {
            const active = selectedType === key;
            return (
              <div key={key} onClick={() => selectType(key)} style={{
                flex: 1, cursor: 'pointer', borderRadius: '14px',
                background: active ? activeBg : '#fff',
                border: `2px solid ${active ? activeBorder : '#e5e7eb'}`,
                padding: '28px 16px 20px',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px',
                transition: 'all 0.2s',
                boxShadow: active ? `0 2px 12px ${activeBorder}22` : '0 1px 3px rgba(0,0,0,0.06)',
              }}>
                <div style={{
                  width: '56px', height: '56px', borderRadius: '50%',
                  background: active ? `${activeColor}18` : '#f5f6f8',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'all 0.2s',
                }}>
                  <Icon size={26} color={active ? activeColor : '#bbb'} style={{ transition: 'color 0.2s' }} />
                </div>
                <span style={{ fontSize: '15px', fontWeight: active ? 700 : 500, color: active ? activeColor : '#aaa' }}>
                  {label}
                </span>
              </div>
            );
          })}
        </div>

        <div style={{ display: 'flex', gap: '20px' }}>
          <div style={S.box}>
            <span style={S.boxLabel}>FROM</span>
            <input type="number" value={fromValue} onChange={e => handleFromValue(e.target.value)} style={S.bigInput} />
            <div style={S.divider} />
            <select value={fromUnit} onChange={e => handleFromUnit(e.target.value)} style={S.select}>
              {units.map(u => <option key={u.value} value={u.value}>{u.label}</option>)}
            </select>
          </div>
          <div style={S.box}>
            <span style={S.boxLabel}>TO</span>
            <input type="number" value={result ?? ''} readOnly style={{ ...S.bigInput, color: '#333' }} />
            <div style={S.divider} />
            <select value={toUnit} onChange={e => handleToUnit(e.target.value)} style={S.select}>
              {units.map(u => <option key={u.value} value={u.value}>{u.label}</option>)}
            </select>
          </div>
        </div>

        {errorMsg && <div style={S.error}>{errorMsg}</div>}
      </div>
    </div>
  );
}

const S = {
  chooseLabel: { fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em', color: '#666', marginBottom: '16px' },
  box: { flex: 1, background: '#fff', borderRadius: '12px', padding: '20px 22px 16px', boxShadow: '0 1px 4px rgba(0,0,0,0.07)' },
  boxLabel: { display: 'block', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', color: '#999', marginBottom: '10px' },
  bigInput: { border: 'none', outline: 'none', fontSize: '32px', fontWeight: 600, color: '#111', width: '100%', background: 'transparent', padding: '0', display: 'block' },
  divider: { height: '1px', background: '#eee', margin: '12px 0' },
  select: { border: 'none', outline: 'none', fontSize: '14px', color: '#888', background: 'transparent', cursor: 'pointer', width: '100%', appearance: 'auto' },
  error: { marginTop: '16px', background: '#fef2f2', color: '#dc2626', padding: '10px 16px', borderRadius: '8px', fontSize: '14px' },
};
