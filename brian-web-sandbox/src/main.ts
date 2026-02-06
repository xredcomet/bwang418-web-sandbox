import { marked } from 'marked';

async function renderPage() {
  const app = document.querySelector<HTMLDivElement>('#app')!;

  try {
    // 1. Fetch the file from the public folder
    const response = await fetch('/landing.md');
    
    if (!response.ok) throw new Error('Failed to load markdown file');

    // 2. Turn the raw response into text
    const text = await response.text();

    // 3. Convert to HTML and inject
    app.innerHTML = `
      <div class="content-wrapper">
        ${await marked.parse(text)}
      </div>
    `;
    
  } catch (error) {
    app.innerHTML = `<p style="color: red;">Error: ${error}</p>`;
  }
}

renderPage();