import { useState } from "react";

const MATERIALS = [
  { id: "pla",    name: "PLA",    color: "#4caf50", costo: 0.04,  desc: "Uso generale" },
  { id: "petg",   name: "PETG",   color: "#2196f3", costo: 0.06,  desc: "Resistente & flessibile" },
  { id: "abs",    name: "ABS",    color: "#ff9800", costo: 0.055, desc: "Alta temperatura" },
  { id: "asa",    name: "ASA",    color: "#f44336", costo: 0.07,  desc: "UV resistente" },
  { id: "tpu",    name: "TPU",    color: "#9c27b0", costo: 0.10,  desc: "Flessibile" },
  { id: "resina", name: "Resina", color: "#00bcd4", costo: 0.15,  desc: "Alta precisione" },
];

const fmt = (n, dec = 2) =>
  isNaN(n) || !isFinite(n) || n === 0 ? "—" : n.toFixed(dec).replace(".", ",");

export default function App() {
  const [larghezza, setLarghezza]     = useState("");
  const [altezza, setAltezza]         = useState("");
  const [profondita, setProfondita]   = useState("");
  const [fattore, setFattore]         = useState("60");
  const [selectedMat, setSelectedMat] = useState(null);
  const [costoCC, setCostoCC]         = useState("");

  const handleSelectMat = (mat) => {
    setSelectedMat(mat.id);
    setCostoCC(mat.costo.toString());
  };

  const L = parseFloat(larghezza)  || 0;
  const A = parseFloat(altezza)    || 0;
  const P = parseFloat(profondita) || 0;
  const F = parseFloat(fattore)    || 0;
  const C = parseFloat(costoCC)    || 0;

  const volParallele  = L * A * P;
  const volOggetto    = volParallele * (F / 100);
  const volOggettoCC  = volOggetto / 1000;
  const costoTotale   = volOggettoCC * C;

  const activeMat = MATERIALS.find(m => m.id === selectedMat);

  const inputStyle = {
    width: "100%",
    padding: "10px 14px",
    background: "#1a1a2e",
    border: "1px solid #3a3a5c",
    borderRadius: "6px",
    color: "#e8e8f0",
    fontSize: "15px",
    outline: "none",
    boxSizing: "border-box",
  };

  const labelStyle = {
    display: "block",
    fontSize: "11px",
    fontWeight: "700",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: "#7878a0",
    marginBottom: "6px",
  };

  const unitStyle = {
    position: "absolute",
    right: "12px",
    top: "50%",
    transform: "translateY(-50%)",
    color: "#5a5a7a",
    fontSize: "13px",
    pointerEvents: "none",
  };

  const sectionTitle = (label) => (
    <div style={{
      fontSize: "10px", fontWeight: "700", letterSpacing: "0.12em",
      textTransform: "uppercase", color: "#6060a0",
      marginBottom: "14px", borderBottom: "1px solid rgba(255,255,255,0.05)",
      paddingBottom: "8px",
    }}>{label}</div>
  );

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0d0d1a 0%, #12122a 50%, #0d0d1a 100%)",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "32px 16px", fontFamily: "'Georgia', serif",
    }}>
      <div style={{ width: "100%", maxWidth: "540px" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "36px" }}>
          <div style={{
            display: "inline-block",
            background: "linear-gradient(135deg, #4040a0, #8050d0)",
            borderRadius: "12px", padding: "12px 16px", marginBottom: "14px",
          }}>
            <span style={{ fontSize: "28px" }}>📦</span>
          </div>
          <h1 style={{ margin: 0, fontSize: "24px", fontWeight: "700", color: "#e8e8f0", letterSpacing: "-0.02em" }}>
            Calcolatore Volume & Costo
          </h1>
          <p style={{ margin: "6px 0 0", color: "#5a5a7a", fontSize: "13px" }}>
            Oggetto inscritto nel parallelepipedo · Costo al cm³
          </p>
        </div>

        {/* Card */}
        <div style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: "16px", padding: "28px",
        }}>

          {/* MATERIALE */}
          <div style={{ marginBottom: "24px" }}>
            {sectionTitle("Seleziona Materiale")}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px" }}>
              {MATERIALS.map(mat => {
                const active = selectedMat === mat.id;
                return (
                  <button
                    key={mat.id}
                    onClick={() => handleSelectMat(mat)}
                    style={{
                      background: active
                        ? `linear-gradient(135deg, ${mat.color}33, ${mat.color}18)`
                        : "rgba(255,255,255,0.03)",
                      border: active ? `2px solid ${mat.color}` : "2px solid #2a2a4a",
                      borderRadius: "8px",
                      padding: "10px 8px",
                      cursor: "pointer",
                      textAlign: "center",
                      transition: "all 0.15s",
                    }}
                  >
                    <div style={{
                      width: "10px", height: "10px", borderRadius: "50%",
                      background: mat.color, margin: "0 auto 6px",
                      boxShadow: active ? `0 0 10px ${mat.color}` : "none",
                    }} />
                    <div style={{
                      color: active ? "#e8e8f0" : "#7070a0",
                      fontWeight: "700", fontSize: "13px", fontFamily: "Arial, sans-serif",
                    }}>{mat.name}</div>
                    <div style={{ color: "#5a5a7a", fontSize: "10px", marginTop: "2px", fontFamily: "Arial, sans-serif" }}>
                      {mat.desc}
                    </div>
                    <div style={{
                      color: active ? mat.color : "#4a4a6a",
                      fontSize: "11px", fontWeight: "700", marginTop: "5px", fontFamily: "Arial, sans-serif",
                    }}>
                      €{mat.costo.toFixed(3).replace(".", ",")}/cm³
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* COSTO */}
          <div style={{ marginBottom: "24px" }}>
            {sectionTitle("Costo per cm³")}
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{ position: "relative", flex: 1 }}>
                <span style={{
                  position: "absolute", left: "12px", top: "50%",
                  transform: "translateY(-50%)", color: "#5a5a7a", fontSize: "13px",
                }}>€</span>
                <input
                  type="number" min="0" step="0.001"
                  value={costoCC}
                  onChange={(e) => { setCostoCC(e.target.value); setSelectedMat(null); }}
                  placeholder="0,000"
                  style={{ ...inputStyle, paddingLeft: "28px", paddingRight: "50px" }}
                />
                <span style={unitStyle}>/cm³</span>
              </div>
              {activeMat && (
                <div style={{
                  display: "flex", alignItems: "center", gap: "6px",
                  background: `${activeMat.color}22`,
                  border: `1px solid ${activeMat.color}55`,
                  borderRadius: "6px", padding: "8px 10px",
                  whiteSpace: "nowrap",
                }}>
                  <div style={{
                    width: "8px", height: "8px", borderRadius: "50%",
                    background: activeMat.color,
                  }} />
                  <span style={{ color: activeMat.color, fontSize: "12px", fontWeight: "700", fontFamily: "Arial, sans-serif" }}>
                    {activeMat.name}
                  </span>
                </div>
              )}
            </div>
            <p style={{ color: "#4a4a6a", fontSize: "11px", margin: "6px 0 0", fontFamily: "Arial, sans-serif" }}>
              Seleziona un materiale per preimpostare il costo, oppure inseriscilo manualmente.
            </p>
          </div>

          {/* DIMENSIONI */}
          <div style={{ marginBottom: "24px" }}>
            {sectionTitle("Dimensioni Parallelepipedo")}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px" }}>
              {[
                { label: "Larghezza",  val: larghezza,  set: setLarghezza },
                { label: "Altezza",    val: altezza,    set: setAltezza },
                { label: "Profondità", val: profondita, set: setProfondita },
              ].map(({ label, val, set }) => (
                <div key={label}>
                  <label style={labelStyle}>{label}</label>
                  <div style={{ position: "relative" }}>
                    <input
                      type="number" min="0" step="0.1"
                      value={val}
                      onChange={(e) => set(e.target.value)}
                      placeholder="0"
                      style={inputStyle}
                    />
                    <span style={unitStyle}>mm</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FATTORE */}
          <div style={{ marginBottom: "28px" }}>
            {sectionTitle("Fattore di Riempimento")}
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <input
                type="range" min="1" max="100" value={fattore}
                onChange={(e) => setFattore(e.target.value)}
                style={{ flex: 1, accentColor: "#7060d0" }}
              />
              <div style={{ position: "relative", width: "90px" }}>
                <input
                  type="number" min="1" max="100"
                  value={fattore}
                  onChange={(e) => setFattore(e.target.value)}
                  style={{ ...inputStyle, paddingRight: "28px" }}
                />
                <span style={unitStyle}>%</span>
              </div>
            </div>
          </div>

          {/* RISULTATI */}
          <div style={{
            background: "linear-gradient(135deg, rgba(64,64,160,0.2), rgba(128,80,208,0.15))",
            border: "1px solid rgba(100,80,180,0.3)",
            borderRadius: "12px", padding: "20px",
          }}>
            <div style={{
              fontSize: "10px", fontWeight: "700", letterSpacing: "0.12em",
              textTransform: "uppercase", color: "#8080c0", marginBottom: "14px",
            }}>Risultati</div>

            <div style={{ display: "grid", gap: "8px" }}>
              {[
                { label: "Vol. parallelepipedo", value: fmt(volParallele / 1000, 4), unit: "cm³" },
                { label: `Vol. oggetto (${fmt(F, 0)}%)`, value: fmt(volOggettoCC, 4), unit: "cm³" },
              ].map(({ label, value, unit }) => (
                <div key={label} style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  padding: "8px 0", borderBottom: "1px solid rgba(255,255,255,0.04)",
                }}>
                  <div style={{ color: "#9090b0", fontSize: "13px", fontFamily: "Arial, sans-serif" }}>{label}</div>
                  <div style={{ color: "#c8c8e8", fontSize: "14px", fontWeight: "600", fontFamily: "Arial, sans-serif" }}>
                    {value} <span style={{ fontSize: "11px", color: "#6060a0" }}>{unit}</span>
                  </div>
                </div>
              ))}

              {/* Costo totale */}
              <div style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                marginTop: "10px", padding: "14px 16px",
                background: C > 0 && volOggettoCC > 0
                  ? (activeMat ? `${activeMat.color}22` : "rgba(128,80,208,0.2)")
                  : "rgba(40,40,60,0.4)",
                borderRadius: "8px",
                border: C > 0 && volOggettoCC > 0
                  ? (activeMat ? `1px solid ${activeMat.color}55` : "1px solid rgba(128,80,208,0.3)")
                  : "1px solid rgba(60,60,80,0.3)",
                transition: "all 0.3s",
              }}>
                <div style={{ fontFamily: "Arial, sans-serif" }}>
                  <div style={{ color: "#b0a0e0", fontSize: "14px", fontWeight: "700" }}>Costo Totale</div>
                  {activeMat && C > 0 && (
                    <div style={{ color: "#5a5a7a", fontSize: "11px", marginTop: "2px" }}>
                      Materiale: {activeMat.name}
                    </div>
                  )}
                </div>
                <div style={{
                  color: C > 0 && volOggettoCC > 0
                    ? (activeMat ? activeMat.color : "#c0a0ff")
                    : "#3a3a5a",
                  fontSize: "24px", fontWeight: "700",
                  letterSpacing: "-0.03em", fontFamily: "Arial, sans-serif",
                  transition: "color 0.3s",
                }}>
                  {C > 0 && volOggettoCC > 0 ? `€ ${fmt(costoTotale)}` : "—"}
                </div>
              </div>
            </div>
          </div>
        </div>

        <p style={{
          textAlign: "center", color: "#3a3a5a",
          fontSize: "11px", marginTop: "18px", fontFamily: "Arial, sans-serif",
        }}>
          Dimensioni in mm · Volume convertito in cm³ automaticamente
        </p>
      </div>
    </div>
  );
}
