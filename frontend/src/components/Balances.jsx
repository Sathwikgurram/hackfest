import React, { useEffect, useState } from 'react'
import { api } from '../api'

export default function Balances({ group }){
  const [balances, setBalances] = useState(null)
  const [members, setMembers] = useState([])

  useEffect(()=>{ if(group) load() },[group])

  async function load(){
    try{
      const [data, mem] = await Promise.all([api.groupBalances(group.id), api.listMembers(group.id)])
      setBalances(data)
      setMembers(mem)
    }catch(e){ alert(e.message) }
  }

  function nameFor(id){
    const m = members.find(x=>x.id===id)
    return m ? m.name : id
  }

  function renderDerivedNets(settlements){
    const map = {}
    for(const s of settlements){
      const amt = Number(s.amount) || 0
      map[s.from] = (map[s.from] || 0) - amt
      map[s.to] = (map[s.to] || 0) + amt
    }

    return Object.keys(map).map(id => (
      <tr key={id}><td>{nameFor(id)}</td><td>{map[id].toFixed(2)}</td></tr>
    ))
  }

  if(!group) return <div className="small">No group selected</div>

  return (
    <div>
      <h3>Balances — {group.name}</h3>
      <div>
        <button onClick={load}>Refresh</button>
      </div>
      <div style={{marginTop:12}}>
        {balances && balances.length > 0 ? (
          balances[0].hasOwnProperty('from') && balances[0].hasOwnProperty('to') ? (
            <div>
              <h4>Suggested Settlements</h4>
              <table>
                <thead><tr><th>From</th><th>To</th><th>Amount</th></tr></thead>
                <tbody>
                  {balances.map((s,i)=> (
                    <tr key={i}><td>{nameFor(s.from)}</td><td>{nameFor(s.to)}</td><td>{Number(s.amount).toFixed(2)}</td></tr>
                  ))}
                </tbody>
              </table>

              <h4 style={{marginTop:12}}>Net per member (derived)</h4>
              <table>
                <thead><tr><th>Member</th><th>Net</th></tr></thead>
                <tbody>
                  {renderDerivedNets(balances)}
                </tbody>
              </table>
            </div>
            ) : (
            <table>
              <thead><tr><th>Member</th><th>Net</th></tr></thead>
              <tbody>
                {balances.map(b=> (
                  <tr key={b.member_id}><td>{nameFor(b.member_id)}</td><td>{typeof b.net === 'number' ? b.net.toFixed(2) : b.net}</td></tr>
                ))}
              </tbody>
            </table>
          )
        ) : <div className="small">No balances yet</div>}
      </div>
    </div>
  )
}

