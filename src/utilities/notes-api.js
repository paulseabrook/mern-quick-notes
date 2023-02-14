export async function getNotes() {
  const res = await fetch('http://localhost:3001/notes');
  if (res.ok) {
    console.log(res.json);
  } else {
    return null;
  }
}
