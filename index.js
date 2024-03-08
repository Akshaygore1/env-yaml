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
		const lines = document.getElementById("result").value.split("\n");
		const outputText = [];

		const result = [];
		lines.forEach((line) => {
			const nameValueObj = {};
			const parts = line.split(":");
			const key = parts[0].trim("");
			let value = parts.slice(1).join(":").trim();
			value = value.replace(/'/g, "").trim();
			nameValueObj[key] = value;
			result.push(nameValueObj);
		});

		for (let i = 0; i < result.length; i += 2) {
			if (i + 1 < result.length) {
				const name = Object.values(result[i])[0];
				const value = Object.values(result[i + 1])[0];
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
