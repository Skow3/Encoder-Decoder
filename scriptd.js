/*CREATED BY : SHIVAM KUMAR ROLL NO: 230103044
  STARTED ON : 7th Sept 11:00 a.m
  COMPLETED ON: 9th Sept 8:15 p.m
  JAVASCRIPT FILE DECODER
*/
document.getElementById("decodeForm").addEventListener("submit", function(event) {
            event.preventDefault();

            const encodedText = document.getElementById("encodedText").value;
            const decodingScheme = document.getElementById("decodingScheme").value;
            let decoded = "";
            let stepsArray = [];

            switch (decodingScheme) {
                case "base32":
                    decoded = base32Decode(encodedText);
                    stepsArray = base32Steps;
                    break;
                case "base64":
                    decoded = base64Decode(encodedText);
                    stepsArray = base64Steps;
                    break;
                case "ascii85":
                    decoded = ascii85Decode(encodedText);
                    stepsArray = ascii85Steps;
                    break;
                default:
                    alert("INVALID INPUT");
            }

            document.getElementById("output").textContent = `Decoded Text: ${decoded}`;
            displaySteps(stepsArray);
        });

        function displaySteps(steps) {
            const stepsContainer = document.getElementById("steps");
            stepsContainer.innerHTML = "STEPS: <br>";

            steps.forEach((step, index) => {
                setTimeout(() => {
                    stepsContainer.innerHTML += `${step}<br>`;
                }, index * 600); 
            });
        }

        let base64Steps = [];
        function base64Decode(str) {
            const base64Chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
            let binStr = "";
            let decStr = "";
            base64Steps = [];

            for (let i = 0; i < str.length; i++) {
                let char = str[i];
                let decimal = base64Chars.indexOf(char);
                let bin = decimal.toString(2).padStart(6, '0');
                binStr += bin;
                base64Steps.push(`Base64 Char '${char}' -> Decimal: ${decimal} -> 6-bit binary: ${bin}`);
            }

            for (let j = 0; j < binStr.length; j += 8) {
                let chunk = binStr.substring(j, j + 8);
                let ascii = parseInt(chunk, 2);
                decStr += String.fromCharCode(ascii);
                base64Steps.push(`8-bit binary chunk: ${chunk} -> ASCII: ${ascii} -> Character: '${String.fromCharCode(ascii)}'`);
            }

            return decStr;
        }

        let base32Steps = [];
        function base32Decode(str) {
            const base32Chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
            let binStr = "";
            let decStr = "";
            base32Steps = [];

            for (let i = 0; i < str.length; i++) {
                let char = str[i];
                let decimal = base32Chars.indexOf(char);
                let bin = decimal.toString(2).padStart(5, '0');
                binStr += bin;
                base32Steps.push(`Base32 Char '${char}' -> Decimal: ${decimal} -> 5-bit binary: ${bin}`);
            }

            for (let j = 0; j < binStr.length; j += 8) {
                let chunk = binStr.substring(j, j + 8);
                let ascii = parseInt(chunk, 2);
                decStr += String.fromCharCode(ascii);
                base32Steps.push(`8-bit binary chunk: ${chunk} -> ASCII: ${ascii} -> Character: '${String.fromCharCode(ascii)}'`);
            }

            return decStr.replace(/=+$/, '');
        }

        let ascii85Steps = [];
        

function ascii85Decode(encodedText) {
    const base85Chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!#$%&'()*+,-./:;<=>?@[]^_`{|}~";
    let decodedText = '';
    let k = 0;
    let count = 0;
    ascii85Steps = [];

    for (let i = 0; i < encodedText.length; i++) {
        let char = encodedText[i];
        k = k * 85 + (base85Chars.indexOf(char) - 33); 
        count++;
        ascii85Steps.push(`Encoded Char '${char}' -> Value: ${base85Chars.indexOf(char)} -> k: ${k}`);

        if (count === 5) {
            decodedText += decodeBlock(k, 4);
            k = 0;
            count = 0;
        }
    }

    if (count > 0) {
        for (let i = 0; i < 5 - count; i++) {
            k = k * 85 + (84); 
        }
        decodedText += decodeBlock(k, count - 1);
    }

    return decodedText;

    function decodeBlock(k, byteCount) {
        let block = '';
        for (let i = 3; i >= 0; i--) {
            const byte = (k >> (i * 8)) & 0xFF;
            block += String.fromCharCode(byte);
            ascii85Steps.push(`Extracted 8-bit byte: ${byte} -> Character: '${String.fromCharCode(byte)}'`);
        }
        return block.substring(0, byteCount);
    }
}
