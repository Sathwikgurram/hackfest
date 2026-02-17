import React, { useEffect, useState } from 'react'
import { api } from '../api'

// Simple expenses UI: choose event, add custom-split expense
export default function Expenses({ group }){
  const [events, setEvents] = useState([])
  const [eventId, setEventId] = useState('')
  const [amount, setAmount] = useState('')
  const [paidBy, setPaidBy] = useState('')
  const [members, setMembers] = useState([])
  const [participants, setParticipants] = useState([])

  useEffect(()=>{ if(group) load() },[group])

  async function load(){
    try{
      const ev = await api.listEvents(group.id)
      setEvents(ev)
      const mem = await api.listMembers(group.id)
      setMembers(mem)
    }catch(e){ alert(e.message) }
  }

  function toggleParticipant(id){
    if(participants.find(p=>p.member_id===id)){
      setParticipants(participants.filter(p=>p.member_id!==id))
    } else {
      setParticipants([...participants, { member_id: id, share: 0 }])
    }
  }

  function setShare(id, value){
    setParticipants(participants.map(p=> p.member_id===id ? { ...p, share: Number(value) } : p))
  }

  async function submit(){
    if(!eventId) return alert('select event')
    const parsed = Number(amount)
    if(isNaN(parsed) || parsed<=0) return alert('invalid amount')
    try{
      await api.createExpense({ amount: parsed, paid_by: paidBy, event_id: eventId, participants })
      alert('Expense added')
      setAmount('')
      setParticipants([])
    }catch(e){ alert(e.message) }
  }

  if(!group) return <div className="small">No group selected</div>

  return (
    <div>
      <h3>Expenses — {group.name}</h3>
      <div>
        <select value={eventId} onChange={e=>setEventId(e.target.value)}>
          <option value="">Select event</option>
          {events.map(ev=> <option key={ev.id} value={ev.id}>{ev.title}</option>)}
        </select>
        <input placeholder="Amount" value={amount} onChange={e=>setAmount(e.target.value)} />
        <select value={paidBy} onChange={e=>setPaidBy(e.target.value)}>
          <option value="">Paid by</option>
          {members.map(m=> <option key={m.id} value={m.id}>{m.name}</option>)}
        </select>
        <div style={{marginTop:8}}>
          <div className="small">Select participants and assign shares (shares must sum to amount)</div>
          {members.map(m=> (
            <div key={m.id} style={{display:'flex',gap:8, alignItems:'center', marginTop:6}}>
              <input type="checkbox" checked={!!participants.find(p=>p.member_id===m.id)} onChange={()=>toggleParticipant(m.id)} />
              <div style={{flex:1}}>{m.name}</div>
              {participants.find(p=>p.member_id===m.id) && (
                <input placeholder="share" className="small" style={{width:100}} type="number" onChange={e=>setShare(m.id,e.target.value)} />
              )}
            </div>
          ))}
        </div>
        <div style={{marginTop:8}}>
          <button onClick={submit}>Add Expense</button>
        </div>
      </div>

      <div style={{marginTop:12}}>
        <h4>Event Expenses</h4>
        {eventId ? <EventExpenses eventId={eventId} members={members} /> : <div className="small">Pick an event to view expenses</div>}
      </div>
    </div>
  )
}

function EventExpenses({ eventId, members }){
  const [list, setList] = useState([])
  useEffect(()=>{ if(eventId) load() },[eventId])
  async function load(){ try{ const data = await api.listExpensesForEvent(eventId); setList(data) }catch(e){ alert(e.message) } }

  function nameFor(id){
    const m = members.find(x=>x.id===id)
    return m ? m.name : id
  }

  return (
    <div>
      <table>
        <thead><tr><th>Amount</th><th>Paid by</th><th>Participants</th></tr></thead>
        <tbody>
          {list.map(x=> (
            <tr key={x.id}>
              <td>{x.amount}</td>
              <td>{nameFor(x.paid_by)}</td>
              <td>{(x.expense_participants || []).map(p=> `${nameFor(p.member_id)}:${p.share_amount}`).join(', ')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
