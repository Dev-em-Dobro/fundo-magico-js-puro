document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('.form');
  const input = document.getElementById('description');
  const btn = document.querySelector('.btn');
  const htmlCode = document.querySelector('.html-code');
  const cssCode = document.querySelector('.css-code');
  const preview = document.querySelector('.preview-area');


  // Habilita o input e o botão
  input.disabled = false;
  btn.disabled = false;

  function setLoading(isLoading) {
    btn.disabled = isLoading;
    btn.innerHTML = isLoading
      ? `<span class="loader"></span> Gerando Background...`
      : 'Gerar Background';
  }

  function showToast(msg, type = 'success') {
    // Simples toast
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = msg;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2500);
  }

  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    const description = input.value.trim();
    if (!description) {
      showToast('Por favor, descreva o background que você deseja gerar', 'error');
      return;
    }
    setLoading(true);

    showToast('Gerando fundo para o seu site...');
    try {
      const response = await fetch('https://n8n.srv830193.hstgr.cloud/webhook/4096b767-f3fb-4244-bb3c-2df7994c2262', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description }),
      });
      const data = await response.json();
      htmlCode.textContent = data.code || '';
      cssCode.textContent = data.style || '';

      preview.style.display = 'block';
      preview.innerHTML = data.code || '';
      // Remove estilos antigos
      let styleTag = document.getElementById('dynamic-style');
      if (styleTag) styleTag.remove();
      if (data.style) {
        styleTag = document.createElement('style');
        styleTag.id = 'dynamic-style';
        styleTag.textContent = data.style;
        document.head.appendChild(styleTag);
      }
      showToast('Background gerado com sucesso!', 'success');
    } catch (err) {
      showToast('Falha ao gerar o background. Tente novamente.', 'error');
    } finally {
      setLoading(false);
    }
  });
});
