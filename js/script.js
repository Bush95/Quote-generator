var unused_quotes = [
	["Simple can be harder than complex: You have to work hard to get your thinking clean to make it simple. But it’s worth it in the end because once you get there, you can move mountains.", "Steve Jobs"],
	["The greatest wealth is to live content with little.", "Plato"],
	["The most complicated skill is to be simple.", "Dejan Stojanovic"],
	["The most basic and somehow forgettable thing is this: Love is not pain. Love is goodness. And real love--it's less shiny than solid and simple.", "Deb Caletti"],
	["I woke to the sound of rain.", "Sylvia Plath"]
];
var used_quotes = [];

function add_event_listeners() {
	document.querySelector("#quote-button").addEventListener("click", show_new_quote, false);
}

function show_new_quote(e) {
	if (e)
		e.preventDefault();
	var current_quote = "";
	var current_author = "";

	//choose random index and set quote and author
	var index = Math.round(Math.random() * (unused_quotes.length - 1));
	current_quote = unused_quotes[index][0];
	current_author = unused_quotes[index][1];
	used_quotes.push(unused_quotes.splice(index, 1)[0]);

	//if unused array is empty, fill it again and reset used_quotes
	if (unused_quotes.length === 0) {
		unused_quotes = used_quotes;
		used_quotes = [];
	}
	//fill in DOM
	set_twitter_share(current_quote, current_author);
	document.querySelector("#quote").innerHTML = current_quote;
	document.querySelector("#quote-author").innerHTML = current_author;
}
//adds value to twitter share
function set_twitter_share(text, author) {
	var button = document.querySelector("iframe");
	var output_text = '"' + text + '"' + " - " + author;

	delete_share_button();
	add_share_button(output_text);
}
//delete old button
function delete_share_button() {
	var parent = document.querySelector('#share-buttons');
	var child = document.querySelector('.twitter-share-button');
	if (child)
		parent.removeChild(child);
}
//add new button
function add_share_button(text) {
	twttr.widgets.createShareButton(
		"",
		document.querySelector("#share-buttons"), {
			size: "large",
			text: text
		}
	);
}

function on_load_events() {
	show_new_quote();
	add_event_listeners();
}
(window).onload = on_load_events();