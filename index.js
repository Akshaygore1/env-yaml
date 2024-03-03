console.log("hello world");

// Wait for the DOM content to be loaded
document.addEventListener("DOMContentLoaded", function () {
	const textArea = document.querySelector(".textarea");
	const generateButton = document.querySelector("button");

	generateButton.addEventListener("click", function () {
		const textAreaValue = textArea.value;

		const lines = textAreaValue.split("\n");

		const convertedArray = [];

		lines.forEach((line) => {
			const parts = line.split("=");
			if (parts.length === 2) {
				const name = parts[0].trim();
				const value = parts[1].trim();

				const obj = {
					name: name,
					value: value,
				};

				convertedArray.push(obj);
			}
		});

		const outputText = convertedArray
			.map((obj) => `- name: ${obj.name}\n  value: '${obj.value}'`)
			.join("\n");

		document.getElementById("result").value = outputText;
	});

	document
		.getElementById("copyButton")
		.addEventListener("click", copyToClipboard);

	function copyToClipboard() {
		const copyText = document.getElementById("result");
		copyText.select();
		copyText.setSelectionRange(0, 99999);
		document.execCommand("copy");
	}
});
