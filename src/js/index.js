document.addEventListener("DOMContentLoaded", function () {
	const form = document.querySelector(".form");
	const input = document.getElementById("description");
	const btn = document.querySelector(".btn");
	const htmlCode = document.querySelector(".html-code");
	const cssCode = document.querySelector(".css-code");
	const preview = document.querySelector(".preview-area");

	function setLoading(isLoading) {
		btn.innerHTML = isLoading ? `Gerando Background...` : "Gerar Background";
	}

	form.addEventListener("submit", async function (e) {
		e.preventDefault();
		const description = input.value.trim();
		if (!description) {
			return;
		}
		setLoading(true);

		try {
			const response = await fetch("https://n8n.srv830193.hstgr.cloud/webhook-test/4096b767-f3fb-4244-bb3c-2df7994c2262", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ description }),
			});
			
			const data = await response.json();

			htmlCode.textContent = data.code || "";
			cssCode.textContent = data.style || "";

			preview.style.display = "block";
			preview.innerHTML = data.code || "";

			// Remove estilos antigos
			let styleTag = document.getElementById("dynamic-style");
			if (styleTag) styleTag.remove();
			if (data.style) {
				styleTag = document.createElement("style");
				styleTag.id = "dynamic-style";
				styleTag.textContent = data.style;
				document.head.appendChild(styleTag);
			}
		} catch (err) {
			console.error("Erro ao gerar o fundo:", err);
			htmlCode.textContent = "Não consegui gerar o fundo. Tente novamente.";
			cssCode.textContent = "/* CSS gerado aparece aqui */";
			preview.innerHTML = "";
		} finally {
			setLoading(false);
		}
	});
});
