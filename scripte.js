/*CREATED BY : SHIVAM KUMAR ROLL NO: 230103044
  STARTED ON : 7th Sept  11:00 a.m-->
  COMPLETED ON: 9th Sept 8:15 p.m
  JAVASCRIPT FILE ENCODER
*/
document.getElementById("encodeForm").addEventListener("submit", function(event) {
            event.preventDefault();

            const c = document.getElementById("a").value;
            const encodingScheme = document.getElementById("encodingScheme").value;
            let Encoded = "";
            let stepsArray = [];

            switch (encodingScheme) {
                case "base32":
                    Encoded = base32Encode(c);
                    stepsArray = base32Steps;
                    break;
                case "base64":
                    Encoded = base64Encode(c);
                    stepsArray = base64Steps;
                    break;
                case "ascii85":
                    Encoded = ascii85Encode(c);
                    stepsArray = ascii85Steps;
                    break;
                default:
                    alert("INVALID INPUT");
            }

            document.getElementById("output").textContent = `Encoded Text: ${Encoded}`;
            displaySteps(stepsArray);
        });
// ADDING TIMEDELAY and showing steps
        function displaySteps(steps) {
            const stepsContainer = document.getElementById("steps");
            stepsContainer.innerHTML = "STEPS: <br>";

            steps.forEach((step, index) => {
                setTimeout(() => {
                    stepsContainer.innerHTML += `${step}<br>`;
                }, index * 600); 
            });
        }
// USING THE CODE WE DID IN LAB8..
        let base64Steps = [];
        function base64Encode(str) {
            const base64Chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
            let binStr = "";
            let encStr = "";
            base64Steps = [];

            for (let i = 0; i < str.length; i++) {
                let ascii = str.charCodeAt(i);
                let bin = ascii.toString(2).padStart(8, '0');
                binStr += bin;
                base64Steps.push(`Character '${str[i]}' (ASCII ${ascii}) -> 8-bit binary: ${bin}`);
            }

            for (let j = 0; j < binStr.length; j += 6) {
                let chunk = binStr.substring(j, j + 6);
                if (chunk.length < 6) {
                    chunk = chunk.padEnd(6, '0');
                }
                let decimal = parseInt(chunk, 2);
                encStr += base64Chars[decimal];
                base64Steps.push(`6-bit binary chunk: ${chunk} -> Decimal: ${decimal} -> Base64 Char: ${base64Chars[decimal]}`);
            }

            return encStr;
        }
        // ALREADY CHECKED THE ANSWER BY $echo -n abc | base64 in terminal

        let base32Steps = [];
        function base32Encode(str) {
            const base32Chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
            let binStr = "";
            let encStr = "";
            base32Steps = [];

            for (let i = 0; i < str.length; i++) {
                let ascii = str.charCodeAt(i);
                let bin = ascii.toString(2).padStart(8, '0'); 
                binStr += bin;
                base32Steps.push(`Character '${str[i]}' (ASCII ${ascii}) -> 8-bit binary: ${bin}`);
            }
            
            for (let j = 0; j < binStr.length; j += 5) {
                let chunk = binStr.substring(j, j + 5);
                if (chunk.length < 5) {
                    chunk = chunk.padEnd(5, '0');
                }
                let decimal = parseInt(chunk, 2);
                encStr += base32Chars[decimal];
                base32Steps.push(`5-bit binary chunk: ${chunk} -> Decimal: ${decimal} -> Base32 Char: ${base32Chars[decimal]}`);
            }

            return encStr.padEnd(Math.ceil(encStr.length / 8) * 8, '=');
        }
// SIR I WASN'T ABLE TO FIND THE WORKING STRATEGY OF Base85 ...some websites said to divide into 4 bit of chunks and some suggested else..
// AT THE END THE ASCII85 code i made with the help of resources on some sites though i wasn't able to make the decoder function for the same..
        let ascii85Steps = [];
        function ascii85Encode(text) {
            let output = '';
            let k = 0;
            let count = 0;
            ascii85Steps = [];

            for (let i = 0; i < text.length; i++) {
                k = (k << 8) | text.charCodeAt(i);
                count++;
                ascii85Steps.push(`Character '${text[i]}' (ASCII ${text.charCodeAt(i)}) -> k: ${k}`);
                if (count === 4) {
                    output += encodeBlock(k);
                    k = 0;
                    count = 0;
                }
            }
            if (count > 0) {
                k <<= (4 - count) * 8;
                output += encodeBlock(k).substring(0, count + 1);
            }
            return output;

            function encodeBlock(k) {
                let encoded = '';
                for (let i = 4; i >= 0; i--) {
                    encoded += String.fromCharCode((k / Math.pow(85, i)) % 85 + 33);
                    ascii85Steps.push(`Encoded character from k: ${encoded[encoded.length - 1]}`);
                }
                return encoded;
            }
        }
