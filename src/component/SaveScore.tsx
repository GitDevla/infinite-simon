function SaveScore(name: string, score: number) {
  fetch("http://localhost:3001/save-score", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ player: name, score }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        console.log("Score saved!");
      } else {
        console.error("Failed to save:", data.error);
      }
    })
    .catch((err) => console.error("Error:", err));
}

export default SaveScore;