export type Entry = {
  runId?: number | undefined;
  date: string;
  distance: string;
  time: string;
  weather: string;
};

export async function readEntries(): Promise<Entry[]> {
  try {
    const res = await fetch('/api/runs');
    if (!res.ok) throw new Error('Response connection not OK');
    const result = await res.json();
    return result;
  } catch (err) {
    console.error(err);
    return [];
  }
}

export async function readEntry(runId: number): Promise<Entry | undefined> {
  try {
    const res = await fetch(`/api/runs/${runId}`);
    if (!res.ok) throw new Error('Response connection not OK');
    const result = await res.json();
    return result;
  } catch (err) {
    console.error(err);
    return undefined;
  }
}

export async function addEntry(entry: Entry): Promise<Entry | undefined> {
  try {
    const res = await fetch('/api/runs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(entry),
    });
    if (!res.ok) throw new Error('Response connection not OK');
    const result = await res.json();
    return result;
  } catch (err) {
    console.error(err);
    return undefined;
  }
}

export async function updateEntry(entry: Entry): Promise<Entry | undefined> {
  try {
    const res = await fetch(`/api/runs/${entry.runId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(entry),
    });
    if (!res.ok) throw new Error('Response connection not OK');
    const result = await res.json();
    return result;
  } catch (err) {
    console.error(err);
    return undefined;
  }
}

export async function removeEntry(runId: number): Promise<void> {
  try {
    const res = await fetch(`/api/runs/${runId}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Response connection not OK');
  } catch (err) {
    console.error(err);
  }
}

export async function likeEntry(runId: number): Promise<void> {
  try {
    const res = await fetch(`/api/runs/${runId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(entry),
    });
    if (!res.ok) throw new Error('Response connection not OK');
  } catch (err) {
    console.error(err);
  }
}
