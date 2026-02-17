const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:3000'

async function request(path, opts = {}) {
  const res = await fetch(API_BASE + path, {
    headers: { 'Content-Type': 'application/json' },
    ...opts,
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(text || res.statusText)
  }
  return res.json()
}

export const api = {
  // groups
  listGroups: () => request('/group'),
  createGroup: (body) => request('/group', { method: 'POST', body: JSON.stringify(body) }),
  deleteGroup: (id) => request(`/group/${id}`, { method: 'DELETE' }),
  // members
  listMembers: (groupId) => request(`/member/${groupId}`),
  createMember: (body) => request('/member', { method: 'POST', body: JSON.stringify(body) }),
  // events
  listEvents: (groupId) => request(`/event/group/${groupId}`),
  createEvent: (body) => request('/event', { method: 'POST', body: JSON.stringify(body) }),
  // expenses
  listExpensesForEvent: (eventId) => request(`/expense/event/${eventId}`),
  createExpense: (body) => request('/expense', { method: 'POST', body: JSON.stringify(body) }),
  // balances
  groupBalances: (groupId) => request(`/balance/group/${groupId}`),
  // settlements
  listSettlements: (groupId) => request(`/settlement/group/${groupId}`),
  createSettlement: (body) => request('/settlement', { method: 'POST', body: JSON.stringify(body) }),
}

export default api
