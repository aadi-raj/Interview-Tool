<!DOCTYPE html>

<html lang="en">
<head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Technical Interview Simulator</title>
<link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.1.4/dist/tailwind.min.css" rel="stylesheet"/>
<style>
        body {
            font-family: "Courier New", "Lucida Console", monospace;
        }
    </style>
<script data-domain="a.picoapps.xyz" defer="" src="https://plausible.io/js/script.outbound-links.js"></script></head>
<body class="bg-gray-100 text-gray-900 min-h-screen">
<div class="container px-4 mx-auto py-10">
<h1 class="text-4xl font-bold mb-6">Technical Interview Simulator</h1>
<div class="mb-4 font-semibold text-lg" id="question"></div>
<form class="space-y-4" id="interview-form">
<div>
<label class="block mb-2" for="answer">Answer:</label>
<textarea class="w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300" id="answer" name="answer" rows="5"></textarea>
</div>
<button class="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600" type="submit">Submit</button>
<div class="hidden" id="loading">
<div class="loader" style="font-size:8px;margin:auto"></div>
</div>
</form>
<div class="mt-8 mb-6 whitespace-pre-wrap" id="output"></div>
<footer class="text-center">
<p>Made with ❤️ by <a class="text-indigo-500 hover:text-indigo-600" href="https://careerkoch.com" rel="noopener noreferrer" target="_blank">careerkoch</a></p>
</footer>
</div>
<script>
        async function fetchQuestion() {
            const questionPrompt = 'Please provide a technical interview question:';
            const questionResponse = await fetch(`https://a.picoapps.xyz/ask-ai?prompt=${encodeURIComponent(questionPrompt)}`);
            const questionJSON = await questionResponse.json();
            document.getElementById('question').textContent = questionJSON.response;
        }

        document.getElementById('interview-form').addEventListener('submit', async function (event) {
            event.preventDefault();

            const answer = document.getElementById('answer').value.trim();
            const prompt = `Give feedback on the submitted answer: ${answer}`;

            document.getElementById('loading').classList.remove('hidden');

            const response = await fetch(`https://a.picoapps.xyz/ask-ai?prompt=${encodeURIComponent(prompt)}`);
            const jsonResponse = await response.json();

            document.getElementById('output').textContent = jsonResponse.response;
            document.getElementById('loading').classList.add('hidden');
        });

        window.onload = function() {
            fetchQuestion();
            function animate() {
                const loader = document.querySelector('.loader');
                loader.innerHTML = '.';
                setTimeout(() => {
                    loader.innerHTML = '..';
                    setTimeout(() => {
                        loader.innerHTML = '...';
                        setTimeout(() => {
                            requestAnimationFrame(animate);
                        }, 200);
                    }, 200);
                }, 200);
            }
            requestAnimationFrame(animate);
        }
    </script>
</body>
</html>
