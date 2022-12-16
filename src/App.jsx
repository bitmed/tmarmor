import { useState, useEffect } from 'react'
import './App.css'
import Select from 'react-select'

function App() {
  const [metalType, setMetalType] = useState('single');
  const [armorType, setArmorType] = useState('');

  const [metal1, setMetal1] = useState(null);
  const [metal2, setMetal2] = useState(null);

  const [costo, setCosto] = useState('');
  const [istruzioni, setIstruzioni] = useState('');
  const [bonus, setBonus] = useState('');

  useEffect(() => {
    if( (metalType == 'single' && metal1 != null)
     || (metalType == 'multi' && metal1 != null && metal2 != null) )
      computeCost(armorType.ningots);
    else {
      setCosto('');
      setIstruzioni('');
      setBonus('');
    }
  }, [metal1, metal2, metalType, armorType]);

  const armorTypes = [
    { value: 'mail', label: 'Maglia', ningots: 76 },
    { value: 'ring', label: 'Anelli', ningots: 72},
    { value: 'plate', label: 'Piastre', ningots: 93},
    { value: 'berserker', label: 'Berserker', ningots: 77}
  ];

  const metals = [
    { label: 'Orialkon', value: 'Orialkon', res: ['magico', 'magia', 'etereo'], blood: 'etereo', color: '#8b734a', magres: 'magico' },
    { label: 'Pirite', value: 'Pirite', res: ['fuoco', 'incandescente'], blood: 'incandescente', color: '#832008', magres: 'fuoco' },
    { label: 'Ossidiana', value: 'Ossidiana', res: ['veleno', 'venefico'], blood: 'venefico', color: '#41736a', magres: 'veleno' },
    { label: 'Azurite', value: 'Azurite', res: ['freddo', 'acqua', 'ghiaccio', 'glaciale'], blood: 'glaciale', color: '#397b9c', magres: 'freddo' },
    { label: 'Titanio', value: 'Titanio', res: ['malefico', 'demoniaco'], blood: 'demoniaco', color: '#393939', magres: 'male' },
    { label: 'Merkite', value: 'Merkite', res: ['psionico', 'mente', 'illithid'], blood: 'illithid', color: '#83418b', magres: 'psionico' },
    { label: 'Valorium', value: 'Valorium', res: ['energia','elettric', 'titanico'], blood: 'titanico', color: '#c58b20', magres: 'energia' },
    { label: 'Talavholk', value: 'Talavholk', res: ['sacro', 'bene', 'iridescente', 'thalavolk', 'thalavholk'], blood: 'iridescente', color: '#6a5a73', magres: 'sacro' },
    { label: 'Adamantio', value: 'Adamantio', res: ['fisico', 'stabile', 'ar'], blood: 'stabile', color: '#f6eede', magres: '', extra: 'AR migliorata', extraLong: 'AR migliorata' },
    { label: 'Ithilmar', value: 'Ithilmar', res: ['leggerezza', 'volatile', 'itilmar'], blood: 'volatile', color: '#7b94a4', magres: '', extra: 'leggerezza', extraLong: 'Peso totale minore' },
  ];

  const filterOptions1 = (option, inputValue) => {
    const iv = inputValue.toLowerCase();
    if(metal2 != null && metal2.label == option.label) return false;
    return  option.label.toLowerCase().indexOf(iv) != -1 || option.data.res.find( v => v.toLowerCase().indexOf(iv) != -1 );
  }
  const filterOptions2 = (option, inputValue) => {
    const iv = inputValue.toLowerCase();
    if(metal1 != null && metal1.label == option.label) return false;
    return option.label.toLowerCase().indexOf(iv) != -1 || option.data.res.find( v => v.toLowerCase().indexOf(iv) != -1 );
  }
  const formatOptionLabel = ({ value, label, customAbbreviation }) => {
    const m = metals.find(item => item.value == value);
    return (<div style={{ display: "flex", alignItems:'center' }}>
      <div style={{width: '10px', height: '10px', backgroundColor: m.color, marginRight: '5px'}}></div>
      <div>{label}</div>
      <div style={{ marginLeft: "10px", color: "#777", fontSize: '90%' }}>
        {m.magres != '' ? 'Res: ' + m.magres : m.extra}
      </div>
    </div>
  )};

  const computeCost = function(totalIngots) {
    //let totalIngots = 80;

    let costStr = '';
    let istrStr = '';
    let bonusStr = '';
    if(metalType == 'single') {
      costStr += totalIngots + ' lingotti di ' + metal1.label + '<br>' + Math.ceil((totalIngots / 5)) + ' sangue ' + metal1.blood + '<br>';
      istrStr = `<li>Vai da un <strong>Alchimista</strong> e fai infondere i lingotti di ${metal1.label} con il sangue ${metal1.blood}</li>
                <li>Vai da un <strong>Fabbro</strong> e fatti forgiare l'armatura!</li>`;
      if(metal1.magres != '') bonusStr = 'Resistenza '+metal1.magres+' 42%';
      else bonusStr = metal1.extraLong;
    }
    if(metalType == 'multi') {
      let tmpIng = Math.ceil(totalIngots / 2);
      costStr += tmpIng + ' lingotti di ' + metal1.label + '<br>' + Math.ceil((tmpIng / 5)) + ' sangue ' + metal1.blood + '<br>';
      costStr += tmpIng + ' lingotti di ' + metal2.label + '<br>' + Math.ceil((tmpIng / 5)) + ' sangue ' + metal2.blood + '<br>';
      costStr += tmpIng + ' lingotti d\'oro';
      istrStr = `<li>Vai da un <strong>Alchimista</strong>, fai infondere i lingotti di ${metal1.label} con il sangue ${metal1.blood} e i lingotti di ${metal2.label} con il sangue ${metal2.blood}</li>
                <li>Vai da un <strong>Minatore</strong> e fai creare i lingotti della lega ${metal1.label} - ${metal2.label} infusa</li>
                <li>Vai da un <strong>Fabbro</strong> e fai forgiare l'armatura!</li>`;

      if(metal1.magres != '') bonusStr = 'Resistenza '+metal1.magres+' 24%, ';
      else bonusStr = metal1.extraLong+', ';
      if(metal2.magres != '') bonusStr += 'Resistenza '+metal2.magres+' 24%';
      else bonusStr += metal2.extraLong;
    }
    setCosto(costStr);
    setIstruzioni(istrStr);
    setBonus(bonusStr);
  }

  return (
    <div className="App">
      <h1>Armature metalliche infuse</h1>
      <div className="disclaimer">(Se vuoi farti realizzare un'armatura in metallo non infuso stai sbagliando qualcosa)</div>
      <div className="type-select">
        <div>Seleziona il tipo di armatura</div>
        <div style={{marginBottom: '36px'}}><Select options={armorTypes} onChange={(newVal) => setArmorType(newVal)} /></div>

        {armorType != '' && <><div>Seleziona se vuoi creare un'armatura di un singolo metallo puro o di una lega:</div>
        <label><input type="radio" name="armortype" value="single" checked={metalType == 'single'} 
          onChange={(ev) => {
            setMetal2(null);
            setMetalType('single');
          }} />Singolo metallo</label>
        <label><input type="radio" name="armortype" value="multi" checked={metalType == 'multi'} 
          onChange={(ev) => {
            setMetalType('multi')
          }} />Lega</label>
        </>}
      </div>
    
      {armorType != '' && <div className="card">
        <div>Seleziona { metalType == 'single' ? 'il metallo' : 'i due metalli per la lega'}</div>
        <Select className={'metal-select'} value={metal1} 
          options={metals} 
          filterOption={filterOptions1}
          onChange={(newVal) => setMetal1(newVal)}
          formatOptionLabel={formatOptionLabel} />

        {metalType == 'multi' && <Select className={'metal-select'} value={metal2} 
          options={metals} 
          filterOption={filterOptions2}
          onChange={(newVal) => setMetal2(newVal)}
          formatOptionLabel={formatOptionLabel} />}
      </div>}

      {bonus != '' && <div style={{marginTop: '46px'}}><strong>Bonus: </strong>{bonus}</div>}

      {costo != '' && <div className="result"><h3>Risorse necessarie</h3><div dangerouslySetInnerHTML={{__html: costo}}></div></div>}
      {istruzioni != '' && <div className="result"><h3>Istruzioni</h3><ol dangerouslySetInnerHTML={{__html: istruzioni}}></ol></div>}
    </div>
  )
}

export default App
