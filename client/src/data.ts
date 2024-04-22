type Entry = {
  runId?: number;
  date: string;
  distance: string;
  time: string;
  weather: string;
};

async function readEntries() {
  try {
    const res = await fetch('/api/runs');
    if (!res.ok) throw new Error('response connection not okay');
    const result = await res.json();
    return result;
  } catch (err) {
    console.log(err);
  }
}

async function readEntry(runId: number) {
  try {
    const res = await fetch('/api/runs/:runId');
    if (!res.ok) throw new Error('response connection not okay');
    const result = await res.json();
    return result;
  } catch (err) {
    console.log(err);
  }
}

async function addEntry(entry: Entry) {
  try {
    const res = await fetch('/api/runs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(entry),
    });
    if (!res.ok) throw new Error('Response connection not OK');
  } catch (err) {
    console.log(err);
  }
}
