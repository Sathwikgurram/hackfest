import React, { useEffect, useState } from 'react'
import { api } from '../api'

export default function Settlements({ group }){
  const [list, setList] = useState([])
  const [fromMember, setFromMember] = useState('')
  const [toMember, setToMember] = useState('')
  const [amount, setAmount] = useState('')
  const [members, setMembers] = useState([])

  useEffect(()=>{ if(group) load() },[group])

  async function load(){
    try{ const s = await api.listSettlements(group.id); setList(s); const m = await api.listMembers(group.id); setMembers(m) }catch(e){ alert(e.message) }
  }

  async function submit(){
    if(!fromMember || !toMember || !amount) return alert('fill fields')
    try{ await api.createSettlement({ from_member: fromMember, to_member: toMember, amount: Number(amount), group_id: group.id }); setAmount(''); setFromMember(''); setToMember(''); load() }catch(e){ alert(e.message) }
  }

  if(!group) return <div className="small">No group selected</div>

  return (
    <div>
      <h3>Settlements — {group.name}</h3>
      <div>
        <select value={fromMember} onChange={e=>setFromMember(e.target.value)}>
          <option value="">From</option>
          {members.map(m=> <option key={m.id} value={m.id}>{m.name}</option>)}
        </select>
        <select value={toMember} onChange={e=>setToMember(e.target.value)}>
          <option value="">To</option>
          {members.map(m=> <option key={m.id} value={m.id}>{m.name}</option>)}
        </select>
        <input placeholder="Amount" value={amount} onChange={e=>setAmount(e.target.value)} />
        <button onClick={submit}>Record Payment</button>
      </div>

      <div style={{marginTop:12}}>
        <h4>Payments</h4>
        <table>
          <thead><tr><th>From</th><th>To</th><th>Amount</th></tr></thead>
          <tbody>
            {list.map(s=> (
              <tr key={s.id}><td>{(members.find(m=>m.id===s.from_member)||{}).name || s.from_member}</td><td>{(members.find(m=>m.id===s.to_member)||{}).name || s.to_member}</td><td>{s.amount}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
