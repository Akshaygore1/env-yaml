console.log("hello world");

// Wait for the DOM content to be loaded
document.addEventListener("DOMContentLoaded", function () {
	const textArea = document.querySelector(".textarea");
	const result = document.querySelector(".result");
	const generateButton = document.getElementById("generateButton");
	const generateButton2 = document.getElementById("generateButton2");

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
			.map((obj) => `- name: ${obj.name}\n  value: ${obj.value}`)
			.join("\n");

		document.getElementById("result").value = outputText;
	});

	generateButton2.addEventListener("click", function () {
		const inputLines = document.getElementById("result").value.split("\n");

		const convertedArray = [];

		inputLines.forEach((line) => {
			line = line.trim();

			if (line !== "") {
				const parts = line.split(":");

				if (parts.length === 2) {
					const name = parts[0].trim().substring(7);
					const value = parts[1].trim();
					const obj = {
						name: name,
						value: value,
					};

					convertedArray.push(obj);
				}
			}
		});

		const ExtractedValue = convertedArray.map((obj) => obj.value);
		const outputText = [];
		for (let i = 0; i < ExtractedValue.length; i += 2) {
			if (i + 1 < ExtractedValue.length) {
				const name = ExtractedValue[i];
				const value = ExtractedValue[i + 1];
				outputText.push(`${name} = ${value}\n`);
			}
		}

		document.getElementById("textarea").value = outputText.join("");
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
