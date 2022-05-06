var originalText, text, lastAction;
var lastPosition = [];
var allPunctuations = [];
let style, isCapital;

let emojis = document.querySelectorAll('#emoji i');


function has_scrollbar()
{
    const elem = document.getElementById('bunched-reader-text-area');
	let rows = elem.getAttribute('rows');
    if (elem.clientHeight < elem.scrollHeight){
		if(parseInt(rows) < 5) {
			elem.setAttribute('rows', rows + 1);
		}
	}
    else{
		if(parseInt(rows) > 3) {
			elem.setAttribute('rows', rows - 1);
			has_scrollbar();
		}
	}
}

$('#bunched-reader-text-area').on('click', function() {
	let myText = $('#bunched-reader-text-area').val();
	let index = myText.indexOf('▓');
	document.getElementById('bunched-reader-text-area').selectionEnd = index;
	document.getElementById('bunched-reader-text-area').selectionStart = index;
})

function checkEmoji() {
	has_scrollbar();
	document.getElementById('bunched-reader-text-area').scrollTop = 0;
	document.getElementById('bunched-reader-text-area').blur();
	document.getElementById('bunched-reader-text-area').focus();
	let textArea = $('#bunched-reader-text-area').val();
	let index = textArea.lastIndexOf(' ');
	let cursorIndex = textArea.indexOf('▓');
	let increment = 1;
	if(cursorIndex < index) {
// 		increment = 2;
		textArea = textArea.replace('▓', '');
		index -= 1;
	}
	console.log(originalText.substring(0, index+1));
	console.log(textArea.substring(0, index+increment));
	if(originalText == $('#bunched-reader-text-area').val().replace('▓', '')) {
		$('#complete').css('display', 'block');
		$('#happy').css('display', 'none');
		$('#sad').css('display', 'none');
	}
	else {
// 		if(originalText.substring(0, index+1) == textArea.substring(0, index+increment)) {
		if(originalText.substring(0, index+1) == textArea.substring(0, index+1)) {
			$('#happy').css('display', 'block');
			$('#sad').css('display', 'none');
			$('#complete').css('display', 'none');
		}
		else {
			$('#happy').css('display', 'none');
			$('#sad').css('display', 'block');
			$('#complete').css('display', 'none');
		}
	}
	emojis.forEach(emoji => {
		style = emoji.getAttribute('style');
		if(style.includes('display: block') && !style.includes('9px')) {
			console.log(style);
			style += 'margin-top: 9px;';
			emoji.setAttribute('style', style);
		}
	})
}

function setButton() {
	if (allPunctuations.length > 0) {
		document.getElementById('button').innerText = allPunctuations[0];
		if(allPunctuations[0] == ' ') {
			document.getElementById('button').innerText = 'Space';
		}
		else if(allPunctuations[0] == '.') {
			document.getElementById('button').innerText = '.';
		}
		else if(allPunctuations[0] == ',') {
			document.getElementById('button').innerText = ',';
		}
		else if(allPunctuations[0] == '!') {
			document.getElementById('button').innerText = '!';
		}
		else if(allPunctuations[0] == '?') {
			document.getElementById('button').innerText = '?';
		}
		else if(allPunctuations[0] == '"') {
			document.getElementById('button').innerText = '"';
		}
		else if(allPunctuations[0] == "'") {
			document.getElementById('button').innerText = "'";
		}
		else if(allPunctuations[0] == "&") {
			document.getElementById('button').innerText = '&';
		}
		else if(allPunctuations[0] == "(") {
			document.getElementById('button').innerText = '(';
		}
		else if(allPunctuations[0] == ")") {
			document.getElementById('button').innerText = ')';
		}
		else if(allPunctuations[0] == "-") {
			document.getElementById('button').innerText = '-';
		}
		else if(allPunctuations[0] == ":") {
			document.getElementById('button').innerText = ':';
		}
		else if(allPunctuations[0] == "u") {
			document.getElementById('button').innerText = 'Capital';
		}
		else if(allPunctuations[0] == ";") {
			document.getElementById('button').innerText = ';';
		}
		else if(allPunctuations[0] == "/") {
			document.getElementById('button').innerText = '/';
		}
	}
}

document.addEventListener('DOMContentLoaded', function() {
	if(document.querySelector('.bunched-text')) {
		$('#bunchread').css('display', 'block');
		text = document.querySelector('.bunched-text').innerText;
		originalText = text;
		for(let i=0; i<text.length; i++) {
			if (text[i] == ' ') {
				allPunctuations.push(' ');
			}
			else if(text[i] == ',') {
				allPunctuations.push(',');
			}
			else if(text[i] == '.') {
				allPunctuations.push('.');
			}
			else if(text[i] == '!') {
				allPunctuations.push('!');
			}
			else if(text[i] == '?') {
				allPunctuations.push('?');
			}
			else if(text[i].charCodeAt(0) >= 65 && text[i].charCodeAt(0) <= 90) {
				allPunctuations.push('u');
			}
			else if(text[i].charCodeAt(0) == "8220") {
				allPunctuations.push('"');
			}
			else if(text[i].charCodeAt(0) == "8221") {
				allPunctuations.push('"');
			}
			else if(text[i].charCodeAt(0) == "8216") {
				allPunctuations.push("'");
			}
			else if(text[i].charCodeAt(0) == "8217") {
				allPunctuations.push("'");
			}
			else if(text[i] == "&") {
				allPunctuations.push("&");
			}
			else if(text[i] == "(") {
				allPunctuations.push("(");
			}
			else if(text[i] == ")") {
				allPunctuations.push(")");
			}
			else if(text[i] == "-") {
				allPunctuations.push("-");
			}
			else if(text[i] == ":") {
				allPunctuations.push(":");
			}
			else if(text[i] == ";") {
				allPunctuations.push(";");
			}
			else if(text[i] == "/") {
				allPunctuations.push("/");
			}
		}
		text = text.replaceAll(' ', '');
		text = text.replaceAll(',', '');
		text = text.replaceAll('.', '');
		text = text.replaceAll('!', '');
		text = text.replaceAll('?', '');
		text = text.replaceAll(String.fromCharCode(8221), '');
		text = text.replaceAll(String.fromCharCode(8220), '');
		text = text.replaceAll(String.fromCharCode(8217), '');
		text = text.replaceAll(String.fromCharCode(8216), '');
		text = text.replaceAll('&', '');
		text = text.replaceAll('(', '');
		text = text.replaceAll(')', '');
		text = text.replaceAll('-', '');
		text = text.replaceAll(':', '');
		text = text.replaceAll(';', '');
		text = text.replaceAll('/', '');
		text = text.toLowerCase();
		originalText = originalText.replaceAll(String.fromCharCode(8221), '"');
		originalText = originalText.replaceAll(String.fromCharCode(8220), '"');
		originalText = originalText.replaceAll(String.fromCharCode(8217), "'");
		originalText = originalText.replaceAll(String.fromCharCode(8216), "'");
		setButton();
		$('.bunched-text').empty();
		$('.bunched-text').append( $('#bunchread') );
		text = "▓" + text;
		document.getElementById('bunched-reader-text-area').value = text;
		document.getElementById('bunched-reader-text-area').selectionEnd = 0;
// 		has_scrollbar();
	}
});

$('.right-arrow button').on('click', function() {
	let str = document.getElementById('bunched-reader-text-area').value;
	cursorPosition = document.getElementById('bunched-reader-text-area').selectionEnd;
	let index = str.indexOf('▓');
	if(str[index+1]) {
		let firstPart = str.slice(0, index);
		let secondPart = str.slice(index+1);
		let temp = secondPart[0];
		secondPart = '▓' + secondPart.slice(1, secondPart.length);
		str = firstPart + temp + secondPart;
		document.getElementById('bunched-reader-text-area').value = str;
// 		document.getElementById('bunched-reader-text-area').focus();
		document.getElementById('bunched-reader-text-area').selectionStart = cursorPosition + 1;
		document.getElementById('bunched-reader-text-area').selectionEnd = cursorPosition + 1;
		checkEmoji();
	}
})



$('.left-arrow button').on('click', function() {
	let str = document.getElementById('bunched-reader-text-area').value;
	cursorPosition = document.getElementById('bunched-reader-text-area').selectionEnd;
	let index = str.indexOf('▓');
	if(str[index-1]) {
		let firstPart = str.slice(0, index-1);
		let secondPart = str.slice(index+1);
		let temp = str[index-1];
		str = firstPart + '▓' + temp + secondPart;
		document.getElementById('bunched-reader-text-area').value = str;
// 		document.getElementById('bunched-reader-text-area').focus();
		document.getElementById('bunched-reader-text-area').selectionStart = cursorPosition - 1;
		document.getElementById('bunched-reader-text-area').selectionEnd = cursorPosition - 1;
		checkEmoji();
	}
})

document.getElementById('dot').onclick = function() {
	lastAction = 'dot';
	let character = '.';
	let cursorPosition = document.getElementById('bunched-reader-text-area').selectionEnd;
	lastPosition.push(cursorPosition);
	let textArea = document.getElementById('bunched-reader-text-area').value;
	$("#bunched-reader-text-area").val(textArea.slice(0, cursorPosition) + character + textArea.slice(cursorPosition));
// 	document.getElementById('bunched-reader-text-area').focus();
	document.getElementById('bunched-reader-text-area').selectionEnd = cursorPosition + 1;
	document.getElementById('bunched-reader-text-area').selectionStart = cursorPosition + 1;
	checkEmoji();
}

document.getElementById('question').onclick = function() {
	lastAction = 'question';
	let character = '?';
	let cursorPosition = document.getElementById('bunched-reader-text-area').selectionEnd;
	lastPosition.push(cursorPosition);
	let textArea = document.getElementById('bunched-reader-text-area').value;
	$("#bunched-reader-text-area").val(textArea.slice(0, cursorPosition) + character + textArea.slice(cursorPosition));
// 	document.getElementById('bunched-reader-text-area').focus();
	document.getElementById('bunched-reader-text-area').selectionEnd = cursorPosition + 1;
	document.getElementById('bunched-reader-text-area').selectionStart = cursorPosition + 1;
	checkEmoji();
}

document.getElementById('space').onclick = function() {
	lastAction = 'space';
	let character = ' ';
	let cursorPosition = document.getElementById('bunched-reader-text-area').selectionEnd;
	lastPosition.push(cursorPosition);
	let textArea = document.getElementById('bunched-reader-text-area').value;
	let newText = textArea.slice(0, cursorPosition) + character + textArea.slice(cursorPosition);
	
	let index = newText.indexOf('▓');
	if(newText[index+1]) {
		let firstPart = newText.slice(0, index);
		let secondPart = newText.slice(index+1);
		let temp = secondPart[0];
// 		secondPart = '▓' + secondPart.slice(1, secondPart.length);
		secondPart = '▓' + secondPart.slice(0, secondPart.length);
// 		newText = firstPart + temp + secondPart;
		newText = firstPart + secondPart;
	}
	
	
	$("#bunched-reader-text-area").val(newText);
	
	
	
// 	document.getElementById('bunched-reader-text-area').focus();
	document.getElementById('bunched-reader-text-area').selectionEnd = newText.indexOf('▓');
	document.getElementById('bunched-reader-text-area').selectionStart = newText.indexOf('▓');
	checkEmoji();
}

document.getElementById('comma').onclick = function() {
	lastAction = 'comma';
	let character = ',';
	let cursorPosition = document.getElementById('bunched-reader-text-area').selectionEnd;
	lastPosition.push(cursorPosition);
	let textArea = document.getElementById('bunched-reader-text-area').value;
	$("#bunched-reader-text-area").val(textArea.slice(0, cursorPosition) + character + textArea.slice(cursorPosition));
// 	document.getElementById('bunched-reader-text-area').focus();
	document.getElementById('bunched-reader-text-area').selectionEnd = cursorPosition + 1;
	document.getElementById('bunched-reader-text-area').selectionStart = cursorPosition + 1;
	checkEmoji();
}

document.getElementById('exclamatory').onclick = function() {
	lastAction = 'exclamatory';
	let character = '!';
	let cursorPosition = document.getElementById('bunched-reader-text-area').selectionEnd;
	lastPosition.push(cursorPosition);
	let textArea = document.getElementById('bunched-reader-text-area').value;
	$("#bunched-reader-text-area").val(textArea.slice(0, cursorPosition) + character + textArea.slice(cursorPosition));
// 	document.getElementById('bunched-reader-text-area').focus();
	document.getElementById('bunched-reader-text-area').selectionEnd = cursorPosition + 1;
	document.getElementById('bunched-reader-text-area').selectionStart = cursorPosition + 1;
	checkEmoji();
}



document.getElementById('punctuation').onclick = function() {
	lastAction = 'punctuation';
	let character = '"';
	let cursorPosition = document.getElementById('bunched-reader-text-area').selectionEnd;
	lastPosition.push(cursorPosition);
	let textArea = document.getElementById('bunched-reader-text-area').value;
	$("#bunched-reader-text-area").val(textArea.slice(0, cursorPosition) + character + textArea.slice(cursorPosition));
// 	document.getElementById('bunched-reader-text-area').focus();
	document.getElementById('bunched-reader-text-area').selectionEnd = cursorPosition + 1;
	document.getElementById('bunched-reader-text-area').selectionStart = cursorPosition + 1;
	checkEmoji();
}

document.getElementById('punc').onclick = function() {
	lastAction = 'punc';
	let character = "'";
	let cursorPosition = document.getElementById('bunched-reader-text-area').selectionEnd;
	lastPosition.push(cursorPosition);
	let textArea = document.getElementById('bunched-reader-text-area').value;
	$("#bunched-reader-text-area").val(textArea.slice(0, cursorPosition) + character + textArea.slice(cursorPosition));
// 	document.getElementById('bunched-reader-text-area').focus();
	document.getElementById('bunched-reader-text-area').selectionEnd = cursorPosition + 1;
	document.getElementById('bunched-reader-text-area').selectionStart = cursorPosition + 1;
	checkEmoji();
}

document.getElementById('and').onclick = function() {
	lastAction = 'and';
	let character = '&';
	let cursorPosition = document.getElementById('bunched-reader-text-area').selectionEnd;
	lastPosition.push(cursorPosition);
	let textArea = document.getElementById('bunched-reader-text-area').value;
	$("#bunched-reader-text-area").val(textArea.slice(0, cursorPosition) + character + textArea.slice(cursorPosition));
// 	document.getElementById('bunched-reader-text-area').focus();
	document.getElementById('bunched-reader-text-area').selectionEnd = cursorPosition + 1;
	document.getElementById('bunched-reader-text-area').selectionStart = cursorPosition + 1;
	checkEmoji();
}

document.getElementById('left-bracket').onclick = function() {
	lastAction = 'left-bracket';
	let character = '(';
	let cursorPosition = document.getElementById('bunched-reader-text-area').selectionEnd;
	lastPosition.push(cursorPosition);
	let textArea = document.getElementById('bunched-reader-text-area').value;
	$("#bunched-reader-text-area").val(textArea.slice(0, cursorPosition) + character + textArea.slice(cursorPosition));
// 	document.getElementById('bunched-reader-text-area').focus();
	document.getElementById('bunched-reader-text-area').selectionEnd = cursorPosition + 1;
	document.getElementById('bunched-reader-text-area').selectionStart = cursorPosition + 1;
	checkEmoji();
}

document.getElementById('right-bracket').onclick = function() {
	lastAction = 'right-bracket';
	let character = ')';
	let cursorPosition = document.getElementById('bunched-reader-text-area').selectionEnd;
	lastPosition.push(cursorPosition);
	let textArea = document.getElementById('bunched-reader-text-area').value;
	$("#bunched-reader-text-area").val(textArea.slice(0, cursorPosition) + character + textArea.slice(cursorPosition));
// 	document.getElementById('bunched-reader-text-area').focus();
	document.getElementById('bunched-reader-text-area').selectionEnd = cursorPosition + 1;
	document.getElementById('bunched-reader-text-area').selectionStart = cursorPosition + 1;
	checkEmoji();
}

document.getElementById('dash').onclick = function() {
	lastAction = 'dash';
	let character = '-';
	let cursorPosition = document.getElementById('bunched-reader-text-area').selectionEnd;
	lastPosition.push(cursorPosition);
	let textArea = document.getElementById('bunched-reader-text-area').value;
	$("#bunched-reader-text-area").val(textArea.slice(0, cursorPosition) + character + textArea.slice(cursorPosition));
// 	document.getElementById('bunched-reader-text-area').focus();
	document.getElementById('bunched-reader-text-area').selectionEnd = cursorPosition + 1;
	document.getElementById('bunched-reader-text-area').selectionStart = cursorPosition + 1;
	checkEmoji();
}

document.getElementById('colon').onclick = function() {
	lastAction = 'colon';
	let character = ':';
	let cursorPosition = document.getElementById('bunched-reader-text-area').selectionEnd;
	lastPosition.push(cursorPosition);
	let textArea = document.getElementById('bunched-reader-text-area').value;
	$("#bunched-reader-text-area").val(textArea.slice(0, cursorPosition) + character + textArea.slice(cursorPosition));
// 	document.getElementById('bunched-reader-text-area').focus();
	document.getElementById('bunched-reader-text-area').selectionEnd = cursorPosition + 1;
	document.getElementById('bunched-reader-text-area').selectionStart = cursorPosition + 1;
	checkEmoji();
}

document.getElementById('semicolon').onclick = function() {
	lastAction = 'semicolon';
	let character = ';';
	let cursorPosition = document.getElementById('bunched-reader-text-area').selectionEnd;
	lastPosition.push(cursorPosition);
	let textArea = document.getElementById('bunched-reader-text-area').value;
	$("#bunched-reader-text-area").val(textArea.slice(0, cursorPosition) + character + textArea.slice(cursorPosition));
// 	document.getElementById('bunched-reader-text-area').focus();
	document.getElementById('bunched-reader-text-area').selectionEnd = cursorPosition + 1;
	document.getElementById('bunched-reader-text-area').selectionStart = cursorPosition + 1;
	checkEmoji();
}

document.getElementById('slash').onclick = function() {
	lastAction = 'slash';
	let character = '/';
	let cursorPosition = document.getElementById('bunched-reader-text-area').selectionEnd;
	lastPosition.push(cursorPosition);
	let textArea = document.getElementById('bunched-reader-text-area').value;
	$("#bunched-reader-text-area").val(textArea.slice(0, cursorPosition) + character + textArea.slice(cursorPosition));
// 	document.getElementById('bunched-reader-text-area').focus();
	document.getElementById('bunched-reader-text-area').selectionEnd = cursorPosition + 1;
	document.getElementById('bunched-reader-text-area').selectionStart = cursorPosition + 1;
	checkEmoji();
}




$('#undo').on('click', function() {
	if(lastAction) {
		let position = document.getElementById('bunched-reader-text-area').selectionEnd;
		let string = $('#bunched-reader-text-area').val();
		if(string.indexOf('▓') > lastPosition[lastPosition.length - 1]) {
			let firstPart = string.slice(0, lastPosition[lastPosition.length - 1]);
			let secondPart = string.slice(lastPosition[lastPosition.length - 1]+1);
			let str, index;
			let char = string[lastPosition[lastPosition.length - 1]];
			if(char.charCodeAt(0) >= 65 && char.charCodeAt(0) <= 90) {
				allPunctuations.unshift('u');	
				str = firstPart + char.toLowerCase() + secondPart;
				$('#bunched-reader-text-area').val(firstPart + char.toLowerCase() + secondPart);
			}
			else {
				allPunctuations.unshift(char);	
				str = firstPart + secondPart;
				$('#bunched-reader-text-area').val(firstPart + secondPart);
			}
			index = str.indexOf('▓');
			document.getElementById('bunched-reader-text-area').selectionStart = index;
			document.getElementById('bunched-reader-text-area').selectionEnd = index;
			lastPosition.pop();	
		}
		else {
			let str, index;
			let firstPart = string.slice(0, lastPosition[lastPosition.length - 1] + 1);
			let secondPart = string.slice(lastPosition[lastPosition.length - 1]+2);
			let char = string[lastPosition[lastPosition.length - 1] + 1];
			if(char.charCodeAt(0) >= 65 && char.charCodeAt(0) <= 90) {
				allPunctuations.unshift('u');	
				str = firstPart + char.toLowerCase() + secondPart;
				$('#bunched-reader-text-area').val(firstPart + char.toLowerCase() + secondPart);
			}
			else {
				allPunctuations.unshift(char);	
				str = firstPart + secondPart;
				$('#bunched-reader-text-area').val(firstPart + secondPart);
			}
			index = str.indexOf('▓');
			document.getElementById('bunched-reader-text-area').selectionStart = index;
			document.getElementById('bunched-reader-text-area').selectionEnd = index;
			lastPosition.pop();	
		}
		setButton();
		if(lastPosition.length == 0) {
			lastAction = '';
		}
	}
	checkEmoji();
})

$('#button').on('click', function() {
	console.log(document.getElementById('bunched-reader-text-area').selectionEnd)
	if(allPunctuations.length > 0) {
		isCapital = false;
		if(document.getElementById('button').innerText == 'Space') {
			document.getElementById('space').click();
		}
		else if(document.getElementById('button').innerText == '.') {
			document.getElementById('dot').click();
		}
		else if(document.getElementById('button').innerText == '!') {
			document.getElementById('exclamatory').click();
		}
		else if(document.getElementById('button').innerText == ',') {
			document.getElementById('comma').click();
		}
		else if(document.getElementById('button').innerText == '?') {
			document.getElementById('question').click();
		}
		else if(document.getElementById('button').innerText == '"') {
			document.getElementById('punctuation').click();
		}
		else if(document.getElementById('button').innerText == "'") {
			document.getElementById('punc').click();
		}
		else if(document.getElementById('button').innerText == '(') {
			document.getElementById('left-bracket').click();
		}
		else if(document.getElementById('button').innerText == ')') {
			document.getElementById('right-bracket').click();
		}
		else if(document.getElementById('button').innerText == ':') {
			document.getElementById('colon').click();
		}
		else if(document.getElementById('button').innerText == '&') {
			document.getElementById('and').click();
		}
		else if(document.getElementById('button').innerText == ';') {
			document.getElementById('semicolon').click();
		}
		else if(document.getElementById('button').innerText == '/') {
			document.getElementById('slash').click();
		}
		else if(document.getElementById('button').innerText == '-') {
			document.getElementById('dash').click();
		}
		else if(document.getElementById('button').innerText == 'Capital') {
			document.getElementById('capital').click();
		}
		if (document.getElementById('button').innerText == 'Capital') {
			if(isCapital) {
				allPunctuations.splice(0, 1);		
			}
		}
		else {
			allPunctuations.splice(0, 1);	
		}
		setButton();
	}
})

$('#capital').on('click', function() {
	let textareaText = $('#bunched-reader-text-area').val();
	let cursorPosition = document.getElementById('bunched-reader-text-area').selectionEnd;
	let index = textareaText.indexOf('▓');
	if (textareaText[index + 1]) {
		let lowerChar = textareaText[index + 1];
		if (lowerChar.charCodeAt(0) >= 97 && lowerChar.charCodeAt(0) <= 122) {
			isCapital = true;
			lastAction = 'capital';
			lastPosition.push(cursorPosition);
			let upperChar = textareaText[index + 1].toUpperCase()
			textareaText = textareaText.slice(0, index+1) + upperChar + textareaText.slice(index + 2);
			$('#bunched-reader-text-area').val(textareaText);
			document.getElementById('bunched-reader-text-area').selectionStart = index;
			document.getElementById('bunched-reader-text-area').selectionEnd = index;
			document.querySelector('.right-arrow button').click();		
		}
	}
})

