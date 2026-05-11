export const fetchContent = async () => {
  try {
    const res = await fetch('/api/content');
    return await res.json();
  } catch (err) {
    return { success: false, data: {} };
  }
};

export const submitLead = async (data: any) => {
  const res = await fetch('/api/leads', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data)
  });
  return await res.json();
};
